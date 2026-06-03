import { cn } from "@/lib/utils";

interface CornerPlusProps {
  className?: string;
}

export function CornerPlus({ className }: CornerPlusProps) {
  return (
    <svg
      className={cn(
        "absolute z-20 h-3 w-3 text-indigo-400/60 transition-colors duration-300",
        className,
      )}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M6 0V12M0 6H12" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

export function CornerPluses() {
  return (
    <>
      <CornerPlus className="-left-1.5 -top-1.5" />
      <CornerPlus className="-right-1.5 -top-1.5" />
      <CornerPlus className="-bottom-1.5 -left-1.5" />
      <CornerPlus className="-bottom-1.5 -right-1.5" />
    </>
  );
}
