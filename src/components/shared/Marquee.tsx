import { cn } from "@/lib/cn";

type Props = {
  children: React.ReactNode;
  direction?: "left" | "right";
  durationSec?: number;
  className?: string;
};

export function Marquee({
  children,
  direction = "left",
  durationSec = 60,
  className,
}: Props) {
  const animationClass =
    direction === "left" ? "animate-marquee-left" : "animate-marquee-right";

  return (
    <div
      className={cn(
        "marquee-mask marquee-pause overflow-x-clip py-2",
        className,
      )}
    >
      <div
        className={cn("marquee-track gap-1.5 md:gap-2", animationClass)}
        style={{ animationDuration: `${durationSec}s` }}
      >
        {children}
        {children}
      </div>
    </div>
  );
}
