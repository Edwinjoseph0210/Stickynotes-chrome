import * as React from 'react';
// If ThemeToggle import fails, ensure ThemeToggle.tsx exists in the same folder
import ThemeToggle from './ThemeToggle';
import ProfileForm from './ProfileForm';

function App() {
  return (
    <div className="p-4 min-w-[300px] bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <header className="flex items-center justify-between mb-4">
        <h1 className="text-lg font-bold">WebWhiz</h1>
        <ThemeToggle />
      </header>
      <ProfileForm />
      <div className="text-sm opacity-60 mt-4">AI Sticky Notes & Smart Form Assistant</div>
    </div>
  );
}

export default App; 