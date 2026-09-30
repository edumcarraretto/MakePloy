import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'motion/react'
import './DesignUniquePreview.css'

export function DesignUniquePreview() {
  const frameRef = useRef<HTMLDivElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const scrollTrackRef = useRef<HTMLDivElement>(null)
  const scrollThumbRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<SVGSVGElement>(null)
  const pointerPathRef = useRef<SVGPathElement>(null)
  const grabPathRef = useRef<SVGPathElement>(null)
  const actionRef = useRef<HTMLDivElement>(null)
  const makeployFrameRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const viewport = viewportRef.current
    const frameElement = frameRef.current
    const track = scrollTrackRef.current
    const thumb = scrollThumbRef.current
    const cursor = cursorRef.current
    const pointerPath = pointerPathRef.current
    const grabPath = grabPathRef.current
    const action = actionRef.current
    const makeployFrame = makeployFrameRef.current
    if (!viewport || !frameElement || !track || !thumb || !cursor || !pointerPath || !grabPath || !action || !makeployFrame) return

    const updateScrollIndicator = () => {
      const distance = Math.max(0, viewport.scrollHeight - viewport.clientHeight)
      const trackHeight = track.clientHeight
      const thumbHeight = Math.min(38, trackHeight)
      const position = distance > 0 ? (viewport.scrollTop / distance) * (trackHeight - thumbHeight) : 0

      thumb.style.height = `${thumbHeight}px`
      thumb.style.transform = `translateY(${position}px)`
      return position
    }

    if (prefersReducedMotion) {
      viewport.scrollTop = 0
      updateScrollIndicator()
      frameElement.style.opacity = '0'
      makeployFrame.style.opacity = '1'
      makeployFrame.style.transform = 'none'
      action.style.opacity = '0'
      cursor.style.opacity = '0'
      return
    }

    let frame = 0
    let startedAt: number | null = null
    const cycle = 16000
    const ease = (progress: number) => progress * progress * (3 - 2 * progress)
    const clamp = (value: number) => Math.max(0, Math.min(1, value))
    const between = (time: number, start: number, end: number) => ease(clamp((time - start) / (end - start)))
    const mix = (start: number, end: number, progress: number) => start + (end - start) * progress

    const animateScroll = (now: number) => {
      startedAt ??= now
      const distance = Math.max(0, viewport.scrollHeight - viewport.clientHeight)
      const time = (now - startedAt) % cycle

      let progress = 0
      if (time >= 2150 && time < 5000) progress = 0.62 * between(time, 2150, 5000)
      else if (time >= 5000 && time < 7900) progress = 0.62
      else if (time >= 7900 && time < 9400) progress = 0.62 * (1 - between(time, 7900, 9400))

      viewport.scrollTop = distance * progress
      const thumbPosition = updateScrollIndicator()
      const thumbX = frameElement.clientWidth - 16
      const thumbY = (track.parentElement?.offsetTop ?? 21) + track.offsetTop + 10
      const actionX = frameElement.clientWidth - 89
      const actionY = frameElement.clientHeight - 53
      let cursorX = thumbX
      let cursorY = thumbY + thumbPosition

      if (time < 1900) {
        const approach = between(time, 1200, 1900)
        cursorX = mix(frameElement.clientWidth - 45, thumbX, approach)
        cursorY = mix(-20, thumbY, approach)
      } else if (time >= 5300) {
        const moveToAction = between(time, 5300, 6150)
        const endOfDragY = thumbY + (track.clientHeight - Math.min(38, track.clientHeight)) * 0.62
        cursorX = mix(thumbX, actionX, moveToAction)
        cursorY = mix(endOfDragY, actionY, moveToAction)
      }

      if (time >= 7000) {
        const moveToPage = between(time, 7000, 7750)
        cursorX = mix(actionX, frameElement.clientWidth * 0.43, moveToPage)
        cursorY = mix(actionY, 83, moveToPage)
      }

      const throwProgress = between(time, 7900, 8900)
      if (time >= 7900 && time < 8900) {
        cursorX -= frameElement.clientWidth * 1.2 * throwProgress
        cursorY -= 25 * throwProgress
      }

      const cursorEntrance = clamp((time - 1200) / 350)
      const cursorExit = clamp((8650 - time) / 400)
      const actionEntrance = clamp((time - 4650) / 350)
      const actionExit = clamp((7900 - time) / 400)
      const isDragging = time >= 1900 && time < 5000
      const isClicking = time >= 6200 && time < 6500
      const isGrabbingPage = time >= 7750 && time < 8500
      const isHolding = isDragging || isGrabbingPage
      const makeployEntrance = between(time, 8450, 9500)
      const makeployExit = 1 - between(time, 14300, 15000)
      const firstPageReturn = between(time, 15000, 15500)

      cursor.style.left = `${cursorX}px`
      cursor.style.top = `${cursorY}px`
      cursor.style.opacity = `${Math.min(cursorEntrance, cursorExit)}`
      cursor.style.transform = `scale(${isDragging || isClicking || isGrabbingPage ? 0.86 : 1})`
      pointerPath.style.opacity = isHolding ? '0' : '1'
      grabPath.style.opacity = isHolding ? '1' : '0'
      action.style.opacity = `${Math.min(actionEntrance, actionExit)}`
      action.style.transform = `scale(${isClicking ? 0.94 : 1})`
      thumb.style.width = isDragging ? '5px' : '3px'
      thumb.style.boxShadow = isDragging ? '0 0 12px rgb(37 99 235 / 0.7)' : ''
      const grabLift = between(time, 7750, 7900)
      frameElement.style.transform = time < 7750 || time >= 15000
        ? 'none'
        : time < 7900
          ? `translate3d(0, ${-4 * grabLift}px, 0) scale(${1 - 0.03 * grabLift})`
          : `translate3d(${-120 * throwProgress}%, ${-4 - 25 * throwProgress}px, 0) rotate(${-12 * throwProgress}deg) scale(${0.97 - 0.05 * throwProgress})`
      frameElement.style.boxShadow = time >= 7750 && time < 8900 ? '0 18px 32px rgb(0 0 0 / 0.6)' : ''
      frameElement.style.opacity = time < 8600 ? '1' : time < 8900 ? `${1 - between(time, 8600, 8900)}` : `${firstPageReturn}`
      makeployFrame.style.opacity = `${Math.min(makeployEntrance, makeployExit)}`
      makeployFrame.style.transform = `translate3d(${115 * (1 - makeployEntrance)}%, ${30 * (1 - makeployEntrance)}px, 0) rotate(${8 * (1 - makeployEntrance)}deg) scale(${0.9 + 0.1 * makeployEntrance})`

      frame = window.requestAnimationFrame(animateScroll)
    }

    frame = window.requestAnimationFrame(animateScroll)
    return () => window.cancelAnimationFrame(frame)
  }, [prefersReducedMotion])

  return (
    <div className="relative h-[220px] w-full shrink-0">
    <div ref={frameRef} className="design-preview-frame absolute inset-0 flex flex-col rounded-[10px] border border-white/15">
      <div aria-hidden="true" className="flex h-[21px] shrink-0 items-center gap-1.5 rounded-t-[9px] border-b border-white/10 bg-black px-3">
        <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
        <span className="ml-2 rounded border border-white/10 bg-white/5 px-2 py-0.5 text-[7px] leading-none text-neutral-400">flow.com.br</span>
      </div>
      <div className="relative min-h-0 flex-1">
        <div
          ref={viewportRef}
          role="img"
          aria-label="Simulação de uma página de venda da garrafa térmica Flow como exemplo de outras plataformas, com navegação, benefícios, oferta e rodapé"
          className="h-full w-full overflow-hidden"
        >
          <div aria-hidden="true" className="bg-[#f8fafc] text-slate-900">
          <div className="flex h-9 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-5 sm:px-6">
            <span className="text-[11px] font-extrabold tracking-[0.12em] text-blue-600">FLOW</span>
            <div className="flex items-center gap-3 text-[8px] font-medium text-slate-500 sm:gap-4">
              <span className="text-slate-900">Início</span>
              <span>Benefícios</span>
              <span>Comprar</span>
            </div>
          </div>

          <div className="grid min-h-[168px] grid-cols-[54%_46%] bg-[#e9f2ff]">
            <div className="flex flex-col justify-center px-5 py-3 sm:px-6">
              <span className="mb-1.5 text-[8px] font-semibold uppercase tracking-[0.14em] text-blue-600">
                Novidade
              </span>
              <span className="max-w-[170px] text-[18px] font-bold leading-[1.1] tracking-tight text-slate-900">
                A garrafa ideal para você
              </span>
              <span className="mt-1.5 max-w-[170px] text-[9px] leading-[1.4] text-slate-600">
                Praticidade, estilo e qualidade para todos os momentos.
              </span>
              <span className="mt-3 w-fit rounded bg-blue-600 px-3 py-1.5 text-[9px] font-semibold text-white">
                Comprar agora
              </span>
            </div>

            <div className="flex items-center justify-center" aria-hidden="true">
              <svg viewBox="0 0 112 138" className="h-full w-full" fill="none">
                <ellipse cx="56" cy="120" rx="28" ry="4" fill="#1E3A8A" fillOpacity=".15" />
                <rect x="44" y="19" width="24" height="12" rx="3" fill="#1D4ED8" />
                <path d="M41 30h30v10c5 4 7 9 7 15v49c0 8-6 14-14 14H48c-8 0-14-6-14-14V55c0-6 2-11 7-15V30Z" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="1.5" />
                <path d="M45 47c-3 4-4 8-4 14v43" stroke="#BFDBFE" strokeOpacity=".75" strokeWidth="4" strokeLinecap="round" />
                <path d="M42 77h28" stroke="#1D4ED8" strokeOpacity=".3" strokeWidth="1.5" />
              </svg>
            </div>
          </div>

          <div className="border-t border-slate-200 bg-white px-5 py-5 sm:px-6">
            <span className="text-[8px] font-semibold uppercase tracking-[0.14em] text-blue-600">Benefícios</span>
            <div className="mt-1 text-[15px] font-bold leading-tight text-slate-900">Tudo o que você precisa</div>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <div className="rounded-md border border-slate-200 p-2.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-[11px] font-bold text-blue-600">✓</span>
                <div className="mt-2 text-[9px] font-semibold text-slate-900">Qualidade</div>
                <div className="mt-0.5 text-[8px] leading-snug text-slate-500">Feita para acompanhar sua rotina.</div>
              </div>
              <div className="rounded-md border border-slate-200 p-2.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-[11px] font-bold text-blue-600">✓</span>
                <div className="mt-2 text-[9px] font-semibold text-slate-900">Praticidade</div>
                <div className="mt-0.5 text-[8px] leading-snug text-slate-500">Leve para onde você quiser.</div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-200 bg-[#f0f5ff] px-5 py-5 sm:px-6">
            <span className="text-[8px] font-semibold uppercase tracking-[0.14em] text-blue-600">Oferta especial</span>
            <div className="mt-1 text-[14px] font-bold text-slate-900">Garrafa térmica Flow</div>
            <p className="mt-1 text-[9px] leading-relaxed text-slate-600">Sua companhia para todos os dias.</p>
            <div className="mt-3 flex items-center justify-between gap-3">
              <span className="text-[16px] font-extrabold text-slate-900">R$ 129,90</span>
              <span className="rounded bg-blue-600 px-3 py-1.5 text-[8px] font-semibold text-white">Comprar agora</span>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-slate-200 bg-white px-5 py-3 text-[8px] text-slate-500 sm:px-6">
            <span className="font-bold text-blue-600">FLOW</span>
            <span>Contato · Termos</span>
          </div>
          </div>
        </div>
        <div ref={scrollTrackRef} aria-hidden="true" className="pointer-events-none absolute bottom-3 right-2 top-3 w-px rounded-full bg-gradient-to-b from-transparent via-slate-500/30 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100">
          <div ref={scrollThumbRef} className="relative -left-px w-[3px] rounded-full bg-gradient-to-b from-blue-400 to-blue-600 shadow-[0_0_9px_rgba(37,99,235,0.25)]" />
        </div>
      </div>
      <div ref={actionRef} aria-hidden="true" className="pointer-events-none absolute bottom-9 right-3 z-20 rounded-md border border-white/20 bg-black px-3 py-2 text-[9px] font-semibold text-white opacity-0 shadow-[0_5px_18px_rgba(0,0,0,0.28)]">
        Criar com MakePloy
      </div>
      <div className="flex h-6 shrink-0 items-center justify-center gap-2 border-t border-white/15 text-[9px] font-semibold uppercase tracking-[0.12em] text-neutral-400">
        <span className="h-px w-3 bg-white/35" aria-hidden="true" />
        Outras plataformas
        <span className="h-px w-3 bg-white/35" aria-hidden="true" />
      </div>
    </div>
    <div ref={makeployFrameRef} className="design-preview-frame absolute inset-0 flex flex-col overflow-hidden rounded-[10px] border border-[#819b8d]/50 bg-[#e8eee6] opacity-0">
      <div aria-hidden="true" className="flex h-[21px] shrink-0 items-center gap-1.5 border-b border-white/10 bg-black px-3">
        <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
        <span className="ml-2 rounded border border-white/10 bg-white/5 px-2 py-0.5 text-[7px] leading-none text-neutral-400">flow.com.br</span>
      </div>
      <div role="img" aria-label="Nova página da Flow com visual editorial, produto em destaque e identidade criada com MakePloy" className="relative min-h-0 flex-1 overflow-hidden bg-[#e8eee6] text-[#173a32]">
        <div className="relative z-10 flex h-[29px] items-center justify-between border-b border-[#173a32]/15 px-4 sm:px-5">
          <span className="text-[13px] font-black tracking-[-0.12em]">flow<span className="text-[#fd6c4e]">.</span></span>
          <span className="text-[7px] font-semibold uppercase tracking-[0.16em]">Coleção 01&nbsp; / &nbsp; Menu +</span>
        </div>
        <div className="relative h-[calc(100%-29px)] overflow-hidden px-4 pt-2 sm:px-5">
          <div className="absolute -right-9 -top-10 h-[190px] w-[190px] rounded-full border border-[#173a32]/10" />
          <div className="design-flow-orbit absolute right-1 top-1 h-[132px] w-[132px] rounded-full bg-[#c3dfcd] blur-[1px]" />
          <span className="relative z-10 block text-[7px] font-bold uppercase tracking-[0.2em] text-[#3d7062]">Hidratação em movimento</span>
          <div className="relative z-10 mt-1.5 max-w-[170px] font-serif text-[24px] font-semibold leading-[0.93] tracking-[-0.06em] sm:text-[26px]">
            Seu ritmo.<br />Sua Flow.
          </div>
          <p className="relative z-10 mt-1.5 max-w-[135px] text-[8px] leading-[1.35] text-[#45695d]">O essencial acompanha você por onde for.</p>
          <div className="relative z-10 mt-2 w-fit rounded-full bg-[#173a32] px-3 py-1 text-[7px] font-bold uppercase tracking-[0.1em] text-[#e8eee6]">Explorar a Flow ↗</div>
          <svg aria-hidden="true" viewBox="0 0 100 142" className="design-flow-bottle absolute -right-1 top-0 z-10 h-[135px] w-[104px] sm:right-1">
            <defs>
              <linearGradient id="flow-body" x1="0" x2="1" y1="0" y2="0">
                <stop stopColor="#24483f" />
                <stop offset="0.48" stopColor="#6c9d86" />
                <stop offset="1" stopColor="#163a32" />
              </linearGradient>
              <linearGradient id="flow-cap" x1="0" x2="1" y1="0" y2="0">
                <stop stopColor="#102b27" />
                <stop offset="0.5" stopColor="#496a58" />
                <stop offset="1" stopColor="#102b27" />
              </linearGradient>
            </defs>
            <ellipse cx="52" cy="132" rx="32" ry="5" fill="#173a32" opacity="0.16" />
            <rect x="39" y="8" width="27" height="14" rx="4" fill="url(#flow-cap)" />
            <path d="M37 22h31v11c6 4 8 10 8 17v67c0 7-6 12-13 12H42c-7 0-13-5-13-12V50c0-7 2-13 8-17V22Z" fill="url(#flow-body)" />
            <path d="M37 43c-2 3-3 7-3 13v58" fill="none" stroke="#d5eedc" strokeWidth="3" opacity="0.55" strokeLinecap="round" />
            <rect x="31" y="62" width="43" height="33" rx="2" fill="#dce8d3" />
            <text x="52" y="83" textAnchor="middle" fill="#173a32" fontSize="14" fontWeight="800" letterSpacing="-1.6">flow.</text>
            <path d="M33 102h41" stroke="#c4e0ca" opacity="0.5" />
          </svg>
          <div className="absolute bottom-0 left-0 right-0 z-20 flex h-[18px] items-center justify-between bg-[#173a32] px-4 text-[7px] font-medium tracking-[0.08em] text-[#e8eee6] sm:px-5">
            <span>FEITA PARA ACOMPANHAR.</span><span>01 / 03</span>
          </div>
        </div>
      </div>
      <div className="flex h-6 shrink-0 items-center justify-center gap-2 bg-black text-[9px] font-semibold uppercase tracking-[0.12em] text-[#c3dfcd]">
        <span className="h-px w-3 bg-[#c3dfcd]/60" aria-hidden="true" />
        Criado com MakePloy
        <span className="h-px w-3 bg-[#c3dfcd]/60" aria-hidden="true" />
      </div>
    </div>
    <svg ref={cursorRef} aria-hidden="true" viewBox="0 0 24 27" className="pointer-events-none absolute z-30 h-[27px] w-6 opacity-0 drop-shadow-[0_2px_2px_rgba(0,0,0,0.45)]">
      <path ref={pointerPathRef} d="M2 1.5v21l5.3-5.2 4.1 8 3.2-1.6-4.1-7.9 7.4-1.2L2 1.5Z" fill="white" stroke="#111827" strokeWidth="1.5" strokeLinejoin="round" />
      <path ref={grabPathRef} d="M6.5 14V8a1.5 1.5 0 0 1 3 0v4-6a1.5 1.5 0 0 1 3 0v6-5a1.5 1.5 0 0 1 3 0v6-3a1.5 1.5 0 0 1 3 0v7c0 4-2.5 6.5-6 6.5h-2c-2.5 0-4-1-5.4-3.2l-2.7-4.2a1.6 1.6 0 0 1 2.7-1.7L6.5 17v-3Z" fill="white" stroke="#111827" strokeWidth="1.3" strokeLinejoin="round" opacity="0" />
    </svg>
    </div>
  )
}
