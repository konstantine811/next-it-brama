import { RootState } from "@/app/store";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface CursorState {
  isHover: boolean;
}

const initialState: CursorState = {
  isHover: false,
};

export const cursorSlice = createSlice({
  name: "cursor",
  initialState,
  reducers: {
    onHover: (state, action: PayloadAction<boolean>) => {
      state.isHover = action.payload;
    },
  },
});

export const { onHover } = cursorSlice.actions;

export const onHoverState = (state: RootState) => state.onHover.isHover;

export default cursorSlice.reducer;
