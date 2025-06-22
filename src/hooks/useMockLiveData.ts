'use client';

import { useEffect, useState } from 'react';
import { generateMockData } from '@/lib/utils';
import { TokenData } from '@/types/token';

export default function useMockLiveData(intervalMs = 5000): TokenData[] {
  const [tokens, setTokens] = useState<TokenData[]>(generateMockData());

  useEffect(() => {
    const interval = setInterval(() => {
      setTokens((prev) =>
        prev.map((token) => {
          const change = (Math.random() - 0.5) * 10; // ±5
          const newPrice = +(token.price + change).toFixed(2);
          return { ...token, price: newPrice };
        })
      );
    }, intervalMs);

    return () => clearInterval(interval);
  }, [intervalMs]);

  return tokens;
}
