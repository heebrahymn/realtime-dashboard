export interface MockCoinMarket {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  price_change_percentage_24h: number;
}

export const mockCoinMarkets: MockCoinMarket[] = [
  {
    id: 'bitcoin',
    symbol: 'btc',
    name: 'Bitcoin',
    image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
    current_price: 92450.00,
    market_cap: 1812450000000,
    market_cap_rank: 1,
    price_change_percentage_24h: 2.45
  },
  {
    id: 'ethereum',
    symbol: 'eth',
    name: 'Ethereum',
    image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
    current_price: 3420.50,
    market_cap: 410245000000,
    market_cap_rank: 2,
    price_change_percentage_24h: -1.12
  },
  {
    id: 'solana',
    symbol: 'sol',
    name: 'Solana',
    image: 'https://assets.coingecko.com/coins/images/4128/large/solana.png',
    current_price: 185.75,
    market_cap: 85240000000,
    market_cap_rank: 3,
    price_change_percentage_24h: 5.84
  },
  {
    id: 'cardano',
    symbol: 'ada',
    name: 'Cardano',
    image: 'https://assets.coingecko.com/coins/images/975/large/cardano.png',
    current_price: 0.62,
    market_cap: 22000000000,
    market_cap_rank: 4,
    price_change_percentage_24h: 0.85
  },
  {
    id: 'ripple',
    symbol: 'xrp',
    name: 'Ripple',
    image: 'https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png',
    current_price: 1.15,
    market_cap: 65000000000,
    market_cap_rank: 5,
    price_change_percentage_24h: -0.45
  }
];

// Generates 7 days of 1-hour interval points with simple random walk
const generateMockHistory = (startPrice: number, points = 30) => {
  const prices: [number, number][] = [];
  let currentPrice = startPrice;
  const now = Date.now();
  const step = 24 * 60 * 60 * 1000 / (points / 7); // distributed over 7 days

  for (let i = points; i >= 0; i--) {
    const timestamp = now - i * step;
    const change = (Math.random() - 0.48) * (startPrice * 0.02); // slight positive bias
    currentPrice += change;
    prices.push([timestamp, parseFloat(currentPrice.toFixed(2))]);
  }

  return {
    prices,
    market_caps: prices.map(([t, p]) => [t, p * 1000000]),
    total_volumes: prices.map(([t, p]) => [t, p * 50000])
  };
};

export const mockBitcoinHistory = generateMockHistory(90000, 30);
export const mockEthereumHistory = generateMockHistory(3350, 30);
export const mockSolanaHistory = generateMockHistory(170, 30);

export const getMockHistory = (coinId: string) => {
  if (coinId === 'bitcoin') return mockBitcoinHistory;
  if (coinId === 'ethereum') return mockEthereumHistory;
  if (coinId === 'solana') return mockSolanaHistory;
  return generateMockHistory(100, 30);
};
