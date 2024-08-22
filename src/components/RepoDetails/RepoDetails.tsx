import React from "react";
import { RepoDetailsProps } from "../../Types";
import "./RepoDetails.scss";

const RepoDetails: React.FC<RepoDetailsProps> = ({ repo }) => {
  if (!repo) {
    return (
      <div className="repo-details-placeholder">
        Выберите репозиторий для просмотра деталей.
      </div>
    );
  }

  // Функция для рендеринга информации о репозитории
  const renderRepoInfo = (label: string, value: string | undefined) => (
    <p className="repo-info">
      <strong>{label}:</strong> {value || "Не указана"}
    </p>
  );

  const tags = repo.tags || [];

  return (
    <div className="repo-details">
      <h2 className="repo-name">{repo.name}</h2>
      {renderRepoInfo("Язык", repo.language)}
      {renderRepoInfo("Число форков", repo.forks?.toString())}
      {renderRepoInfo("Число звезд", repo.stars?.toString())}
      {renderRepoInfo("Дата обновления", repo.updated)}
      {renderRepoInfo("Дата создания", repo.created_at)}
      {renderRepoInfo("Количество коммитов", repo.commits?.toString())}
      {renderRepoInfo("Владелец", repo.owner?.login)}
      {renderRepoInfo("Статус лицензии", repo.license?.name)}
      <p className="repo-info">
        <strong>Описание:</strong> {repo.description || "Нет описания"}
      </p>
      <p className="repo-info">
        <strong>URL:</strong>{" "}
        <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
          {repo.html_url}
        </a>
      </p>
      <div className="repo-tags">
        <strong>Теги:</strong>
        {tags.length > 0 ? (
          <ul>
            {tags.map((tag, index) => (
              <li key={index}>{tag}</li>
            ))}
          </ul>
        ) : (
          <p>Нет тегов</p>
        )}
      </div>
    </div>
  );
};

export default RepoDetails;
