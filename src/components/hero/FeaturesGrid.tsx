import { useEffect, useRef, useState } from 'react'
import { Target, Search, PenLine, Palette, Code2, Workflow, Rocket, ChartNoAxesCombined } from 'lucide-react'
import './FeaturesGrid.css'

export function FeaturesGrid() {
  const sectionRef = useRef<HTMLElement>(null)
  const tlRef = useRef<HTMLDivElement>(null)
  const speedRef = useRef<HTMLDivElement>(null)
  const backupRef = useRef<HTMLDivElement>(null)
  const funRef = useRef<HTMLDivElement>(null)
  
  const [currentTime, setCurrentTime] = useState('')
  const [animationsActive, setAnimationsActive] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setAnimationsActive(true)
        observer.disconnect()
      }
    }, { threshold: 0.05 })

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const months = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']
      const dateStr = `${now.getDate().toString().padStart(2, '0')} ${months[now.getMonth()]} ${now.getFullYear()}`
      const timeStr = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      setCurrentTime(`${dateStr} · ${timeStr}`)
    }
    updateTime()
    const interval = setInterval(updateTime, 60000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (!animationsActive) return

    let isActive = true
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const wait = (ms: number) => new Promise(r => setTimeout(r, ms))

    // 1. Rápido (Timeline)
    const tl = tlRef.current
    if (tl) {
      const steps = Array.from(tl.querySelectorAll('.step'))
      const DUR = [900, 1400, 3200]
      const setRail = (step: Element, h: string) => {
        const f = step.querySelector('.rail i') as HTMLElement
        if (f) f.style.height = h
      }

      if (reduce) {
        steps.forEach(s => { s.classList.add('done'); setRail(s, '100%') })
      } else {
        const loopTl = async () => {
          while (isActive) {
            steps.forEach(s => { s.classList.remove('loading','done','filling'); setRail(s, '0') })
            await wait(600)
            if (!isActive) break

            for (let i = 0; i < steps.length; i++) {
              if (!isActive) break
              const s = steps[i]
              s.classList.add('loading')
              await wait(DUR[i] + 120)
              if (!isActive) break
              s.classList.remove('loading')
              s.classList.add('done')
              await wait(300)
              if (!isActive) break

              if (s.querySelector('.rail')) {
                s.classList.add('filling')
                setRail(s, '100%')
                await wait(600)
                s.classList.remove('filling')
              }
            }
            await wait(1900)
          }
        }
        loopTl()
      }
    }

    // 2. Poderoso (Speed)
    const speed = speedRef.current
    let speedInterval: number
    if (speed) {
      const opts = Array.from(speed.querySelectorAll('.opt'))
      const labs = Array.from(speed.querySelectorAll('.lab'))
      const sel = speed.querySelector('.selector') as HTMLElement
      const TINT = ['rgba(10,132,255,.18)','rgba(255,180,0,.22)','rgba(255,59,48,.18)']
      const GLOW = ['rgba(10,132,255,.08)','rgba(255,180,0,.10)','rgba(255,59,48,.08)']
      let idx = 0

      const apply = (n: number) => {
        opts.forEach((o, k) => o.classList.toggle('on', k === n))
        labs.forEach((l, k) => l.classList.toggle('on', k === n))
        if (sel) {
          sel.style.borderColor = TINT[n]
          sel.style.boxShadow = `0 1px 6px ${GLOW[n]}`
        }
      }
      apply(0)

      if (!reduce) {
        speedInterval = window.setInterval(() => {
          idx = (idx + 1) % opts.length
          apply(idx)
        }, 2400)
      }
    }

    // 3. Ideia (Backup element)
    const bk = backupRef.current
    let frameId: number
    if (bk) {
      const prog = bk.querySelector('.bk-prog') as HTMLElement
      const CIRC = 56.55
      const LOAD = 3000

      if (reduce) {
        bk.classList.add('done')
        if (prog) prog.style.strokeDashoffset = '0'
      } else {
        const orbits = Array.from(bk.querySelectorAll('.orbit')) as HTMLElement[]
        let state = 'idle', t0 = 0

        const frame = (now: number) => {

          if (state === 'loading' && prog) {
            const t = Math.min(1, (now - t0) / LOAD)
            const done = Math.pow(t, 1.55)
            prog.style.strokeDashoffset = (CIRC * (1 - done)).toFixed(2)

            // Orbit pulse: fixed gentle breathing to prevent erratic acceleration
            orbits.forEach((o, i) => {
              // Phase advances slowly (0.15Hz), with a small linear shift from progress (t)
              const phase = ((now / 1000) * 0.15 + t * 0.3 + i * 0.4) % 1
              const pulse = Math.sin(phase * Math.PI * 2)
              const scale = 1 + pulse * 0.015
              const opacity = 0.1 + pulse * 0.15 + t * 0.25
              o.style.transform = `scale(${scale.toFixed(4)})`
              o.style.opacity = opacity.toFixed(3)
            })
          }
          if (isActive) {
            frameId = requestAnimationFrame(frame)
          }
        }
        frameId = requestAnimationFrame(frame)

        const bkLoop = async () => {
          while (isActive) {
            state = 'idle'
            bk.classList.remove('loading','done')
            orbits.forEach(o => { o.style.transition = ''; o.style.opacity = '0'; o.style.transform = 'scale(1)' })
            if (prog) prog.style.strokeDashoffset = CIRC.toString()
            await wait(500)
            if (!isActive) break

            t0 = performance.now()
            state = 'loading'
            bk.classList.add('loading')
            await wait(LOAD)
            if (!isActive) break

            state = 'done'
            bk.classList.remove('loading')
            bk.classList.add('done')
            if (prog) prog.style.strokeDashoffset = '0'
            orbits.forEach(o => {
              o.style.transition = 'opacity .8s ease-out, transform .8s ease-out'
              o.style.opacity = '0'
              o.style.transform = 'scale(1.05)'
            })
            await wait(2300)
          }
        }
        bkLoop()
      }
    }

    // 4. Team carousel (fun card)
    let funInterval: ReturnType<typeof setInterval> | null = null
    let funResetTimeout: ReturnType<typeof setTimeout> | null = null
    const funStage = funRef.current
    if (funStage) {
      const circles = Array.from(funStage.querySelectorAll('.ava')) as HTMLElement[]
      const count = circles.length
      let idx = 0

      const positionCircles = () => {
        const left = (idx - 1 + count) % count
        const center = idx
        const right = (idx + 1) % count
        circles.forEach((c, i) => {
          if (i === center) c.dataset.pos = 'center'
          else if (i === left) c.dataset.pos = 'left'
          else if (i === right) c.dataset.pos = 'right'
          else c.dataset.pos = 'enter'
        })
      }

      positionCircles()

      if (!reduce) {
        funInterval = setInterval(() => {
          const prevLeft = (idx - 1 + count) % count
          circles[prevLeft].dataset.pos = 'exit'
          funResetTimeout = setTimeout(() => {
            circles[prevLeft].style.transition = 'none'
            circles[prevLeft].dataset.pos = 'enter'
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                circles[prevLeft].style.transition = ''
              })
            })
          }, 650)

          idx = (idx + 1) % count
          positionCircles()
        }, 2000)
      }
    }

    return () => {
      isActive = false
      if (speedInterval) window.clearInterval(speedInterval)
      if (frameId) window.cancelAnimationFrame(frameId)
      if (funInterval) window.clearInterval(funInterval)
      if (funResetTimeout) window.clearTimeout(funResetTimeout)
    }
  }, [animationsActive])

  return (
    <section ref={sectionRef} id="como-funciona" aria-labelledby="features-heading" className="features-wrapper">
      <h2 id="features-heading" className="sr-only">Como a MAKEPLOY mantém o contexto do projeto</h2>
      <div className="grid">
        {/* 1 */}
        <section className="card easy">
          <div className="stage">
            <div className="wallet">
              <div className="row">
                <div className="ico send">
                  <svg viewBox="0 0 24 24">
                    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                  </svg>
                </div>
                <div className="txt">
                  <strong>Onde tudo começa</strong>
                  <span>O que você tem em mente já é suficiente. A partir daí, tudo ganha forma.</span>
                </div>
              </div>
              <div className="row">
                <div className="ico swap">
                  <svg viewBox="0 0 24 24">
                    <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                  </svg>
                </div>
                <div className="txt">
                  <strong>O caminho certo</strong>
                  <span>Dados, mercado, marketing e mais de 20 fatores trabalham juntos para definir o próximo passo.</span>
                </div>
              </div>
              <div className="row">
                <div className="ico recv">
                  <svg viewBox="0 0 24 24">
                    <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
                  </svg>
                </div>
                <div className="txt">
                  <strong>Construa do seu jeito</strong>
                  <span>Crie visualmente, com IA ou diretamente no código.</span>
                </div>
              </div>
              <div className="row">
                <div className="ico buy">
                  <svg viewBox="0 0 24 24">
                    <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.36 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z" />
                  </svg>
                </div>
                <div className="txt">
                  <strong>Publique sem encerrar</strong>
                  <span>Coloque no ar, opere e desenvolva a próxima versão.</span>
                </div>
              </div>
            </div>
          </div>
          <h3>Seu projeto, a partir daqui</h3>
          <p>Do zero, de uma ideia ou de algo em andamento. A MakePloy faz todo o resto.</p>
        </section>

        {/* 2 */}
        <section className="card secure">
          <div className="stage">
            <div className="backup" id="backup" ref={backupRef}>
              <span className="orbit o1"></span>
              <span className="orbit o2"></span>
              <span className="glow"></span>
              <div className="backing">
                <span className="bk-icon">
                  <svg viewBox="0 0 24 24">
                    <circle className="bk-track" cx="12" cy="12" r="9" />
                    <circle className="bk-prog" cx="12" cy="12" r="9" />
                    <circle className="bk-core" cx="12" cy="12" r="10.3" />
                    <path className="bk-tick" d="M7.6 12.3l3 3L16.4 9.6" />
                  </svg>
                </span>
                <span className="bk-label" translate="no">
                  <b className="l1">Entendendo o projeto</b>
                  <b className="l2">Próximo passo definido</b>
                </span>
              </div>
            </div>
          </div>
          <h3>Contexto antes de execução</h3>
          <p>Objetivos, decisões e histórico orientam cada etapa.</p>
        </section>

        {/* 3 */}
        <section className="card fast-card">
          <div className="stage">
            <div className="timeline" id="tl" ref={tlRef}>
              <div className="step" style={{ '--dur': '.9s' } as React.CSSProperties}>
                <span className="dot">
                  <span className="pulse"></span>
                  <svg viewBox="0 0 24 24">
                    <circle className="track" cx="12" cy="12" r="9" />
                    <circle className="prog" cx="12" cy="12" r="9" />
                    <circle className="core" cx="12" cy="12" r="10.3" />
                    <path className="tick" d="M7.8 12.3l2.9 2.9L16.2 9.7" />
                  </svg>
                </span>
                <span className="label">Contexto compreendido</span>
                <span className="rail">
                  <i></i>
                </span>
              </div>
              <div className="step" style={{ '--dur': '1.4s' } as React.CSSProperties}>
                <span className="dot">
                  <span className="pulse"></span>
                  <svg viewBox="0 0 24 24">
                    <circle className="track" cx="12" cy="12" r="9" />
                    <circle className="prog" cx="12" cy="12" r="9" />
                    <circle className="core" cx="12" cy="12" r="10.3" />
                    <path className="tick" d="M7.8 12.3l2.9 2.9L16.2 9.7" />
                  </svg>
                </span>
                <span className="label">Direção estruturada</span>
                <span className="rail">
                  <i></i>
                </span>
              </div>
              <div className="step" style={{ '--dur': '3.2s' } as React.CSSProperties}>
                <span className="dot">
                  <span className="pulse"></span>
                  <svg viewBox="0 0 24 24">
                    <circle className="track" cx="12" cy="12" r="9" />
                    <circle className="prog" cx="12" cy="12" r="9" />
                    <circle className="core" cx="12" cy="12" r="10.3" />
                    <path className="tick" d="M7.8 12.3l2.9 2.9L16.2 9.7" />
                  </svg>
                </span>
                <span className="label">Construção iniciada</span>
                <time>{currentTime || 'Calculando...'}</time>
              </div>
            </div>
          </div>
          <h3>Pesquisa que chega à construção</h3>
          <p>O que foi descoberto continua disponível para criar, escrever e programar.</p>
        </section>

        {/* 4 */}
        <section className="card power">
          <div className="stage">
            <div className="speed-strip">
              <div className="ghost">
                te <span className="info">i</span>
              </div>
              <div className="speed" id="speed" ref={speedRef}>
                <div className="labels">
                  <div className="lab on">
                    <b>Rápido</b>
                    <span>~ 15 Segs</span>
                  </div>
                  <div className="lab">
                    <b>Detalhado</b>
                    <span>~ 45 Segs</span>
                  </div>
                  <div className="lab">
                    <b>Profundo</b>
                    <span>~ 60 Segs</span>
                  </div>
                </div>
                <div className="selector">
                  <span className="opt on" style={{ '--c': '#0A84FF' } as React.CSSProperties}>
                    <i className="pip"></i>
                    <svg className="ic" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10.5" fill="#0A84FF" />
                      <path
                        d="M12 6.6v5.7l3.5 2"
                        fill="none"
                        stroke="#fff"
                        strokeWidth="2.1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="opt" style={{ '--c': '#FFB400' } as React.CSSProperties}>
                    <i className="pip"></i>
                    <svg className="ic" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10.5" fill="#FFB400" />
                      <path d="M13.6 4.8l-6 8.2h3.6l-1.2 6.2 6-8.4h-3.7z" fill="#fff" />
                    </svg>
                  </span>
                  <span className="opt" style={{ '--c': '#FF3B30' } as React.CSSProperties}>
                    <i className="pip"></i>
                    <svg className="ic" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10.5" fill="#FF3B30" />
                      <path
                        d="M12 4.6c.4 2 1.5 3 2.6 4.1 1.2 1.2 2 2.4 2 4.1a4.6 4.6 0 1 1-9.2 0c0-1.6.6-2.6 1.5-3.6.2.9.6 1.5 1.3 1.8-.5-2.3.4-4.5 1.8-6.4z"
                        fill="#fff"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <h3>Profundidade sob demanda</h3>
          <p>Seja rápido no simples. Aprofunde o que exige mais contexto.</p>
        </section>

        {/* 5 */}
        <section className="card fun">
          <div className="stage" ref={funRef}>
            <div className="ava c1"><Target size={34} strokeWidth={2.2} /></div>
            <div className="ava c2"><Search size={34} strokeWidth={2.2} /></div>
            <div className="ava c3"><PenLine size={34} strokeWidth={2.2} /></div>
            <div className="ava c4"><Palette size={34} strokeWidth={2.2} /></div>
            <div className="ava c5"><Code2 size={34} strokeWidth={2.2} /></div>
            <div className="ava c6"><Workflow size={34} strokeWidth={2.2} /></div>
            <div className="ava c7"><Rocket size={34} strokeWidth={2.2} /></div>
            <div className="ava c8"><ChartNoAxesCombined size={34} strokeWidth={2.2} /></div>
          </div>
          <h3>Especialidades sem silos</h3>
          <p>Pesquisa, design, conteúdo, código e operação trabalham sobre a mesma base.</p>
        </section>
      </div>
    </section>
  )
}
