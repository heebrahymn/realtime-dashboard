import { useCoinMarketsQuery } from '../hooks/useCoinData';

interface CryptoListProps {
  selectedCoinId: string;
  onSelectCoin: (coinId: string, name: string) => void;
}

export const CryptoList = ({ selectedCoinId, onSelectCoin }: CryptoListProps) => {
  const { data: coins, isLoading, error } = useCoinMarketsQuery();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div key={idx} className="h-28 bg-surface border border-neutral-light rounded-xl p-5 flex flex-col justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-neutral-light rounded-full"></div>
              <div className="space-y-2 flex-1">
                <div className="h-4 w-24 bg-neutral-light rounded"></div>
                <div className="h-3 w-16 bg-neutral-light rounded"></div>
              </div>
            </div>
            <div className="h-5 w-20 bg-neutral-light rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error || !coins) {
    return (
      <div className="bg-surface border border-neutral-light p-8 rounded-xl text-center text-text-secondary">
        Failed to load market listings. Fallback mock data might be offline.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {coins.map((coin) => {
        const isSelected = coin.id === selectedCoinId;
        const changeIsPositive = coin.price_change_percentage_24h >= 0;

        return (
          <div
            key={coin.id}
            onClick={() => onSelectCoin(coin.id, coin.name)}
            className={`cursor-pointer overflow-hidden relative bg-surface border rounded-xl p-5 select-none transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card flex flex-col justify-between ${
              isSelected
                ? 'border-primary shadow-glow ring-3 ring-primary/12'
                : 'border-neutral-light'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <img
                  src={coin.image}
                  alt={coin.name}
                  className="w-10 h-10 rounded-full object-contain bg-background p-1"
                />
                <div>
                  <h4 className="font-display font-bold text-text-primary text-[15px] leading-tight">
                    {coin.name}
                  </h4>
                  <span className="text-xs uppercase font-mono text-text-secondary">
                    {coin.symbol}
                  </span>
                </div>
              </div>
              <span className="text-xs font-mono text-text-secondary bg-background px-2 py-0.5 rounded-full">
                Rank #{coin.market_cap_rank}
              </span>
            </div>

            <div className="flex items-end justify-between">
              <div>
                <span className="text-xs text-text-secondary block mb-0.5">Price</span>
                <span className="font-display font-bold text-text-primary text-lg">
                  ${coin.current_price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs text-text-secondary block mb-0.5">24h Change</span>
                <span
                  className={`text-sm font-semibold font-mono ${
                    changeIsPositive ? 'text-success' : 'text-error'
                  }`}
                >
                  {changeIsPositive ? '+' : ''}
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
