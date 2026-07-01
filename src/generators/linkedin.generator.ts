import fs from 'fs/promises';
import { RepositoryAnalysis, LinkedInPost, Config } from '../types';
import { generateHashtags } from '../utils/helpers';
import { Logger } from '../utils/logger';

export class LinkedInGenerator {
  private config: Config;
  private postTemplates = [
    'Excited to share my latest project: {name}! 🚀 Built with {tech} and already {stats}. Check it out!',
    'Just shipped {name}! This project showcases {tech} and has been great for learning. {stats} 💻',
    'Working on {name} - a {tech} project that {description}. Join me on GitHub! 🔗',
    '{name} is live! 🎉 {description} Built with {tech}. Star it on GitHub if you like it! {stats}',
  ];

  constructor(config: Config) {
    this.config = config;
  }

  async generate(analyses: RepositoryAnalysis[]): Promise<void> {
    try {
      Logger.info('Generating LinkedIn posts...');
      const posts = analyses.map((a) => this.generatePost(a));
      await fs.writeFile(
        this.config.linkedinPostOutput,
        JSON.stringify({ posts }, null, 2)
      );
      Logger.success(`LinkedIn posts generated: ${this.config.linkedinPostOutput}`);
    } catch (error) {
      Logger.error('Failed to generate LinkedIn posts', error as Error);
      throw error;
    }
  }

  private generatePost(analysis: RepositoryAnalysis): LinkedInPost {
    const { repo, technologies } = analysis;
    const template = this.postTemplates[Math.floor(Math.random() * this.postTemplates.length)];
    const stats = `${repo.stars}⭐ ${repo.forks}🍴`;
    const techString = technologies.slice(0, 3).join(', ');

    const post = template
      .replace('{name}', repo.name)
      .replace('{tech}', techString || 'awesome technologies')
      .replace('{stats}', stats)
      .replace('{description}', repo.description || 'a cool project');

    const hashtags = generateHashtags(repo.name, repo.topics);

    return {
      title: repo.name,
      description: repo.description || 'Check out this project on GitHub',
      post,
      hashtags,
      cta: 'Check it out on GitHub! 🔗',
      repoUrl: repo.url,
    };
  }
}
