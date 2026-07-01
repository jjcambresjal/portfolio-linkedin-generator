export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function formatNumber(num: number): string {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';
  }
  return num.toString();
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export function extractLanguages(repo: any): string[] {
  const languages: string[] = [];
  if (repo.language) {
    languages.push(repo.language);
  }
  if (repo.topics && Array.isArray(repo.topics)) {
    languages.push(...repo.topics);
  }
  return [...new Set(languages)];
}

export function generateHashtags(repoName: string, topics: string[]): string[] {
  const hashtags = ['#GithubProject', '#OpenSource', '#Developer'];
  
  if (topics.length > 0) {
    hashtags.push(...topics.map(t => `#${t.charAt(0).toUpperCase() + t.slice(1)}`));
  }
  
  return hashtags.slice(0, 5);
}
