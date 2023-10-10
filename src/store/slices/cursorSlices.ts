import { RootState } from "@/src/store/store";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface CursorState {
  isHover: boolean;
  sizeHoverElement: number;
  centerHoverElment: number;
}

const initialState: CursorState = {
  isHover: false,
  sizeHoverElement: 0,
  centerHoverElment: 0,
};

export const cursorSlice = createSlice({
  name: "cursor",
  initialState,
  reducers: {
    onHover: (state, action: PayloadAction<boolean>) => {
      state.isHover = action.payload;
    },
    onSizeHoverElement: (state, action: PayloadAction<number>) => {
      state.sizeHoverElement = action.payload;
    },
    onCenterHoverElement: (state, action: PayloadAction<number>) => {
      state.centerHoverElment = action.payload;
    },
  },
});

export const { onHover, onSizeHoverElement, onCenterHoverElement } =
  cursorSlice.actions;

export const onHoverState = (state: RootState) => state.onHover.isHover;
export const onSizeHoverState = (state: RootState) =>
  state.onHover.sizeHoverElement;
export const onCenterHoverState = (state: RootState) =>
  state.onHover.centerHoverElment;

export default cursorSlice.reducer;
