'use client';

import { useEffect, useState } from 'react';
import { fetchRealTokenData } from '@/lib/fetchRealTokenData';
import { TokenData } from '@/types/token';

export default function useTokenData() {
  const [data, setData] = useState<TokenData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRealTokenData()
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
}
