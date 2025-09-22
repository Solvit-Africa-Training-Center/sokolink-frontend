import { configureStore } from "@reduxjs/toolkit";
import { sokoLinkApi } from "../services/api/sokoLinkApi"; // ✅ make sure the name matches
import authReducer from "../slices/authSlice";

export const store = configureStore({
  reducer: {
    [sokoLinkApi.reducerPath]: sokoLinkApi.reducer, // ✅ correct reducerPath
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sokoLinkApi.middleware), // ✅ add RTK Query middleware
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
