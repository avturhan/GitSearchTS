// Импортируем интерфейсы
import { PaginationProps } from "../../Types";
import "./Pagination.scss";

const Pagination: React.FC<PaginationProps> = ({
  rowsPerPage,
  totalRows,
  currentPage,
  onPageChange,
  onRowsPerPageChange,
}) => {
  const totalPages =
    rowsPerPage === "all" ? 1 : Math.ceil(totalRows / rowsPerPage);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  return (
    <div className="pagination-container">
      <div className="rows-per-page">
        <label>Rows per page: </label>
        <select
          value={rowsPerPage}
          onChange={(e) => onRowsPerPageChange(Number(e.target.value) || "all")}
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
          <option value="all">All</option>
        </select>
      </div>
      <div className="page-info">
        {rowsPerPage === "all"
          ? `1-${totalRows} of ${totalRows}`
          : `${rowsPerPage * (currentPage - 1) + 1}-${Math.min(
              rowsPerPage * currentPage,
              totalRows
            )} of ${totalRows}`}
      </div>
    </div>
  );
};

export default Pagination;
