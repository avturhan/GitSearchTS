import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "../../slices/searchParamsSlice";
import { TextField, Button } from "@mui/material";
import "./Header.scss";

/**
 * Свойства компонента Header.
 */
interface HeaderProps {
  /**
   * Функция для обработки изменения поискового запроса.
   * @param query - Поисковый запрос
   */
  onSearchChange: (query: string) => void;
}

/**
 * Компонент Header для ввода и отправки поискового запроса.
 * @param props - Свойства компонента
 * @returns JSX элемент
 */
const Header: React.FC<HeaderProps> = ({ onSearchChange }) => {
  // Локальное состояние для хранения значения инпута
  const [inputValue, setInputValue] = useState<string>("");
  const dispatch = useDispatch();

  /**
   * Обработчик изменения инпута.
   * @param event - Событие изменения инпута
   */
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  /**
   * Обработчик нажатия на кнопку поиска.
   */
  const handleSearchClick = () => {
    dispatch(setSearchQuery(inputValue)); // Обновляем поисковый запрос в глобальном хранилище
    onSearchChange(inputValue); // Вызываем родительский обработчик с текущим запросом
  };

  /**
   * Обработчик нажатия клавиш.
   * @param event - Событие нажатия клавиш
   */
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearchClick();
    }
  };

  return (
    <header className="header">
      <div className="header-content">
        <TextField
          variant="outlined"
          placeholder="Введите поисковый запрос..."
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          fullWidth
          InputProps={{
            className: "header-input",
          }}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleSearchClick}
          className="header-button"
        >
          ИСКАТЬ
        </Button>
      </div>
    </header>
  );
};

export default Header;
