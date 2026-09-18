import { useState, useEffect } from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────

interface CodeToken {
  text: string
  color: string
}

interface CodeLine {
  num: number
  tokens: CodeToken[]
  highlighted?: boolean
}

interface FileEntry {
  name: string
  indent: number
  isDir: boolean
  /** If a directory, which children file names belong under it */
  children?: string[]
}

interface FileContent {
  language: string
  lines: CodeLine[]
}

// ─── File Tree ────────────────────────────────────────────────────────────────

const FILE_TREE: FileEntry[] = [
  { name: 'src/', indent: 0, isDir: true, children: ['App.tsx', 'components/', 'styles/', 'pages/'] },
  { name: 'App.tsx', indent: 1, isDir: false },
  { name: 'components/', indent: 1, isDir: true, children: ['Hero.tsx', 'Card.tsx'] },
  { name: 'Hero.tsx', indent: 2, isDir: false },
  { name: 'Card.tsx', indent: 2, isDir: false },
  { name: 'styles/', indent: 1, isDir: true, children: ['index.css'] },
  { name: 'index.css', indent: 2, isDir: false },
  { name: 'pages/', indent: 1, isDir: true, children: ['Home.tsx'] },
  { name: 'Home.tsx', indent: 2, isDir: false },
]

// ─── File Contents ────────────────────────────────────────────────────────────

const FILE_CONTENTS: Record<string, FileContent> = {
  'App.tsx': {
    language: 'TypeScript React',
    lines: [
      { num: 1, tokens: [{ text: 'import', color: 'text-pink-400' }, { text: ' { Hero } ', color: 'text-white' }, { text: 'from', color: 'text-pink-400' }, { text: " './Hero'", color: 'text-emerald-400' }] },
      { num: 2, tokens: [{ text: 'import', color: 'text-pink-400' }, { text: ' { Card } ', color: 'text-white' }, { text: 'from', color: 'text-pink-400' }, { text: " './Card'", color: 'text-emerald-400' }] },
      { num: 3, tokens: [] },
      { num: 4, tokens: [{ text: 'export', color: 'text-pink-400' }, { text: ' function ', color: 'text-blue-400' }, { text: 'App', color: 'text-amber-300' }, { text: '() {', color: 'text-white' }] },
      { num: 5, tokens: [{ text: '  return (', color: 'text-white' }], highlighted: true },
      { num: 6, tokens: [{ text: '    <', color: 'text-neutral-400' }, { text: 'main', color: 'text-blue-400' }, { text: '>', color: 'text-neutral-400' }] },
      { num: 7, tokens: [{ text: '      <', color: 'text-neutral-400' }, { text: 'Hero', color: 'text-amber-300' }, { text: ' />', color: 'text-neutral-400' }] },
      { num: 8, tokens: [{ text: '      <', color: 'text-neutral-400' }, { text: 'Card', color: 'text-amber-300' }, { text: ' title=', color: 'text-white' }, { text: '"Valide"', color: 'text-emerald-400' }, { text: ' />', color: 'text-neutral-400' }] },
      { num: 9, tokens: [{ text: '    </', color: 'text-neutral-400' }, { text: 'main', color: 'text-blue-400' }, { text: '>', color: 'text-neutral-400' }] },
      { num: 10, tokens: [{ text: '  )', color: 'text-white' }] },
      { num: 11, tokens: [{ text: '}', color: 'text-white' }] },
    ],
  },
  'Hero.tsx': {
    language: 'TypeScript React',
    lines: [
      { num: 1, tokens: [{ text: 'import', color: 'text-pink-400' }, { text: ' { motion } ', color: 'text-white' }, { text: 'from', color: 'text-pink-400' }, { text: " 'motion/react'", color: 'text-emerald-400' }] },
      { num: 2, tokens: [] },
      { num: 3, tokens: [{ text: 'export', color: 'text-pink-400' }, { text: ' function ', color: 'text-blue-400' }, { text: 'Hero', color: 'text-amber-300' }, { text: '() {', color: 'text-white' }] },
      { num: 4, tokens: [{ text: '  return (', color: 'text-white' }], highlighted: true },
      { num: 5, tokens: [{ text: '    <', color: 'text-neutral-400' }, { text: 'motion.section', color: 'text-blue-400' }, { text: '>', color: 'text-neutral-400' }] },
      { num: 6, tokens: [{ text: '      <', color: 'text-neutral-400' }, { text: 'h1', color: 'text-blue-400' }, { text: ' className=', color: 'text-white' }, { text: '"text-5xl"', color: 'text-emerald-400' }, { text: '>', color: 'text-neutral-400' }] },
      { num: 7, tokens: [{ text: '        Um projeto inteiro', color: 'text-white' }] },
      { num: 8, tokens: [{ text: '      </', color: 'text-neutral-400' }, { text: 'h1', color: 'text-blue-400' }, { text: '>', color: 'text-neutral-400' }] },
      { num: 9, tokens: [{ text: '    </', color: 'text-neutral-400' }, { text: 'motion.section', color: 'text-blue-400' }, { text: '>', color: 'text-neutral-400' }] },
      { num: 10, tokens: [{ text: '  )', color: 'text-white' }] },
      { num: 11, tokens: [{ text: '}', color: 'text-white' }] },
    ],
  },
  'Card.tsx': {
    language: 'TypeScript React',
    lines: [
      { num: 1, tokens: [{ text: 'interface', color: 'text-pink-400' }, { text: ' CardProps', color: 'text-amber-300' }, { text: ' {', color: 'text-white' }] },
      { num: 2, tokens: [{ text: '  title', color: 'text-white' }, { text: ': ', color: 'text-neutral-400' }, { text: 'string', color: 'text-blue-400' }] },
      { num: 3, tokens: [{ text: '  description', color: 'text-white' }, { text: '?: ', color: 'text-neutral-400' }, { text: 'string', color: 'text-blue-400' }] },
      { num: 4, tokens: [{ text: '}', color: 'text-white' }] },
      { num: 5, tokens: [] },
      { num: 6, tokens: [{ text: 'export', color: 'text-pink-400' }, { text: ' function ', color: 'text-blue-400' }, { text: 'Card', color: 'text-amber-300' }, { text: '({ title }: CardProps) {', color: 'text-white' }] },
      { num: 7, tokens: [{ text: '  return (', color: 'text-white' }], highlighted: true },
      { num: 8, tokens: [{ text: '    <', color: 'text-neutral-400' }, { text: 'div', color: 'text-blue-400' }, { text: ' className=', color: 'text-white' }, { text: '"rounded-xl p-6"', color: 'text-emerald-400' }, { text: '>', color: 'text-neutral-400' }] },
      { num: 9, tokens: [{ text: '      <', color: 'text-neutral-400' }, { text: 'h3', color: 'text-blue-400' }, { text: '>', color: 'text-neutral-400' }, { text: '{title}', color: 'text-amber-300' }, { text: '</', color: 'text-neutral-400' }, { text: 'h3', color: 'text-blue-400' }, { text: '>', color: 'text-neutral-400' }] },
      { num: 10, tokens: [{ text: '    </', color: 'text-neutral-400' }, { text: 'div', color: 'text-blue-400' }, { text: '>', color: 'text-neutral-400' }] },
      { num: 11, tokens: [{ text: '  )', color: 'text-white' }] },
      { num: 12, tokens: [{ text: '}', color: 'text-white' }] },
    ],
  },
  'index.css': {
    language: 'CSS',
    lines: [
      { num: 1, tokens: [{ text: '@import', color: 'text-pink-400' }, { text: ' "tailwindcss"', color: 'text-emerald-400' }, { text: ';', color: 'text-neutral-400' }] },
      { num: 2, tokens: [] },
      { num: 3, tokens: [{ text: ':root', color: 'text-amber-300' }, { text: ' {', color: 'text-white' }] },
      { num: 4, tokens: [{ text: '  --primary', color: 'text-white' }, { text: ': ', color: 'text-neutral-400' }, { text: '#0067d9', color: 'text-blue-400' }, { text: ';', color: 'text-neutral-400' }], highlighted: true },
      { num: 5, tokens: [{ text: '  --bg', color: 'text-white' }, { text: ': ', color: 'text-neutral-400' }, { text: '#ffffff', color: 'text-violet-400' }, { text: ';', color: 'text-neutral-400' }] },
      { num: 6, tokens: [{ text: '  --text', color: 'text-white' }, { text: ': ', color: 'text-neutral-400' }, { text: '#171717', color: 'text-violet-400' }, { text: ';', color: 'text-neutral-400' }] },
      { num: 7, tokens: [{ text: '}', color: 'text-white' }] },
      { num: 8, tokens: [] },
      { num: 9, tokens: [{ text: 'body', color: 'text-amber-300' }, { text: ' {', color: 'text-white' }] },
      { num: 10, tokens: [{ text: '  font-family', color: 'text-white' }, { text: ': ', color: 'text-neutral-400' }, { text: "'Makeploy Rounded', sans-serif", color: 'text-emerald-400' }, { text: ';', color: 'text-neutral-400' }] },
      { num: 11, tokens: [{ text: '  background', color: 'text-white' }, { text: ': ', color: 'text-neutral-400' }, { text: 'var(--bg)', color: 'text-blue-400' }, { text: ';', color: 'text-neutral-400' }] },
      { num: 12, tokens: [{ text: '}', color: 'text-white' }] },
    ],
  },
  'Home.tsx': {
    language: 'TypeScript React',
    lines: [
      { num: 1, tokens: [{ text: 'import', color: 'text-pink-400' }, { text: ' { App } ', color: 'text-white' }, { text: 'from', color: 'text-pink-400' }, { text: " '../App'", color: 'text-emerald-400' }] },
      { num: 2, tokens: [] },
      { num: 3, tokens: [{ text: 'export', color: 'text-pink-400' }, { text: ' default', color: 'text-pink-400' }, { text: ' function ', color: 'text-blue-400' }, { text: 'Home', color: 'text-amber-300' }, { text: '() {', color: 'text-white' }] },
      { num: 4, tokens: [{ text: '  return (', color: 'text-white' }] },
      { num: 5, tokens: [{ text: '    <', color: 'text-neutral-400' }, { text: 'div', color: 'text-blue-400' }, { text: ' className=', color: 'text-white' }, { text: '"min-h-screen"', color: 'text-emerald-400' }, { text: '>', color: 'text-neutral-400' }] },
      { num: 6, tokens: [{ text: '      <', color: 'text-neutral-400' }, { text: 'App', color: 'text-amber-300' }, { text: ' />', color: 'text-neutral-400' }] },
      { num: 7, tokens: [{ text: '    </', color: 'text-neutral-400' }, { text: 'div', color: 'text-blue-400' }, { text: '>', color: 'text-neutral-400' }] },
      { num: 8, tokens: [{ text: '  )', color: 'text-white' }] },
      { num: 9, tokens: [{ text: '}', color: 'text-white' }] },
    ],
  },
}

// ─── Navigable file names (non-directory entries) ─────────────────────────────

const NAVIGABLE_FILES = FILE_TREE.filter((f) => !f.isDir).map((f) => f.name)

const getTabId = (fileName: string) => `editor-tab-${fileName.replace(/[^a-zA-Z0-9]/g, '-')}`

// ─── File Icon Helper ─────────────────────────────────────────────────────────

function FileIcon({ name, isDir }: { name: string; isDir: boolean }) {
  if (isDir) {
    return (
      <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
        <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/>
      </svg>
    )
  }
  
  if (name.endsWith('.css')) {
    return (
      <svg width="1em" height="1em" viewBox="0 0 128 128">
        <path fill="#1572B6" d="M14.05 15.65l8.63 96.88L64 124l41.34-11.47 8.61-96.88H14.05z"/>
        <path fill="#33A9DC" d="M64 114.7l31.25-8.68L101.46 25H64v89.7z"/>
        <path fill="#FFF" d="M64 48H39l-1.33-14.96H64V48zm0 29.89H41.52l1.63 18.3 20.85 5.79V102l-28.79-8-1.03-11.53H64v-14.58z"/>
        <path fill="#EBEBEB" d="M64 48h25l1.33-14.96H64V48zm0 29.89V63.31l12.72-.01-1.02-11.43H64V37.91h37.49l-3.32 37.11-20.86 5.78v-11.66z"/>
      </svg>
    )
  }

  // React TSX
  if (name.endsWith('.tsx') || name.endsWith('.ts')) {
    return (
      <svg width="1em" height="1em" viewBox="-11.5 -10.23174 23 20.46348" className="text-[#61dafb]">
        <circle cx="0" cy="0" r="2.05" fill="currentColor"/>
        <g stroke="currentColor" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2"/>
          <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
          <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
        </g>
      </svg>
    )
  }

  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-500">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/>
    </svg>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

export function IntegratedCodeEditorPreview() {
  const [activeFile, setActiveFile] = useState(NAVIGABLE_FILES[0])
  const [openTabs, setOpenTabs] = useState<string[]>([NAVIGABLE_FILES[0]])
  const [typedChars, setTypedChars] = useState(0)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mediaQuery.matches) {
      setTypedChars(99999)
      return
    }

    const currentFileContent = FILE_CONTENTS[activeFile]
    if (!currentFileContent) return

    const totalChars = currentFileContent.lines.reduce((acc, line) => {
      const lineChars = line.tokens.reduce((acc2, token) => acc2 + token.text.length, 0)
      return acc + (lineChars === 0 ? 1 : lineChars)
    }, 0)

    if (typedChars >= totalChars) {
      const timer = setTimeout(() => {
        setActiveFile((prev) => {
          const currentIndex = NAVIGABLE_FILES.indexOf(prev)
          const nextIndex = (currentIndex + 1) % NAVIGABLE_FILES.length
          const nextFile = NAVIGABLE_FILES[nextIndex]
          
          setOpenTabs((prevTabs) => {
            if (prevTabs.includes(nextFile)) return prevTabs
            const newTabs = [...prevTabs, nextFile]
            if (newTabs.length > 2) return newTabs.slice(newTabs.length - 2)
            return newTabs
          })

          return nextFile
        })
        setTypedChars(0)
      }, 4000)
      return () => clearTimeout(timer)
    }

    const timer = setTimeout(() => {
      setTypedChars(prev => prev + Math.floor(Math.random() * 2) + 1)
    }, Math.random() * 60 + 20)

    return () => clearTimeout(timer)
  }, [activeFile, typedChars])

  const handleFileClick = (fileName: string) => {
    if (!FILE_CONTENTS[fileName]) return
    if (fileName !== activeFile) {
      setActiveFile(fileName)
      setTypedChars(0)
    }
    setOpenTabs((prev) => {
      if (prev.includes(fileName)) return prev
      const newTabs = [...prev, fileName]
      if (newTabs.length > 2) return newTabs.slice(newTabs.length - 2)
      return newTabs
    })
  }

  const content = FILE_CONTENTS[activeFile]

  return (
    <div 
      className="w-full h-full flex overflow-hidden rounded-[20px] border border-white/[0.08] bg-neutral-950/90"
      style={{
        maskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)'
      }}
    >
      {/* File tree sidebar */}
      <div className="w-[100px] shrink-0 border-r border-white/[0.08] flex flex-col pt-2 overflow-y-auto no-scrollbar">
        <div className="px-2 mb-1.5">
          <div className="text-[7px] font-medium text-neutral-500 uppercase tracking-wider">
            Arquivos
          </div>
        </div>
        {FILE_TREE.map((file) => {
          const isNavigable = NAVIGABLE_FILES.includes(file.name)
          const isActive = activeFile === file.name

          return (
            <button
              type="button"
              key={`${file.indent}-${file.name}`}
              className={[
                'flex w-full items-center gap-1 px-2 py-[3px] text-left text-[7px] transition-colors duration-150',
                isActive
                  ? 'bg-white/[0.08] text-white font-medium'
                  : 'text-neutral-500',
                isNavigable
                  ? 'cursor-pointer hover:text-neutral-300 hover:bg-white/[0.04]'
                  : 'cursor-default',
              ].join(' ')}
              style={{ paddingLeft: `${8 + file.indent * 8}px` }}
              onClick={() => isNavigable && handleFileClick(file.name)}
              disabled={!isNavigable}
            >
              <span className="w-3 h-3 shrink-0 flex items-center justify-center text-[8px] mr-1">
                <FileIcon name={file.name} isDir={file.isDir} />
              </span>
              <span className="truncate">{file.name}</span>
            </button>
          )
        })}
      </div>

      {/* Editor area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Tabs */}
        <div className="flex border-b border-white/[0.06] shrink-0 overflow-x-auto no-scrollbar">
          {openTabs.map((tab) => (
            <div
              key={tab}
              className={[
                'group/tab flex items-center gap-1 px-1 py-1 text-[7px] border-r border-white/[0.06] shrink-0 transition-colors duration-150',
                tab === activeFile
                  ? 'text-white bg-neutral-950 border-b-2 border-b-blue-500'
                  : 'text-neutral-500 bg-[#080809] hover:text-neutral-300',
              ].join(' ')}
            >
              <button
                id={getTabId(tab)}
                type="button"
                aria-pressed={tab === activeFile}
                tabIndex={tab === activeFile ? 0 : -1}
                onClick={() => handleFileClick(tab)}
                className="cursor-pointer rounded-sm px-1.5 py-0.5 focus-visible:outline-offset-0 flex items-center gap-1.5"
              >
                <span className="w-2.5 h-2.5 flex items-center justify-center">
                  <FileIcon name={tab} isDir={false} />
                </span>
                {tab}
              </button>
            </div>
          ))}
        </div>

        {/* Code */}
        {content && (() => {
          let currentChars = 0;
          let hasRenderedCursor = false;

          return (
            <div className="flex-1 overflow-hidden py-1.5">
              {content.lines.map((line) => {
                const lineStartChars = currentChars;
                
                let lineTokens: { text: string; color: string }[] = [];
                for (const token of line.tokens) {
                  if (currentChars < typedChars) {
                    const charsToTake = Math.min(token.text.length, typedChars - currentChars);
                    lineTokens.push({
                      ...token,
                      text: token.text.slice(0, charsToTake)
                    });
                  }
                  currentChars += token.text.length;
                }

                if (line.tokens.length === 0) {
                  currentChars += 1;
                }

                const isVisible = lineStartChars <= typedChars || typedChars === 99999;
                if (!isVisible) return null;

                const showCursor = !hasRenderedCursor && typedChars <= currentChars && typedChars !== 99999;
                if (showCursor) {
                  hasRenderedCursor = true;
                }

                return (
                  <div
                    key={line.num}
                    className={[
                      'flex items-center h-[14px] px-1',
                      line.highlighted ? 'bg-violet-500/[0.08]' : '',
                    ].join(' ')}
                  >
                    {/* Line number */}
                    <span className="w-6 shrink-0 text-right pr-2 text-[7px] text-neutral-600 select-none">
                      {line.num}
                    </span>

                    {/* Highlight bar */}
                    {line.highlighted && (
                      <div className="w-[2px] h-full bg-violet-500 shrink-0 mr-1 rounded-full" />
                    )}

                    {/* Tokens */}
                    <div className="flex items-center gap-0 text-[7px] whitespace-nowrap overflow-hidden relative">
                      {lineTokens.map((token, j) => (
                        <span key={j} className={token.color} style={{ whiteSpace: 'pre' }}>
                          {token.text}
                        </span>
                      ))}
                      {showCursor && (
                        <span className="inline-block w-[4px] h-[10px] bg-white/80 animate-pulse ml-[1px] translate-y-[1px]" />
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )
        })()}

        {/* Status bar */}
        <div className="flex items-center justify-between px-2 py-1 border-t border-white/[0.06] bg-[#080809] shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-[6px] text-neutral-500">{content?.language ?? 'Text'}</span>
            <span className="text-[6px] text-neutral-600">|</span>
            <span className="text-[6px] text-neutral-500">UTF-8</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400/80" />
            <span className="text-[6px] text-neutral-500">Salvo</span>
          </div>
        </div>
      </div>
    </div>
  )
}
