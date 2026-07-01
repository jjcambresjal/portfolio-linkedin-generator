import dotenv from 'dotenv';
import { Config } from './types';
import { Logger } from './utils/logger';

dotenv.config();

export function getConfig(): Config {
  const requiredVars = ['GITHUB_USERNAME', 'GITHUB_TOKEN'];
  const missing = requiredVars.filter((v) => !process.env[v]);

  if (missing.length > 0) {
    Logger.error(`Missing required environment variables: ${missing.join(', ')}`);
    process.exit(1);
  }

  return {
    githubUsername: process.env.GITHUB_USERNAME!,
    githubToken: process.env.GITHUB_TOKEN!,
    portfolioTitle: process.env.PORTFOLIO_TITLE || 'My Portfolio',
    portfolioDescription: process.env.PORTFOLIO_DESCRIPTION || 'Developer Portfolio',
    portfolioOutput: process.env.PORTFOLIO_OUTPUT || './portfolio.html',
    linkedinPostOutput: process.env.LINKEDIN_POST_OUTPUT || './linkedin_posts.json',
    featuredRepos: (process.env.FEATURED_REPOS || '').split(',').filter(Boolean),
    excludeRepos: (process.env.EXCLUDE_REPOS || '').split(',').filter(Boolean),
  };
}
