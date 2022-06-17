import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { CLIENT_ZONE_URL, CLIENT_ID } from '../../../app-constants';
import { IUser } from '../../../models/user';

interface ClientUserState {
  users: any[];
}

const initialState: ClientUserState = {
  users: [],
};

export const fetchUsers = createAsyncThunk('USERS/fetchUsersByClient', async () => {
  try {
    const response = await axios.get(`${CLIENT_ZONE_URL}users/byClient/${CLIENT_ID}`);

    if (response.data) {
      let _users: IUser[] = response.data;

      return _users;
    } else {
      return [];
    }
  } catch (error) {
    console.error(error);
    return [];
  }
});

const clientUserSlice = createSlice({
  name: 'USERS',
  initialState,
  reducers: {
    hydrateUsers(state: any, action: any) {
      state.users = action.payload.users;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state, action) => {})
      .addCase(fetchUsers.rejected, (state, action) => {})
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      });
  },
});

export const { hydrateUsers } = clientUserSlice.actions;
export default clientUserSlice.reducer;
