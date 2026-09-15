import {
  CheckCircle2,
  Calendar,
  Star,
  Sparkles,
} from 'lucide-react'

// ─────────────────────────────────────────────
// Projetos — Kanban board preview
// ─────────────────────────────────────────────
export function ProjectsMockup() {
  return (
    <div className="w-full h-full relative overflow-hidden bg-gradient-to-br from-gray-50/30 to-white/10">
      {/* Background Green Card */}
      <div className="absolute top-8 left-[45%] w-[140px] bg-white/60 backdrop-blur-md rounded-xl shadow-sm border border-gray-100 p-2.5 z-0 rotate-1 scale-[0.85] opacity-70 flex flex-col gap-3">
        <div className="flex gap-2 items-center">
          <div className="bg-emerald-100/80 text-emerald-700 px-2 py-0.5 rounded-md text-[8px] font-bold flex items-center gap-1 shadow-sm">
            <CheckCircle2 className="w-2.5 h-2.5" /> Concluído
          </div>
          <div className="text-[8px] text-gray-400 font-bold">3</div>
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="w-full h-2 rounded-full bg-gray-100" />
          <div className="w-3/4 h-2 rounded-full bg-gray-100" />
        </div>
        <div className="flex items-center justify-between mt-1">
           <div className="w-4 h-4 rounded-full bg-gray-200" />
           <Calendar className="w-3 h-3 text-gray-300" />
        </div>
      </div>

      {/* Foreground Yellow Card */}
      <div className="absolute top-5 left-[8%] w-[160px] bg-white rounded-xl shadow-xl shadow-amber-900/5 border border-amber-100/50 p-3 z-10">
        <div className="flex gap-2 items-center">
          <div className="bg-[#fde68a]/70 text-[#b45309] px-2 py-0.5 rounded-md text-[8px] font-bold flex items-center gap-1 shadow-sm">
            <CheckCircle2 className="w-2.5 h-2.5" /> Atualizações
          </div>
          <div className="text-[8px] text-gray-400 font-bold">5</div>
          <div className="ml-auto flex gap-0.5">
            <div className="w-1 h-1 rounded-full bg-gray-300" />
            <div className="w-1 h-1 rounded-full bg-gray-200" />
          </div>
        </div>
        
        <div className="mt-4 flex flex-col gap-1.5">
          <div className="w-4/5 h-2.5 rounded-full bg-gray-100" />
          <div className="w-1/2 h-2.5 rounded-full bg-gray-50" />
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <div className="flex -space-x-1.5">
             <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-300 to-blue-500 border-2 border-white shadow-sm" />
             <div className="w-5 h-5 rounded-full bg-gradient-to-br from-rose-300 to-rose-400 border-2 border-white shadow-sm" />
          </div>
          <Calendar className="w-3.5 h-3.5 text-gray-300" />
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// Documentos — Page editor preview
// ─────────────────────────────────────────────
export function DocumentsMockup() {
  return (
    <div className="w-full h-full relative overflow-hidden bg-gradient-to-br from-gray-50/30 to-white/10 flex items-center justify-center">
      
      {/* Background Page 1 */}
      <div className="absolute w-[140px] h-[160px] bg-white rounded-lg shadow-sm border border-gray-100 z-0 -rotate-6 -translate-x-6 -translate-y-2 opacity-50 p-3">
        <div className="w-3/4 h-2.5 bg-gray-200 rounded-full mb-3" />
        <div className="w-full h-1.5 bg-gray-100 rounded-full mb-1" />
        <div className="w-full h-1.5 bg-gray-100 rounded-full mb-1" />
      </div>

      {/* Background Page 2 */}
      <div className="absolute w-[150px] h-[160px] bg-white rounded-lg shadow-md border border-gray-100 z-10 -rotate-3 -translate-x-3 -translate-y-1 opacity-90 p-3">
        <div className="text-[10px] font-bold text-gray-800 mb-2">Análise de Mercado</div>
        <div className="w-full h-1.5 bg-gray-100 rounded-full mb-1" />
        <div className="w-5/6 h-1.5 bg-gray-100 rounded-full mb-1" />
      </div>

      {/* Foreground Page */}
      <div className="absolute w-[160px] h-[170px] bg-white rounded-lg shadow-xl shadow-gray-200/50 border border-gray-100 z-20 translate-x-3 translate-y-3 p-3.5 flex flex-col gap-2">
        <div className="text-[11px] font-bold text-gray-900 tracking-tight">Resumo do Projeto</div>
        
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
          <div className="w-8 h-1.5 rounded-full bg-gray-200" />
          <div className="flex -space-x-1 ml-1">
             <div className="w-3 h-3 rounded-full bg-emerald-400 border border-white" />
             <div className="w-3 h-3 rounded-full bg-rose-400 border border-white" />
             <div className="w-3 h-3 rounded-full bg-amber-400 border border-white" />
          </div>
        </div>

        <div className="w-full h-[1px] bg-gray-100 my-1" />

        <div className="flex gap-1.5 items-start mt-1">
          <Star className="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" />
          <div className="flex flex-col gap-1 w-full pt-0.5">
            <div className="w-full h-1.5 rounded-full bg-gray-200" />
            <div className="w-4/5 h-1.5 rounded-full bg-gray-200" />
          </div>
        </div>

        <div className="flex flex-col gap-1.5 mt-2">
           <div className="w-full h-1.5 rounded-full bg-blue-100" />
           <div className="w-11/12 h-1.5 rounded-full bg-blue-100" />
           <div className="w-full h-1.5 rounded-full bg-gray-100" />
           <div className="w-3/4 h-1.5 rounded-full bg-gray-100" />
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// Cérebro — Project intelligence preview
// ─────────────────────────────────────────────
export function AIMockup() {
  const sources = ['Mercado', 'Público', 'Documentos', 'Histórico', 'Decisões']

  return (
    <div className="w-full h-full relative overflow-hidden bg-white flex items-center justify-center">
      <div className="w-[92%] max-w-[228px] rounded-[14px] border border-gray-200/80 bg-white shadow-[0_18px_45px_-32px_rgba(15,23,42,0.45)] overflow-hidden">
        {/* Context header */}
        <div className="flex items-center gap-2 px-3 pt-3 pb-2.5">
          <div className="w-5 h-5 rounded-[6px] bg-gray-950 text-white flex items-center justify-center shrink-0">
            <Sparkles className="w-2.5 h-2.5" strokeWidth={2.25} />
          </div>
          <div className="min-w-0">
            <div className="text-[8px] font-semibold text-gray-900 tracking-[-0.01em] leading-none">
              Analisando contexto
            </div>
            <div className="text-[6px] text-gray-400 mt-1 leading-none">
              Projeto atual
            </div>
          </div>
          <div className="ml-auto text-[6px] font-medium text-gray-400 tabular-nums">
            5 fontes
          </div>
        </div>

        {/* Subtle progress line */}
        <div className="h-px bg-gray-100 mx-3 overflow-hidden">
          <div className="h-full w-[72%] bg-gray-900" />
        </div>

        {/* Sources */}
        <div className="px-3 pt-2.5 pb-2.5">
          <div className="text-[5.5px] uppercase tracking-[0.14em] font-semibold text-gray-400 mb-1.5">
            Contexto considerado
          </div>
          <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[6.5px] leading-none text-gray-600">
            {sources.map((source, index) => (
              <span key={source} className="inline-flex items-center gap-1">
                {index > 0 && <span className="text-gray-300">•</span>}
                <span>{source}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Decision */}
        <div className="border-t border-gray-100 px-3 py-2.5 bg-gray-50/55">
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="text-[5.5px] uppercase tracking-[0.14em] font-semibold text-gray-400">
              Direção sugerida
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
          </div>
          <div className="text-[7.25px] font-semibold text-gray-900 leading-[1.35] tracking-[-0.01em]">
            Validar a proposta antes de construir.
          </div>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// Conversas — Team chat preview
// ─────────────────────────────────────────────
export function ChatMockup() {
  return (
    <div className="w-full h-full relative overflow-hidden bg-gradient-to-br from-gray-50/30 to-white/10 flex flex-col items-center justify-center pt-2">
      
      <div className="w-full px-8 flex flex-col gap-5">
        
        {/* Msg 1 */}
        <div className="flex gap-2.5 items-center">
          <div className="w-6 h-6 rounded-full bg-gradient-to-b from-cyan-300 to-cyan-500 border-2 border-white shadow-sm shrink-0" />
          <div className="flex flex-col gap-1.5 w-full">
            <div className="w-12 h-3 bg-indigo-200/70 rounded-full" />
            <div className="w-24 h-3 bg-gray-100 rounded-full" />
          </div>
        </div>
        
        {/* Msg 2 */}
        <div className="flex gap-2.5 items-start">
          <div className="w-6 h-6 rounded-full bg-gradient-to-b from-pink-300 to-rose-400 border-2 border-white shadow-sm shrink-0 mt-0.5" />
          <div className="flex flex-col gap-1.5 w-full">
            <div className="w-10 h-3 bg-indigo-200/70 rounded-full" />
            <div className="w-24 h-3 bg-gray-100 rounded-full" />
            
            {/* Reactions */}
            <div className="flex gap-1.5 mt-1.5">
              <div className="px-1.5 py-0.5 bg-white shadow-sm border border-gray-100 rounded-full flex gap-1 items-center hover:scale-105 transition-transform cursor-default">
                <span className="text-[8px] leading-none">🚀</span>
                <span className="text-[7px] text-gray-500 font-bold leading-none">16</span>
              </div>
              <div className="px-1.5 py-0.5 bg-white shadow-sm border border-gray-100 rounded-full flex gap-1 items-center hover:scale-105 transition-transform cursor-default">
                <span className="text-[8px] leading-none">✨</span>
                <span className="text-[7px] text-gray-500 font-bold leading-none">5</span>
              </div>
              <div className="px-1.5 py-0.5 bg-white shadow-sm border border-gray-100 rounded-full flex gap-1 items-center hover:scale-105 transition-transform cursor-default">
                <span className="text-[8px] leading-none">🦄</span>
                <span className="text-[7px] text-gray-500 font-bold leading-none">2</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
