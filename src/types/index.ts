// User types
export interface User {
  id: string;
  username: string;
  email: string;
  password_hash: string;
  created_at: Date;
  updated_at: Date;
}

// Portfolio types
export interface Portfolio {
  id: string;
  user_id: string;
  title: string;
  description: string;
  github_username: string;
  github_token: string;
  is_public: boolean;
  view_count: number;
  created_at: Date;
  updated_at: Date;
}

// Project types
export interface Project {
  id: string;
  portfolio_id: string;
  name: string;
  description: string;
  url: string;
  language: string;
  stars: number;
  forks: number;
  open_issues: number;
  topics: string[];
  is_featured: boolean;
  created_at: Date;
  updated_at: Date;
}

// Favorite types
export interface Favorite {
  id: string;
  user_id: string;
  project_id: string;
  created_at: Date;
}

// Comment types
export interface Comment {
  id: string;
  user_id: string;
  project_id: string;
  content: string;
  created_at: Date;
  updated_at: Date;
}

// Statistic types
export interface Statistic {
  id: string;
  portfolio_id: string;
  views: number;
  favorites: number;
  comments: number;
  date: Date;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
