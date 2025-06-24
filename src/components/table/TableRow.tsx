'use client';

import { useEffect, useRef, useState, memo } from 'react';
import dynamic from 'next/dynamic';
import { TimeFrame, TokenData } from '@/types/token';

const TooltipProvider = dynamic(() => import('@/components/ui/tooltip').then(m => m.TooltipProvider), { ssr: false });
const Tooltip = dynamic(() => import('@/components/ui/tooltip').then(m => m.Tooltip), { ssr: false });
const TooltipTrigger = dynamic(() => import('@/components/ui/tooltip').then(m => m.TooltipTrigger), { ssr: false });
const TooltipContent = dynamic(() => import('@/components/ui/tooltip').then(m => m.TooltipContent), { ssr: false });

const Dialog = dynamic(() => import('@/components/ui/dialog').then(m => m.Dialog), { ssr: false });
const DialogTrigger = dynamic(() => import('@/components/ui/dialog').then(m => m.DialogTrigger), { ssr: false });
const DialogContent = dynamic(() => import('@/components/ui/dialog').then(m => m.DialogContent), { ssr: false });
const DialogHeader = dynamic(() => import('@/components/ui/dialog').then(m => m.DialogHeader), { ssr: false });
const DialogTitle = dynamic(() => import('@/components/ui/dialog').then(m => m.DialogTitle), { ssr: false });
const DialogDescription = dynamic(() => import('@/components/ui/dialog').then(m => m.DialogDescription), { ssr: false });

const Popover = dynamic(() => import('@/components/ui/popover').then(m => m.Popover), { ssr: false });
const PopoverTrigger = dynamic(() => import('@/components/ui/popover').then(m => m.PopoverTrigger), { ssr: false });
const PopoverContent = dynamic(() => import('@/components/ui/popover').then(m => m.PopoverContent), { ssr: false });

interface TableRowProps {
  token: TokenData;
  timeFrame: TimeFrame;
}

function TableRow({ token, timeFrame }: TableRowProps) {
  const [priceChange, setPriceChange] = useState<'up' | 'down' | null>(null);
  const prevPrice = useRef(token.price);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const percentageChange =
    timeFrame === '1h'
      ? token.change1h
      : timeFrame === '24h'
      ? token.change24h
      : token.change7d;

  const isPositive = percentageChange >= 0;

  useEffect(() => {
    const diff = token.price - prevPrice.current;
    prevPrice.current = token.price;

    if (diff === 0) return;

    setPriceChange(diff > 0 ? 'up' : 'down');

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setPriceChange(null), 1000);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [token.price]);

  return (
    <tr className="border-b hover:bg-gray-50 dark:hover:bg-gray-800 dark:border-gray-700 transition-colors min-h-[40px]">
      {/* Pair + Logo */}
      <td className="px-4 py-3 font-medium">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="cursor-pointer flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline">
                <img src={token.logo} alt={token.pair} className="w-5 h-5 rounded-full" />
                {token.pair}
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>More info about {token.pair}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </td>

      {/* Market Cap */}
      <td className="px-4 py-3">{token.marketCap}</td>

      {/* Liquidity */}
      <td className="px-4 py-3">{token.liquidity}</td>

      {/* Price + % */}
      <td className="px-4 py-3">
        <div className="flex flex-col">
          <span
            className={`transition-colors duration-300 font-mono ${
              priceChange === 'up'
                ? 'text-green-600'
                : priceChange === 'down'
                ? 'text-red-500'
                : isPositive
                ? 'text-green-600'
                : 'text-red-500'
            }`}
          >
            ${token.price?.toFixed(4) ?? '--'}
          </span>
          <span
            className={`text-xs ${
              isPositive ? 'text-green-600' : 'text-red-500'
            }`}
          >
            {isPositive ? '+' : ''}
            {percentageChange?.toFixed(2) ?? '0.00'}%
          </span>
        </div>
      </td>

      {/* Volume */}
      <td className="px-4 py-3">{token.volume}</td>

      {/* Txns */}
      <td className="px-4 py-3">{token.txns}</td>

      {/* Audit */}
      <td className="px-4 py-3">
        <Dialog>
          <DialogTrigger className="text-green-600 dark:text-green-400 underline hover:text-green-800 dark:hover:text-green-500">
            {token.auditStatus}
          </DialogTrigger>
          <DialogContent className="dark:bg-gray-800 dark:text-white">
            <DialogHeader>
              <DialogTitle>{token.pair} Audit Report</DialogTitle>
              <DialogDescription>
                Detailed audit information goes here.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </td>

      {/* Actions */}
      <td className="px-4 py-3 text-right">
        <Popover>
          <PopoverTrigger asChild>
            <button className="text-sm font-medium bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded px-3 py-1">
              ⋮
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-40 text-sm dark:bg-gray-900 dark:text-white">
            <div className="flex flex-col gap-2">
              <button className="hover:text-blue-600 dark:hover:text-blue-400 text-left">View Chart</button>
              <button className="hover:text-green-600 dark:hover:text-green-400 text-left">Buy Token</button>
              <button className="hover:text-red-600 dark:hover:text-red-400 text-left">Report</button>
            </div>
          </PopoverContent>
        </Popover>
      </td>
    </tr>
  );
}

export default memo(
  TableRow,
  (prev, next) =>
    JSON.stringify(prev.token) === JSON.stringify(next.token) &&
    prev.timeFrame === next.timeFrame
);
