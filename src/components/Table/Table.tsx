import React, { useState, useMemo } from "react";
import { Repo, TableProps } from "../Types";
import {
  Table as MUITable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Input,
} from "@mui/material";
import "./Table.scss";

// Определите собственный тип для SortConfig
interface SortConfig {
  key: keyof Repo;
  direction: "asc" | "desc";
}

const Table: React.FC<TableProps> = ({
  data,
  onRepoSelect,
  currentPage,
  rowsPerPage,
  searchQuery,
}) => {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "name",
    direction: "asc",
  });
  const [isReversed, setIsReversed] = useState<boolean>(false);
  const [tableSearchQuery, setTableSearchQuery] = useState<string>("");

  // Фильтрация данных по поисковому запросу таблицы
  const filteredData = useMemo(() => {
    const query = tableSearchQuery.toLowerCase();
    return data.filter(
      (repo: Repo) =>
        repo.name.toLowerCase().includes(query) ||
        (repo.language && repo.language.toLowerCase().includes(query)) ||
        repo.forks.toString().includes(query) ||
        repo.stars.toString().includes(query)
    );
  }, [tableSearchQuery, data]);

  // Сортировка данных
  const sortedData = useMemo(() => {
    const { key, direction } = sortConfig;
    const sorted = [...filteredData].sort((a, b) => {
      const aValue = a[key];
      const bValue = b[key];

      if (aValue === undefined || bValue === undefined) {
        return 0;
      }

      if (typeof aValue === "string" && typeof bValue === "string") {
        return direction === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === "number" && typeof bValue === "number") {
        return direction === "asc" ? aValue - bValue : bValue - aValue;
      }

      return 0;
    });

    return isReversed ? sorted.reverse() : sorted;
  }, [filteredData, sortConfig, isReversed]);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = useMemo(() => {
    return sortedData.slice(startIndex, startIndex + rowsPerPage);
  }, [sortedData, currentPage, rowsPerPage]);

  const handleTableSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTableSearchQuery(e.target.value);
  };

  const handleSort = (key: keyof Repo) => {
    setSortConfig((prevConfig) => ({
      key,
      direction:
        prevConfig.key === key && prevConfig.direction === "asc"
          ? "desc"
          : "asc",
    }));
    setIsReversed(false);
  };

  const handleReverse = () => {
    setIsReversed((prev) => !prev);
  };

  const renderTableHeaders = () => (
    <TableHead>
      <TableRow>
        <TableCell onClick={handleReverse}>№ {isReversed ? "" : ""}</TableCell>
        {["name", "language", "forks", "stars", "updated"].map((key) => (
          <TableCell
            key={key}
            sortDirection={
              sortConfig.key === key ? sortConfig.direction : undefined
            }
          >
            <TableSortLabel
              active={sortConfig.key === key}
              direction={sortConfig.key === key ? sortConfig.direction : "asc"}
              onClick={() => handleSort(key as keyof Repo)}
            >
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );

  // Рендеринг строк таблицы
  const renderTableRows = () =>
    paginatedData.map((repo) => (
      <TableRow key={repo.id} onClick={() => onRepoSelect(repo)}>
        <TableCell>
          {isReversed
            ? startIndex + paginatedData.length - paginatedData.indexOf(repo)
            : startIndex + paginatedData.indexOf(repo) + 1}
        </TableCell>
        <TableCell>{repo.name}</TableCell>
        <TableCell>{repo.language || "Не указан"}</TableCell>
        <TableCell>{repo.forks}</TableCell>
        <TableCell>{repo.stars}</TableCell>
        <TableCell>{repo.updated}</TableCell>
      </TableRow>
    ));

  return (
    <div className="table-container">
      <div className="table-search">
        <Input
          type="text"
          placeholder="Поиск в таблице..."
          value={tableSearchQuery}
          onChange={handleTableSearchChange}
        />
      </div>

      {filteredData.length > 0 && (
        <h2 className="results-header">Результаты поиска</h2>
      )}

      <TableContainer>
        <MUITable>
          {renderTableHeaders()}
          <TableBody>{renderTableRows()}</TableBody>
        </MUITable>
      </TableContainer>
    </div>
  );
};

export default Table;
