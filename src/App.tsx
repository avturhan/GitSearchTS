import React, { useState, useEffect } from "react";
import "./App.scss";
import Table from "./components/Table/Table";
import Header from "./components/Header/Header";
import Pagination from "./components/Pagination/Pagination";
import RepoDetails from "./components/RepoDetails/RepoDetails";
import { fetchRepositories } from "./components/api";
import { Repo } from "./components/Types";

/**
 * Главный компонент приложения.
 */
function App() {
  // Список репозиториев
  const [repositories, setRepositories] = useState<Repo[]>([]);
  // Выбранный репозиторий для показа деталей
  const [selectedRepo, setSelectedRepo] = useState<Repo | null>(null);
  // Запрос для поиска репозиториев
  const [searchQuery, setSearchQuery] = useState<string>("");
  // Текущая страница пагинации
  const [currentPage, setCurrentPage] = useState<number>(1);
  // Количество строк на странице
  const [rowsPerPage, setRowsPerPage] = useState<number | "all">(10);
  // Ширина панели для отображения деталей репозитория
  const [panelWidth, setPanelWidth] = useState<number>(700);
  // Флаг, указывающий, был ли выполнен поиск
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  /**
   * Эффект для загрузки репозиториев при изменении параметров поиска или пагинации.
   */
  useEffect(() => {
    if (searchQuery) {
      const fetchData = async () => {
        try {
          const data = await fetchRepositories(
            searchQuery,
            rowsPerPage === "all" ? 100 : rowsPerPage,
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

  /**
   * Обработчик выбора репозитория.
   * @param repo - Выбранный репозиторий
   */
  const handleRepoSelect = (repo: Repo) => setSelectedRepo(repo);

  /**
   * Обработчик изменения поискового запроса.
   * @param query - Новый поисковый запрос
   */
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setHasSearched(true);
    setCurrentPage(1);
  };

  /**
   * Обработчик изменения страницы.
   * @param newPage - Новая страница
   */
  const handlePageChange = (newPage: number) => setCurrentPage(newPage);

  /**
   * Обработчик изменения количества строк на странице.
   * @param newRowsPerPage - Новое количество строк на странице
   */
  const handleRowsPerPageChange = (newRowsPerPage: number | "all") => {
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(1);
  };

  /**
   * Обработчик начала изменения размера панели.
   * @param e - Событие мыши
   */
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    const handleMouseMove = (e: MouseEvent) => {
      const newWidth =
        e.clientX -
        (document.querySelector(".content-area")?.getBoundingClientRect()
          .left || 0);
      if (newWidth >= 0) setPanelWidth(newWidth);
    };
    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  // Общее количество строк в таблице
  const totalRows = repositories.length;

  return (
    <div className="App">
      <Header onSearchChange={handleSearchChange} />
      <div className="main-content">
        {hasSearched && searchQuery ? (
          <div className="content-area">
            <div className="table-section">
              <div className="table-container">
                <Table
                  data={repositories}
                  onRepoSelect={handleRepoSelect}
                  currentPage={currentPage}
                  rowsPerPage={rowsPerPage as number}
                  searchQuery={searchQuery} // Добавьте этот пропс
                />
              </div>
              <Pagination
                rowsPerPage={rowsPerPage}
                totalRows={totalRows}
                currentPage={currentPage}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
              />
            </div>
            <div
              className="ResizablePanel"
              style={{ width: `${panelWidth}px` }}
            >
              <div className="resizer" onMouseDown={handleMouseDown} />
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
