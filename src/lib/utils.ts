export function cn(...inputs: (string | undefined | null | false)[]) {
  return inputs.filter(Boolean).join(' ');
}

// src/lib/utils.ts

import { TokenData } from "@/types/token";

// export function generateMockData(count: number = 20): TokenData[] {
//   const tokens: TokenData[] = [];

//   for (let i = 0; i < count; i++) {
//     const base = `TOKEN${i}`;
//     tokens.push({
//       pair: `${base}/USDT`,
//       marketCap: `${(Math.random() * 100).toFixed(1)}M`,
//       liquidity: `${(Math.random() * 50).toFixed(1)}M`,
//       volume: `${(Math.random() * 10).toFixed(1)}M`,
//       txns: `${Math.floor(Math.random() * 10000)}`,
//       auditStatus: Math.random() > 0.5 ? "Audited" : "Pending",
//       price: +(Math.random() * 100).toFixed(2),
//       change1h: +(Math.random() * 20 - 10).toFixed(2),   // ±10%
//       change24h: +(Math.random() * 40 - 20).toFixed(2),  // ±20%
//       change7d: +(Math.random() * 60 - 30).toFixed(2),   // ±30%
//       logo: `https://dummyimage.com/24x24/000/fff&text=${base[0]}`,
//     });
//   }

//   return tokens;
// }

export function generateMockData(count: number = 20) {
  const tokens = [
    {
      symbol: "ETH",
      name: "Ethereum",
      logo: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaa39b223FE8D0A0E5C4F27eAD9083C756Cc2/logo.png",
    },
    {
      symbol: "BTC",
      name: "Bitcoin",
      logo: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/binance/assets/BTCB-1DE/logo.png",
    },
    {
      symbol: "SOL",
      name: "Solana",
      logo: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/solana/assets/So11111111111111111111111111111111111111112/logo.png",
    },
    {
      symbol: "BNB",
      name: "BNB",
      logo: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/binance/assets/BNB/logo.png",
    },
    {
      symbol: "ADA",
      name: "Cardano",
      logo: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/cardano/assets/ada/logo.png",
    },
    {
      symbol: "AVAX",
      name: "Avalanche",
      logo: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/avalanche/assets/0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7/logo.png",
    },
    {
      symbol: "DOGE",
      name: "Dogecoin",
      logo: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/binance/assets/DOGE-BBB/logo.png",
    },
    {
      symbol: "MATIC",
      name: "Polygon",
      logo: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/polygon/assets/0x0000000000000000000000000000000000001010/logo.png",
    },
    {
      symbol: "XRP",
      name: "XRP",
      logo: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ripple/assets/XRP/logo.png",
    },
    {
      symbol: "UNI",
      name: "Uniswap",
      logo: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984/logo.png",
    },
  ];

  return Array.from({ length: count }, (_, i) => {
    const token = tokens[i % tokens.length];
    const random = (min: number, max: number) =>
      +(Math.random() * (max - min) + min).toFixed(2);

    return {
      pair: `${token.symbol}/USDT`,
      marketCap: `$${random(100, 1000)}M`,
      liquidity: `$${random(10, 500)}K`,
      volume: `$${random(10, 300)}K`,
      txns: `${Math.floor(random(100, 900))}`,
      auditStatus: Math.random() > 0.5 ? "Audited" : "Pending",
      price: random(0.01, 1000),
      change1h: random(-5, 5),
      change24h: random(-10, 10),
      change7d: random(-20, 20),
      logo: token.logo,
    };
  });
}
