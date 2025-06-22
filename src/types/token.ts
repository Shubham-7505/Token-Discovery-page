export type TimeFrame = "1h" | "24h" | "7d";

export type PriceChangeDirection = "up" | "down" | null;

export type TokenData = {
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
