import { Repo } from "../Types"; // Проверьте правильность пути

const getCommitsCount = async (repoFullName: string): Promise<number> => {
  const response = await fetch(
    `https://api.github.com/repos/${repoFullName}/commits?per_page=1`
  );
  if (response.ok) {
    const commits = await response.json();
    return commits.length;
  }
  return 0;
};

export const fetchRepositories = async (
  query: string,
  perPage = 30,
  page = 1
): Promise<Repo[]> => {
  const response = await fetch(
    `https://api.github.com/search/repositories?q=${query}&per_page=${perPage}&page=${page}`
  );
  const data = await response.json();

  const reposWithCommitsCount = await Promise.all(
    data.items.map(async (repo: any) => {
      const commitsCount = await getCommitsCount(repo.full_name);
      return {
        id: repo.id, // Убедитесь, что добавили id
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
};
