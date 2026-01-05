import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function BoltIcon(props: IconProps) {
  return (
    <svg
      width={props?.width ?? 20}
      height={props?.height ?? 20}
      viewBox="0 0 24 24"
      fill={props?.color ?? "currentColor"}
      {...props}
    >
      <path d="M13 2L3 14h7v8l10-12h-7z" />
    </svg>
  );
}