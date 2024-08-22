import React from "react";
import { PaginationProps } from "../../Types";
import "./Pagination.scss";

const Pagination: React.FC<PaginationProps> = ({
  rowsPerPage,
  totalRows,
  currentPage,
  onRowsPerPageChange,
}) => {
  // Обработка изменения количества строк на странице
  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Number(e.target.value);
    onRowsPerPageChange(value);
  };

  // Приведение rowsPerPage к числу с значением по умолчанию
  const rowsPerPageNumber = typeof rowsPerPage === "number" ? rowsPerPage : 10;

  // Форматирование информации о текущей странице
  const pageInfo = `${rowsPerPageNumber * (currentPage - 1) + 1}-${Math.min(
    rowsPerPageNumber * currentPage,
    totalRows
  )} of ${totalRows}`;

  return (
    <div className="pagination-container">
      <div className="rows-per-page">
        <label htmlFor="rows-per-page-select">Rows per page:</label>
        <select
          id="rows-per-page-select"
          value={rowsPerPageNumber}
          onChange={handleRowsPerPageChange}
        >
          {[10, 20, 50, 100].map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>
      <div className="page-info">{pageInfo}</div>
    </div>
  );
};

export default Pagination;
