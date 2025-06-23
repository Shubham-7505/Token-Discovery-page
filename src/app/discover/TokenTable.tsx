"use client";

import ErrorBoundary from "@/components/ErrorBoundary";
import useMockLiveData from "@/hooks/useMockLiveData";
import { useSort } from "@/hooks/useSort";
import { TimeFrame } from "@/types/token";
import dynamic from "next/dynamic";
import { useState } from "react";

// Dynamic imports
const TableRow = dynamic(() => import("@/components/table/TableRow"), {
  loading: () => (
    <tr>
      <td colSpan={8}>Loading row...</td>
    </tr>
  ),
  ssr: true,
});

const SkeletonRow = dynamic(() => import("@/components/table/SkeletonRow"), {
  ssr: true,
});

type TokenData = {
  pair: string;
  marketCap: string;
  liquidity: string;
  volume: string;
  txns: string;
  auditStatus: string;
  price: number;
  change1h: number;
  change24h: number;
  change7d: number;
  logo: string;
};

export default function TokenTable() {
  const live = useMockLiveData();
  const { sortBy, sortOrder, onSort } = useSort();
  const [timeFrame, setTimeFrame] = useState<TimeFrame>("1h");

  const sortedData = [...live].sort((a, b) => {
    const parseValue = (val: string) => parseInt(val.replace(/\D/g, "")) || 0;

    switch (sortBy) {
      case "pair":
        return sortOrder === "asc"
          ? a.pair.localeCompare(b.pair)
          : b.pair.localeCompare(a.pair);
      case "price":
        return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
      case "marketCap":
        return sortOrder === "asc"
          ? parseValue(a.marketCap) - parseValue(b.marketCap)
          : parseValue(b.marketCap) - parseValue(a.marketCap);
      case "liquidity":
        return sortOrder === "asc"
          ? parseValue(a.liquidity) - parseValue(b.liquidity)
          : parseValue(b.liquidity) - parseValue(a.liquidity);
      case "volume":
        return sortOrder === "asc"
          ? parseValue(a.volume) - parseValue(b.volume)
          : parseValue(b.volume) - parseValue(a.volume);
      case "txns":
        return sortOrder === "asc"
          ? parseValue(a.txns) - parseValue(b.txns)
          : parseValue(b.txns) - parseValue(a.txns);
      default:
        return 0;
    }
  });

  return (
    <div className="overflow-x-auto">
      <ErrorBoundary>
        {/* Timeframe Buttons */}
        <div className="flex justify-end gap-2 mb-4">
          {["1h", "24h", "7d"].map((frame) => (
            <button
              key={frame}
              onClick={() => setTimeFrame(frame as TimeFrame)}
              className={`px-3 py-1 rounded text-sm border transition-colors ${
                timeFrame === frame
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-700"
              }`}
            >
              {frame}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="h-[600px] overflow-y-auto border rounded dark:border-gray-700">
          <table className="min-w-full text-sm text-left">
            <thead className="sticky top-0 bg-gray-100 dark:bg-gray-900 z-20 shadow-sm">
              <tr className="border-b text-sm font-semibold text-gray-700 dark:text-gray-200 dark:border-gray-700 h-[52px]">
                <th className="px-4 py-3 w-[160px] cursor-pointer select-none" onClick={() => onSort("pair")}>
                  Pair {sortBy === "pair" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
                </th>
                <th className="px-4 py-3 cursor-pointer select-none" onClick={() => onSort("marketCap")}>
                  Market Cap {sortBy === "marketCap" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
                </th>
                <th className="px-4 py-3 cursor-pointer select-none" onClick={() => onSort("liquidity")}>
                  Liquidity {sortBy === "liquidity" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
                </th>
                <th className="px-4 py-3 cursor-pointer select-none" onClick={() => onSort("price")}>
                  Price {sortBy === "price" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
                </th>
                <th className="px-4 py-3 cursor-pointer select-none" onClick={() => onSort("volume")}>
                  Volume {sortBy === "volume" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
                </th>
                <th className="px-4 py-3 cursor-pointer select-none" onClick={() => onSort("txns")}>
                  TXNS {sortBy === "txns" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
                </th>
                <th className="px-4 py-3">Audit</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>

            <tbody>
              {sortedData.length === 0
                ? Array.from({ length: 10 }).map((_, i) => (
                    <SkeletonRow key={`skeleton-${i}`} />
                  ))
                : sortedData.map((token) => (
                    <TableRow key={`${token.pair}-${token.price}`} token={token} timeFrame={timeFrame} />
                  ))}
            </tbody>
          </table>
        </div>
      </ErrorBoundary>
    </div>
  );
}
