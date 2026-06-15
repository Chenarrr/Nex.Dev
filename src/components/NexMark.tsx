export function NexMark({ size = 28, node = "#7C5CFF", slash = "currentColor" }: { size?: number; node?: string; slash?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" aria-label="Nex mark">
      <polygon points="56,10 84,10 44,90 16,90" fill={slash} />
      <circle cx="86" cy="86" r="7" fill={node} />
    </svg>
  );
}
