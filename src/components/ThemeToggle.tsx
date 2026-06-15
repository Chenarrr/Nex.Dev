import { useEffect, useState } from "react";

type Theme = "light" | "dark";

const STORAGE_KEY = "nex-theme";

function readTheme(): Theme {
  if (typeof window === "undefined") return "light";
  return window.localStorage.getItem(STORAGE_KEY) === "dark" ? "dark" : "light";
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  window.localStorage.setItem(STORAGE_KEY, theme);
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const saved = readTheme();
    setTheme(saved);
    applyTheme(saved);
  }, []);

  const nextTheme = theme === "light" ? "dark" : "light";

  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label={`Switch to ${nextTheme} theme`}
      aria-pressed={theme === "dark"}
      onClick={() => {
        setTheme(nextTheme);
        applyTheme(nextTheme);
      }}
    >
      <span className="theme-toggle-track" aria-hidden>
        <span className="theme-toggle-thumb" />
      </span>
      <span className="theme-toggle-label">{theme === "light" ? "Light" : "Dark"}</span>
    </button>
  );
}
