import { Repo } from "./Types"; // Проверьте правильность пути

// Функция для получения количества коммитов в репозитории
const getCommitsCount = async (repoFullName: string): Promise<number> => {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${repoFullName}/commits?per_page=1`
    );
    if (!response.ok) {
      console.error(`Failed to fetch commits for ${repoFullName}`);
      return 0;
    }
    const commits = await response.json();
    return commits.length;
  } catch (error) {
    console.error(`Error fetching commits count: ${error}`);
    return 0;
  }
};

// Функция для получения репозиториев по запросу
export const fetchRepositories = async (
  query: string,
  perPage = 30,
  page = 1
): Promise<Repo[]> => {
  try {
    const response = await fetch(
      `https://api.github.com/search/repositories?q=${query}&per_page=${perPage}&page=${page}`
    );
    if (!response.ok) {
      console.error(`Failed to fetch repositories for query: ${query}`);
      return [];
    }
    const data = await response.json();

    // Извлечение информации о репозиториях с количеством коммитов
    const reposWithCommitsCount = await Promise.all(
      data.items.map(async (repo: any) => {
        const commitsCount = await getCommitsCount(repo.full_name);
        return {
          id: repo.id,
          name: repo.name,
          language: repo.language || "Не указан",
          forks: repo.forks_count,
          stars: repo.stargazers_count,
          updated: new Date(repo.updated_at).toLocaleDateString(),
          created_at: new Date(repo.created_at).toLocaleDateString(),
          commits: commitsCount,
          owner: {
            login: repo.owner.login,
            avatar_url: repo.owner.avatar_url,
          },
          license: repo.license
            ? { name: repo.license.name }
            : { name: "Не указана" },
          description: repo.description || "Нет описания",
          html_url: repo.html_url,
          tags: repo.topics || [],
        };
      })
    );

    return reposWithCommitsCount;
  } catch (error) {
    console.error(`Error fetching repositories: ${error}`);
    return [];
  }
};
