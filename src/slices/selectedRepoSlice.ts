// src/slices/selectedRepoSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { Repo } from "../components/Types";

interface SelectedRepoState {
  repo: Repo | null; // Может быть null, если репозиторий не выбран
}

const initialState: SelectedRepoState = {
  repo: null,
};

const selectedRepoSlice = createSlice({
  name: "selectedRepo",
  initialState,
  reducers: {
    setSelectedRepo(state, action) {
      state.repo = action.payload;
    },
  },
});

export const { setSelectedRepo } = selectedRepoSlice.actions;
export default selectedRepoSlice.reducer;
