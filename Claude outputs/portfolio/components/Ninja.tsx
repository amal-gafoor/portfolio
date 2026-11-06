/**
 * Tiny black-clad ninja that walks around the avatar ring.
 * Pure SVG + CSS keyframes (see globals.css .ninja-*). No JS.
 */
export function Ninja() {
  return (
    <div className="ninja-orbit" aria-hidden>
      <svg
        className="ninja"
        viewBox="0 0 34 40"
        width="44"
        height="52"
        fill="none"
      >
        <defs>
          <linearGradient id="nk" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#1c1c1f" />
            <stop offset="1" stopColor="#050505" />
          </linearGradient>
        </defs>

        {/* katana on back */}
        <g>
          <rect x="22" y="4" width="2" height="14" rx="1" fill="#d4d4d8" transform="rotate(28 23 11)" />
          <rect x="21" y="16" width="4" height="2" rx="1" fill="#fafafa" transform="rotate(28 23 17)" />
        </g>

        {/* legs */}
        <g className="leg-l">
          <rect x="11" y="26" width="4.5" height="11" rx="2.2" fill="url(#nk)" stroke="var(--ninja-outline)" strokeWidth="0.6" />
        </g>
        <g className="leg-r">
          <rect x="18.5" y="26" width="4.5" height="11" rx="2.2" fill="url(#nk)" stroke="var(--ninja-outline)" strokeWidth="0.6" />
        </g>

        {/* body */}
        <rect x="9.5" y="15" width="15" height="14" rx="5" fill="url(#nk)" stroke="var(--ninja-outline)" strokeWidth="0.6" />
        {/* belt */}
        <rect x="9.5" y="22.5" width="15" height="2" fill="#e4e4e7" opacity="0.9" />

        {/* arm */}
        <g className="arm">
          <rect x="15" y="16" width="4" height="10" rx="2" fill="url(#nk)" stroke="var(--ninja-outline)" strokeWidth="0.6" />
        </g>

        {/* headband tails */}
        <g className="band">
          <path d="M9 9 C 4 7, 3 11, 1 10" stroke="#fafafa" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M9 10 C 5 12, 4 14, 2 14" stroke="#fafafa" strokeWidth="1.2" strokeLinecap="round" />
        </g>

        {/* head */}
        <circle cx="17" cy="9" r="7.5" fill="url(#nk)" stroke="var(--ninja-outline)" strokeWidth="0.6" />
        {/* eye slit */}
        <rect x="11.5" y="7.2" width="11" height="3.6" rx="1.8" fill="#f4f4f5" />
        <circle cx="14.8" cy="9" r="1.1" fill="#0a0a0a" />
        <circle cx="19.2" cy="9" r="1.1" fill="#0a0a0a" />
        <circle cx="15.2" cy="8.6" r="0.35" fill="#fff" />
        <circle cx="19.6" cy="8.6" r="0.35" fill="#fff" />
        {/* headband */}
        <rect x="10" y="5.4" width="14" height="1.6" rx="0.8" fill="#fafafa" opacity="0.9" />
      </svg>
    </div>
  );
}
