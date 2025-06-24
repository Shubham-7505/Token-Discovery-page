type CoinGeckoToken = {
  symbol: string;
  image: string;
  current_price: number;
  market_cap: number;
  total_volume: number;
  price_change_percentage_1h_in_currency?: number;
  price_change_percentage_24h_in_currency: number;
  price_change_percentage_7d_in_currency?: number;
};

export async function fetchRealTokenData() {
  const res = await fetch(
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false&price_change_percentage=1h,24h,7d'
  );
  const data = await res.json() as CoinGeckoToken[];

  return data.map((t) => ({
    pair: `${t.symbol.toUpperCase()}/USDT`,
    logo: t.image,
    price: t.current_price,
    marketCap: `$${(t.market_cap / 1e6).toFixed(2)}M`,
    volume: `$${(t.total_volume / 1e3).toFixed(2)}K`,
    liquidity: `$${(Math.random() * 500).toFixed(2)}K`,
    txns: `${Math.floor(Math.random() * 10000)}`,
    auditStatus: Math.random() > 0.5 ? "Audited" : "Pending",
    change1h: t.price_change_percentage_1h_in_currency ?? 0,
    change24h: t.price_change_percentage_24h_in_currency ?? 0,
    change7d: t.price_change_percentage_7d_in_currency ?? 0,
  }));
}
