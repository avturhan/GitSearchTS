import React, { useState, useMemo } from "react";
import { Repo } from "../../Types";
import "./Table.scss";

interface TableProps {
  data: Repo[];
  onRepoSelect: (repo: Repo) => void;
  currentPage: number;
  rowsPerPage: number;
}

interface SortConfig {
  key: keyof Repo;
  direction: "ascending" | "descending";
}

const Table: React.FC<TableProps> = ({
  data,
  onRepoSelect,
  currentPage,
  rowsPerPage,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "name",
    direction: "ascending",
  });
  const [isReversed, setIsReversed] = useState<boolean>(false);

  // Фильтрация данных по поисковому запросу
  const filteredData = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return data.filter(
      (repo) =>
        repo.name.toLowerCase().includes(query) ||
        (repo.language && repo.language.toLowerCase().includes(query)) ||
        repo.forks.toString().includes(query) ||
        repo.stars.toString().includes(query)
    );
  }, [searchQuery, data]);

  // Сортировка данных
  const sortedData = useMemo(() => {
    const { key, direction } = sortConfig;
    const sorted = [...filteredData].sort((a, b) => {
      const aValue = a[key];
      const bValue = b[key];

      if (aValue < bValue) return direction === "ascending" ? -1 : 1;
      if (aValue > bValue) return direction === "ascending" ? 1 : -1;
      return 0;
    });
    return isReversed ? sorted.reverse() : sorted;
  }, [filteredData, sortConfig, isReversed]);

  // Определение данных для текущей страницы
  const startIndex = (currentPage - 1) * rowsPerPage;
  const pageData = sortedData.slice(startIndex, startIndex + rowsPerPage);

  // Обработчики событий
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSort = (key: keyof Repo) => {
    setSortConfig((prevConfig) => ({
      key,
      direction:
        prevConfig.key === key && prevConfig.direction === "ascending"
          ? "descending"
          : "ascending",
    }));
  };

  const handleReverse = () => {
    setIsReversed((prev) => !prev);
  };

  // Рендеринг заголовков таблицы
  const renderTableHeaders = () => (
    <tr>
      <th onClick={handleReverse}>№</th>
      {["name", "language", "forks", "stars", "updated"].map((key) => (
        <th key={key} onClick={() => handleSort(key as keyof Repo)}>
          {key.charAt(0).toUpperCase() + key.slice(1)}
        </th>
      ))}
    </tr>
  );

  // Рендеринг строк таблицы
  const renderTableRows = () =>
    pageData.map((repo, index) => (
      <tr key={repo.id} onClick={() => onRepoSelect(repo)}>
        <td>
          {isReversed
            ? startIndex + pageData.length - index
            : startIndex + index + 1}
        </td>
        <td>{repo.name}</td>
        <td>{repo.language || "Не указан"}</td>
        <td>{repo.forks}</td>
        <td>{repo.stars}</td>
        <td>{repo.updated}</td>
      </tr>
    ));

  return (
    <div className="table-container">
      <div className="table-search">
        <input
          type="text"
          placeholder="Поиск в таблице..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      {filteredData.length > 0 && (
        <h2 className="results-header">Результаты поиска</h2>
      )}

      <table className="repository-table">
        <thead>{renderTableHeaders()}</thead>
        <tbody>{renderTableRows()}</tbody>
      </table>
    </div>
  );
};

export default Table;
