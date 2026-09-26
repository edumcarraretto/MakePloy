// ─── Types ────────────────────────────────────────────────────────────────────

export type PillarType = 'no-code' | 'ai' | 'code'

export interface CreationPillar {
  id: PillarType
  eyebrow: string
  eyebrowColor: string
  title: string
  description: string
}

export interface AIModel {
  id: string
  name: string
  provider: string
  tag: string
  selected?: boolean
}

// ─── Pillar Data ──────────────────────────────────────────────────────────────

export const creationPillars: CreationPillar[] = [
  {
    id: 'no-code',
    eyebrow: 'DO SIMPLES AO COMPLETO',
    eyebrowColor: 'text-[#EEEEEE]',
    title: 'DO SIMPLES AO COMPLETO',
    description:
      'De uma única página a uma operação completa, sem limites para a complexidade.',
  },
  {
    id: 'ai',
    eyebrow: 'Do visual ao código',
    eyebrowColor: 'text-[#EEEEEE]',
    title: 'Do visual ao código',
    description:
      'Crie visualmente e aprofunde no código, com acesso total a qualquer momento.',
  },
  {
    id: 'code',
    eyebrow: 'CÓDIGO SEM BARREIRAS',
    eyebrowColor: 'text-[#EEEEEE]',
    title: 'CÓDIGO SEM BARREIRAS',
    description:
      'Inspecione, edite e desenvolva no IDE integrado sem reconstruir o trabalho em outro ambiente.',
  },
]

// ─── AI Model Data ────────────────────────────────────────────────────────────

export const aiModels: AIModel[] = [
  { id: 'cerebro', name: 'Cérebro', provider: 'Cerebro', tag: 'Criativo' },
  { id: 'gpt', name: 'GPT', provider: 'OpenAI', tag: 'Análise' },
  { id: 'claude-opus', name: 'Claude Opus', provider: 'Anthropic', tag: 'Código', selected: true },
  { id: 'gemeos', name: 'Gêmeos', provider: 'Google', tag: 'Rápido' },
]
