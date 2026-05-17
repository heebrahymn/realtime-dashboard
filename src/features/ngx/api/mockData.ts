export interface NgxStock {
  symbol: string;
  name: string;
  sector: 'Telecom' | 'Industrial' | 'Banking' | 'Consumer Goods';
  price: number; // in NGN
  change: number; // percentage change
  marketCap: number; // in NGN (Billions/Trillions)
  peRatio: number;
  dividendYield: number; // percentage
  volume: number; // millions of shares
  recommendation: 'Strong Buy' | 'Buy' | 'Hold' | 'Sell';
  rationale: string;
  annualGrowthRate: number; // estimated annual growth rate (percentage)
}

export const mockNgxStocks: NgxStock[] = [
  {
    symbol: 'MTNN',
    name: 'MTN Nigeria Communications PLC',
    sector: 'Telecom',
    price: 232.50,
    change: 1.45,
    marketCap: 4730, // 4.73 Trillion NGN
    peRatio: 14.2,
    dividendYield: 6.8,
    volume: 8.4,
    recommendation: 'Strong Buy',
    rationale: 'Dominant player in telecom sector with 5G rollout expansion and growing mobile money (MoMo PSB) fintech wallets driving high ARPU service revenue.',
    annualGrowthRate: 12.5
  },
  {
    symbol: 'DANGCEM',
    name: 'Dangote Cement PLC',
    sector: 'Industrial',
    price: 368.00,
    change: 2.10,
    marketCap: 6270, // 6.27 Trillion NGN
    peRatio: 12.8,
    dividendYield: 5.4,
    volume: 3.1,
    recommendation: 'Buy',
    rationale: 'Sub-Saharan Africa\'s largest cement producer, displaying high export volumes, currency hedging reserves, and strong infrastructure demand contracts.',
    annualGrowthRate: 10.2
  },
  {
    symbol: 'GTCO',
    name: 'Guaranty Trust Holding Co PLC',
    sector: 'Banking',
    price: 44.80,
    change: 3.25,
    marketCap: 1320, // 1.32 Trillion NGN
    peRatio: 5.2,
    dividendYield: 7.9,
    volume: 18.2,
    recommendation: 'Strong Buy',
    rationale: 'Highly efficient tier-1 bank with outstanding return on equity (ROE), strong digital banking transaction volume, and consistent biannual dividends payout history.',
    annualGrowthRate: 15.0
  },
  {
    symbol: 'ZENITHBANK',
    name: 'Zenith Bank PLC',
    sector: 'Banking',
    price: 39.15,
    change: -0.50,
    marketCap: 1230, // 1.23 Trillion NGN
    peRatio: 4.7,
    dividendYield: 8.4,
    volume: 14.5,
    recommendation: 'Buy',
    rationale: 'Attractive valuation with industry-leading dividend yield (8.4%). Robust balance sheet liquid ratios, despite currency revaluation macro volatility.',
    annualGrowthRate: 9.8
  },
  {
    symbol: 'BUACEMENT',
    name: 'BUA Cement PLC',
    sector: 'Industrial',
    price: 97.40,
    change: 0.15,
    marketCap: 3300, // 3.3 Trillion NGN
    peRatio: 17.5,
    dividendYield: 3.2,
    volume: 2.4,
    recommendation: 'Hold',
    rationale: 'Strong market position in northern Nigeria, but higher PE ratio relative to industry peer Dangote Cement limits near-term multiple expansion.',
    annualGrowthRate: 7.5
  },
  {
    symbol: 'NESTLE',
    name: 'Nestle Nigeria PLC',
    sector: 'Consumer Goods',
    price: 865.00,
    change: -1.20,
    marketCap: 685, // 685 Billion NGN
    peRatio: 23.4,
    dividendYield: 4.8,
    volume: 0.9,
    recommendation: 'Hold',
    rationale: 'Premium consumer brand but experiencing margin pressure from high agricultural raw material costs and foreign currency debt revaluation adjustments.',
    annualGrowthRate: 6.0
  }
];

// Generates simulated historical daily prices for a selected stock to display on Nivo chart
export const generateStockChartData = (symbol: string) => {
  const stock = mockNgxStocks.find(s => s.symbol.toUpperCase() === symbol.toUpperCase()) || mockNgxStocks[0];
  const basePrice = stock.price;
  const data: { x: string; y: number }[] = [];
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  days.forEach((day, idx) => {
    // Generate organic price random walks
    const dev = (Math.sin(idx * 1.8) * (basePrice * 0.02)) + (Math.random() - 0.5) * (basePrice * 0.015);
    data.push({
      x: day,
      y: parseFloat((basePrice + dev).toFixed(2))
    });
  });

  return [
    {
      id: symbol,
      color: '#6366F1',
      data
    }
  ];
};
