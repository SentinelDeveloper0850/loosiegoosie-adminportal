import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  CLIENT_ID,
  CLIENT_ZONE_URL,
  LOCAL_STORAGE_KEY,
  SESSION_KEY__TOKEN,
  SESSION_KEY__USER,
} from '../../../app-constants';
import IAuthRequest from '../../../interfaces/IAuthRequest.interface';
import { IUser } from '../../../models/user.model';
import { fetchUsers } from '../user-manager/user-manager-slice';

// Define a type for the slice state
interface AuthState {
  status: string;
  signInRequired: boolean;

  user: IUser;

  isAdmin?: boolean;
  token?: string;
  notify: INotify | false;
}

interface INotify {
  shouldNotify: boolean;
  message: string;
  title: string;
  type: 'success' | 'info' | 'warning' | 'error' | undefined;
}

// Define the initial state using that type
const initialState: AuthState = {
  status: 'idle',
  signInRequired: true,
  user: {},
  notify: false,
};

export const isValidSession = createAsyncThunk('AUTH/checkSessionValid', async () => {
  let token = sessionStorage.getItem(SESSION_KEY__TOKEN);
  return token ? true : false;
});

export const signOut = createAsyncThunk('AUTH/signOut', async () => {
  sessionStorage.removeItem(SESSION_KEY__TOKEN);
  sessionStorage.removeItem(LOCAL_STORAGE_KEY);
  return true;
});

export const getCurrentUser = createAsyncThunk('AUTH/getCurrentUser', async () => {
  let storedUserString = sessionStorage.getItem(SESSION_KEY__USER);

  if (storedUserString) {
    let user = JSON.parse(storedUserString);
    return user;
  } else {
    return false;
  }
});

export const getToken = createAsyncThunk('AUTH/getToken', async () => {
  let token = sessionStorage.getItem(SESSION_KEY__TOKEN);

  if (token) {
    return token;
  } else {
    return false;
  }
});

export const getCurrentUserInfo = async () => {
  const token = sessionStorage.getItem(SESSION_KEY__TOKEN);

  const _headers = {
    authorization: `Bearer ${token}`,
  };

  try {
    const response = await axios.get(`${CLIENT_ZONE_URL}auth`, {
      headers: _headers,
    });

    if (response.status === 200) {
      const { data } = response;
      sessionStorage.setItem(SESSION_KEY__USER, JSON.stringify(data));
      return data;
    } else {
      console.log(response);
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const loginUser = createAsyncThunk('AUTH/loginUser', async (auth: IAuthRequest, thunkAPI: any) => {
  const dispatch = thunkAPI.dispatch;
  try {
    const response: any = await axios.post(`${CLIENT_ZONE_URL}auth`, {
      email: auth.username,
      password: auth.password,
    });

    if (response.status === 200) {
      const { data } = response;

      sessionStorage.setItem(SESSION_KEY__TOKEN, data.token);

      const userInfo = await getCurrentUserInfo();

      if (userInfo) {
        if (userInfo && userInfo.client_id !== CLIENT_ID) {
          dispatch(signOut());

          return {
            hasError: true,
            notify: {
              shouldNotify: true,
              message: 'You are not authorised to access this application',
              title: 'Unauthorised',
              type: 'error',
            },
          };
        }
      } else {
        return {
          hasError: false,
          notify: {
            shouldNotify: true,
            message: 'Unable to fetch user information. Please check your internet connection and try again.',
            title: 'Unknown Issue',
            type: 'warning',
          },
          ...userInfo,
        };
      }

      dispatch(fetchUsers());

      return {
        hasError: false,
        notify: false,
        ...userInfo,
      };
    }
    return false;
  } catch (error: any) {
    console.log('error', error);
    return {
      hasError: true,
      notify: {
        shouldNotify: true,
        message: error.response.data.errors[0].msg,
        type: 'error',
      },
    };
  }
});

export const authSlice = createSlice({
  name: 'auth',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    hydrateAuth(state: any, action: any) {
      state.user = action.payload.user;

      state.status = action.payload.status;
      state.signInRequired = action.payload.signInRequired;

      state.isAdmin = action.payload.isAdmin;
      state.token = action.payload.token;
    },
    setIsAdmin(state: any, action: PayloadAction<boolean>) {
      state.isAdmin = action.payload;
    },
    setUser(state: any, action: PayloadAction<{ firstnames: string; userId: string }>) {
      state.user.firstnames = action.payload.firstnames;
      state.user._id = action.payload.userId;
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(loginUser.pending, (state: any) => {
        state.status = 'Authenticating';
        state.notify = false;
      })
      .addCase(loginUser.rejected, (state: any, payload: any) => {
        console.log('payload', payload);
        state.status = 'Authentication Failed';
      })
      .addCase(loginUser.fulfilled, (state: any, action: any) => {
        if (action.payload.hasError === false) {
          state.user._id = action.payload._id;
          state.user.activated = action.payload.activated;
          state.user.client = {
            name: action.payload.client_name,
            id: action.payload.client_id,
          };
          state.user.firstnames = action.payload.name;
          state.user.lastname = action.payload.surname;
          state.user.fullnames = `${action.payload.name} ${action.payload.surname}`;
          state.user.emailAddress = action.payload.email_address;
          state.user.phoneNumber = action.payload.contact_number;
          state.user.profilePicture = action.payload.profile_picture;
          state.user.role = action.payload.role;

          state.status = 'Online';
          state.signInRequired = false;

          state.isAdmin = action.payload.role.name.toLowerCase().includes('admin');
          state.token = action.payload.token;
        } else {
          state.status = 'idle';
          state.notify = action.payload.notify;
        }
      })
      .addCase(signOut.fulfilled, (state: any, action: any) => {
        state.user = {};

        state.status = 'idle';
        state.signInRequired = true;

        state.isAdmin = undefined;
        state.token = undefined;
      });
  },
});

export const { hydrateAuth, setIsAdmin, setUser } = authSlice.actions;

export default authSlice.reducer;
