import {
  Link2,
  Search,
  Check,
  Wand2,
  Pencil,
  FolderOpen,
  PieChart,
  Target,
  Sparkles,
  Webhook,
  Layers,
  ClipboardList,
  Zap,
  FileSignature,
  Clock,
  Bell,
  ArrowDownUp,
  Calculator,
  MonitorPlay,
  LayoutGrid,
  Key,
  BarChart2,
  Timer,
  Blocks,
  Tag,
  ListChecks,
  Table,
  Presentation,
  GanttChart,
  Route,
  Users,
  Palette,
  Code2,
  Brain,
  Rocket,
  type LucideIcon,
} from 'lucide-react'

export type ToolStatus = 'available' | 'coming_soon' | 'unavailable'

export interface Tool {
  id: string
  title: string
  description?: string
  icon: LucideIcon
  status: ToolStatus
  featured: boolean
  colSpan: number
  rowSpan: number
  colStart?: number
  rowStart?: number
  bgColor?: string
  accentColor?: string
}

const BRAIN_BG = 'bg-fuchsia-50/80'
const BRAIN_ACCENT = 'text-fuchsia-500'
const VISUAL_BG = 'bg-sky-50/90'
const VISUAL_ACCENT = 'text-sky-500'
const CODING_BG = 'bg-slate-100/90'
const CODING_ACCENT = 'text-slate-700'
const DEPLOY_BG = 'bg-emerald-50/90'
const DEPLOY_ACCENT = 'text-emerald-600'

const smallTool = (
  id: string,
  title: string,
  icon: LucideIcon,
  bgColor: string,
  accentColor: string,
): Tool => ({
  id,
  title,
  icon,
  status: 'available',
  featured: false,
  colSpan: 1,
  rowSpan: 1,
  bgColor,
  accentColor,
})

const brainTools: Tool[] = [
  smallTool('pesquisa', 'Pesquisa', Search, BRAIN_BG, BRAIN_ACCENT),
  smallTool('radar', 'Radar', Target, BRAIN_BG, BRAIN_ACCENT),
  smallTool('benchmark', 'Benchmark', BarChart2, BRAIN_BG, BRAIN_ACCENT),
  smallTool('validador', 'Validador', Check, BRAIN_BG, BRAIN_ACCENT),
  smallTool('personas', 'Personas', Users, BRAIN_BG, BRAIN_ACCENT),
  smallTool('mercado', 'Mercado', PieChart, BRAIN_BG, BRAIN_ACCENT),
  smallTool('concorrentes', 'Concorrentes', ArrowDownUp, BRAIN_BG, BRAIN_ACCENT),
  smallTool('viabilidade', 'Viabilidade', Calculator, BRAIN_BG, BRAIN_ACCENT),
  smallTool('precificacao', 'Precificação', Tag, BRAIN_BG, BRAIN_ACCENT),
  smallTool('projecoes', 'Projeções', GanttChart, BRAIN_BG, BRAIN_ACCENT),
  smallTool('roadmap', 'Roadmap', Route, BRAIN_BG, BRAIN_ACCENT),
]

const visualTools: Tool[] = [
  smallTool('brand-kit', 'Brand Kit', Palette, VISUAL_BG, VISUAL_ACCENT),
  smallTool('logo-studio', 'Logo Studio', Pencil, VISUAL_BG, VISUAL_ACCENT),
  smallTool('paletas', 'Paletas', Sparkles, VISUAL_BG, VISUAL_ACCENT),
  smallTool('tipografia', 'Tipografia', FileSignature, VISUAL_BG, VISUAL_ACCENT),
  smallTool('wireframes', 'Wireframes', LayoutGrid, VISUAL_BG, VISUAL_ACCENT),
  smallTool('ui-kit', 'UI Kit', Blocks, VISUAL_BG, VISUAL_ACCENT),
  smallTool('design-system', 'Design System', Layers, VISUAL_BG, VISUAL_ACCENT),
  smallTool('prototipos', 'Protótipos', MonitorPlay, VISUAL_BG, VISUAL_ACCENT),
  smallTool('image-studio', 'Image Studio', Wand2, VISUAL_BG, VISUAL_ACCENT),
  smallTool('ilustracoes', 'Ilustrações', Presentation, VISUAL_BG, VISUAL_ACCENT),
  smallTool('motion', 'Motion', MonitorPlay, VISUAL_BG, VISUAL_ACCENT),
]

const codingTools: Tool[] = [
  smallTool('banco', 'Banco', Table, CODING_BG, CODING_ACCENT),
  smallTool('apis', 'APIs', Code2, CODING_BG, CODING_ACCENT),
  smallTool('auth', 'Auth', Key, CODING_BG, CODING_ACCENT),
  smallTool('storage', 'Storage', FolderOpen, CODING_BG, CODING_ACCENT),
  smallTool('pagamentos', 'Pagamentos', Calculator, CODING_BG, CODING_ACCENT),
  smallTool('webhooks', 'Webhooks', Webhook, CODING_BG, CODING_ACCENT),
  smallTool('integracoes', 'Integrações', Blocks, CODING_BG, CODING_ACCENT),
  smallTool('automacoes', 'Automações', Zap, CODING_BG, CODING_ACCENT),
  smallTool('testes', 'Testes', ListChecks, CODING_BG, CODING_ACCENT),
  smallTool('seguranca', 'Segurança', Check, CODING_BG, CODING_ACCENT),
  smallTool('github', 'GitHub', Code2, 'bg-gray-100', 'text-[#181717]'),
]

const deployTools: Tool[] = [
  smallTool('dominios', 'Domínios', Link2, DEPLOY_BG, DEPLOY_ACCENT),
  smallTool('ambientes', 'Ambientes', Layers, DEPLOY_BG, DEPLOY_ACCENT),
  smallTool('releases', 'Releases', Rocket, DEPLOY_BG, DEPLOY_ACCENT),
  smallTool('analytics', 'Analytics', BarChart2, DEPLOY_BG, DEPLOY_ACCENT),
  smallTool('logs', 'Logs', ClipboardList, DEPLOY_BG, DEPLOY_ACCENT),
  smallTool('uptime', 'Uptime', Clock, DEPLOY_BG, DEPLOY_ACCENT),
  smallTool('erros', 'Erros', Bell, DEPLOY_BG, DEPLOY_ACCENT),
  smallTool('performance', 'Performance', Timer, DEPLOY_BG, DEPLOY_ACCENT),
  smallTool('seo', 'SEO', Search, DEPLOY_BG, DEPLOY_ACCENT),
  smallTool('experimentos', 'Experimentos', Wand2, DEPLOY_BG, DEPLOY_ACCENT),
  smallTool('conversoes', 'Conversões', Target, DEPLOY_BG, DEPLOY_ACCENT),
]

export const tools: Tool[] = [
  // ── Featured ecosystem pillars ─────────────────────────────
  {
    id: 'projetos',
    title: 'Cérebro',
    description: 'Cruza todo o contexto e orienta cada etapa.',
    icon: Brain,
    status: 'available',
    featured: true,
    colSpan: 2,
    rowSpan: 2,
    colStart: 4,
    rowStart: 2,
    bgColor: 'bg-white',
    accentColor: 'text-[#3b5bd6]',
  },
  {
    id: 'documentos',
    title: 'Criação visual',
    description: 'Transforma ideias em interfaces e elementos visuais.',
    icon: Palette,
    status: 'available',
    featured: true,
    colSpan: 2,
    rowSpan: 2,
    colStart: 6,
    rowStart: 2,
    bgColor: 'bg-blue-50/50',
    accentColor: 'text-[#0ea5e9]',
  },
  {
    id: 'assistente-ia',
    title: 'Vibe Coding',
    description: 'Transforma intenção e interface em código funcional.',
    icon: Code2,
    status: 'available',
    featured: true,
    colSpan: 2,
    rowSpan: 2,
    colStart: 4,
    rowStart: 4,
    bgColor: 'bg-rose-50/50',
    accentColor: 'text-[#ec4899]',
  },
  {
    id: 'conversas',
    title: 'Deploy',
    description: 'Prepara e coloca o projeto no ar.',
    icon: Rocket,
    status: 'available',
    featured: true,
    colSpan: 2,
    rowSpan: 2,
    colStart: 6,
    rowStart: 4,
    bgColor: 'bg-violet-50/50',
    accentColor: 'text-[#7c3aed]',
  },

  // Desktop placement order intentionally clusters each family
  // around its featured pillar instead of scattering tools randomly.
  ...brainTools.slice(0, 5),
  ...visualTools.slice(0, 5),
  ...brainTools.slice(5, 8),
  ...visualTools.slice(5, 8),
  ...brainTools.slice(8),
  ...visualTools.slice(8),
  ...codingTools.slice(0, 3),
  ...deployTools.slice(0, 3),
  ...codingTools.slice(3, 6),
  ...deployTools.slice(3, 6),
  ...codingTools.slice(6),
  ...deployTools.slice(6),
]
