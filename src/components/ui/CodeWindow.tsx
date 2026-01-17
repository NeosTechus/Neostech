import { useEffect, useState } from 'react';
import { Progress } from './progress';

const CodeWindow = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Animated loading bars with different widths
  const bars = [
    { width: '45%', delay: '0s' },
    { width: '85%', delay: '0.1s' },
    { width: '60%', delay: '0.2s' },
    { width: '75%', delay: '0.3s' },
    { width: '95%', delay: '0.4s' },
    { width: '70%', delay: '0.5s' },
  ];

  return (
    <div className="relative w-full max-w-lg mx-auto animate-fade-in-delay-2">
      {/* Glow effect behind */}
      <div className="absolute -inset-4 bg-primary/10 rounded-3xl blur-2xl" />
      
      {/* Main window */}
      <div className="relative glass rounded-2xl border border-border/50 overflow-hidden shadow-2xl">
        {/* Window chrome */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border/30">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>

        {/* Code area with animated bars */}
        <div className="p-6 space-y-4">
          {bars.map((bar, index) => (
            <div
              key={index}
              className="h-3 rounded-full bg-muted/50 overflow-hidden"
              style={{ 
                width: bar.width,
                animation: `pulse 2s ease-in-out infinite`,
                animationDelay: bar.delay
              }}
            >
              <div 
                className="h-full bg-muted rounded-full"
                style={{
                  animation: `shimmer 2s ease-in-out infinite`,
                  animationDelay: bar.delay
                }}
              />
            </div>
          ))}
        </div>

        {/* Status section */}
        <div className="mx-4 mb-4 p-4 rounded-xl bg-background/50 border border-border/30">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              Status
            </span>
            <span className="text-sm font-semibold text-green-400">
              Operational
            </span>
          </div>
          <div className="relative h-2 rounded-full bg-muted/30 overflow-hidden">
            <div 
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-green-500 to-green-400 transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
            {/* Animated glow dot at the end */}
            <div 
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-green-400 shadow-lg shadow-green-400/50 transition-all duration-100 ease-out"
              style={{ left: `calc(${progress}% - 6px)` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeWindow;
