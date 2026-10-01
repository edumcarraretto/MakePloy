import { useId } from 'react'

export type PlatformReference = 'lovable' | 'bolt' | 'v0' | 'replit'

// Illustrative symbols with custom colors, not official brand assets.
export function PlatformReferenceMark({ platform, size = 26 }: { platform: PlatformReference; size?: number }) {
  const gradientId = useId()

  return (
    <>
    {platform === 'lovable' && (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <title>Referência à Lovable</title>
        <defs>
          <linearGradient id={gradientId} x1="3" y1="3" x2="19" y2="21" gradientUnits="userSpaceOnUse">
            <stop stopColor="#f97316" /><stop offset=".48" stopColor="#ec286c" /><stop offset="1" stopColor="#7c3aed" />
          </linearGradient>
        </defs>
        <path d="M12 20.5 4.4 13A5.2 5.2 0 0 1 11.8 5.7l.2.3.2-.3A5.2 5.2 0 0 1 19.6 13Z" fill={`url(#${gradientId})`} />
      </svg>
    )}
    {platform === 'bolt' && (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="#2563eb" stroke="#1d4ed8" strokeWidth=".8" strokeLinejoin="round">
        <title>Referência ao Bolt</title>
        <path d="m14.5 2-10 12h6l-1 8 10-12h-6Z" />
      </svg>
    )}
    {platform === 'v0' && (
      <svg width={size * 28 / 26} height={size} viewBox="0 0 26 24" fill="none" stroke="#7c3aed" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
        <title>Referência ao v0</title>
        <path d="m2.5 7 4.3 10 4.3-10" />
        <rect x="14" y="7" width="9" height="10" rx="3" />
        <path d="m16 15 5-6" stroke="#5b21b6" strokeWidth="1.8" />
      </svg>
    )}
    {platform === 'replit' && (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="#ea580c">
        <title>Referência ao Replit</title>
        <rect x="3" y="3" width="10" height="5" rx="1.5" />
        <rect x="11" y="9.5" width="10" height="5" rx="1.5" fill="#f97316" />
        <rect x="3" y="16" width="10" height="5" rx="1.5" />
      </svg>
    )}
    </>
  )
}
