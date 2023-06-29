import { RootState } from "@/app/store";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface CommonState {
  headerHeight: number;
}

const initialState: CommonState = {
  headerHeight: 0,
};

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    onChangeHeaderHeight: (state, action: PayloadAction<number>) => {
      state.headerHeight = action.payload;
    },
  },
});

export const { onChangeHeaderHeight } = commonSlice.actions;

export const onHeaderHeightState = (state: RootState) =>
  state.onCommon.headerHeight;

export default commonSlice.reducer;
