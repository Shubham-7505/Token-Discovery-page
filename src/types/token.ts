export type TimeFrame = "1h" | "24h" | "7d";

export type PriceChangeDirection = "up" | "down" | null;

export type TokenData = {
  pair: string;
  logo: string;
  price: number;
  marketCap: string;
  liquidity: string;      // Mocked
  volume: string;
  txns: string;           // Mocked
  auditStatus: string;    // Mocked
  change1h: number;
  change24h: number;
  change7d: number;
};
