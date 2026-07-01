import { Repository, RepositoryAnalysis, Config } from '../types';
import { GitHubService } from './github.service';
import { extractLanguages } from '../utils/helpers';
import { Logger } from '../utils/logger';

export class AnalyzerService {
  private gitHubService: GitHubService;
  private config: Config;

  constructor(config: Config) {
    this.config = config;
    this.gitHubService = new GitHubService(config);
  }

  async analyzeRepositories(): Promise<RepositoryAnalysis[]> {
    try {
      const repos = await this.gitHubService.getUserRepositories();
      const filtered = this.filterRepositories(repos);
      const analyzed: RepositoryAnalysis[] = [];

      for (const repo of filtered) {
        Logger.info(`Analyzing ${repo.name}...`);
        const analysis = await this.analyzeRepository(repo);
        analyzed.push(analysis);
      }

      return analyzed;
    } catch (error) {
      Logger.error('Failed to analyze repositories', error as Error);
      throw error;
    }
  }

  private filterRepositories(repos: Repository[]): Repository[] {
    return repos.filter((repo) => {
      if (this.config.excludeRepos.includes(repo.name)) {
        return false;
      }
      return true;
    });
  }

  private async analyzeRepository(repo: Repository): Promise<RepositoryAnalysis> {
    const technologies = extractLanguages(repo);
    const [owner, name] = repo.fullName.split('/');
    const contributors = await this.gitHubService.getRepositoryContributors(owner, name);

    return {
      repo,
      technologies,
      contributors,
      commitCount: 0,
      lastUpdated: new Date(repo.pushedAt),
    };
  }

  markFeaturedRepositories(analysis: RepositoryAnalysis[]): RepositoryAnalysis[] {
    return analysis.map((item) => {
      if (this.config.featuredRepos.includes(item.repo.name)) {
        item.repo.featured = true;
      }
      return item;
    });
  }
}
