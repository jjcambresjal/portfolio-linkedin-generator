import fs from 'fs/promises';
import { RepositoryAnalysis, Config } from '../types';
import { formatDate, formatNumber } from '../utils/helpers';
import { Logger } from '../utils/logger';

export class PortfolioGenerator {
  private config: Config;

  constructor(config: Config) {
    this.config = config;
  }

  async generate(analyses: RepositoryAnalysis[]): Promise<void> {
    try {
      Logger.info('Generating portfolio HTML...');
      const html = this.generateHTML(analyses);
      await fs.writeFile(this.config.portfolioOutput, html);
      Logger.success(`Portfolio generated: ${this.config.portfolioOutput}`);
    } catch (error) {
      Logger.error('Failed to generate portfolio', error as Error);
      throw error;
    }
  }

  private generateHTML(analyses: RepositoryAnalysis[]): string {
    const featured = analyses.filter((a) => a.repo.featured);
    const others = analyses.filter((a) => !a.repo.featured);

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${this.config.portfolioTitle} - Portfolio</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
        }
        header {
            background: white;
            border-radius: 10px;
            padding: 40px;
            margin-bottom: 40px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            text-align: center;
        }
        h1 {
            font-size: 2.5em;
            color: #333;
            margin-bottom: 10px;
        }
        .tagline {
            color: #666;
            font-size: 1.2em;
        }
        .generated-date {
            color: #999;
            font-size: 0.9em;
            margin-top: 20px;
        }
        .section-title {
            color: white;
            font-size: 1.8em;
            margin: 40px 0 20px 0;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        }
        .repositories {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
            gap: 20px;
            margin-bottom: 40px;
        }
        .repo-card {
            background: white;
            border-radius: 10px;
            padding: 25px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s, box-shadow 0.3s;
            position: relative;
            overflow: hidden;
        }
        .repo-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
        }
        .repo-card.featured {
            border: 3px solid #ffd700;
            background: #fffef5;
        }
        .featured-badge {
            position: absolute;
            top: 10px;
            right: 10px;
            background: #ffd700;
            color: #333;
            padding: 5px 10px;
            border-radius: 5px;
            font-size: 0.8em;
            font-weight: bold;
        }
        .repo-name {
            font-size: 1.5em;
            color: #333;
            margin-bottom: 10px;
            margin-top: 10px;
        }
        .repo-description {
            color: #666;
            font-size: 0.95em;
            line-height: 1.5;
            margin-bottom: 15px;
            min-height: 50px;
        }
        .technologies {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-bottom: 15px;
        }
        .tech-badge {
            background: #e8f0fe;
            color: #1f6feb;
            padding: 5px 10px;
            border-radius: 20px;
            font-size: 0.85em;
        }
        .stats {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 10px;
            margin-bottom: 15px;
            padding-bottom: 15px;
            border-bottom: 1px solid #eee;
        }
        .stat {
            text-align: center;
        }
        .stat-label {
            color: #999;
            font-size: 0.8em;
        }
        .stat-value {
            color: #333;
            font-weight: bold;
            font-size: 1.2em;
        }
        .repo-link {
            display: inline-block;
            background: #667eea;
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            text-decoration: none;
            font-weight: bold;
            transition: background 0.3s;
        }
        .repo-link:hover {
            background: #764ba2;
        }
        @media (max-width: 768px) {
            h1 {
                font-size: 1.8em;
            }
            .repositories {
                grid-template-columns: 1fr;
            }
            .section-title {
                font-size: 1.4em;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>${this.config.portfolioTitle}</h1>
            <p class="tagline">${this.config.portfolioDescription}</p>
            <p class="generated-date">Generated on ${formatDate(new Date())}</p>
        </header>

        ${featured.length > 0 ? `
        <h2 class="section-title">⭐ Featured Projects</h2>
        <div class="repositories">
            ${featured.map((a) => this.generateRepoCard(a, true)).join('')}
        </div>
        ` : ''}

        ${others.length > 0 ? `
        <h2 class="section-title">📚 Other Projects</h2>
        <div class="repositories">
            ${others.map((a) => this.generateRepoCard(a, false)).join('')}
        </div>
        ` : ''}
    </div>
</body>
</html>`;
  }

  private generateRepoCard(analysis: RepositoryAnalysis, featured: boolean): string {
    const { repo, technologies } = analysis;
    return `
        <div class="repo-card ${featured ? 'featured' : ''}">
            ${featured ? '<div class="featured-badge">⭐ Featured</div>' : ''}
            <div class="repo-name">${repo.name}</div>
            <p class="repo-description">${repo.description || 'No description provided'}</p>
            <div class="technologies">
                ${technologies.map((tech) => `<span class="tech-badge">${tech}</span>`).join('')}
            </div>
            <div class="stats">
                <div class="stat">
                    <div class="stat-label">Stars</div>
                    <div class="stat-value">${formatNumber(repo.stars)}</div>
                </div>
                <div class="stat">
                    <div class="stat-label">Forks</div>
                    <div class="stat-value">${formatNumber(repo.forks)}</div>
                </div>
                <div class="stat">
                    <div class="stat-label">Issues</div>
                    <div class="stat-value">${formatNumber(repo.openIssues)}</div>
                </div>
                <div class="stat">
                    <div class="stat-label">Updated</div>
                    <div class="stat-value">${formatDate(new Date(repo.pushedAt))}</div>
                </div>
            </div>
            <a href="${repo.url}" class="repo-link" target="_blank">View Repository →</a>
        </div>
    `;
  }
}
