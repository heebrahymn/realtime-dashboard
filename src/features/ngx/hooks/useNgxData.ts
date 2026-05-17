import { useQuery } from '@tanstack/react-query';
import { fetchNgxStocks, fetchNgxStockDetail } from '../api/ngx';

export const useNgxStocksQuery = () => {
  return useQuery({
    queryKey: ['ngx-stocks'],
    queryFn: fetchNgxStocks,
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });
};

export const useNgxStockDetailQuery = (symbol: string) => {
  return useQuery({
    queryKey: ['ngx-stock', symbol.toLowerCase().trim()],
    queryFn: () => fetchNgxStockDetail(symbol),
    staleTime: 1000 * 60 * 5,
    enabled: symbol.trim().length > 0,
  });
};
