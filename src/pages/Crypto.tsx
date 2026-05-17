import { useState } from 'react';
import { CryptoList } from '../features/crypto/components/CryptoList';
import { CryptoChart } from '../features/crypto/components/CryptoChart';

export const Crypto = () => {
  const [selectedCoin, setSelectedCoin] = useState({ id: 'bitcoin', name: 'Bitcoin' });

  const handleSelectCoin = (id: string, name: string) => {
    setSelectedCoin({ id, name });
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div>
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary mb-3">
          Market Intelligence
        </span>
        <h1 className="text-4xl font-display font-bold text-text-primary tracking-tight mb-2">
          Crypto Telemetry
        </h1>
        <p className="text-text-secondary text-[15px] font-body">
          Select assets below to analyze high-frequency historical trends and market analytics.
        </p>
      </div>

      <div className="space-y-6">
        {/* Markets Grid */}
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-text-secondary mb-4">
            Top Tradable Assets
          </h2>
          <CryptoList selectedCoinId={selectedCoin.id} onSelectCoin={handleSelectCoin} />
        </div>

        {/* Live Visualization Chart */}
        <div className="pt-2">
          <CryptoChart coinId={selectedCoin.id} coinName={selectedCoin.name} />
        </div>
      </div>
    </div>
  );
};
