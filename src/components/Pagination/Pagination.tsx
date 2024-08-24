import React from "react";
import { useDispatch } from "react-redux";
import { setCurrentPage, setRowsPerPage } from "../../slices/searchParamsSlice";
import {
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";
import "./Pagination.scss"; // Сохраняем существующие стили

/**
 * Свойства компонента Pagination.
 */
interface PaginationProps {
  /**
   * Количество строк на одной странице или "all" для отображения всех строк.
   */
  rowsPerPage: number | "all";

  /**
   * Общее количество строк данных.
   */
  totalRows: number;

  /**
   * Текущая страница.
   */
  currentPage: number;

  /**
   * Функция для изменения текущей страницы.
   * @param newPage - Номер новой страницы
   */
  onPageChange: (newPage: number) => void;

  /**
   * Функция для изменения количества строк на странице.
   * @param newRowsPerPage - Новое количество строк на странице или "all"
   */
  onRowsPerPageChange: (newRowsPerPage: number | "all") => void;
}

/**
 * Компонент Pagination для управления пагинацией.
 * @param props - Свойства компонента
 * @returns JSX элемент
 */
const Pagination: React.FC<PaginationProps> = ({
  rowsPerPage,
  totalRows,
  currentPage,
  onPageChange,
  onRowsPerPageChange,
}) => {
  const dispatch = useDispatch();
  
  // Вычисление общего количества страниц
  const totalPages = Math.ceil(
    totalRows / (rowsPerPage === "all" ? totalRows : rowsPerPage)
  );

  /**
   * Обработчик изменения количества строк на странице.
   * @param event - Событие изменения значения селекта
   */
  const handleRowsPerPageChange = (
    event: SelectChangeEvent<number | "all">
  ) => {
    const value = event.target.value as number | "all";
    dispatch(setRowsPerPage(value));
    dispatch(setCurrentPage(1));
    onRowsPerPageChange(value);
  };

  return (
    <div className="pagination-container">
      <div className="rows-per-page">
        <FormControl fullWidth>
          <Select
            labelId="rows-per-page-select-label"
            id="rows-per-page-select"
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
            className="rows-per-page-select"
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={30}>30</MenuItem>
            <MenuItem value={50}>50</MenuItem>
            <MenuItem value={75}>75</MenuItem>
            <MenuItem value={100}>100</MenuItem>
            <MenuItem value="all"></MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

export default Pagination;
