import { configureStore } from '@reduxjs/toolkit';
import { LOCAL_STORAGE_KEY } from '../app-constants';
import authReducer from './features/auth/auth.slice';
import prefReducer from './features/preferences/preferences.slice';
import userReducer from './features/user-manager/user-manager-slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    preferences: prefReducer,
    users: userReducer,
  },
});

store.subscribe(() => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(store.getState()));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
