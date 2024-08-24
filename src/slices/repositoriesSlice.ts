// src/slices/repositorySlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Repo } from "../components/Types";
import { fetchRepositories } from "../components/api";

interface RepositoryState {
  repositories: Repo[];
  status: "idle" | "loading" | "failed";
}

const initialState: RepositoryState = {
  repositories: [],
  status: "idle",
};

// src/slices/repositorySlice.ts
export const fetchRepositoriesAsync = createAsyncThunk(
  "repositories/fetchRepositories",
  async ({
    query,
    rowsPerPage,
    currentPage,
  }: {
    query: string;
    rowsPerPage: number | "all";
    currentPage: number;
  }) => {
    // Преобразование 'all' в подходящий формат, если необходимо
    const convertedRowsPerPage =
      rowsPerPage === "all" ? undefined : rowsPerPage;
    const response = await fetchRepositories(
      query,
      convertedRowsPerPage,
      currentPage
    );
    return response;
  }
);

const repositorySlice = createSlice({
  name: "repositories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRepositoriesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRepositoriesAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.repositories = action.payload;
      })
      .addCase(fetchRepositoriesAsync.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default repositorySlice.reducer;
