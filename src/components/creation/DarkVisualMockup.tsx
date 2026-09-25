import { useId } from 'react'

export function DarkVisualMockup({ isPlaying = true, reducedMotion = false, onComplete }: { isPlaying?: boolean; reducedMotion?: boolean; onComplete?: () => void }) {
  const id = useId()
  const safeId = id.replace(/:/g, '')

  const pieces = [
    { id: 'nB', t: 0, x: 160, y: 5 },
    { id: 'nL', t: 4, x: 40, y: 5 },
    { id: 'nM', t: 8, x: 160, y: 5 },
    { id: 'nC', t: 12, x: 260, y: 5 },
    { id: 'hT', t: 16, x: 90, y: 70 },
    { id: 'hS', t: 20, x: 90, y: 95 },
    { id: 'hB', t: 24, x: 90, y: 120 },
    { id: 'gB', t: 28, x: 235, y: 90 },
    { id: 'gI', t: 32, x: 235, y: 90 },
    { id: 'f1B', t: 36, x: 60, y: 175 },
    { id: 'f1C', t: 40, x: 60, y: 175 },
    { id: 'f2B', t: 44, x: 160, y: 175 },
    { id: 'f2C', t: 48, x: 160, y: 175 },
    { id: 'f3B', t: 52, x: 260, y: 175 },
    { id: 'f3C', t: 56, x: 260, y: 175 },
  ]

  const generateStyles = () => {
    let css = ''
    pieces.forEach(p => {
      css += `
        .a-${p.id}O1-${safeId}, .a-${p.id}O2-${safeId}, .a-${p.id}F-${safeId} {
          animation-duration: 0.8s;
          animation-delay: ${p.t * 0.2}s;
          animation-fill-mode: both;
          animation-timing-function: cubic-bezier(0.2,0.8,0.2,1);
          animation-play-state: ${isPlaying ? 'running' : 'paused'};
        }
        .a-${p.id}O1-${safeId} { animation-name: ${p.id}O1-${safeId}; }
        .a-${p.id}O2-${safeId} { animation-name: ${p.id}O2-${safeId}; }
        .a-${p.id}F-${safeId} { animation-name: ${p.id}F-${safeId}; }
        @keyframes ${p.id}O1-${safeId} {
          0% {opacity:0; transform:translate(160px,115px) scale(0.6)}
          10%,24% {opacity:1; transform:translate(160px,105px) scale(0.85)}
          25%,100% {opacity:0; transform:translate(160px,95px) scale(0.95)}
        }
        @keyframes ${p.id}O2-${safeId} {
          0%,24% {opacity:0; transform:translate(160px,115px) scale(0.6)}
          25%,49% {opacity:1; transform:translate(160px,95px) scale(0.95)}
          50%,100% {opacity:0; transform:translate(160px,95px) scale(0.95)}
        }
        @keyframes ${p.id}F-${safeId} {
          0%,49% {opacity:0; transform:translate(160px,110px) scale(0.6)}
          50% {opacity:1; transform:translate(160px,90px) scale(1.1)}
          100% {opacity:1; transform:translate(${p.x}px,${p.y}px) scale(1)}
        }
      `
    })
    return css
  }

  const renderPiece = (id: string, O1: React.ReactNode, O2: React.ReactNode, F: React.ReactNode) => (
    <g key={id}>
      <g className={`a-${id}O1-${safeId}`}>{O1}</g>
      <g className={`a-${id}O2-${safeId}`}>{O2}</g>
      <g className={`a-${id}F-${safeId}`} onAnimationEnd={id === pieces[pieces.length - 1].id ? onComplete : undefined}>{F}</g>
    </g>
  )

  return (
    <svg data-demo-static={reducedMotion} style={{ '--demo-snapshot': '-14s' } as React.CSSProperties} viewBox="0 -15 320 215" className="w-full h-full overflow-visible" aria-hidden="true">
      <defs>
        <filter id={`${safeId}-shadow`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000000" floodOpacity="0.4" />
        </filter>
        <style>{generateStyles()}</style>
      </defs>

      {/* --- NAVBAR --- */}
      {renderPiece('nB', 
        <rect x="-145" y="-15" width="290" height="30" rx="8" fill="none" stroke="#334155" strokeWidth="2" strokeDasharray="4 4" />,
        <rect x="-145" y="-15" width="290" height="30" rx="8" fill="#1e293b" />,
        <rect x="-145" y="-15" width="290" height="30" rx="8" fill="#0f172a" stroke="#1e293b" strokeWidth="1" filter={`url(#${safeId}-shadow)`} />
      )}
      
      {renderPiece('nL',
        <circle cx="0" cy="0" r="8" fill="none" stroke="#475569" strokeWidth="2" />,
        <rect x="-8" y="-8" width="16" height="16" rx="4" fill="#334155" />,
        <circle cx="0" cy="0" r="8" fill="#6366f1" />
      )}
      
      {renderPiece('nM',
        <rect x="-40" y="-2" width="80" height="4" rx="2" fill="#334155" />,
        <><rect x="-40" y="-2" width="20" height="4" rx="2" fill="#475569" /><rect x="20" y="-2" width="20" height="4" rx="2" fill="#475569" /></>,
        <><rect x="-35" y="-2" width="20" height="4" rx="2" fill="#475569" /><rect x="-5" y="-2" width="25" height="4" rx="2" fill="#475569" /><rect x="30" y="-2" width="20" height="4" rx="2" fill="#475569" /></>
      )}

      {renderPiece('nC',
        <rect x="-20" y="-10" width="40" height="20" rx="10" fill="none" stroke="#475569" strokeWidth="2" />,
        <rect x="-20" y="-10" width="40" height="20" rx="4" fill="#334155" />,
        <rect x="-20" y="-10" width="40" height="20" rx="6" fill="#6366f1" />
      )}

      {/* --- HERO TEXT --- */}
      {renderPiece('hT',
        <rect x="-50" y="-15" width="100" height="30" rx="6" fill="none" stroke="#334155" strokeWidth="2" strokeDasharray="4 4" />,
        <rect x="-50" y="-15" width="100" height="30" rx="6" fill="#1e293b" />,
        <><rect x="-50" y="-10" width="100" height="12" rx="4" fill="#f1f5f9" /><rect x="-50" y="6" width="80" height="12" rx="4" fill="#f1f5f9" /></>
      )}

      {renderPiece('hS',
        <rect x="-50" y="-3" width="100" height="6" rx="3" fill="#1e293b" />,
        <rect x="-50" y="-6" width="100" height="12" rx="6" fill="#1e293b" />,
        <><rect x="-50" y="-5" width="110" height="6" rx="3" fill="#94a3b8" /><rect x="-50" y="5" width="70" height="6" rx="3" fill="#94a3b8" /></>
      )}

      {renderPiece('hB',
        <rect x="-50" y="-9" width="95" height="18" rx="9" fill="none" stroke="#334155" strokeWidth="2" />,
        <rect x="-50" y="-9" width="45" height="18" rx="9" fill="#1e293b" />,
        <><rect x="-50" y="-9" width="45" height="18" rx="6" fill="#6366f1" /><rect x="5" y="-9" width="45" height="18" rx="6" fill="#1e293b" /></>
      )}

      {/* --- HERO GRAPHIC --- */}
      {renderPiece('gB',
        <rect x="-55" y="-40" width="110" height="80" rx="10" fill="none" stroke="#334155" strokeWidth="2" strokeDasharray="4 4" />,
        <rect x="-55" y="-40" width="110" height="80" rx="10" fill="#1e293b" />,
        <rect x="-55" y="-40" width="110" height="80" rx="10" fill="#312e81" filter={`url(#${safeId}-shadow)`} />
      )}

      {renderPiece('gI',
        <circle cx="0" cy="0" r="20" fill="#3730a3" />,
        <rect x="-30" y="-20" width="60" height="40" rx="8" fill="#3730a3" />,
        <>
          <rect x="-45" y="-30" width="90" height="15" rx="4" fill="#0f172a" />
          <circle cx="-35" cy="-22.5" r="4" fill="#818cf8" />
          <rect x="-25" y="-24" width="30" height="3" rx="1.5" fill="#3730a3" />
          <rect x="-45" y="-10" width="40" height="40" rx="4" fill="#0f172a" />
          <rect x="5" y="-10" width="40" height="40" rx="4" fill="#6366f1" />
        </>
      )}

      {/* --- FEATURE CARDS --- */}
      {[
        { id: 'f1', colorBase: '#064e3b', colorDot: '#10b981' },
        { id: 'f2', colorBase: '#4c1d95', colorDot: '#8b5cf6' },
        { id: 'f3', colorBase: '#78350f', colorDot: '#f59e0b' }
      ].map((f) => (
        <g key={f.id}>
          {renderPiece(`${f.id}B`,
            <rect x="-42.5" y="-25" width="85" height="50" rx="8" fill="none" stroke="#334155" strokeWidth="2" strokeDasharray="4 4" />,
            <rect x="-42.5" y="-25" width="85" height="50" rx="8" fill="#1e293b" />,
            <rect x="-42.5" y="-25" width="85" height="50" rx="8" fill="#0f172a" stroke="#1e293b" strokeWidth="1" filter={`url(#${safeId}-shadow)`} />
          )}
          {renderPiece(`${f.id}C`,
            <rect x="-20" y="-15" width="40" height="30" rx="4" fill="#1e293b" />,
            <circle cx="0" cy="0" r="10" fill="#1e293b" />,
            <>
              <rect x="-32.5" y="-15" width="16" height="16" rx="4" fill={f.colorBase} />
              <circle cx="-24.5" cy="-7" r="4" fill={f.colorDot} />
              <rect x="-10" y="-13" width="35" height="4" rx="2" fill="#94a3b8" />
              <rect x="-10" y="-5" width="20" height="4" rx="2" fill="#475569" />
              <rect x="-32.5" y="10" width="65" height="4" rx="2" fill="#334155" />
              <rect x="-32.5" y="18" width="40" height="4" rx="2" fill="#334155" />
            </>
          )}
        </g>
      ))}
    </svg>
  )
}
