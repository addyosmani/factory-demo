"use client";

import { useSyncExternalStore } from "react";
import {
  addFavorite,
  readFavorites,
  removeFavorite,
  writeFavorites,
  type FavoriteMovie,
} from "@/lib/favorites";

const FAVORITES_CHANGED = "reel-good:favorites-changed";
const EMPTY_FAVORITES: FavoriteMovie[] = [];
let cachedValue: string | null | undefined;
let cachedFavorites = EMPTY_FAVORITES;

export function FavoriteButton({ movie }: { movie: FavoriteMovie }) {
  const favorites = useFavorites();
  const isFavorite = favorites.some((favorite) => favorite.id === movie.id);
  const label = isFavorite ? `Remove ${movie.title} from favorites` : `Add ${movie.title} to favorites`;

  function toggleFavorite() {
    const next = isFavorite ? removeFavorite(favorites, movie.id) : addFavorite(favorites, movie);
    if (writeFavorites(window.localStorage, next)) {
      window.dispatchEvent(new Event(FAVORITES_CHANGED));
    }
  }

  return (
    <button className="favorite-button" type="button" aria-label={label} aria-pressed={isFavorite} onClick={toggleFavorite}>
      <span aria-hidden="true">{isFavorite ? "♥" : "♡"}</span>
    </button>
  );
}

export function useFavorites() {
  return useSyncExternalStore(subscribe, getFavoritesSnapshot, () => EMPTY_FAVORITES);
}

function subscribe(onChange: () => void) {
  window.addEventListener(FAVORITES_CHANGED, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(FAVORITES_CHANGED, onChange);
    window.removeEventListener("storage", onChange);
  };
}

function getFavoritesSnapshot() {
  try {
    const value = window.localStorage.getItem("reel-good:favorites:v1");
    if (value !== cachedValue) {
      cachedValue = value;
      cachedFavorites = readFavorites(window.localStorage);
    }
    return cachedFavorites;
  } catch {
    return EMPTY_FAVORITES;
  }
}
