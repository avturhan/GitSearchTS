// Определение интерфейса для репозитория
// Пример интерфейса Repo
export interface Repo {
  id: string; // Добавьте идентификатор, если он нужен
  name: string;
  language: string;
  forks: number;
  stars: number;
  updated: string;
  created_at: string;
  commits: number;
  owner: {
    login: string;
    avatar_url: string;
  };
  license: {
    name: string;
  };
  description: string;
  html_url: string;
  tags: string[];
}

// Определение интерфейса для данных о коммитах
export interface Commit {
  sha: string;
  commit: {
    author: {
      name: string;
      date: string;
    };
  };
}

// Определение интерфейса для данных о репозиториях, возвращаемых GitHub API
export interface RepositoryResponse {
  items: Array<{
    name: string;
    language: string;
    forks_count: number;
    stargazers_count: number;
    updated_at: string;
    created_at: string;
    full_name: string;
    owner: {
      login: string;
      avatar_url: string;
    };
    license?: {
      name: string;
    };
    description?: string;
    html_url: string;
    topics: string[];
  }>;
}

// Определение интерфейса для пропсов компонента Table
export interface TableProps {
  data: Repo[];
  searchQuery: string;
  onRepoSelect: (repo: Repo) => void;
  currentPage: number;
  rowsPerPage: number;
}

// Определение интерфейса для пропсов компонента Pagination
export interface PaginationProps {
  rowsPerPage: number | "all";
  totalRows: number;
  currentPage: number;
  onPageChange: (newPage: number) => void;
  onRowsPerPageChange: (newRowsPerPage: number | "all") => void;
}

// Определение интерфейса для пропсов компонента RepoDetails
export interface RepoDetailsProps {
  repo: Repo | null;
}

// Определение интерфейса для пропсов компонента Header
export interface HeaderProps {
  onSearchChange: (query: string) => void;
}
