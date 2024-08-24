// src/types.ts

export interface Repo {
  id: number;
  name: string;
  language?: string;
  forks: number;
  stars: number;
  updated: string;
  created_at: string;
  commits: number;
  owner: {
    login: string;
    avatar_url: string;
  };
  license?: {
    name: string;
  };
  description?: string;
  html_url: string;
  tags: string[];
}

export interface TableProps {
  data: Repo[];
  searchQuery: string;
  onRepoSelect: (repo: Repo) => void;
  currentPage: number;
  rowsPerPage: number;
}

export interface RepoDetailsProps {
  repo: Repo | null;
}

export interface RepoFilterProps {
  languages: string[];
  onLanguageSelect: (language: string) => void;
}
 export interface SortConfig {
  key: keyof Repo;
  direction: "asc" | "desc"; // Обновите типы на "asc" | "desc"
}
