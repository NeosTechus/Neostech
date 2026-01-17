import { useEffect, useState } from 'react';

const CodeWindow = () => {
  const [progress, setProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setTimeout(() => setProgress(0), 500);
          return 100;
        }
        return prev + 0.8;
      });
    }, 40);

    return () => clearInterval(interval);
  }, []);

  // Animated code lines with varying widths
  const codeLines = [
    { width: '40%', opacity: 0.6 },
    { width: '75%', opacity: 0.8 },
    { width: '55%', opacity: 0.5 },
    { width: '85%', opacity: 0.7 },
    { width: '65%', opacity: 0.6 },
  ];

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Glow effect behind */}
      <div className="absolute -inset-6 bg-primary/15 rounded-3xl blur-3xl animate-pulse" />
      
      {/* Main window */}
      <div className="relative glass rounded-xl border border-border/40 overflow-hidden shadow-2xl backdrop-blur-xl">
        {/* Window chrome */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border/20 bg-background/30">
          <div className="w-3 h-3 rounded-full bg-red-500/90" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/90" />
          <div className="w-3 h-3 rounded-full bg-green-500/90" />
          <div className="ml-4 flex-1 h-5 rounded bg-muted/20 max-w-[120px]" />
        </div>

        {/* Code area with animated bars */}
        <div className="p-5 space-y-3">
          {codeLines.map((line, index) => (
            <div
              key={index}
              className="h-2.5 rounded bg-muted/40 animate-pulse"
              style={{ 
                width: line.width,
                opacity: line.opacity,
                animationDelay: `${index * 0.15}s`
              }}
            />
          ))}
        </div>

        {/* Status section */}
        <div className="mx-4 mb-4 p-3 rounded-lg bg-background/40 border border-border/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
              Status
            </span>
            <span className="text-xs font-semibold text-green-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Operational
            </span>
          </div>
          <div className="relative h-1.5 rounded-full bg-muted/20 overflow-hidden">
            <div 
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-green-500 via-green-400 to-emerald-400 transition-all duration-75 ease-linear"
              style={{ width: `${progress}%` }}
            />
            {/* Glow effect on progress */}
            <div 
              className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-green-400 shadow-lg shadow-green-400/60 transition-all duration-75 ease-linear"
              style={{ 
                left: `calc(${Math.min(progress, 98)}% - 4px)`,
                opacity: progress > 2 ? 1 : 0
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeWindow;
