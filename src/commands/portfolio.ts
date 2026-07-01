import { getConfig } from '../index';
import { AnalyzerService } from '../services/analyzer.service';
import { PortfolioGenerator } from '../generators/portfolio.generator';
import { Logger } from '../utils/logger';

async function main() {
  try {
    Logger.info('Starting portfolio generation...');
    const config = getConfig();
    
    const analyzer = new AnalyzerService(config);
    const analyses = await analyzer.analyzeRepositories();
    const marked = analyzer.markFeaturedRepositories(analyses);
    
    const generator = new PortfolioGenerator(config);
    await generator.generate(marked);
    
    Logger.success('Portfolio generation complete!');
  } catch (error) {
    Logger.error('Portfolio generation failed', error as Error);
    process.exit(1);
  }
}

main();
