import React, { useState, useEffect } from "react";
import "./App.scss";
import Table from "./components/Table/Table";
import Header from "./components/Header/Header";
import Pagination from "./components/Pagination/Pagination";
import RepoDetails from "./components/RepoDetails/RepoDetails";
import { fetchRepositories } from "./components/api";
import { Repo } from "./Types";

// Типы для пропсов Pagination
interface PaginationProps {
  rowsPerPage: number | "all";
  totalRows: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rowsPerPage: number | "all") => void;
}

// Типы для пропсов Table
interface TableProps {
  data: Repo[];
  onRepoSelect: (repo: Repo) => void;
  searchQuery: string;
  currentPage: number;
  rowsPerPage: number;
}

// Типы для пропсов RepoDetails
interface RepoDetailsProps {
  repo: Repo | null;
}

function App() {
  // Определение состояния для списка репозиториев
  const [repositories, setRepositories] = useState<Repo[]>([]);
  // Определение состояния для выбранного репозитория
  const [selectedRepo, setSelectedRepo] = useState<Repo | null>(null);
  // Определение состояния для строки поиска
  const [searchQuery, setSearchQuery] = useState<string>("");
  // Определение состояния для флага, указывающего, был ли выполнен поиск
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  // Определение состояния для текущей страницы
  const [currentPage, setCurrentPage] = useState<number>(1);
  // Определение состояния для количества строк на странице
  const [rowsPerPage, setRowsPerPage] = useState<number | "all">(30); // По умолчанию 30
  // Определение состояния для ширины панели
  const [panelWidth, setPanelWidth] = useState<number>(700); // Начальная ширина панели

  // Эффект для получения данных репозиториев при изменении searchQuery, rowsPerPage или currentPage
  useEffect(() => {
    if (searchQuery) {
      const fetchData = async () => {
        try {
          const data = await fetchRepositories(
            searchQuery,
            rowsPerPage === "all" ? 100 : rowsPerPage, // Обрабатываем значение "all"
            currentPage
          );
          setRepositories(data);
        } catch (error) {
          console.error("Error fetching repositories:", error);
          setRepositories([]);
        }
      };
      fetchData();
    }
  }, [searchQuery, rowsPerPage, currentPage]);

  // Обработчик выбора репозитория
  const handleRepoSelect = (repo: Repo) => {
    setSelectedRepo(repo);
  };

  // Обработчик изменения строки поиска
  const handleSearchChange = async (query: string) => {
    setSearchQuery(query);
    setHasSearched(true);
    setCurrentPage(1); // Сброс на первую страницу при новом поиске
  };

  // Обработчик изменения страницы
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  // Обработчик изменения количества строк на странице
  const handleRowsPerPageChange = (newRowsPerPage: number | "all") => {
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(1); // Сброс на первую страницу при изменении количества строк на странице
  };

  // Обработчик нажатия мыши для изменения размера панели
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  // Обработчик перемещения мыши для изменения размера панели
  const handleMouseMove = (e: MouseEvent) => {
    const newWidth =
      e.clientX -
      document.querySelector(".content-area")!.getBoundingClientRect().left;
    // Убедитесь, что новая ширина не меньше 0
    if (newWidth >= 0) {
      setPanelWidth(newWidth);
    }
  };

  // Обработчик отпускания мыши после изменения размера панели
  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  // Вычисляем общее количество строк
  const totalRows = repositories.length; // Общее количество элементов, используйте длину ответа API

  // Рендеринг компонента
  return (
    <div className="App">
      {/* Компонент заголовка */}
      <Header onSearchChange={handleSearchChange} />
      <div className="main-content">
        {/* Проверка, был ли выполнен поиск и есть ли строка поиска */}
        {hasSearched && searchQuery ? (
          <div className="content-area">
            <div className="table-section">
              {/* Компонент таблицы */}
              <Table
                data={repositories}
                onRepoSelect={handleRepoSelect}
                searchQuery={searchQuery}
                currentPage={currentPage}
                rowsPerPage={rowsPerPage as number} // Приведение типа для Table
              />
              {/* Компонент пагинации */}
              <Pagination
                rowsPerPage={rowsPerPage}
                totalRows={totalRows}
                currentPage={currentPage}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
              />
            </div>
            <div
              className="resizable-panel"
              style={{ width: `${panelWidth}px` }}
            >
              {/* Область для изменения размера */}
              <div className="resizer" onMouseDown={handleMouseDown} />
              {/* Компонент деталей репозитория */}
              <RepoDetails repo={selectedRepo} />
            </div>
          </div>
        ) : (
          <div className="welcome-message">Добро пожаловать</div>
        )}
      </div>
    </div>
  );
}

export default App;
