import { z } from 'zod';
import { mockCoinMarkets, getMockHistory } from './mockData';

export const CoinMarketSchema = z.object({
  id: z.string(),
  symbol: z.string(),
  name: z.string(),
  image: z.string(),
  current_price: z.number(),
  market_cap: z.number(),
  market_cap_rank: z.number(),
  price_change_percentage_24h: z.number().nullable().transform(val => val ?? 0),
});

export const CoinMarketsResponseSchema = z.array(CoinMarketSchema);

export const MarketChartSchema = z.object({
  prices: z.array(z.tuple([z.number(), z.number()])),
});

export type CoinMarket = z.infer<typeof CoinMarketSchema>;
export type MarketChart = z.infer<typeof MarketChartSchema>;

const COINGECKO_BASE_URL = 'https://api.coingecko.com/api/v3';

export const fetchCoinMarkets = async (): Promise<CoinMarket[]> => {
  try {
    const res = await fetch(
      `${COINGECKO_BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false`
    );
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
    const data = await res.json();
    return CoinMarketsResponseSchema.parse(data);
  } catch (error) {
    console.warn('CoinGecko markets fetch failed, returning mock data:', error);
    return mockCoinMarkets;
  }
};

export const fetchCoinHistory = async (coinId: string): Promise<MarketChart> => {
  try {
    const res = await fetch(
      `${COINGECKO_BASE_URL}/coins/${coinId}/market_chart?vs_currency=usd&days=7`
    );
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
    const data = await res.json();
    return MarketChartSchema.parse(data);
  } catch (error) {
    console.warn(`CoinGecko history fetch failed for ${coinId}, returning mock data:`, error);
    return getMockHistory(coinId);
  }
};
