import * as React from 'react';
const { useEffect, useState } = React;

const THEME_KEY = 'webwhiz_theme';

type Theme = 'light' | 'dark' | 'system';

function getSystemTheme(): Theme {
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
  return 'light';
}

// @ts-ignore: chrome types are available in extension context
function ThemeToggle() {
  // Use useState with no type argument, cast as Theme
  const [theme, setTheme] = useState('system');

  // @ts-ignore: chrome types are available in extension context
  useEffect(() => {
    chrome.storage.local.get([THEME_KEY], (result: any) => {
      setTheme((result[THEME_KEY] || 'system') as Theme);
    });
  }, []);

  // @ts-ignore: chrome types are available in extension context
  useEffect(() => {
    let applied: Theme = theme as Theme;
    if (applied === 'system') applied = getSystemTheme();
    document.documentElement.classList.toggle('dark', applied === 'dark');
    chrome.storage.local.set({ [THEME_KEY]: theme });
  }, [theme]);

  return (
    <div className="flex gap-1 items-center">
      <button
        className={`px-2 py-1 rounded ${theme === 'light' ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
        onClick={() => setTheme('light')}
        title="Light mode"
      >🌞</button>
      <button
        className={`px-2 py-1 rounded ${theme === 'dark' ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
        onClick={() => setTheme('dark')}
        title="Dark mode"
      >🌚</button>
      <button
        className={`px-2 py-1 rounded ${theme === 'system' ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
        onClick={() => setTheme('system')}
        title="System"
      >🖥️</button>
    </div>
  );
}

export default ThemeToggle; 