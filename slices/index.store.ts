import { configureStore } from "@reduxjs/toolkit";
//
import cursorReducer from "@/slices/cursorSlices";
import commonReducer from "@/slices/commonSlice";

export const store = configureStore({
  reducer: {
    onHover: cursorReducer,
    onCommon: commonReducer,
  },
});
