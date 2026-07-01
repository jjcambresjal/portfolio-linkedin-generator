'use client';

import { Project } from '@/types';
import { Heart, GitFork, Star, AlertCircle } from 'lucide-react';
import { usePortfolioStore } from '@/store/usePortfolioStore';
import { useState } from 'react';

interface ProjectCardProps {
  project: Project;
  onFavoriteToggle?: (projectId: string) => void;
}

export function ProjectCard({ project, onFavoriteToggle }: ProjectCardProps) {
  const { favorites, toggleFavorite } = usePortfolioStore();
  const isFavorite = favorites.has(project.id);

  const handleFavoriteClick = () => {
    toggleFavorite(project.id);
    onFavoriteToggle?.(project.id);
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden border border-gray-100">
      {project.is_featured && (
        <div className="bg-yellow-400 text-black px-4 py-2 text-center font-semibold text-sm">
          ⭐ Featured Project
        </div>
      )}

      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-800">{project.name}</h3>
          <button
            onClick={handleFavoriteClick}
            className={`p-2 rounded-full transition ${
              isFavorite
                ? 'bg-red-100 text-red-600'
                : 'bg-gray-100 text-gray-400 hover:text-red-600'
            }`}
          >
            <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
          </button>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {project.description || 'No description provided'}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.language && (
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
              {project.language}
            </span>
          )}
          {project.topics?.slice(0, 2).map((topic) => (
            <span key={topic} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs">
              {topic}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-3 py-3 border-t border-b border-gray-100">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-yellow-500 text-sm font-semibold">
              <Star size={16} />
              {project.stars}
            </div>
            <div className="text-xs text-gray-500">Stars</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-blue-500 text-sm font-semibold">
              <GitFork size={16} />
              {project.forks}
            </div>
            <div className="text-xs text-gray-500">Forks</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-red-500 text-sm font-semibold">
              <AlertCircle size={16} />
              {project.open_issues}
            </div>
            <div className="text-xs text-gray-500">Issues</div>
          </div>
        </div>

        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block mt-4 w-full bg-primary hover:bg-secondary text-white font-semibold py-2 px-4 rounded-lg transition text-center"
        >
          View on GitHub →
        </a>
      </div>
    </div>
  );
}
