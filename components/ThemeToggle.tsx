import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Theme } from '../types';

interface ThemeToggleProps {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, toggleTheme }) => {
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-stone-200 dark:bg-slate-700 text-stone-800 dark:text-slate-200 hover:bg-stone-300 dark:hover:bg-slate-600 transition-all focus:outline-none focus:ring-2 focus:ring-primary"
      aria-label="Přepnout tmavý režim"
    >
      {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
    </button>
  );
};
