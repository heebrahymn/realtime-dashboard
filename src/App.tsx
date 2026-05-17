function App() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 select-none">
      <div className="max-w-md w-full bg-surface border border-neutral-light rounded-xl p-8 shadow-card text-center transition-all duration-200 hover:-translate-y-0.5 hover:shadow-glow">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary mb-6">
          System Initialized
        </span>
        <h1 className="text-4xl font-display font-bold text-text-primary tracking-tight mb-4">
          Realtime Dashboard
        </h1>
        <p className="text-text-secondary font-body text-[15px] leading-relaxed mb-6">
          A premium multi-API telemetry board styled quietly and confidently in indigo.
        </p>
        <div className="flex justify-center gap-4">
          <button className="px-5 py-2 rounded-md bg-primary text-white font-medium text-[15px] shadow-glow hover:bg-primary-hover active:translate-y-0.5 transition-all duration-150">
            Get Started
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
