import { getConfig } from '../index';
import { AnalyzerService } from '../services/analyzer.service';
import { LinkedInGenerator } from '../generators/linkedin.generator';
import { Logger } from '../utils/logger';

async function main() {
  try {
    Logger.info('Starting LinkedIn posts generation...');
    const config = getConfig();
    
    const analyzer = new AnalyzerService(config);
    const analyses = await analyzer.analyzeRepositories();
    
    const generator = new LinkedInGenerator(config);
    await generator.generate(analyses);
    
    Logger.success('LinkedIn posts generation complete!');
  } catch (error) {
    Logger.error('LinkedIn posts generation failed', error as Error);
    process.exit(1);
  }
}

main();
