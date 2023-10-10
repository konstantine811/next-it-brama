import { configureStore } from "@reduxjs/toolkit";
//
import cursorReducer from "@/src/store/slices/cursorSlices";
import commonReducer from "@/src/store/slices/commonSlice";

export const store = configureStore({
  reducer: {
    onHover: cursorReducer,
    onCommon: commonReducer,
  },
});
