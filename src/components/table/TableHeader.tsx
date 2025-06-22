'use client';

import { useSort } from '@/hooks/useSort';
import { ChevronUp, ChevronDown } from 'lucide-react';

export default function TableHeader() {
  const { sortBy, sortOrder, onSort } = useSort();

  const headers = [
    { key: 'pair', label: 'Pair Info', sortable: false },
    { key: 'marketCap', label: 'Market Cap', sortable: true },
    { key: 'liquidity', label: 'Liquidity', sortable: true },
    { key: 'volume', label: 'Volume (24h)', sortable: true },
    { key: 'txns', label: 'TXNS (24h)', sortable: true },
    { key: 'audit', label: 'Audit', sortable: false },
    { key: 'action', label: 'Action', sortable: false },
  ] as const;

  return (
    <tr>
      {headers.map(({ key, label, sortable }) => (
        <th
          key={key}
          className="px-4 py-3 whitespace-nowrap cursor-pointer select-none"
          onClick={() => sortable && onSort(key as any)}
        >
          <div className="flex items-center gap-1">
            {label}
            {sortable && sortBy === key && (
              <>
                {sortOrder === 'asc' ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </>
            )}
          </div>
        </th>
      ))}
    </tr>
  );
}
