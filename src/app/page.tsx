'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 px-4">
      <div className="max-w-xl text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          Welcome to <span className="text-blue-600 dark:text-blue-400">Token Table App</span>
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mt-4">
          Easily track and analyze real-time token data with beautiful charts and lightning-fast updates.
        </p>
        <Link
          href="/discover"
          className="inline-block mt-6 px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white text-base font-medium rounded-lg shadow-md hover:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition"
          aria-label="Navigate to token discovery page"
        >
          Explore Discover Page →
        </Link>
      </div>
    </main>
  );
}
