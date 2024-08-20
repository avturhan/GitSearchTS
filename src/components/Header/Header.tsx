// Импортируем необходимые библиотеки React
import React, { useState, ChangeEvent, KeyboardEvent } from "react";
// Импортируем стили
import "./Header.scss";

// Определяем типы пропсов для компонента Header
interface HeaderProps {
  onSearchChange: (query: string) => void;
}

// Функция-компонент для заголовка, принимающая пропс onSearchChange
const Header: React.FC<HeaderProps> = ({ onSearchChange }) => {
  // Используем хук useState для хранения значения поискового запроса
  const [query, setQuery] = useState<string>("");

  // Обработчик изменения ввода, обновляет состояние query
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  // Обработчик нажатия кнопки поиска, вызывает функцию поиска
  const handleSearch = () => {
    onSearchChange(query);
  };

  // Обработчик нажатия клавиш, выполняет поиск при нажатии Enter
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Предотвращаем возможное действие по умолчанию
      handleSearch(); // Вызов функции поиска при нажатии Enter
    }
  };

  // Рендеринг компонента заголовка с поисковым вводом и кнопкой
  return (
    <div className="HeaderSearch">
      <div className="HeaderSearchContent">
        {/* Поле ввода для поискового запроса */}
        <input
          className="HeaderInput"
          type="text"
          placeholder="Введите поисковый запрос"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown} // Добавляем обработчик нажатия клавиш
        />
        {/* Кнопка для выполнения поиска */}
        <button className="HeaderButton" onClick={handleSearch}>
          <span className="ButtonSpan">ИСКАТЬ</span>
        </button>
      </div>
      {/* Здесь можно добавить код для отображения результатов поиска */}
    </div>
  );
};

// Экспортируем компонент Header по умолчанию
export default Header;
