import { getConfig } from '../index';
import { AnalyzerService } from '../services/analyzer.service';
import { PortfolioGenerator } from '../generators/portfolio.generator';
import { LinkedInGenerator } from '../generators/linkedin.generator';
import { Logger } from '../utils/logger';

async function main() {
  try {
    Logger.info('Starting full generation (Portfolio + LinkedIn posts)...');
    const config = getConfig();
    
    const analyzer = new AnalyzerService(config);
    const analyses = await analyzer.analyzeRepositories();
    const marked = analyzer.markFeaturedRepositories(analyses);
    
    const portfolioGenerator = new PortfolioGenerator(config);
    await portfolioGenerator.generate(marked);
    
    const linkedinGenerator = new LinkedInGenerator(config);
    await linkedinGenerator.generate(analyses);
    
    Logger.success('Full generation complete! ✨');
  } catch (error) {
    Logger.error('Generation failed', error as Error);
    process.exit(1);
  }
}

main();
