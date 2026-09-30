import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ChatGPTLogo, GeminiLogo, MakeployLogo, ClaudeLogo } from '@/components/intelligence/AILogos'

// Adjusted order to match the reference image exactly
const ALL_MODELS = [
  { name: 'Claude', icon: ClaudeLogo, color: 'text-[#e5d9c5]' },
  { name: 'ChatGPT', icon: ChatGPTLogo, color: 'text-white' },
  { name: 'Gemini', icon: GeminiLogo, color: 'text-blue-400' },
  { name: 'MAKEPLOY', icon: MakeployLogo, color: 'text-neutral-400' },
]

export function AIModelsPreview() {
  const [items, setItems] = useState(() =>
    ALL_MODELS.map((m, i) => ({ ...m, uniqueId: `initial-${i}` }))
  )

  useEffect(() => {
    const interval = setInterval(() => {
      setItems((prev) => {
        const next = [...prev]
        const removed = next.shift()!
        next.push({ ...removed, uniqueId: `id-${Date.now()}-${Math.random()}` })
        return next
      })
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full max-w-[200px] mx-auto mt-4 pb-8 flex flex-col items-center justify-center h-[200px]">
      
      {/* Seta Esquerda Fixa (Apontando para a direita ▶) */}
      <motion.div
        animate={{ x: [0, 4, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-1 z-50 w-0 h-0 border-y-[5px] border-y-transparent border-l-[8px] border-l-white"
      />

      {/* Seta Direita Fixa (Apontando para a esquerda ◀) */}
      <motion.div
        animate={{ x: [0, -4, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-1 z-50 w-0 h-0 border-y-[5px] border-y-transparent border-r-[8px] border-r-white"
      />

      <AnimatePresence mode="popLayout">
        {items.map((item, index) => {
          const Icon = item.icon
          let y = 0
          let opacity = 1
          let zIndex = 0
          let scale = 1
          let isActive = false

          // Adjusted positions and scales for 3D depth effect
          if (index === 0) {
            y = -48
            opacity = 0.5
            zIndex = 10
            scale = 0.85
          } else if (index === 1) {
            y = 0
            opacity = 1
            zIndex = 30
            scale = 1
            isActive = true
          } else if (index === 2) {
            y = 48
            opacity = 0.5
            zIndex = 20
            scale = 0.85
          } else if (index === 3) {
            y = 90
            opacity = 0.15
            zIndex = 10
            scale = 0.7
          } else {
            y = 120
            opacity = 0
            zIndex = 0
            scale = 0.6
          }

          return (
            <motion.div
              key={item.uniqueId}
              layout
              initial={{ opacity: 0, y: 120, scale: 0.6 }}
              animate={{ opacity, y, zIndex, scale }}
              exit={{ opacity: 0, y: -90, scale: 0.7 }}
              transition={{ type: 'tween', duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute w-full flex justify-center items-center"
            >
              <div className="relative w-full flex items-center justify-center">
                {/* Pill Central */}
                <motion.div
                  layout
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className={`relative p-[1px] rounded-[999px] transition-all duration-700 w-[90%] sm:w-[85%] ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-500 via-indigo-500 to-pink-500 shadow-[0_0_20px_rgba(236,72,153,0.15)]'
                      : 'bg-gradient-to-r from-blue-500/40 via-indigo-500/40 to-pink-500/40'
                  }`}
                >
                  <div
                    className={`flex items-center justify-center gap-2.5 rounded-[999px] w-full h-full transition-all duration-700 ${
                      isActive
                        ? 'px-5 py-2.5 bg-gradient-to-r from-[#171a2a] via-[#1c182b] to-[#261521]'
                        : 'px-5 py-2.5 bg-[#0e0e11]'
                    }`}
                  >
                    <span aria-hidden="true" className="flex shrink-0">
                      <Icon className={`w-4 h-4 transition-all duration-700 ${item.color} ${isActive ? 'opacity-100' : 'opacity-60'}`} />
                    </span>
                    <span
                      className={`transition-colors duration-700 ${
                        isActive ? 'text-white text-[14px] font-bold' : 'text-white/60 text-[14px] font-medium'
                      } tracking-wide`}
                    >
                      {item.name}
                    </span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
