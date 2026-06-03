import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const themes = [
  {
    id: 'cloud-white',
    name: 'Cloud White',
    bg: '#FFFFFF',
    text: '#111827',
    accent: '#2563EB',
    feel: 'Clean, corporate',
  },
  {
    id: 'midnight-navy',
    name: 'Midnight Navy',
    bg: '#0A0F1E',
    text: '#F9FAFB',
    accent: '#3B82F6',
    feel: 'Dark, premium',
  },
  {
    id: 'slate-pro',
    name: 'Slate Pro',
    bg: '#0F172A',
    text: '#E2E8F0',
    accent: '#38BDF8',
    feel: 'Dark neutral',
  },
  {
    id: 'forest-trust',
    name: 'Forest Trust',
    bg: '#F0FDF4',
    text: '#14532D',
    accent: '#16A34A',
    feel: 'Calm, eco',
  },
  {
    id: 'warm-enterprise',
    name: 'Warm Enterprise',
    bg: '#FAFAF9',
    text: '#1C1917',
    accent: '#D97706',
    feel: 'Warm, approachable',
  },
];

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) {
      const exists = themes.some((t) => t.id === saved);
      if (exists) return saved;
    }
    return 'cloud-white';
  });

  const setTheme = (newTheme) => {
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes }}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
