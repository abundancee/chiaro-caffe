// Chi, the Chiaro cup. Appears on the loader, empty states, the staff ticket and the footer.
type Mood = "happy" | "wink" | "sleepy" | "wow";

export function Mascot({ mood = "happy", className = "", steam = true }: { mood?: Mood; className?: string; steam?: boolean }) {
  return (
    <svg viewBox="0 0 120 124" className={className} aria-hidden fill="none">
      {steam && mood !== "sleepy" && (
        <g stroke="currentColor" strokeWidth="5" strokeLinecap="round">
          <path className="steam" d="M40 28c-6-6 6-10 0-18" />
          <path className="steam steam-2" d="M58 28c-6-6 6-10 0-18" />
          <path className="steam steam-3" d="M76 28c-6-6 6-10 0-18" />
        </g>
      )}
      <path d="M92 52h6a15 15 0 0 1 0 30h-8" stroke="#1a120c" strokeWidth="6" />
      <path d="M22 36h74v50a26 26 0 0 1-26 26H48a26 26 0 0 1-26-26V36Z" fill="#fffaf0" stroke="#1a120c" strokeWidth="6" />
      <path d="M25 39h68v9H25z" fill="#5c3a22" />
      {mood === "sleepy" ? (
        <g stroke="#1a120c" strokeWidth="5" strokeLinecap="round">
          <path d="M36 70c3 4 9 4 12 0M68 70c3 4 9 4 12 0" />
        </g>
      ) : mood === "wink" ? (
        <g>
          <circle className="blink" cx="42" cy="68" r="6" fill="#1a120c" />
          <path d="M67 69c3-4 9-4 12 0" stroke="#1a120c" strokeWidth="5" strokeLinecap="round" />
        </g>
      ) : (
        <g fill="#1a120c">
          <circle className="blink" cx="42" cy="68" r={mood === "wow" ? 7 : 6} />
          <circle className="blink" cx="74" cy="68" r={mood === "wow" ? 7 : 6} />
        </g>
      )}
      {mood === "wow" ? (
        <ellipse cx="58" cy="89" rx="6" ry="7" fill="#1a120c" />
      ) : mood === "sleepy" ? (
        <path d="M52 88h12" stroke="#1a120c" strokeWidth="5" strokeLinecap="round" />
      ) : (
        <path d="M46 84c6 9 18 9 24 0" stroke="#1a120c" strokeWidth="5" strokeLinecap="round" />
      )}
      <circle cx="31" cy="80" r="5.5" fill="#f2622e" opacity=".75" />
      <circle cx="85" cy="80" r="5.5" fill="#f2622e" opacity=".75" />
    </svg>
  );
}
