// Single SVG butterfly with flapping wings. Colors configurable.
export default function Butterfly({ size = 48, body = '#7a3b2e', wing = '#f8c8dc', wingDeep = '#e8829e' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <g className="wing wing-l">
        <path d="M32 30c-4-14-14-22-24-18-6 3-6 14 2 20 6 4 16 4 22-2z" fill={wingDeep} />
        <path d="M32 32c-3 10-10 16-18 14-5-2-5-10 1-14 5-3 13-3 17 0z" fill={wing} />
        <circle cx="14" cy="20" r="2.4" fill={wing} opacity="0.9" />
      </g>
      <g className="wing wing-r">
        <path d="M32 30c4-14 14-22 24-18 6 3 6 14-2 20-6 4-16 4-22-2z" fill={wingDeep} />
        <path d="M32 32c3 10 10 16 18 14 5-2 5-10-1-14-5-3-13-3-17 0z" fill={wing} />
        <circle cx="50" cy="20" r="2.4" fill={wing} opacity="0.9" />
      </g>
      <path d="M32 18c-2 0-3 2-3 5v22c0 3 1 5 3 5s3-2 3-5V23c0-3-1-5-3-5z" fill={body} />
      <path d="M30 18c-1-3-4-5-6-4M34 18c1-3 4-5 6-4" stroke={body} strokeWidth="1.4" fill="none" strokeLinecap="round" />
    </svg>
  )
}
