import { useState } from 'react';
import { useNgxStocksQuery } from '../features/ngx/hooks/useNgxData';
import { StockList } from '../features/ngx/components/StockList';
import { StockDetail } from '../features/ngx/components/StockDetail';
import { Landmark } from 'lucide-react';

export const Ngx = () => {
  const [selectedSymbol, setSelectedSymbol] = useState('MTNN');
  const { data: stocks, isLoading, error } = useNgxStocksQuery();

  const selectedStock = stocks?.find(
    (s) => s.symbol.toUpperCase() === selectedSymbol.toUpperCase()
  );

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary mb-3">
          <Landmark className="w-3.5 h-3.5" />
          Nigerian Capital Markets
        </span>
        <h1 className="text-4xl font-display font-bold text-text-primary tracking-tight mb-2">
          NGX Investment Board
        </h1>
        <p className="text-text-secondary text-[15px] font-body">
          Track leading bluechips, analyze P/E multiples, and simulate future returns for decision support.
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-8 animate-pulse">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="h-32 bg-surface border border-neutral-light rounded-xl"></div>
            ))}
          </div>
          <div className="h-96 bg-surface border border-neutral-light rounded-xl"></div>
        </div>
      ) : error || !stocks ? (
        <div className="bg-surface border border-neutral-light rounded-xl p-8 text-center text-text-secondary">
          Failed to fetch NGX Stock telemetry data. Please verify network.
        </div>
      ) : (
        <div className="space-y-8">
          {/* List of Tickers */}
          <StockList
            stocks={stocks}
            selectedSymbol={selectedSymbol}
            onSelectStock={setSelectedSymbol}
          />

          {/* Deep Telemetry View */}
          {selectedStock ? (
            <StockDetail stock={selectedStock} />
          ) : (
            <div className="bg-surface border border-neutral-light rounded-xl p-8 text-center text-text-secondary">
              Select a stock to inspect detailed telemetry.
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default Ngx;
