import { useQuery } from '@tanstack/react-query';
import { fetchCoinMarkets, fetchCoinHistory } from '../api/coingecko';

export const useCoinMarketsQuery = () => {
  return useQuery({
    queryKey: ['coin-markets'],
    queryFn: fetchCoinMarkets,
    refetchInterval: 1000 * 60, // Poll every 60 seconds as defined in the PRD
    staleTime: 1000 * 30, // 30s stale time before background updates
  });
};

export const useCoinHistoryQuery = (coinId: string) => {
  return useQuery({
    queryKey: ['coin-history', coinId],
    queryFn: () => fetchCoinHistory(coinId),
    staleTime: 1000 * 60 * 5, // History changes slowly, standard 5 min stale time
  });
};
