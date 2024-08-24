// src/slices/uiSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  panelWidth: number;
  hasSearched: boolean;
}

const initialState: UiState = {
  panelWidth: 700,
  hasSearched: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setPanelWidth(state, action: PayloadAction<number>) {
      state.panelWidth = action.payload;
    },
    setHasSearched(state, action: PayloadAction<boolean>) {
      state.hasSearched = action.payload;
    },
  },
});

export const { setPanelWidth, setHasSearched } = uiSlice.actions;
export default uiSlice.reducer;
