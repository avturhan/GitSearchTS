import React, { useState, useEffect } from "react";
import "./App.scss";
import Table from "./components/Table/Table";
import Header from "./components/Header/Header";
import Pagination from "./components/Pagination/Pagination";
import RepoDetails from "./components/RepoDetails/RepoDetails";
import { fetchRepositories } from "./components/api";
import { Repo } from "./Types";

function App() {
  const [repositories, setRepositories] = useState<Repo[]>([]);
  const [selectedRepo, setSelectedRepo] = useState<Repo | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number | "all">(10);
  const [panelWidth, setPanelWidth] = useState<number>(700);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

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

  const handleRepoSelect = (repo: Repo) => setSelectedRepo(repo);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setHasSearched(true);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => setCurrentPage(newPage);

  const handleRowsPerPageChange = (newRowsPerPage: number | "all") => {
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(1);
  };

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

  const totalRows = repositories.length;

  return (
    <div className="App">
      <Header onSearchChange={handleSearchChange} />
      <div className="main-content">
        {hasSearched && searchQuery ? (
          <div className="content-area">
            <div className="table-section">
              <Table
                data={repositories}
                onRepoSelect={handleRepoSelect}
                currentPage={currentPage}
                rowsPerPage={rowsPerPage as number}
              />
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
