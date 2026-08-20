"use client";

import { useSyncExternalStore } from "react";
import { resolveTheme, THEME_STORAGE_KEY, type Theme } from "@/lib/theme";

function readTheme(): Theme {
  try {
    return resolveTheme(
      window.localStorage.getItem(THEME_STORAGE_KEY),
      window.matchMedia("(prefers-color-scheme: dark)").matches,
    );
  } catch {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
}

function readAppliedTheme(): Theme {
  const applied = document.documentElement.dataset.theme;
  return applied === "light" || applied === "dark" ? applied : readTheme();
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  window.dispatchEvent(new Event("reel-good-theme-change"));
}

function subscribe(onChange: () => void) {
  window.addEventListener("reel-good-theme-change", onChange);
  return () => window.removeEventListener("reel-good-theme-change", onChange);
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, readAppliedTheme, () => "light");

  function toggleTheme() {
    const nextTheme = theme === "dark" ? "light" : "dark";
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    } catch {
      // The selected theme still applies when storage is unavailable.
    }
    applyTheme(nextTheme);
  }

  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={toggleTheme}
      aria-pressed={theme === "dark"}
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
    >
      <span className="theme-toggle-icon" aria-hidden="true" />
      <span className="theme-toggle-label">{theme === "dark" ? "Light" : "Dark"}</span>
    </button>
  );
}
