import { useState } from 'react';
import type { NgxStock } from '../api/mockData';
import { generateStockChartData } from '../api/mockData';
import { ResponsiveLine } from '@nivo/line';
import { Calculator, Award, Info } from 'lucide-react';

interface StockDetailProps {
  stock: NgxStock;
}

export const StockDetail = ({ stock }: StockDetailProps) => {
  const [amount, setAmount] = useState<number>(500000); // Default 500k NGN
  const [years, setYears] = useState<number>(3); // Default 3 Years holding

  const chartData = generateStockChartData(stock.symbol);

  // Investment Simulator Math
  // Compound Growth = Principal * (1 + (GrowthRate + DivYield) / 100) ^ Years
  const rate = (stock.annualGrowthRate + stock.dividendYield) / 100;
  const futureValue = amount * Math.pow(1 + rate, years);
  const totalReturn = futureValue - amount;
  const estimatedDividends = amount * (stock.dividendYield / 100) * years;
  const capitalGrowth = totalReturn - estimatedDividends;

  const getRecommendationBadge = (rec: NgxStock['recommendation']) => {
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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* 2-Column Section: Analyst Details & Trend Chart */}
      <div className="lg:col-span-2 space-y-6">
        {/* Analyst Rationale Card */}
        <div className="bg-surface border border-neutral-light rounded-xl p-6 shadow-card transition-all duration-200 hover:shadow-glow">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-light pb-4 mb-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-text-secondary">
                Equity Classification
              </span>
              <h3 className="text-2xl font-display font-bold text-text-primary mt-0.5">
                {stock.symbol} Detailed Analysis
              </h3>
            </div>
            <span className={`px-3 py-1 border text-xs font-bold uppercase rounded-full self-start sm:self-center ${getRecommendationBadge(stock.recommendation)}`}>
              {stock.recommendation} Rating
            </span>
          </div>

          <div className="space-y-4">
            <div className="flex gap-3 items-start bg-background p-4 rounded-lg border border-neutral-light">
              <Award className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-text-primary block mb-1">
                  Investment Rationale & Thesis
                </span>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {stock.rationale}
                </p>
              </div>
            </div>

            {/* Micro Valuation Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              <div className="bg-background border border-neutral-light rounded-lg p-3 text-center">
                <span className="text-[10px] text-text-secondary uppercase font-semibold block">PE Ratio Valuation</span>
                <span className="font-mono text-base font-bold text-text-primary mt-1 block">
                  {stock.peRatio}x
                </span>
                <span className="text-[9px] text-text-secondary font-mono">
                  {stock.peRatio < 10 ? 'Undervalued' : stock.peRatio < 18 ? 'Fair Value' : 'Premium P/E'}
                </span>
              </div>

              <div className="bg-background border border-neutral-light rounded-lg p-3 text-center">
                <span className="text-[10px] text-text-secondary uppercase font-semibold block">Dividend Yield</span>
                <span className="font-mono text-base font-bold text-success mt-1 block">
                  {stock.dividendYield}%
                </span>
                <span className="text-[9px] text-text-secondary font-mono">
                  Annual Cash Flow
                </span>
              </div>

              <div className="bg-background border border-neutral-light rounded-lg p-3 text-center">
                <span className="text-[10px] text-text-secondary uppercase font-semibold block">Est. Growth Rate</span>
                <span className="font-mono text-base font-bold text-text-primary mt-1 block">
                  {stock.annualGrowthRate}%
                </span>
                <span className="text-[9px] text-text-secondary font-mono">
                  Projected CAGR
                </span>
              </div>

              <div className="bg-background border border-neutral-light rounded-lg p-3 text-center">
                <span className="text-[10px] text-text-secondary uppercase font-semibold block">Liquidity Volume</span>
                <span className="font-mono text-base font-bold text-text-primary mt-1 block">
                  {stock.volume}M
                </span>
                <span className="text-[9px] text-text-secondary font-mono">
                  Daily Share Vol
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Nivo Price Timeline Chart */}
        <div className="bg-surface border border-neutral-light rounded-xl p-6 shadow-card transition-all duration-200 hover:shadow-glow">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
              Price Action
            </span>
            <h3 className="text-lg font-display font-bold text-text-primary mt-0.5">
              Weekly Price Action Timeline
            </h3>
          </div>
          <div className="w-full h-[280px]">
            <ResponsiveLine
              data={chartData}
              margin={{ top: 20, right: 20, bottom: 40, left: 60 }}
              xScale={{ type: 'point' }}
              yScale={{
                type: 'linear',
                min: 'auto',
                max: 'auto',
                stacked: false,
                reverse: false,
              }}
              yFormat={(value) => `₦${Number(value).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
              axisTop={null}
              axisRight={null}
              axisBottom={{
                tickSize: 0,
                tickPadding: 10,
                tickRotation: 0,
                legend: 'Trading Timeline',
                legendOffset: 34,
                legendPosition: 'middle',
              }}
              axisLeft={{
                tickSize: 0,
                tickPadding: 10,
                tickRotation: 0,
                legend: 'Share Price (₦)',
                legendOffset: -50,
                legendPosition: 'middle',
              }}
              enableGridX={false}
              enableGridY={true}
              colors={['#6366F1']}
              lineWidth={2.5}
              enablePoints={false}
              enableArea={true}
              areaOpacity={0.06}
              useMesh={true}
              defs={[
                {
                  id: 'gradientAreaStock',
                  type: 'linearGradient',
                  colors: [
                    { offset: 0, color: '#6366F1', opacity: 0.15 },
                    { offset: 1, color: '#6366F1', opacity: 0.01 },
                  ],
                },
              ]}
              fill={[{ match: '*', id: 'gradientAreaStock' }]}
              theme={{
                axis: {
                  legend: {
                    text: {
                      fontFamily: 'General Sans, sans-serif',
                      fontSize: 11,
                      fontWeight: 600,
                      fill: '#8c8c9c',
                    },
                  },
                  ticks: {
                    text: {
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: 10,
                      fill: '#8c8c9c',
                    },
                  },
                },
                grid: {
                  line: {
                    stroke: '#E8E8EC',
                    strokeWidth: 1,
                  },
                },
                crosshair: {
                  line: {
                    stroke: '#6366F1',
                    strokeWidth: 1,
                    strokeDasharray: '4 4',
                  },
                },
              }}
              tooltip={({ point }) => (
                <div className="bg-surface/90 backdrop-blur-md border border-neutral-light px-3 py-2 rounded-lg shadow-card text-[11px] font-medium font-body flex flex-col gap-0.5">
                  <span className="text-text-secondary font-mono text-[9px]">{point.data.x}</span>
                  <span className="text-text-primary">
                    Share Price: <strong className="text-primary font-mono">{point.data.yFormatted}</strong>
                  </span>
                </div>
              )}
            />
          </div>
        </div>
      </div>

      {/* 1-Column Section: High-Fidelity Decision Returns Simulator */}
      <div className="space-y-6">
        <div className="bg-surface border border-neutral-light rounded-xl p-6 shadow-card hover:shadow-glow transition-all duration-200 flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Calculator className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-display font-bold text-text-primary">
                Investment Return Simulator
              </h3>
            </div>
            <p className="text-text-secondary text-xs leading-relaxed mb-6">
              Simulate your growth holding period compounding capital gains alongside historical dividend cash flows.
            </p>

            <div className="space-y-5">
              {/* Slider for Principal Amount */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-text-secondary font-medium">Initial Capital</span>
                  <span className="font-mono font-bold text-text-primary bg-background border border-neutral-light px-2 py-0.5 rounded">
                    ₦{amount.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min="50000"
                  max="5000000"
                  step="50000"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full h-1.5 bg-neutral-light rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-[9px] text-text-secondary font-mono">
                  <span>₦50K</span>
                  <span>₦5M</span>
                </div>
              </div>

              {/* Slider for Duration */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-text-secondary font-medium">Holding Duration</span>
                  <span className="font-mono font-bold text-text-primary bg-background border border-neutral-light px-2 py-0.5 rounded">
                    {years} Years
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="1"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="w-full h-1.5 bg-neutral-light rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-[9px] text-text-secondary font-mono">
                  <span>1 Year</span>
                  <span>10 Years</span>
                </div>
              </div>
            </div>

            {/* Calculations Outputs */}
            <div className="bg-background border border-neutral-light rounded-xl p-4 mt-6 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-text-secondary">Simulated Growth (CAGR)</span>
                <span className="font-mono font-bold text-text-primary">+{stock.annualGrowthRate}%</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-text-secondary">Simulated Dividend Yield</span>
                <span className="font-mono font-bold text-success">+{stock.dividendYield}%</span>
              </div>
              <div className="border-t border-neutral-light pt-3 flex justify-between items-center text-xs">
                <span className="text-text-secondary">Simulated Dividend Cashflow</span>
                <span className="font-mono font-bold text-text-primary">₦{Math.round(estimatedDividends).toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-text-secondary">Simulated Capital Growth</span>
                <span className="font-mono font-bold text-text-primary">₦{Math.round(capitalGrowth).toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-neutral-light">
            <span className="text-[10px] text-text-secondary uppercase font-semibold block mb-1">
              Projected Portfolio Value
            </span>
            <div className="flex items-baseline justify-between">
              <h2 className="text-3xl font-display font-bold text-primary tracking-tight">
                ₦{Math.round(futureValue).toLocaleString()}
              </h2>
              <span className="text-xs font-mono font-bold text-success">
                +{((totalReturn / amount) * 100).toFixed(1)}% Return
              </span>
            </div>

            <div className="flex gap-2 items-center bg-primary/5 border border-primary/10 rounded-lg p-3 mt-4 text-[10px] text-text-secondary leading-relaxed">
              <Info className="w-4 h-4 text-primary shrink-0" />
              <span>
                Based on compounding estimated annual CAGR and historical cash payouts. Past metrics are not dynamic guarantees of future market capital growth.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default StockDetail;
