import {
  Link2,
  Search,
  Check,
  Network,
  Paperclip,
  Wand2,
  CalendarDays,
  Pencil,
  FolderOpen,
  Briefcase,
  Bell,
  PieChart,
  Flag,
  CalendarClock,
  Target,
  Sparkles,
  Webhook,
  Layers,
  ClipboardList,
  Zap,
  FileSignature,
  Clock,
  MessageSquareQuote,
  ArrowDownUp,
  Calculator,
  MonitorPlay,
  LayoutGrid,
  Key,
  Mail,
  BarChart2,
  Timer,
  KanbanSquare,
  Blocks,
  User,
  Tag,
  PhoneCall,
  ListChecks,
  CalendarCheck,
  Table,
  Presentation,
  GanttChart,
  Route,
  Inbox,
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

export const tools: Tool[] = [
  // Featured cards
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

  // Row 1
  { id: 'dependencias',           title: 'Dependências',         icon: Link2,          status: 'available',    featured: false, colSpan: 1, rowSpan: 1 },
  { id: 'busca',                  title: 'Busca Conectada',      icon: Search,         status: 'available',    featured: false, colSpan: 1, rowSpan: 1 },
  { id: 'tarefas',                title: 'Tarefas',              icon: Check,          status: 'available',    featured: false, colSpan: 1, rowSpan: 1 },
  { id: 'mapas-mentais',          title: 'Mapas mentais',        icon: Network,        status: 'available',    featured: false, colSpan: 1, rowSpan: 1 },
  { id: 'wikis',                  title: 'Wikis',                icon: Paperclip,      status: 'available',    featured: false, colSpan: 1, rowSpan: 1 },
  { id: 'anotador-ia',            title: 'Anotador de IA',       icon: Wand2,          status: 'available',    featured: false, colSpan: 1, rowSpan: 1 },
  { id: 'calendario',             title: 'Calendário',           icon: CalendarDays,   status: 'available',    featured: false, colSpan: 1, rowSpan: 1 },
  { id: 'provas',                 title: 'Prova',                icon: Pencil,         status: 'available',    featured: false, colSpan: 1, rowSpan: 1 },
  { id: 'portfolios',             title: 'Portfólios',           icon: FolderOpen,     status: 'available',    featured: false, colSpan: 1, rowSpan: 1 },
  { id: 'modelos',                title: 'Modelos',              icon: Briefcase,      status: 'coming_soon',  featured: false, colSpan: 1, rowSpan: 1 },

  // Row 2
  { id: 'lembretes',              title: 'Lembretes',            icon: Bell,           status: 'available',    featured: false, colSpan: 1, rowSpan: 1 },
  { id: 'relatorios',             title: 'Relatórios',           icon: PieChart,       status: 'available',    featured: false, colSpan: 1, rowSpan: 1 },
  { id: 'metas',                  title: 'Metas',                icon: Flag,           status: 'available',    featured: false, colSpan: 1, rowSpan: 1 },
  { id: 'sprints',                title: 'Sprints',              icon: CalendarClock,  status: 'available',    featured: false, colSpan: 1, rowSpan: 1 },
  { id: 'status-personalizado',   title: 'Etapas',               icon: Target,         status: 'available',    featured: false, colSpan: 1, rowSpan: 1 },
  { id: 'escritor-ia',            title: 'Escritor de IA',       icon: Sparkles,       status: 'coming_soon',  featured: false, colSpan: 1, rowSpan: 1 },

  // Row 3
  { id: 'api',                    title: 'Chamadas de API',      icon: Webhook,        status: 'coming_soon',  featured: false, colSpan: 1, rowSpan: 1 },
  { id: 'conquistas',             title: 'Conquistas',           icon: Layers,         status: 'available',    featured: false, colSpan: 1, rowSpan: 1 },
  { id: 'formularios',            title: 'Formulários',          icon: ClipboardList,  status: 'available',    featured: false, colSpan: 1, rowSpan: 1 },
  { id: 'automacoes',             title: 'Automações',           icon: Zap,            status: 'available',    featured: false, colSpan: 1, rowSpan: 1 },
  { id: 'campos-personalizados',  title: 'Variáveis',            icon: FileSignature,  status: 'available',    featured: false, colSpan: 1, rowSpan: 1 },
  { id: 'folhas',                 title: 'Folhas de ponto',      icon: Clock,          status: 'coming_soon',  featured: false, colSpan: 1, rowSpan: 1 },

  // Row 4
  { id: 'perguntas-ia',           title: 'Pergunte à IA',        icon: MessageSquareQuote, status: 'available', featured: false, colSpan: 1, rowSpan: 1 },
  { id: 'prioridades',            title: 'Prioridades',          icon: ArrowDownUp,    status: 'available',    featured: false, colSpan: 1, rowSpan: 1 },
  { id: 'estimativa-tempo',       title: 'Orçamentos',           icon: Calculator,     status: 'available',    featured: false, colSpan: 1, rowSpan: 1 },
  { id: 'clipes',                 title: 'Clipes',               icon: MonitorPlay,    status: 'available',    featured: false, colSpan: 1, rowSpan: 1 },
  { id: 'visao-geral',            title: 'Visão geral',          icon: LayoutGrid,     status: 'available',    featured: false, colSpan: 1, rowSpan: 1 },
  { id: 'autenticacao',           title: 'Autenticação',         icon: Key,            status: 'coming_soon',  featured: false, colSpan: 1, rowSpan: 1 },

  // Row 5
  { id: 'emails',                 title: 'E-mails',              icon: Mail,           status: 'available',    featured: false, colSpan: 1, rowSpan: 1 },
  { id: 'paineis',                title: 'Painéis de controle',  icon: BarChart2,      status: 'available',    featured: false, colSpan: 1, rowSpan: 1 },
  { id: 'controle-tempo',         title: 'Controle de tempo',    icon: Timer,          status: 'available',    featured: false, colSpan: 1, rowSpan: 1 },
  { id: 'quadros-kanban',         title: 'Quadros Kanban',       icon: KanbanSquare,   status: 'available',    featured: false, colSpan: 1, rowSpan: 1 },
  { id: 'integracoes',            title: 'Integrações',          icon: Blocks,         status: 'available',    featured: false, colSpan: 1, rowSpan: 1 },
  { id: 'convidados',             title: 'Convidados',           icon: User,           status: 'coming_soon',  featured: false, colSpan: 1, rowSpan: 1 },

  // Row 6
  { id: 'etiquetas',              title: 'Etiquetas',            icon: Tag,            status: 'available',    featured: false, colSpan: 1, rowSpan: 1 },
  { id: 'suporte',                title: 'Central 24h',          icon: PhoneCall, status: 'available', featured: false, colSpan: 1, rowSpan: 1 },
  { id: 'checklists',             title: 'Listas de verificação',icon: ListChecks,     status: 'available',    featured: false, colSpan: 1, rowSpan: 1 },
  { id: 'agendamento',            title: 'Agendamento',          icon: CalendarCheck,  status: 'available',    featured: false, colSpan: 1, rowSpan: 1 },
  { id: 'planilhas',              title: 'Planilhas',            icon: Table,          status: 'available',    featured: false, colSpan: 1, rowSpan: 1 },
  { id: 'quadros-brancos',        title: 'Quadros brancos',      icon: Presentation,   status: 'available',    featured: false, colSpan: 1, rowSpan: 1 },
  { id: 'graficos-gantt',         title: 'Gráficos de Gantt',    icon: GanttChart,     status: 'available',    featured: false, colSpan: 1, rowSpan: 1 },
  { id: 'roteiros',               title: 'Roteiros',             icon: Route,          status: 'available',    featured: false, colSpan: 1, rowSpan: 1 },
  { id: 'caixa-entrada',          title: 'Caixa de entrada',     icon: Inbox,          status: 'available',    featured: false, colSpan: 1, rowSpan: 1 },
  { id: 'equipes',                title: 'Equipes',              icon: Users,          status: 'available',    featured: false, colSpan: 1, rowSpan: 1 },
]
