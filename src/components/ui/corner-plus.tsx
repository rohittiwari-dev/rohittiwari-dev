import { cn } from "@/lib/utils";

interface CornerPlusProps {
  className?: string;
  /** Width & height of the mark in pixels. Default 12. */
  size?: number;
  /** Stroke thickness (in the 12×12 viewBox units). Default 1. */
  strokeWidth?: number;
  style?: React.CSSProperties;
}

export function CornerPlus({
  className,
  size = 12,
  strokeWidth = 1,
  style,
}: CornerPlusProps) {
  return (
    <svg
      aria-hidden="true"
      className={cn(
        "absolute z-20 text-indigo-400/60 transition-colors duration-300",
        className,
      )}
      style={{ width: size, height: size, ...style }}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 0V12M0 6H12"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
    </svg>
  );
}

interface CornerPlusesProps {
  /** Width & height of each mark in pixels. Default 12. */
  size?: number;
  /** Stroke thickness (in the 12×12 viewBox units). Default 1. */
  strokeWidth?: number;
  /**
   * Distance (px) each mark sits from the corner. Defaults to `size / 2` so
   * the cross straddles the corner exactly. Larger values push marks outward.
   */
  offset?: number;
  /** Applied to every mark — handy for overriding color (e.g. text-cyan-300). */
  className?: string;
}

export function CornerPluses({
  size = 12,
  strokeWidth = 1,
  offset,
  className,
}: CornerPlusesProps) {
  const o = offset ?? size / 2;
  const shared = { size, strokeWidth, className };

  return (
    <>
      <CornerPlus {...shared} style={{ top: -o, left: -o }} />
      <CornerPlus {...shared} style={{ top: -o, right: -o }} />
      <CornerPlus {...shared} style={{ bottom: -o, left: -o }} />
      <CornerPlus {...shared} style={{ bottom: -o, right: -o }} />
    </>
  );
}
