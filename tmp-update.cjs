const fs = require('fs');
let code = fs.readFileSync('c:/Users/edumc/dev/Crivalid/src/components/creation/VisualToCodePreview.tsx', 'utf8');

// 1. imports
code = code.replace(
  /import \{ Code2, File \} from 'lucide-react'/,
  `import { Code2, File, Folder, ChevronRight, FileCode2 } from 'lucide-react'\n\nfunction highlightCode(code: string) {\n  let res = code.replace(/</g, '&lt;').replace(/>/g, '&gt;');\n  res = res.replace(/\\b(export|default|function|return|import|from)\\b/g, '<span class="text-pink-400">$1</span>');\n  res = res.replace(/"([^"]*)"/g, '<span class="text-green-300">"$1"</span>');\n  res = res.replace(/&lt;([A-Z]\\w+)/g, '&lt;<span class="text-amber-200">$1</span>');\n  res = res.replace(/&lt;\\/([A-Z]\\w+)&gt;/g, '&lt;/<span class="text-amber-200">$1</span>&gt;');\n  res = res.replace(/&lt;([a-z]+)/g, '&lt;<span class="text-blue-300">$1</span>');\n  res = res.replace(/&lt;\\/([a-z]+)&gt;/g, '&lt;/<span class="text-blue-300">$1</span>&gt;');\n  res = res.replace(/ ([a-zA-Z]+)=/g, ' <span class="text-sky-300">$1</span>=');\n  res = res.replace(/(function )([A-Z]\\w+)/g, '$1<span class="text-amber-200">$2</span>');\n  return res;\n}`
);

// 2. add ref
code = code.replace(
  /const ref = useRef<HTMLDivElement>\(null\)\r?\n  const inView = useInView\(ref, \{ amount: 0\.4 \}\)/,
  `const ref = useRef<HTMLDivElement>(null)\n  const codeScrollRef = useRef<HTMLDivElement>(null)\n  const inView = useInView(ref, { amount: 0.4 })`
);

// 3. update visibleCode
code = code.replace(
  /let lineNumber = 0\r?\n  const visibleCode = codeElements\.map\(\(element\) => \(\{\r?\n    \.\.\.element,\r?\n    lines: element\.code\.split\('\\n'\)\.map\(\(line\) => \(\{ text: line, number: \+\+lineNumber \}\)\),\r?\n  \}\)\)/,
  `let globalLine = 0\n  const allLines = codeElements.map((element, i) => ({\n    index: i,\n    lines: element.code.split('\\n').map((line) => ({ text: line, number: ++globalLine })),\n  }))\n\n  useEffect(() => {\n    if (codeScrollRef.current) {\n      codeScrollRef.current.scrollTo({\n        top: codeScrollRef.current.scrollHeight,\n        behavior: reducedMotion ? 'instant' : 'smooth'\n      })\n    }\n  }, [stage, reducedMotion])`
);

// 4. update IDE markup
code = code.replace(
  /<motion\.div\r?\n        initial=\{false\}\r?\n        animate=\{panelPose\(showCode\)\}\r?\n        transition=\{\{ duration: reducedMotion \? 0 : 0\.5, ease: 'easeInOut' \}\}\r?\n        style=\{\{ zIndex: showCode \? 2 : 1, transformOrigin: 'center top' \}\}\r?\n        className="absolute bottom-11 left-3 right-7 top-2 flex flex-col overflow-hidden rounded-xl border border-violet-300\/25 bg-\[#101018\] shadow-\[0_12px_26px_-8px_rgba\(0,0,0,0\.85\)\]"\r?\n      >\r?\n        <button type="button" aria-label="Trazer o código para frente" aria-pressed=\{showCode\} onClick=\{\(\) => setShowCode\(true\)\} className="flex h-7 w-full shrink-0 items-center gap-2 border-b border-white\/10 bg-white\/\[0\.03\] px-3 text-left text-\[9px\] text-neutral-300 transition-colors hover:bg-white\/\[0\.08\] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-violet-300">\r?\n          <File size=\{10\} className="text-violet-300" \/> Page\.tsx\r?\n          <span className="ml-auto h-1 w-1 rounded-full bg-emerald-400" \/>\r?\n        <\/button>\r?\n        <div role="region" aria-label="Código de exemplo da página" className=`min-h-0 flex-1 overflow-y-auto p-2 font-mono text-\[8px\] leading-\[12px\] \[scrollbar-width:none\] \[&::-webkit-scrollbar\]:hidden \$\{showCode \? '' : 'pointer-events-none'}`>\r?\n          \{visibleCode\.map\(\(element\) => \(\r?\n            <div key=\{element\.name\}>\r?\n              \{element\.lines\.map\(\(line\) => \(\r?\n                <div key=\{line\.number\} className="flex gap-2">\r?\n                  <span className="w-4 shrink-0 text-right text-neutral-600">\{line\.number\}<\/span>\r?\n                  <span className=`min-w-0 whitespace-pre-wrap break-words \$\{element\.color\}`>\{line\.text\}<\/span>\r?\n                <\/div>\r?\n              \)\)\}\r?\n            <\/div>\r?\n          \)\)\}\r?\n        <\/div>\r?\n      <\/motion\.div>/,
  `<motion.div
        initial={false}
        animate={panelPose(showCode)}
        transition={{ duration: reducedMotion ? 0 : 0.5, ease: 'easeInOut' }}
        style={{ zIndex: showCode ? 2 : 1, transformOrigin: 'center top' }}
        className="absolute bottom-11 left-3 right-7 top-2 flex overflow-hidden rounded-xl border border-white/[0.12] bg-[#0d0d12] shadow-[0_12px_26px_-8px_rgba(0,0,0,0.85)]"
      >
        {/* Sidebar */}
        <div className="w-[80px] shrink-0 border-r border-white/5 bg-[#0d0d12] flex flex-col hidden sm:flex" onClick={() => setShowCode(true)}>
          <div className="px-2 py-1.5 text-[7px] font-semibold text-neutral-500 tracking-wider">ARQUIVOS</div>
          <div className="flex-1 overflow-y-auto text-[8px] space-y-[2px] pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex items-center gap-1 px-1.5 py-0.5 text-neutral-300">
              <ChevronRight size={8} className="text-neutral-500" />
              <Folder size={8} className="text-blue-400" fill="currentColor" /> src/
            </div>
            <div className="flex items-center gap-1 px-1.5 py-0.5 bg-white/5 text-neutral-200 ml-2 border-l border-blue-500/50">
              <FileCode2 size={8} className="text-cyan-400" /> App.tsx
            </div>
            <div className="flex items-center gap-1 px-1.5 py-0.5 text-neutral-400 ml-2">
              <Folder size={8} className="text-blue-400" /> components/
            </div>
            <div className="flex items-center gap-1 px-1.5 py-0.5 text-neutral-400 ml-4">
              <FileCode2 size={8} className="text-cyan-400" /> Hero.tsx
            </div>
            <div className="flex items-center gap-1 px-1.5 py-0.5 text-neutral-400 ml-4">
              <FileCode2 size={8} className="text-cyan-400" /> Card.tsx
            </div>
            <div className="flex items-center gap-1 px-1.5 py-0.5 text-neutral-400 ml-2">
              <Folder size={8} className="text-blue-400" /> styles/
            </div>
            <div className="flex items-center gap-1 px-1.5 py-0.5 text-neutral-400 ml-4">
              <File size={8} className="text-blue-300" /> index.css
            </div>
            <div className="flex items-center gap-1 px-1.5 py-0.5 text-neutral-400 ml-2">
              <Folder size={8} className="text-blue-400" /> pages/
            </div>
            <div className="flex items-center gap-1 px-1.5 py-0.5 text-neutral-400 ml-4">
              <FileCode2 size={8} className="text-cyan-400" /> Home.tsx
            </div>
          </div>
        </div>

        {/* Main Editor Area */}
        <div className="flex-1 flex flex-col min-w-0 bg-[#16161e]">
          {/* Tabs */}
          <div className="flex bg-[#0d0d12] border-b border-white/5 shrink-0" onClick={() => setShowCode(true)}>
             <div className="flex items-center gap-1.5 px-3 py-1.5 text-[8px] text-neutral-500 border-r border-white/5 hover:bg-white/5 cursor-pointer">
                <FileCode2 size={8} className="text-cyan-400/50" /> Home.tsx
             </div>
             <div className="flex items-center gap-1.5 px-3 py-1.5 text-[8px] text-neutral-200 bg-[#16161e] border-t border-t-blue-500 cursor-pointer">
                <FileCode2 size={8} className="text-cyan-400" /> App.tsx
             </div>
          </div>
          
          {/* Code Area */}
          <div ref={codeScrollRef} role="region" aria-label="Código de exemplo da página" className={\`flex-1 overflow-y-auto py-2 font-mono text-[8px] leading-[14px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden \${showCode ? '' : 'pointer-events-none'}\`}>
             {allLines.map((el) => {
               if (el.index >= stage) return null;
               return el.lines.map(line => (
                 <div key={line.number} className="flex gap-2 px-2 hover:bg-white/5">
                   <span className="w-4 shrink-0 text-right text-neutral-600 select-none">{line.number}</span>
                   <span className="min-w-0 whitespace-pre-wrap break-words text-neutral-300" dangerouslySetInnerHTML={{ __html: highlightCode(line.text) }} />
                 </div>
               ))
             })}
          </div>
          
          {/* Status Bar */}
          <div className="h-4 shrink-0 bg-[#0d0d12] border-t border-white/5 flex items-center justify-between px-2 text-[6.5px] text-neutral-500">
             <div className="flex gap-2"><span>TypeScript React</span> <span>UTF-8</span></div>
             <div className="flex items-center gap-1"><span className="w-1 h-1 rounded-full bg-emerald-500"></span> Salvo</div>
          </div>
        </div>
      </motion.div>`
);

fs.writeFileSync('c:/Users/edumc/dev/Crivalid/src/components/creation/VisualToCodePreview.tsx', code);
console.log('Update complete');
