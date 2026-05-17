import { useState } from 'react';
import type { NgxStock } from '../api/mockData';
import { Search, TrendingUp, TrendingDown } from 'lucide-react';

interface StockListProps {
  stocks: NgxStock[];
  selectedSymbol: string;
  onSelectStock: (symbol: string) => void;
}

export const StockList = ({ stocks, selectedSymbol, onSelectStock }: StockListProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState<string>('All');

  const sectors = ['All', 'Telecom', 'Industrial', 'Banking', 'Consumer Goods'];

  const filteredStocks = stocks.filter((stock) => {
    const matchesSearch =
      stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSector = selectedSector === 'All' || stock.sector === selectedSector;
    return matchesSearch && matchesSector;
  });

  const getRecommendationStyle = (rec: NgxStock['recommendation']) => {
    switch (rec) {
      case 'Strong Buy':
        return 'bg-success/15 text-success border-success/30';
      case 'Buy':
        return 'bg-success/10 text-success/90 border-success/20';
      case 'Hold':
        return 'bg-warning/10 text-warning border-warning/20';
      default:
        return 'bg-error/10 text-error border-error/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Search & Sector Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            placeholder="Search symbol or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-neutral-light rounded-md bg-surface text-text-primary font-body text-sm focus:outline-none focus:border-primary transition-all duration-150"
          />
          <Search className="w-4 h-4 text-text-secondary absolute left-3 top-3" />
        </div>

        <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
          {sectors.map((sector) => (
            <button
              key={sector}
              onClick={() => setSelectedSector(sector)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-200 cursor-pointer ${
                selectedSector === sector
                  ? 'bg-primary text-white shadow-glow'
                  : 'bg-surface border border-neutral-light text-text-secondary hover:border-text-secondary'
              }`}
            >
              {sector}
            </button>
          ))}
        </div>
      </div>

      {/* Stocks Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStocks.map((stock) => {
          const isSelected = selectedSymbol.toUpperCase() === stock.symbol.toUpperCase();
          const isPositive = stock.change >= 0;

          return (
            <div
              key={stock.symbol}
              onClick={() => onSelectStock(stock.symbol)}
              className={`bg-surface border rounded-xl p-5 shadow-card cursor-pointer transition-all duration-250 flex flex-col justify-between hover:-translate-y-0.5 ${
                isSelected
                  ? 'border-primary ring-2 ring-primary/20 shadow-glow'
                  : 'border-neutral-light hover:border-text-secondary'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-text-secondary">
                      {stock.sector}
                    </span>
                    <h4 className="font-display font-bold text-text-primary text-base mt-0.5">
                      {stock.symbol}
                    </h4>
                  </div>
                  <span className={`px-2 py-0.5 border text-[10px] font-bold uppercase rounded-full ${getRecommendationStyle(stock.recommendation)}`}>
                    {stock.recommendation}
                  </span>
                </div>

                <div>
                  <p className="text-text-secondary text-xs truncate font-medium">
                    {stock.name}
                  </p>
                </div>

                <div className="flex items-baseline justify-between pt-2">
                  <span className="text-2xl font-display font-bold text-text-primary tracking-tight">
                    ₦{stock.price.toFixed(2)}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-mono font-bold ${
                      isPositive ? 'text-success' : 'text-error'
                    }`}
                  >
                    {isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                    {isPositive ? '+' : ''}
                    {stock.change.toFixed(2)}%
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 border-t border-neutral-light pt-4 mt-4 text-[10px] text-text-secondary font-mono">
                <div>
                  <span className="block text-[8px] uppercase font-semibold">PE Ratio</span>
                  <span className="text-text-primary font-bold text-xs">{stock.peRatio}x</span>
                </div>
                <div>
                  <span className="block text-[8px] uppercase font-semibold">Div Yield</span>
                  <span className="text-text-primary font-bold text-xs">{stock.dividendYield}%</span>
                </div>
                <div>
                  <span className="block text-[8px] uppercase font-semibold">Market Cap</span>
                  <span className="text-text-primary font-bold text-xs">
                    ₦{stock.marketCap >= 1000 ? `${(stock.marketCap / 1000).toFixed(2)}T` : `${stock.marketCap}B`}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default StockList;
