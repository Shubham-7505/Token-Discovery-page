'use client';

import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/redux/store';
import { setSort } from '@/redux/tokenSlice';

export function useSort() {
  const dispatch = useDispatch();
  const sortBy = useSelector((state: RootState) => state.token.sortBy);
  const sortOrder = useSelector((state: RootState) => state.token.sortOrder);

  const onSort = useCallback(
    (key: 'marketCap' | 'liquidity' | 'volume' | 'txns' | 'pair' | 'price') => {
      dispatch(setSort(key));
    },
    [dispatch]
  );

  return { sortBy, sortOrder, onSort };
}
