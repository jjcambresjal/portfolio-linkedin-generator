import axios from 'axios';

const GITHUB_API = 'https://api.github.com';

export async function fetchUserRepositories(username: string, token: string) {
  try {
    const response = await axios.get(`${GITHUB_API}/users/${username}/repos`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json',
      },
      params: {
        type: 'owner',
        sort: 'updated',
        per_page: 100,
      },
    });

    return response.data.map((repo: any) => ({
      id: repo.id,
      name: repo.name,
      fullName: repo.full_name,
      description: repo.description,
      url: repo.html_url,
      language: repo.language,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      openIssues: repo.open_issues_count,
      topics: repo.topics || [],
      createdAt: repo.created_at,
      updatedAt: repo.updated_at,
      pushedAt: repo.pushed_at,
    }));
  } catch (error) {
    console.error('Failed to fetch repositories:', error);
    throw error;
  }
}

export async function getRepositoryContributors(owner: string, repo: string, token: string) {
  try {
    const response = await axios.get(`${GITHUB_API}/repos/${owner}/${repo}/contributors`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { per_page: 100 },
    });
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch contributors for ${owner}/${repo}:`, error);
    return [];
  }
}
