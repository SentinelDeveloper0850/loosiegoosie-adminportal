import { createSlice } from '@reduxjs/toolkit';
import { APP_THEME } from '../../../app-constants';

// Define a type for the slice state
interface PreferenceState {
  theme: string;
}

// Define the initial state using that type
const initialState: PreferenceState = {
  theme: APP_THEME.DARK
};

export const preferencesSlice = createSlice({
  name: 'preferences',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    hydratePreferences(state: any, action: any) {
      state.theme = action.payload.theme;
    },
    toggleTheme(state: any) {
      state.theme = state.theme === APP_THEME.DARK ? APP_THEME.LIGHT : state.theme = APP_THEME.DARK;
    }
  },
});

export const { hydratePreferences, toggleTheme } = preferencesSlice.actions;

export default preferencesSlice.reducer;
