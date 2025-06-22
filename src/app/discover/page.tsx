'use client';

import dynamic from 'next/dynamic';
import { Suspense, useEffect, useState } from 'react';

const TokenTable = dynamic(() => import('./TokenTable'), {
  loading: () => <p className="text-gray-500">Loading token table...</p>,
});

export default function DiscoverPage() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme') as 'light' | 'dark' | null;
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

      const initialTheme = stored ?? (prefersDark ? 'dark' : 'light');
      setTheme(initialTheme);
      document.documentElement.classList.toggle('dark', initialTheme === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <main className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Token Discovery</h1>
        <button
          onClick={toggleTheme}
          className="px-3 py-1 rounded bg-gray-200 text-sm dark:bg-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
        >
          {theme === 'dark' ? '☀ Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>

      <Suspense fallback={<p className="text-gray-400">Preparing token table...</p>}>
        <TokenTable />
      </Suspense>
    </main>
  );
}
