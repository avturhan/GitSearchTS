import React from "react";
import { Repo } from "../Types";
import { Typography, Link, List, ListItem } from "@mui/material";
import "./RepoDetails.scss";

/**
 * Свойства компонента RepoDetails.
 */
interface RepoDetailsProps {
  /**
   * Репозиторий для отображения деталей.
   */
  repo: Repo | null;
}

/**
 * Компонент для отображения деталей репозитория.
 * @param props - Свойства компонента
 * @returns JSX элемент
 */
const RepoDetails: React.FC<RepoDetailsProps> = ({ repo }) => {
  if (!repo) {
    return (
      <div className="repo-details-placeholder">
        Выберите репозиторий для просмотра деталей.
      </div>
    );
  }

  /**
   * Отображает информацию о репозитории.
   * @param label - Название информации
   * @param value - Значение информации
   * @returns JSX элемент
   */
  const renderRepoInfo = (label: string, value: string | undefined) => (
    <Typography variant="body1" className="repo-info">
      <strong>{label}:</strong> {value || "Нет информации"}
    </Typography>
  );

  const tags = repo.tags || [];

  return (
    <div className="repo-details">
      <Typography variant="h5" className="repo-name">
        {repo.name}
      </Typography>
      {renderRepoInfo("Язык", repo.language)}
      {renderRepoInfo("Число форков", repo.forks?.toString())}
      {renderRepoInfo("Число звезд", repo.stars?.toString())}
      {renderRepoInfo("Дата обновления", repo.updated)}
      {renderRepoInfo("Дата создания", repo.created_at)}
      {renderRepoInfo("Количество коммитов", repo.commits?.toString())}
      {renderRepoInfo("Владелец", repo.owner?.login)}
      {renderRepoInfo("Статус лицензии", repo.license?.name)}

      <Typography variant="body1" className="repo-info">
        <strong>Описание:</strong> {repo.description || "Нет описания"}
      </Typography>

      <Typography variant="body1" className="repo-info">
        <strong>URL:</strong>{" "}
        <Link href={repo.html_url} target="_blank" rel="noopener noreferrer">
          {repo.html_url}
        </Link>
      </Typography>

      <div className="repo-tags">
        <Typography variant="body1">
          <strong>Теги:</strong>
        </Typography>
        {tags.length > 0 ? (
          <List>
            {tags.map((tag, index) => (
              <ListItem key={index}>{tag}</ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="body1">Нет тегов</Typography>
        )}
      </div>
    </div>
  );
};

export default RepoDetails;
