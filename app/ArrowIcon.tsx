type ArrowIconProps = {
  className?: string;
  direction?: "up-right" | "right" | "left";
  placement?: "before" | "after" | "none";
};

export function ArrowIcon({
  className,
  direction = "up-right",
  placement = "after",
}: ArrowIconProps) {
  const rotation = { "up-right": "0deg", right: "45deg", left: "225deg" }[direction];
  const spacing = placement === "before" ? { marginRight: "0.3em" } : placement === "after" ? { marginLeft: "0.3em" } : undefined;

  return (
    <svg
      className={className}
      width="0.85em"
      height="0.85em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ display: "inline-block", verticalAlign: "-0.08em", transform: `rotate(${rotation})`, ...spacing }}
    >
      <line x1="6" y1="18" x2="18" y2="6" />
      <polyline points="8 6 18 6 18 16" />
    </svg>
  );
}
