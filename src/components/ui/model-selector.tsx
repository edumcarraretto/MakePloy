import type { ComponentType } from 'react'
import { useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Check, ChevronDown } from 'lucide-react'
import { AI_MODELS } from './ai-models'

interface SelectorOption {
  id: string
  name: string
  icon?: ComponentType<{ className?: string }>
  iconColor?: string
}

function CompactSelector({ options, label, initial }: { options: SelectorOption[]; label: string; initial?: string }) {
  const [selected, setSelected] = useState(initial ?? options[0].id)
  const [position, setPosition] = useState<{ top: number; left: number } | null>(null)
  const trigger = useRef<HTMLButtonElement>(null)
  const menu = useRef<HTMLDivElement>(null)
  const id = useId()
  const model = options.find((item) => item.id === selected) ?? options[0]
  const Icon = model.icon

  function close(restoreFocus = false) {
    setPosition(null)
    if (restoreFocus) trigger.current?.focus()
  }

  useEffect(() => {
    if (!position) return
    menu.current?.querySelector<HTMLElement>('[aria-checked="true"]')?.focus()
    const outside = (event: PointerEvent) => {
      if (!menu.current?.contains(event.target as Node) && !trigger.current?.contains(event.target as Node)) setPosition(null)
    }
    const dismiss = () => setPosition(null)
    document.addEventListener('pointerdown', outside)
    window.addEventListener('resize', dismiss)
    window.addEventListener('scroll', dismiss)
    return () => {
      document.removeEventListener('pointerdown', outside)
      window.removeEventListener('resize', dismiss)
      window.removeEventListener('scroll', dismiss)
    }
  }, [position])

  return (
    <>
      <button
        ref={trigger}
        type="button"
        aria-label={`${label}: ${model.name}`}
        aria-haspopup="menu"
        aria-expanded={!!position}
        aria-controls={position ? id : undefined}
        className="ml-0.5 inline-flex h-5 cursor-pointer items-center gap-1 rounded-full border border-white/[0.06] bg-white/[0.04] px-1.5 text-neutral-300 hover:bg-white/10 focus-visible:outline-1 focus-visible:outline-white/60"
        onClick={() => {
          if (position) return close()
          const rect = trigger.current!.getBoundingClientRect()
          const menuHeight = options.length * 31 + 20
          setPosition({ left: Math.max(8, Math.min(rect.left, window.innerWidth - 224)), top: Math.max(8, rect.top > menuHeight + 8 ? rect.top - menuHeight : Math.min(rect.bottom + 6, window.innerHeight - menuHeight - 8)) })
        }}
      >
        {Icon && <Icon className={`h-2.5 w-2.5 shrink-0 ${model.iconColor}`} />}
        {model.name}
        <ChevronDown size={11} className={`text-neutral-500 ${position ? 'rotate-180' : ''}`} />
      </button>
      {position && createPortal(
        <div
          ref={menu}
          id={id}
          role="menu"
          tabIndex={-1}
          aria-label={label}
          style={{ ...position, colorScheme: 'dark' }}
          className="fixed z-[1000] max-h-[calc(100dvh-16px)] w-[216px] overflow-y-auto rounded-xl border border-white/10 bg-[#141414] p-1.5 text-neutral-300 shadow-[0_12px_40px_rgba(0,0,0,0.65)]"
          onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) close() }}
          onKeyDown={(event) => {
            if (event.key === 'Escape') { event.preventDefault(); close(true) }
            if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
              event.preventDefault()
              const items = Array.from(menu.current!.querySelectorAll<HTMLButtonElement>('[role="menuitemradio"]'))
              const index = items.indexOf(document.activeElement as HTMLButtonElement)
              const next = event.key === 'Home' ? 0 : event.key === 'End' ? items.length - 1 : (index + (event.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length
              items[next]?.focus()
            }
          }}
        >
          {options.map((item) => {
            const ItemIcon = item.icon
            return (
              <button key={item.id} type="button" role="menuitemradio" aria-checked={selected === item.id} tabIndex={-1}
                className="flex w-full cursor-pointer items-center gap-2 rounded-lg px-2 py-2 text-left text-[11px] hover:bg-white/[0.08] focus:bg-white/[0.08] focus:outline-none aria-checked:bg-white/[0.06] aria-checked:text-white"
                onClick={() => { setSelected(item.id); close(true) }}
              >
                {ItemIcon && <ItemIcon className={`h-3 w-3 shrink-0 ${item.iconColor}`} />}
                <span>{item.name}</span>
                {selected === item.id && <Check size={12} className="ml-auto" />}
              </button>
            )
          })}
        </div>, document.body,
      )}
    </>
  )
}

export function ModelSelector() {
  return <CompactSelector options={AI_MODELS} label="Modelo de IA" />
}

const LEVELS = [
  { id: 'leve', name: 'Leve' },
  { id: 'moderado', name: 'Moderado' },
  { id: 'maximo', name: 'Máximo' },
]

export function EffortSelector() {
  return <CompactSelector options={LEVELS} label="Nível de análise" initial="moderado" />
}
