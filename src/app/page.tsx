// src/app/page.tsx
'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold text-gray-900">
        Welcome to Token Table App
      </h1>
      <p className="text-gray-600 mt-2">
        Go to{' '}
        <Link
          href="/discover"
          className="text-blue-600 underline hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded"
          aria-label="Navigate to token discovery page"
        >
          /discover
        </Link>{' '}
        to see the table.
      </p>
    </main>
  );
}

