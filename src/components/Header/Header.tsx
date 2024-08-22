import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import "./Header.scss";

// Типы пропсов для компонента Header
interface HeaderProps {
  onSearchChange: (query: string) => void;
}

// Компонент Header
const Header: React.FC<HeaderProps> = ({ onSearchChange }) => {
  const [query, setQuery] = useState<string>("");

  // Обработчик изменения ввода
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  // Обработчик кнопки поиска
  const handleSearch = () => {
    onSearchChange(query);
  };

  // Обработчик нажатия клавиши Enter
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearch();
    }
  };

  return (
    <header className="header">
      <div className="header-content">
        <input
          className="header-input"
          type="text"
          placeholder="Введите поисковый запрос"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <button className="header-button" onClick={handleSearch}>
          <span className="button-text">ИСКАТЬ</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
