export interface Repository {
  id: number;
  name: string;
  fullName: string;
  description: string | null;
  url: string;
  language: string | null;
  stars: number;
  forks: number;
  openIssues: number;
  topics: string[];
  createdAt: string;
  updatedAt: string;
  pushedAt: string;
  featured: boolean;
}

export interface RepositoryAnalysis {
  repo: Repository;
  technologies: string[];
  contributors: number;
  commitCount: number;
  lastUpdated: Date;
}

export interface LinkedInPost {
  title: string;
  description: string;
  post: string;
  hashtags: string[];
  cta: string;
  repoUrl: string;
}

export interface Portfolio {
  title: string;
  description: string;
  repositories: RepositoryAnalysis[];
  generatedAt: Date;
}

export interface Config {
  githubUsername: string;
  githubToken: string;
  portfolioTitle: string;
  portfolioDescription: string;
  portfolioOutput: string;
  linkedinPostOutput: string;
  featuredRepos: string[];
  excludeRepos: string[];
}
