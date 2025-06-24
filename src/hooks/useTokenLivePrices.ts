import { useEffect, useState } from "react";

type TokenLiveData = {
  [symbol: string]: {
    priceUsd: string;
  };
};

export default function useTokenLivePrices(symbols: string[]) {
  const [prices, setPrices] = useState<TokenLiveData>({});

  useEffect(() => {
    if (!symbols.length) return;

    const assetIds = symbols.map(s => s.toLowerCase()).join(',');
    const ws = new WebSocket(`wss://ws.coincap.io/prices?assets=${assetIds}`);

    ws.onmessage = (msg) => {
      const raw = JSON.parse(msg.data); // e.g., { btc: "62000.45" }
      const update: TokenLiveData = {};

      for (const key in raw) {
        update[key] = { priceUsd: raw[key] };
      }

      setPrices(prev => ({ ...prev, ...update }));
    };

    return () => ws.close();
  }, [symbols]);

  return prices;
}
