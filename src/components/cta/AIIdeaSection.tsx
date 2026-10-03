import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { ArrowUp, ChevronDown, Check } from 'lucide-react'
import { GradientText } from '@/components/text/GradientText'
import { openEarlyAccess } from '@/lib/earlyAccess'
import { AI_MODELS } from '@/components/ui/ai-models'

interface SuggestionOption {
  label: string
  prompt: string
}

const ALL_SUGGESTIONS: SuggestionOption[] = [
  {
    label: 'Criar uma startup',
    prompt:
      'Quero criar uma plataforma SaaS focada em automação de tarefas. Preciso de autenticação segura, dashboard interativo com métricas em tempo real, integração de pagamentos e arquitetura escalável.',
  },
  {
    label: 'Criar site de startup',
    prompt:
      'Desenvolver um site institucional moderno e responsivo para minha startup, com visual dark mode, animações fluidas, alta pontuação de performance e seções para apresentação, serviços e contato.',
  },
  {
    label: 'Landing page',
    prompt:
      'Construir uma landing page de alta conversão para meu produto, incluindo headline persuasiva, demonstração dos recursos, depoimentos de clientes e chamada para ação com checkout integrado.',
  },
  {
    label: 'Continuar um projeto',
    prompt:
      'Tenho uma aplicação existente e quero continuar seu desenvolvimento: adicionar novas funcionalidades, otimizar a experiência mobile e refatorar componentes mantendo a base de código limpa.',
  },
]

const PLACEHOLDER_SUGGESTIONS = [
  'Tenho uma ideia de criação de conteúdo...',
  'Quero criar um SaaS para automatizar processos...',
  'Criar uma landing page de alta conversão para meu produto...',
  'Desenvolver um app moderno e validar no mercado...',
  'Continuar meu projeto existente e acelerar o desenvolvimento...',
]

export function AIIdeaSection() {
  const [prompt, setPrompt] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [selectedModel, setSelectedModel] = useState('GPT 5.6 Terra')
  const [suggestionIndex, setSuggestionIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [showCursor, setShowCursor] = useState(true)


  const dropdownRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()

  const currentModel = AI_MODELS.find((m) => m.name === selectedModel) || AI_MODELS[0]
  const CurrentModelIcon = currentModel.icon



  // Alterna o cursor piscante quando não estiver com foco
  useEffect(() => {
    if (reduceMotion) return
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 530)
    return () => clearInterval(interval)
  }, [reduceMotion])

  // Efeito de escrita e exclusão contínua para sugestões de prompts
  useEffect(() => {
    if (reduceMotion) {
      setDisplayText('Descreva uma ideia ou o projeto que já existe.')
      return
    }

    const currentPhrase = PLACEHOLDER_SUGGESTIONS[suggestionIndex]
    let timer: ReturnType<typeof setTimeout>

    if (!isDeleting) {
      if (displayText.length < currentPhrase.length) {
        timer = setTimeout(() => {
          setDisplayText(currentPhrase.slice(0, displayText.length + 1))
        }, 45)
      } else {
        // Pausa com a frase completa para leitura
        timer = setTimeout(() => {
          setIsDeleting(true)
        }, 2200)
      }
    } else {
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText(currentPhrase.slice(0, displayText.length - 1))
        }, 20)
      } else {
        // Pausa breve com o campo vazio antes de iniciar a próxima frase
        timer = setTimeout(() => {
          setIsDeleting(false)
          setSuggestionIndex((prev) => (prev + 1) % PLACEHOLDER_SUGGESTIONS.length)
        }, 350)
      }
    }

    return () => clearTimeout(timer)
  }, [displayText, isDeleting, suggestionIndex, reduceMotion])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  const handleSuggestionClick = (detailedPrompt: string) => {
    setPrompt(detailedPrompt)
    setFeedback('')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!prompt.trim()) return
    openEarlyAccess('idea')
  }

  return (
    <section id="comece" aria-labelledby="start-heading" className="bg-white pt-14 sm:pt-20 pb-0">
      <div className="mx-4 sm:mx-6 md:mx-10 lg:mx-16">
        <div className="relative bg-black rounded-t-[32px] sm:rounded-t-[40px] rounded-b-none py-20 sm:py-28 overflow-hidden flex flex-col items-center px-4 sm:px-6 shadow-2xl">
          
          {/* ── Background Glow ── */}
          <motion.div
            aria-hidden="true"
            animate={reduceMotion ? undefined : { x: ['-54%', '-46%', '-54%'], scale: [0.92, 1.06, 0.92], opacity: [0.45, 0.8, 0.45] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/2 left-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full bg-[radial-gradient(circle,rgb(22_140_255_/_0.16),transparent_64%)] blur-[80px] pointer-events-none"
          />

          {/* ── Title ── */}
          <motion.h2
            id="start-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative z-20 text-4xl sm:text-5xl md:text-[56px] font-bold tracking-tight text-white text-center mb-10 sm:mb-14 leading-[1.1] max-w-3xl"
          >
            Comece de onde está. <br className="hidden sm:block" />
            <GradientText inverse>Continue sem recomeçar.</GradientText>
          </motion.h2>

          {/* ── Prompt Box ── */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            animate={{
              boxShadow: isFocused
                ? '0 28px 80px rgb(0 103 217 / 0.22), 0 0 0 1px rgb(22 140 255 / 0.22)'
                : '0 24px 64px rgb(0 0 0 / 0.34), 0 0 0 1px rgb(255 255 255 / 0.02)',
            }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, boxShadow: { duration: 0.35, delay: 0 } }}
            className={`
              relative z-20 w-full max-w-4xl bg-neutral-900 border rounded-[24px] p-2 sm:p-3
              transition-all duration-300 shadow-2xl
              ${isFocused ? 'border-neutral-700 ring-4 ring-white/5' : 'border-neutral-800/80'}
            `}
          >
            <div className="relative h-32 sm:h-44 px-3 sm:px-4 pt-3 sm:pt-4">
              <textarea
                aria-label="Descreva sua ideia ou projeto"
                value={prompt}
                onChange={(e) => {
                  setPrompt(e.target.value)
                  setFeedback('')
                }}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder={
                  reduceMotion
                    ? 'Descreva uma ideia ou o projeto que já existe.'
                    : `${displayText}${!isFocused && showCursor ? '|' : ''}`
                }
                style={{ outline: 'none' }}
                className="w-full h-full bg-transparent text-neutral-100 placeholder:text-neutral-500 text-base sm:text-lg resize-none outline-none focus:outline-none focus-visible:outline-none border-none ring-0 focus:ring-0 focus-visible:ring-0 leading-relaxed selection:bg-blue-500/30"
              />
            </div>

            {/* Divider */}
            <div className="h-px bg-white/[0.08] mx-2 sm:mx-3 my-2" />

            {/* Controls Footer */}
            <div className="flex items-center justify-between px-2 sm:px-3 pb-1 sm:pb-1.5">
              {/* Model Selector */}
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  aria-haspopup="listbox"
                  aria-expanded={isDropdownOpen}
                  className={`
                    group flex items-center gap-2 text-[13px] sm:text-sm font-medium px-3 py-1.5 rounded-full
                    transition-all duration-200 select-none cursor-pointer
                    ${isDropdownOpen 
                      ? 'bg-white/10 text-white shadow-sm ring-1 ring-white/15' 
                      : 'bg-white/[0.04] text-neutral-300 hover:text-white hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/15'
                    }
                  `}
                >
                  <CurrentModelIcon className={`w-3.5 h-3.5 ${currentModel.iconColor} shrink-0`} />
                  <span>{selectedModel}</span>
                  <ChevronDown className={`w-3 h-3 text-neutral-400 group-hover:text-neutral-200 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {/* Dropdown Menu */}
                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4, scale: 0.98 }}
                      transition={{ duration: 0.15, ease: 'easeOut' }}
                      role="listbox"
                      aria-label="Selecionar modelo de IA"
                      className="absolute left-0 bottom-[calc(100%+10px)] w-72 bg-[#141414]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.05)] z-50 overflow-hidden"
                    >
                      <div className="flex flex-col gap-0.5">
                        {AI_MODELS.map((model, idx) => {
                          const isSelected = selectedModel === model.name
                          const ModelIcon = model.icon
                          const prevModel = AI_MODELS[idx - 1]
                          const showDivider = prevModel && prevModel.provider !== model.provider

                          return (
                            <div key={model.id} className="flex flex-col">
                              {showDivider && (
                                <div className="h-px bg-white/[0.06] my-1 mx-2" />
                              )}
                              <button
                                type="button"
                                role="option"
                                aria-selected={isSelected}
                                onClick={() => {
                                  setSelectedModel(model.name)
                                  setIsDropdownOpen(false)
                                }}
                                className={`group flex items-center justify-between w-full px-2.5 py-2 rounded-xl text-[13.5px] transition-all duration-150 text-left cursor-pointer
                                  ${isSelected 
                                    ? 'text-white bg-white/[0.08] font-semibold' 
                                    : 'text-neutral-300 hover:text-white hover:bg-white/[0.05] font-medium'
                                  }
                                `}
                              >
                                <div className="flex items-center gap-2.5 min-w-0">
                                  <div className="w-4 h-4 flex items-center justify-center shrink-0">
                                    {isSelected ? (
                                      <Check className="w-4 h-4 text-white stroke-[2.5]" />
                                    ) : null}
                                  </div>
                                  <div className="w-4 h-4 flex items-center justify-center shrink-0">
                                    <ModelIcon className={`w-3.5 h-3.5 ${model.iconColor}`} />
                                  </div>
                                  <span className="truncate">{model.name}</span>
                                </div>
                                {model.label && (
                                  <span className="text-[11px] font-semibold text-neutral-400 group-hover:text-neutral-200 bg-white/[0.05] group-hover:bg-white/[0.09] px-2 py-0.5 rounded-md transition-colors shrink-0 ml-2">
                                    {model.label}
                                  </span>
                                )}
                              </button>
                            </div>
                          )
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!prompt.trim()}
                className="group p-2 sm:p-2.5 rounded-[12px] bg-white text-black hover:bg-neutral-200 disabled:opacity-40 disabled:bg-neutral-800 disabled:text-neutral-500 transition-all duration-200 shadow-sm active:scale-95 cursor-pointer disabled:cursor-not-allowed"
                aria-label="Começar projeto"
              >
                <ArrowUp className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </motion.form>

          <p
            aria-live="polite"
            className="relative z-20 min-h-5 mt-3 px-4 text-center text-xs sm:text-sm text-neutral-400"
          >
            {feedback}
          </p>

          {/* ── Suggestions Chips ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}

            className="relative z-20 flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-3 w-full max-w-4xl min-h-[46px]"
          >
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 w-full">
              {ALL_SUGGESTIONS.map((suggestion, i) => (
                <motion.button
                  key={suggestion.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 + 0.4 }}
                  type="button"
                  onClick={() => handleSuggestionClick(suggestion.prompt)}
                  className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-full border border-neutral-800 bg-neutral-900 text-[13px] sm:text-sm text-neutral-300 hover:text-white hover:bg-neutral-800 hover:border-blue-500 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 cursor-pointer shrink-0"
                >
                  {suggestion.label}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* ── Bottom Cutout ── */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[28px] w-[86vw] sm:h-[34px] sm:w-[74vw] md:h-[40px] md:w-[64vw] rounded-t-[20px] sm:rounded-t-[22px] bg-white z-10 pointer-events-none" />
        </div>
      </div>
    </section>
  )
}
