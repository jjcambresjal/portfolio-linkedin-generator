import axios, { AxiosInstance } from 'axios';
import { Repository, Config } from '../types';
import { Logger } from '../utils/logger';

export class GitHubService {
  private client: AxiosInstance;
  private username: string;

  constructor(config: Config) {
    this.username = config.githubUsername;
    this.client = axios.create({
      baseURL: 'https://api.github.com',
      headers: {
        Authorization: `Bearer ${config.githubToken}`,
        Accept: 'application/vnd.github.v3+json',
      },
    });
  }

  async getUserRepositories(): Promise<Repository[]> {
    try {
      Logger.info('Fetching repositories from GitHub...');
      const response = await this.client.get(`/users/${this.username}/repos`, {
        params: {
          type: 'owner',
          sort: 'updated',
          per_page: 100,
        },
      });

      const repositories: Repository[] = response.data.map((repo: any) => ({
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
        featured: false,
      }));

      Logger.success(`Found ${repositories.length} repositories`);
      return repositories;
    } catch (error) {
      Logger.error('Failed to fetch repositories', error as Error);
      throw error;
    }
  }

  async getRepositoryDetails(owner: string, repo: string): Promise<any> {
    try {
      const response = await this.client.get(`/repos/${owner}/${repo}`);
      return response.data;
    } catch (error) {
      Logger.error(`Failed to fetch details for ${owner}/${repo}`, error as Error);
      throw error;
    }
  }

  async getRepositoryContributors(owner: string, repo: string): Promise<number> {
    try {
      const response = await this.client.get(`/repos/${owner}/${repo}/contributors`, {
        params: { per_page: 1 },
      });
      return response.data.length;
    } catch (error) {
      Logger.warning(`Could not fetch contributors for ${owner}/${repo}`);
      return 0;
    }
  }
}
