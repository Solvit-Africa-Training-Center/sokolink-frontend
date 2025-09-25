// src/store/slices/retailerAuthSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

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

const loadAuthData = () => {
  try {
    const serializedState = localStorage.getItem('retailerAuthData');
    if (!serializedState) return { user: null, token: null };
    return JSON.parse(serializedState) as { user: User | null; token: string | null };
  } catch {
    return { user: null, token: null };
  }
};

const saveAuthData = (authData: { user: User | null; token: string | null }) => {
  try {
    localStorage.setItem('retailerAuthData', JSON.stringify(authData));
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

const retailerAuthSlice = createSlice({
  name: 'retailerAuth',
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
      localStorage.removeItem("retailerAuthData");
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

export const { setCredentials, logout, setLoading, setError, clearError } = retailerAuthSlice.actions;
export default retailerAuthSlice.reducer;

export const selectCurrentRetailer = (state: { retailerAuth: AuthState }) => state.retailerAuth;