import { create } from 'zustand';
import { Portfolio, Project } from '@/types';

interface PortfolioState {
  portfolios: Portfolio[];
  currentPortfolio: Portfolio | null;
  projects: Project[];
  favorites: Set<string>;
  isLoading: boolean;
  setPortfolios: (portfolios: Portfolio[]) => void;
  setCurrentPortfolio: (portfolio: Portfolio | null) => void;
  setProjects: (projects: Project[]) => void;
  setFavorites: (favorites: string[]) => void;
  toggleFavorite: (projectId: string) => void;
  setLoading: (loading: boolean) => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  portfolios: [],
  currentPortfolio: null,
  projects: [],
  favorites: new Set(),
  isLoading: false,
  setPortfolios: (portfolios) => set({ portfolios }),
  setCurrentPortfolio: (currentPortfolio) => set({ currentPortfolio }),
  setProjects: (projects) => set({ projects }),
  setFavorites: (favorites) => set({ favorites: new Set(favorites) }),
  toggleFavorite: (projectId) =>
    set((state) => {
      const newFavorites = new Set(state.favorites);
      if (newFavorites.has(projectId)) {
        newFavorites.delete(projectId);
      } else {
        newFavorites.add(projectId);
      }
      return { favorites: newFavorites };
    }),
  setLoading: (isLoading) => set({ isLoading }),
}));
