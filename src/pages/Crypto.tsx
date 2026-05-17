export const Crypto = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-display font-bold text-text-primary mb-2">Crypto Markets</h1>
        <p className="text-text-secondary text-[15px] font-body">
          Live telemetry tracked via CoinGecko REST endpoints.
        </p>
      </div>
      <div className="bg-surface border border-neutral-light p-8 rounded-xl shadow-card">
        <p className="text-text-secondary">Market data, charts, and metrics will load here shortly.</p>
      </div>
    </div>
  );
};
