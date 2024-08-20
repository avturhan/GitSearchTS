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

  const tags = repo.tags || [];

  return (
    <div className="repo-details">
      <h2 className="repo-name">{repo.name}</h2>
      <p className="repo-info">
        <strong>Язык:</strong> {repo.language}
      </p>
      <p className="repo-info">
        <strong>Число форков:</strong> {repo.forks}
      </p>
      <p className="repo-info">
        <strong>Число звезд:</strong> {repo.stars}
      </p>
      <p className="repo-info">
        <strong>Дата обновления:</strong> {repo.updated}
      </p>
      <p className="repo-info">
        <strong>Дата создания:</strong> {repo.created_at || "Не указана"}
      </p>
      <p className="repo-info">
        <strong>Количество коммитов:</strong> {repo.commits || "Не указано"}
      </p>
      <p className="repo-info">
        <strong>Владелец:</strong> {repo.owner?.login || "Не указан"}
      </p>
      <p className="repo-info">
        <strong>Статус лицензии:</strong> {repo.license?.name || "Не указана"}
      </p>
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
