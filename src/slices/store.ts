// src/slices/store.ts
import { configureStore } from "@reduxjs/toolkit";
import repositoriesReducer from "./repositoriesSlice";
import selectedRepoReducer from "./selectedRepoSlice";
import searchParamsReducer from "./searchParamsSlice";
import uiReducer from "./uiSlice"; // Импортируйте uiSlice

export const store = configureStore({
  reducer: {
    repositories: repositoriesReducer,
    selectedRepo: selectedRepoReducer,
    searchParams: searchParamsReducer,
    ui: uiReducer, // Добавьте uiSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
