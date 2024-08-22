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
    const value = e.target.value;
    onRowsPerPageChange(value === "all" ? "all" : Number(value));
  };

  // Форматирование информации о текущей странице
  const pageInfo =
    rowsPerPage === "all"
      ? `1-${totalRows} of ${totalRows}`
      : `${rowsPerPage * (currentPage - 1) + 1}-${Math.min(rowsPerPage * currentPage, totalRows)} of ${totalRows}`;

  return (
    <div className="pagination-container">
      <div className="rows-per-page">
        <label htmlFor="rows-per-page-select">Rows per page:</label>
        <select
          id="rows-per-page-select"
          value={rowsPerPage}
          onChange={handleRowsPerPageChange}
        >
          {[10, 20, 50, 100, "all"].map((value) => (
            <option key={value} value={value}>
              {value === "all" ? "All" : value}
            </option>
          ))}
        </select>
      </div>
      <div className="page-info">{pageInfo}</div>
    </div>
  );
};

export default Pagination;
