import type { ReactNode } from "react";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  spotlightSize?: number;
  spotlightOpacity?: number;
  asChild?: boolean;
}

export function SpotlightCard({
  children,
  className = "",
}: SpotlightCardProps) {
  return <div className={"relative " + className}>{children}</div>;
}
