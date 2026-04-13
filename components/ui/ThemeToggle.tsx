'use client';

import { useTheme } from '@/app/providers';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  
  let theme = 'dark';
  let toggleTheme = () => {};
  
  try {
    const themeContext = useTheme();
    theme = themeContext.theme;
    toggleTheme = themeContext.toggleTheme;
  } catch {
    // Silently fail if not in ThemeProvider
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={toggleTheme}
      className="group relative flex h-9 w-9 items-center justify-center rounded-lg border border-current transition-all duration-300"
      style={{
        borderColor: 'var(--border-light)',
        backgroundColor: theme === 'dark' ? 'rgba(206, 178, 142, 0.05)' : 'rgba(206, 178, 142, 0.08)',
      }}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`${theme === 'dark' ? 'Light' : 'Dark'} mode`}
    >
      {/* Sun icon */}
      <svg
        className={`absolute h-5 w-5 transition-all duration-300 ${
          theme === 'light'
            ? 'rotate-0 scale-100 opacity-100'
            : 'rotate-90 scale-0 opacity-0'
        }`}
        style={{ color: 'var(--accent-primary)' }}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.536l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zm5.657 9.193l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zM5 11a1 1 0 100-2H4a1 1 0 100 2h1z"
          clipRule="evenodd"
        />
      </svg>

      {/* Moon icon */}
      <svg
        className={`absolute h-5 w-5 transition-all duration-300 ${
          theme === 'dark'
            ? 'rotate-0 scale-100 opacity-100'
            : '-rotate-90 scale-0 opacity-0'
        }`}
        style={{ color: 'var(--accent-primary)' }}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
      </svg>

      {/* Hover effect - gradient background */}
      <div
        className="absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: 'radial-gradient(circle, rgba(206, 178, 142, 0.12) 0%, transparent 70%)',
        }}
      />
    </button>
  );
}
