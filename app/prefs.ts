"use client";

import { useSyncExternalStore } from "react";

export type Lang = "en" | "fr";
export type Theme = "light" | "dark";

const listeners = new Set<() => void>();
function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
const emit = () => listeners.forEach((l) => l());

function save(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Storage can be unavailable (private mode); the choice still applies to this visit.
  }
}

const readLang = (): Lang => (document.documentElement.lang === "fr" ? "fr" : "en");
const readTheme = (): Theme =>
  document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";

export function useLang(): Lang {
  return useSyncExternalStore(subscribe, readLang, () => "en");
}

export function useTheme(): Theme {
  return useSyncExternalStore(subscribe, readTheme, () => "dark");
}

export function setLang(lang: Lang) {
  document.documentElement.lang = lang;
  save("np-lang", lang);
  emit();
}

export function setTheme(theme: Theme) {
  const html = document.documentElement;
  html.classList.add("theme-switching");
  html.setAttribute("data-theme", theme);
  save("np-theme", theme);
  emit();
  window.setTimeout(() => html.classList.remove("theme-switching"), 500);
}
