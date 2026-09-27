// ─── Types ────────────────────────────────────────────────────────────────────

export interface ShowcaseProject {
  id: string
  title: string
  category: string
  image: string
  width: number
  height: number
  objectPosition?: string
}

// ─── All projects ─────────────────────────────────────────────────────────────

export const allProjects: ShowcaseProject[] = [
  {
    id: 'luma',
    title: 'Luma',
    category: 'Estratégia e tecnologia',
    image: '/images/novas-imagem/media_1790541783900.jpg',
    width: 576,
    height: 1024,
  },
  {
    id: 'nativa',
    title: 'Nativa',
    category: 'Natureza e inovação',
    image: '/images/novas-imagem/media_1790541778549.jpg',
    width: 1024,
    height: 768,
  },
  {
    id: 'maestro',
    title: 'Maestro',
    category: 'Design e tecnologia',
    image: '/images/novas-imagem/media_1790541789398.jpg',
    width: 576,
    height: 1024,
  },
  {
    id: 'aura',
    title: 'Aura',
    category: 'Experiência digital',
    image: '/images/novas-imagem/media_1790543712539.jpg',
    width: 1024,
    height: 768,
  },
  {
    id: 'mana',
    title: 'Mana',
    category: 'Bebidas funcionais',
    image: '/images/novas-imagem/media_1790541999928.jpg',
    width: 576,
    height: 1024,
  },
  {
    id: 'lumi',
    title: 'Lumi',
    category: 'Design e estratégia',
    image: '/images/novas-imagem/media_1790542027339.jpg',
    width: 1024,
    height: 768,
  },
  {
    id: 'pata',
    title: 'Pata',
    category: 'Cuidado e bem-estar animal',
    image: '/images/novas-imagem/media_1790542030813.png',
    width: 576,
    height: 1024,
  },
  {
    id: 'conexa',
    title: 'Conexa',
    category: 'Comunidade',
    image: '/images/novas-imagem/media_1790542034862.jpg',
    width: 1024,
    height: 768,
  },
]
