// src/slices/searchParamsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchParamsState {
  searchQuery: string;
  currentPage: number;
  rowsPerPage: number | "all";
}

const initialState: SearchParamsState = {
  searchQuery: '',
  currentPage: 1,
  rowsPerPage: 10,
};

const searchParamsSlice = createSlice({
  name: 'searchParams',
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setRowsPerPage(state, action: PayloadAction<number | "all">) {
      state.rowsPerPage = action.payload;
    },
  },
});

export const { setSearchQuery, setCurrentPage, setRowsPerPage } = searchParamsSlice.actions;
export default searchParamsSlice.reducer;
