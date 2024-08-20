// Импортируем необходимые библиотеки React
import React, { useMemo } from "react";
// Импортируем тип Repo из унифицированных типов
import { Repo } from "../../Types";
// Импортируем стили
import "./Table.scss";

// Определяем типы пропсов для компонента Table
interface TableProps {
  data: Repo[];
  searchQuery: string;
  onRepoSelect: (repo: Repo) => void;
  currentPage: number;
  rowsPerPage: number;
}

// Определяем тип для конфигурации сортировки
interface SortConfig {
  key: keyof Repo;
  direction: "ascending" | "descending";
}

// Компонент Table
const Table: React.FC<TableProps> = ({
  data,
  onRepoSelect,
  searchQuery,
  currentPage,
  rowsPerPage,
}) => {
  const [sortConfig, setSortConfig] = React.useState<SortConfig>({
    key: "name",
    direction: "ascending",
  });
  const [isReversed, setIsReversed] = React.useState<boolean>(false);

  // Сортировка данных
  const sortedData = useMemo(() => {
    let sortableData = [...data];
    if (sortConfig) {
      sortableData.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue === undefined || bValue === undefined) {
          return 0;
        }

        if (aValue < bValue) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [data, sortConfig]);

  // Обработчик изменения сортировки
  const handleSort = (key: keyof Repo) => {
    let direction: "ascending" | "descending" = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // Определение индексов для текущей страницы
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const pageData = sortedData.slice(startIndex, endIndex);
  const displayedData = isReversed ? pageData.reverse() : pageData;

  // Обработчик переворачивания данных
  const handleReverse = () => {
    setIsReversed(!isReversed);
  };

  return (
    <div className="table-container">
      <table className="repository-table">
        <thead>
          <tr>
            <th onClick={handleReverse}>№</th>
            <th onClick={() => handleSort("name")}>Название</th>
            <th onClick={() => handleSort("language")}>Язык</th>
            <th onClick={() => handleSort("forks")}>Число форков</th>
            <th onClick={() => handleSort("stars")}>Число звезд</th>
            <th onClick={() => handleSort("updated")}>Дата обновления</th>
          </tr>
        </thead>
        <tbody>
          {displayedData.map((repo, index) => (
            <tr key={repo.id} onClick={() => onRepoSelect(repo)}>
              <td>{isReversed ? endIndex - index : startIndex + index + 1}</td>
              <td>{repo.name}</td>
              <td>{repo.language || "Не указан"}</td>
              <td>{repo.forks}</td>
              <td>{repo.stars}</td>
              <td>{repo.updated}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
