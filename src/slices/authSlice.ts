import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// Define User type according to your API response
interface User {
  id?: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Helper functions to read/write from localStorage
const loadAuthData = () => {
  try {
    const serializedState = localStorage.getItem('adminAuthData');
    if (!serializedState) {
      return { user: null, token: null };
    }
    return JSON.parse(serializedState) as { user: User | null; token: string | null };
  } catch {
    return { user: null, token: null };
  }
};

const saveAuthData = (authData: { user: User | null; token: string | null }) => {
  try {
    localStorage.setItem('adminAuthData', JSON.stringify(authData));
  } catch {
    // ignore errors
  }
};

const loadedData = loadAuthData();

const initialState: AuthState = {
  user: loadedData.user,
  token: loadedData.token,
  isAuthenticated: !!loadedData.token,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.error = null;

      saveAuthData({ user: action.payload.user, token: action.payload.token });
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
        localStorage.clear()
      ;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { setCredentials, logout, setLoading, setError, clearError } = authSlice.actions;
export default authSlice.reducer;

// Selector
export const selectCurrentUser = (state: { auth: AuthState }) => state.auth;
