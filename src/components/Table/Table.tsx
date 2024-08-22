import React, { useState, useEffect, useMemo } from "react";
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
  const [searchQuery, setSearchQuery] = useState<string>(""); // Состояние для строки поиска
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "name",
    direction: "ascending",
  });
  const [isReversed, setIsReversed] = useState<boolean>(false);
  const [filteredData, setFilteredData] = useState<Repo[]>(data); // Для хранения фильтрованных данных

  // Эффект для фильтрации данных при изменении searchQuery или data
  useEffect(() => {
    const filtered = data.filter((repo) => {
      const searchInForks = repo.forks.toString().includes(searchQuery);
      const searchInStars = repo.stars.toString().includes(searchQuery);
      return (
        repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (repo.language &&
          repo.language.toLowerCase().includes(searchQuery.toLowerCase())) ||
        searchInForks ||
        searchInStars
      );
    });
    setFilteredData(filtered); // Обновляем отфильтрованные данные
  }, [searchQuery, data]);

  // Обработчик ввода в поле поиска
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Мемоизация отсортированных данных
  const sortedData = useMemo(() => {
    let sortableData = [...filteredData];
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
  }, [filteredData, sortConfig]);

  // Обработчик изменения сортировки
  const handleSort = (key: keyof Repo) => {
    let direction: "ascending" | "descending" = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // Обработчик реверса порядка строк
  const handleReverse = () => {
    setIsReversed(!isReversed);
  };

  // Определение индексов для текущей страницы
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  // Срез данных для текущей страницы
  const pageData = sortedData.slice(startIndex, endIndex);

  // Инвертируем порядок строк, если включен режим реверса
  const displayedData = isReversed ? pageData.reverse() : pageData;

  return (
    <div className="table-container">
      <div className="table-search">
        {/* Поле ввода для поиска */}
        <input
          type="text"
          placeholder="Поиск в таблице..."
          value={searchQuery}
          onChange={handleSearchChange} // Обновление состояния searchQuery при изменении
        />
      </div>

      {/* Заголовок результатов поиска, если filteredData не пуст */}
      {filteredData.length > 0 && (
        <h2 className="results-header">Результаты поиска</h2>
      )}

      <table className="repository-table">
        <thead>
          <tr>
            {/* Заголовки таблицы с обработчиками сортировки и реверса */}
            <th onClick={handleReverse}>№</th>
            <th onClick={() => handleSort("name")}>Название</th>
            <th onClick={() => handleSort("language")}>Язык</th>
            <th onClick={() => handleSort("forks")}>Число форков</th>
            <th onClick={() => handleSort("stars")}>Число звезд</th>
            <th onClick={() => handleSort("updated")}>Дата обновления</th>
          </tr>
        </thead>
        <tbody>
          {/* Строки таблицы с данными репозиториев */}
          {displayedData.map((repo, index) => (
            <tr key={repo.id} onClick={() => onRepoSelect(repo)}>
              {/* Номер строки */}
              <td>{isReversed ? endIndex - index : startIndex + index + 1}</td>
              {/* Имя репозитория */}
              <td>{repo.name}</td>
              {/* Язык программирования репозитория */}
              <td>{repo.language || "Не указан"}</td>
              {/* Число форков */}
              <td>{repo.forks}</td>
              {/* Число звезд */}
              <td>{repo.stars}</td>
              {/* Дата последнего обновления */}
              <td>{repo.updated}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
