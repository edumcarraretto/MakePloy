import { ChatGPTLogo, ClaudeLogo, GeminiLogo } from '@/components/intelligence/AILogos'

interface AIModelOption {
  id: string
  name: string
  label: string | null
  icon: React.ComponentType<{ className?: string }>
  iconColor: string
  provider: 'OpenAI' | 'Google' | 'Anthropic'
}

export const AI_MODELS: AIModelOption[] = [
  // OpenAI
  { id: 'gpt-5-6-terra', name: 'GPT 5.6 Terra', label: null, icon: ChatGPTLogo, iconColor: 'text-white', provider: 'OpenAI' },
  { id: 'gpt-5-6-sol', name: 'GPT 5.6 Sol', label: 'Entrar', icon: ChatGPTLogo, iconColor: 'text-white', provider: 'OpenAI' },
  { id: 'gpt-5-6-luna', name: 'GPT 5.6 Luna', label: 'Entrar', icon: ChatGPTLogo, iconColor: 'text-white', provider: 'OpenAI' },
  // Google
  { id: 'gemini-3-1-pro', name: 'Gemini 3.1 Pro', label: 'Entrar', icon: GeminiLogo, iconColor: 'text-blue-400', provider: 'Google' },
  { id: 'gemini-3-8-flash', name: 'Gemini 3.8 Flash', label: 'Entrar', icon: GeminiLogo, iconColor: 'text-blue-400', provider: 'Google' },
  // Anthropic
  { id: 'soneto-5', name: 'Soneto 5', label: 'Entrar', icon: ClaudeLogo, iconColor: 'text-[#d97757]', provider: 'Anthropic' },
  { id: 'fabula-5', name: 'Fábula 5', label: 'Entrar', icon: ClaudeLogo, iconColor: 'text-[#d97757]', provider: 'Anthropic' },
]
