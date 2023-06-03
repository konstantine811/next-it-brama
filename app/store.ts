import { configureStore } from "@reduxjs/toolkit";
import cursorReducer from "@/slices/cursorSlices";

export const store = configureStore({
  reducer: {
    onHover: cursorReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
