export const Overview = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-display font-bold text-text-primary mb-2">Overview</h1>
        <p className="text-text-secondary text-[15px] font-body">
          System telemetry and aggregated live metrics.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface border border-neutral-light p-6 rounded-xl shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-glow">
          <h2 className="text-sm font-display font-medium text-text-secondary uppercase tracking-wider mb-2">
            Crypto Status
          </h2>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold font-display text-text-primary">Live</span>
            <span className="h-2 w-2 rounded-full bg-success"></span>
          </div>
        </div>
        <div className="bg-surface border border-neutral-light p-6 rounded-xl shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-glow">
          <h2 className="text-sm font-display font-medium text-text-secondary uppercase tracking-wider mb-2">
            Weather Status
          </h2>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold font-display text-text-primary">Live</span>
            <span className="h-2 w-2 rounded-full bg-success"></span>
          </div>
        </div>
        <div className="bg-surface border border-neutral-light p-6 rounded-xl shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-glow">
          <h2 className="text-sm font-display font-medium text-text-secondary uppercase tracking-wider mb-2">
            GitHub Status
          </h2>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold font-display text-text-primary">Live</span>
            <span className="h-2 w-2 rounded-full bg-success"></span>
          </div>
        </div>
      </div>
    </div>
  );
};
