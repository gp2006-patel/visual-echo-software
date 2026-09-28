import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function GlassCard({
  children,
  className,
  overCanvas = false,
}: {
  children: ReactNode;
  className?: string;
  overCanvas?: boolean;
}) {
  return (
    <div
      className={cn(
        "glass p-5 sm:p-6",
        overCanvas && "glass-mobile",
        className,
      )}
    >
      {children}
    </div>
  );
}
