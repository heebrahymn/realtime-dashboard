import type { NgxStock } from './mockData';
import { mockNgxStocks } from './mockData';

export const fetchNgxStocks = async (): Promise<NgxStock[]> => {
  // Simulate 100ms API network latency for realistic loading skeletons
  await new Promise((resolve) => setTimeout(resolve, 100));
  return mockNgxStocks;
};

export const fetchNgxStockDetail = async (symbol: string): Promise<NgxStock | undefined> => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return mockNgxStocks.find((s) => s.symbol.toLowerCase() === symbol.toLowerCase());
};
