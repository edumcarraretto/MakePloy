import {
  Search,
  Radar,
  BarChart3,
  BadgeCheck,
  Users,
  Store,
  GitCompare,
  Scale,
  CircleDollarSign,
  LineChart,
  Route,
  Palette,
  PenTool,
  Droplets,
  Type,
  LayoutTemplate,
  Component,
  Layers,
  MousePointerClick,
  Image as ImageIcon,
  Brush,
  PlayCircle,
  Database,
  Braces,
  KeyRound,
  HardDrive,
  CreditCard,
  Webhook,
  Blocks,
  Zap,
  FlaskConical,
  ShieldCheck,
  Github,
  Globe2,
  Boxes,
  PackageOpen,
  BarChart2,
  ScrollText,
  Activity,
  Bug,
  Gauge,
  SearchCheck,
  TestTube2,
  TrendingUp,
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

  // ── Cérebro: pesquisar, validar e decidir ──────────────────
  smallTool('pesquisa', 'Pesquisa', Search, BRAIN_BG, BRAIN_ACCENT),
  smallTool('radar', 'Radar', Radar, BRAIN_BG, BRAIN_ACCENT),
  smallTool('benchmark', 'Benchmark', BarChart3, BRAIN_BG, BRAIN_ACCENT),
  smallTool('validador', 'Validador', BadgeCheck, BRAIN_BG, BRAIN_ACCENT),
  smallTool('personas', 'Personas', Users, BRAIN_BG, BRAIN_ACCENT),
  smallTool('mercado', 'Mercado', Store, BRAIN_BG, BRAIN_ACCENT),
  smallTool('concorrentes', 'Concorrentes', GitCompare, BRAIN_BG, BRAIN_ACCENT),
  smallTool('viabilidade', 'Viabilidade', Scale, BRAIN_BG, BRAIN_ACCENT),
  smallTool('precificacao', 'Precificação', CircleDollarSign, BRAIN_BG, BRAIN_ACCENT),
  smallTool('projecoes', 'Projeções', LineChart, BRAIN_BG, BRAIN_ACCENT),
  smallTool('roadmap', 'Roadmap', Route, BRAIN_BG, BRAIN_ACCENT),

  // ── Criação visual: identidade, interface e expressão ─────
  smallTool('brand-kit', 'Brand Kit', Palette, VISUAL_BG, VISUAL_ACCENT),
  smallTool('logo-studio', 'Logo Studio', PenTool, VISUAL_BG, VISUAL_ACCENT),
  smallTool('paletas', 'Paletas', Droplets, VISUAL_BG, VISUAL_ACCENT),
  smallTool('tipografia', 'Tipografia', Type, VISUAL_BG, VISUAL_ACCENT),
  smallTool('wireframes', 'Wireframes', LayoutTemplate, VISUAL_BG, VISUAL_ACCENT),
  smallTool('ui-kit', 'UI Kit', Component, VISUAL_BG, VISUAL_ACCENT),
  smallTool('design-system', 'Design System', Layers, VISUAL_BG, VISUAL_ACCENT),
  smallTool('prototipos', 'Protótipos', MousePointerClick, VISUAL_BG, VISUAL_ACCENT),
  smallTool('image-studio', 'Image Studio', ImageIcon, VISUAL_BG, VISUAL_ACCENT),
  smallTool('ilustracoes', 'Ilustrações', Brush, VISUAL_BG, VISUAL_ACCENT),
  smallTool('motion', 'Motion', PlayCircle, VISUAL_BG, VISUAL_ACCENT),

  // ── Vibe Coding: construir e conectar ─────────────────────
  smallTool('banco', 'Banco', Database, CODING_BG, CODING_ACCENT),
  smallTool('apis', 'APIs', Braces, CODING_BG, CODING_ACCENT),
  smallTool('auth', 'Auth', KeyRound, CODING_BG, CODING_ACCENT),
  smallTool('storage', 'Storage', HardDrive, CODING_BG, CODING_ACCENT),
  smallTool('pagamentos', 'Pagamentos', CreditCard, CODING_BG, CODING_ACCENT),
  smallTool('webhooks', 'Webhooks', Webhook, CODING_BG, CODING_ACCENT),
  smallTool('integracoes', 'Integrações', Blocks, CODING_BG, CODING_ACCENT),
  smallTool('automacoes', 'Automações', Zap, CODING_BG, CODING_ACCENT),
  smallTool('testes', 'Testes', FlaskConical, CODING_BG, CODING_ACCENT),
  smallTool('seguranca', 'Segurança', ShieldCheck, CODING_BG, CODING_ACCENT),
  smallTool('github', 'GitHub', Github, 'bg-gray-100', 'text-[#181717]'),

  // ── Deploy: publicar, observar e evoluir ──────────────────
  smallTool('dominios', 'Domínios', Globe2, DEPLOY_BG, DEPLOY_ACCENT),
  smallTool('ambientes', 'Ambientes', Boxes, DEPLOY_BG, DEPLOY_ACCENT),
  smallTool('releases', 'Releases', PackageOpen, DEPLOY_BG, DEPLOY_ACCENT),
  smallTool('analytics', 'Analytics', BarChart2, DEPLOY_BG, DEPLOY_ACCENT),
  smallTool('logs', 'Logs', ScrollText, DEPLOY_BG, DEPLOY_ACCENT),
  smallTool('uptime', 'Uptime', Activity, DEPLOY_BG, DEPLOY_ACCENT),
  smallTool('erros', 'Erros', Bug, DEPLOY_BG, DEPLOY_ACCENT),
  smallTool('performance', 'Performance', Gauge, DEPLOY_BG, DEPLOY_ACCENT),
  smallTool('seo', 'SEO', SearchCheck, DEPLOY_BG, DEPLOY_ACCENT),
  smallTool('experimentos', 'Experimentos', TestTube2, DEPLOY_BG, DEPLOY_ACCENT),
  smallTool('conversoes', 'Conversões', TrendingUp, DEPLOY_BG, DEPLOY_ACCENT),
]
