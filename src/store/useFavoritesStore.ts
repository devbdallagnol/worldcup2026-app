import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavoritesState {
  favoriteTeamIds: string[];
  toggleFavorite: (teamId: string) => void;
  isFavorite: (teamId: string) => boolean;
  clearFavorites: () => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favoriteTeamIds: [],
      toggleFavorite: (teamId) => {
        const current = get().favoriteTeamIds;
        set({
          favoriteTeamIds: current.includes(teamId)
            ? current.filter((id) => id !== teamId)
            : [...current, teamId],
        });
      },
      isFavorite: (teamId) => get().favoriteTeamIds.includes(teamId),
      clearFavorites: () => set({ favoriteTeamIds: [] }),
    }),
    { name: "copa2026-favoritos" }
  )
);
