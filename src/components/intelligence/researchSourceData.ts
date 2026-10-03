import { RESEARCH_SOURCE_EXTRAS } from './researchSourceExtras'

export interface ResearchSource {
  name: string
  message: string
  url: string
}

export interface ResearchScene {
  sources: readonly ResearchSource[]
  conclusion: string
}

const source = (name: string, url: string, message: string): ResearchSource => ({ name, url, message })

// The first twenty references in each idea are selected for that specific example.
const CORE_RESEARCH_SCENES: readonly ResearchScene[] = [
  {
    sources: [
      source('Shopify', 'https://www.shopify.com/br/', 'Estrutura de loja e catálogo'),
      source('Pinterest', 'https://www.pinterest.com/', 'Referências de estilo'),
      source('Vogue Brasil', 'https://vogue.globo.com/', 'Tendências de moda'),
      source('ELLE Brasil', 'https://elle.com.br/', 'Editorial e coleções'),
      source('FashionUnited', 'https://fashionunited.com.br/', 'Notícias do varejo de moda'),
      source('WGSN', 'https://www.wgsn.com/', 'Tendências de consumo'),
      source('Dafiti', 'https://www.dafiti.com.br/', 'Categorias e vitrine'),
      source('Renner', 'https://www.lojasrenner.com.br/', 'Organização de coleções'),
      source('Riachuelo', 'https://www.riachuelo.com.br/', 'Variedade e apresentação'),
      source('C&A', 'https://www.cea.com.br/', 'Filtros e navegação de loja'),
      source('Zara', 'https://www.zara.com/br/', 'Fotografia e editorial'),
      source('H&M', 'https://www2.hm.com/pt_br/', 'Coleções e categorias'),
      source('SHEIN', 'https://br.shein.com/', 'Catálogo e descoberta'),
      source('AMARO', 'https://amaro.com/br/', 'Experiência de compra'),
      source('Farm Rio', 'https://www.farmrio.com.br/', 'Identidade e estampas'),
      source('Reserva', 'https://www.usereserva.com/', 'Posicionamento de marca'),
      source('Hering', 'https://www.hering.com.br/', 'Básicos e composição'),
      source('Marisa', 'https://www.marisa.com.br/', 'Ofertas e categorias'),
      source('Youcom', 'https://www.youcom.com.br/', 'Linguagem e público'),
      source('Netshoes', 'https://www.netshoes.com.br/', 'Busca e filtros de produtos'),
    ],
    conclusion: 'Sua loja começa a ganhar forma',
  },
  {
    sources: [
      source('iFood', 'https://www.ifood.com.br/', 'Categorias e cardápios'),
      source('Uber Eats', 'https://www.ubereats.com/', 'Jornada de pedido'),
      source('Rappi', 'https://www.rappi.com.br/', 'Serviços e navegação'),
      source('aiqfome', 'https://www.aiqfome.com/', 'Experiência de entrega local'),
      source('Delivery Much', 'https://www.deliverymuch.com.br/', 'Operação em cidades menores'),
      source('DoorDash', 'https://www.doordash.com/', 'Fluxo de compra'),
      source('Grubhub', 'https://www.grubhub.com/', 'Busca de restaurantes'),
      source('Deliveroo', 'https://deliveroo.co.uk/', 'Organização de ofertas'),
      source('Just Eat', 'https://www.just-eat.co.uk/', 'Descoberta de refeições'),
      source('Wolt', 'https://wolt.com/', 'Interface e entrega'),
      source('Glovo', 'https://glovoapp.com/', 'Categorias de serviço'),
      source('Zomato', 'https://www.zomato.com/', 'Restaurantes e avaliações'),
      source('Swiggy', 'https://www.swiggy.com/', 'Cardápio e conveniência'),
      source('foodpanda', 'https://www.foodpanda.com/', 'Canais de pedido'),
      source('Yemeksepeti', 'https://www.yemeksepeti.com/', 'Ofertas e restaurantes'),
      source('PedidosYa', 'https://www.pedidosya.com/', 'Entregas e categorias'),
      source('Menulog', 'https://www.menulog.com.au/', 'Experiência de busca'),
      source('SkipTheDishes', 'https://www.skipthedishes.com/', 'Acompanhamento do pedido'),
      source('Getir', 'https://getir.com/', 'Entrega rápida'),
      source('Instacart', 'https://www.instacart.com/', 'Compra e logística'),
    ],
    conclusion: 'O delivery começa a ganhar forma',
  },
  {
    sources: [
      source('Natura', 'https://www.natura.com.br/', 'Portfólio e posicionamento'),
      source('O Boticário', 'https://www.boticario.com.br/', 'Linhas e apresentação'),
      source('Avon', 'https://www.avon.com/', 'Catálogo de produtos'),
      source("L'Oréal Paris", 'https://www.loreal-paris.com.br/', 'Categorias de beleza'),
      source('Maybelline', 'https://www.maybelline.com.br/', 'Coleções de maquiagem'),
      source('Sephora', 'https://www.sephora.com.br/', 'Filtros e descoberta'),
      source('MAC Cosmetics', 'https://www.maccosmetics.com.br/', 'Visual e linha de produtos'),
      source('Vult', 'https://www.vult.com.br/', 'Apresentação de maquiagem'),
      source('Quem Disse, Berenice?', 'https://www.quemdisseberenice.com.br/', 'Tom de voz da marca'),
      source('Eudora', 'https://www.eudora.com.br/', 'Coleções e campanhas'),
      source('Granado', 'https://www.granado.com.br/', 'Embalagem e tradição'),
      source('Sallve', 'https://www.sallve.com.br/', 'Comunidade e produtos'),
      source('Simple Organic', 'https://simpleorganic.com.br/', 'Sustentabilidade e fórmulas'),
      source('Creamy', 'https://www.creamy.com.br/', 'Rotinas de cuidados'),
      source('Principia', 'https://www.principiaskin.com/', 'Ativos e apresentação'),
      source('Ruby Rose', 'https://www.rubyrosemaquiagem.com.br/', 'Variedade de produtos'),
      source('Océane', 'https://www.oceane.com.br/', 'Kits e acessórios'),
      source('The Ordinary', 'https://theordinary.com/', 'Clareza na descrição'),
      source('La Roche-Posay', 'https://www.laroche-posay.com.br/', 'Linhas dermatológicas'),
      source('Bioderma', 'https://www.bioderma.com/', 'Organização por necessidade'),
    ],
    conclusion: 'Sua marca começa a ganhar identidade',
  },
  {
    sources: [
      source('Coursera', 'https://www.coursera.org/', 'Catálogo e trilhas'),
      source('Udemy', 'https://www.udemy.com/', 'Cursos e precificação'),
      source('edX', 'https://www.edx.org/', 'Programas e certificações'),
      source('Khan Academy', 'https://www.khanacademy.org/', 'Organização de aulas'),
      source('Alura', 'https://www.alura.com.br/', 'Formações e jornadas'),
      source('Domestika', 'https://www.domestika.org/', 'Apresentação de cursos'),
      source('Skillshare', 'https://www.skillshare.com/', 'Descoberta de temas'),
      source('LinkedIn Learning', 'https://www.linkedin.com/learning/', 'Carreiras e habilidades'),
      source('Pluralsight', 'https://www.pluralsight.com/', 'Trilhas técnicas'),
      source('FutureLearn', 'https://www.futurelearn.com/', 'Estrutura de programas'),
      source('OpenLearn', 'https://www.open.edu/openlearn/', 'Conteúdo aberto'),
      source('MIT OpenCourseWare', 'https://ocw.mit.edu/', 'Materiais de estudo'),
      source('Harvard Online', 'https://pll.harvard.edu/', 'Formatos de formação'),
      source('Senac', 'https://www.senac.br/', 'Oferta profissional'),
      source('SENAI', 'https://www.senai.br/', 'Educação técnica'),
      source('Rocketseat', 'https://www.rocketseat.com.br/', 'Comunidade e cursos'),
      source('DIO', 'https://www.dio.me/', 'Bootcamps e trilhas'),
      source('Codecademy', 'https://www.codecademy.com/', 'Aprendizado interativo'),
      source('freeCodeCamp', 'https://www.freecodecamp.org/', 'Projetos práticos'),
      source('Teachable', 'https://teachable.com/', 'Estrutura de plataforma'),
    ],
    conclusion: 'Os cursos começam a ganhar estrutura',
  },
  {
    sources: [
      source('Starbucks', 'https://www.starbucks.com/', 'Cardápio e experiência'),
      source('Nespresso', 'https://www.nespresso.com/br/pt/', 'Produtos e assinatura'),
      source('Lavazza', 'https://www.lavazza.com/', 'Linha de cafés'),
      source('Illy', 'https://www.illy.com/', 'Marca e apresentação'),
      source('Blue Bottle', 'https://bluebottlecoffee.com/', 'Visual de cafeteria'),
      source('Tim Hortons', 'https://www.timhortons.com/', 'Combos e conveniência'),
      source('Costa Coffee', 'https://www.costa.co.uk/', 'Cardápio e promoções'),
      source("Peet's Coffee", 'https://www.peets.com/', 'Produtos e experiência'),
      source('Philz Coffee', 'https://philzcoffee.com/', 'Bebidas e comunicação'),
      source('Caribou Coffee', 'https://www.cariboucoffee.com/', 'Ambiente e oferta'),
      source('Coffee Bean & Tea Leaf', 'https://www.coffeebean.com/', 'Menu e categorias'),
      source('Caffè Nero', 'https://caffenero.com/', 'Experiência em loja'),
      source('Juan Valdez', 'https://juanvaldez.com/', 'Origem e produtos'),
      source('Café Cultura', 'https://cafeculturabrasil.com/', 'Ambiente e cardápio'),
      source('Moka Clube', 'https://www.mokaclube.com.br/', 'Assinatura e grãos'),
      source('Baggio Café', 'https://baggiocafe.com.br/', 'Linhas de café'),
      source('Café Orfeu', 'https://cafeorfeu.com.br/', 'Grãos e posicionamento'),
      source('3 Corações', 'https://www.3coracoes.com.br/', 'Produtos e canais'),
      source('Melitta', 'https://www.melitta.com.br/', 'Café e acessórios'),
      source('Coffee & Joy', 'https://coffeeandjoy.com.br/', 'Clube e torra de café'),
    ],
    conclusion: 'Sua cafeteria ganha personalidade',
  },
]

const EXTRA_GROUPS = [
  RESEARCH_SOURCE_EXTRAS.fashion,
  RESEARCH_SOURCE_EXTRAS.delivery,
  RESEARCH_SOURCE_EXTRAS.cosmetics,
  RESEARCH_SOURCE_EXTRAS.courses,
  RESEARCH_SOURCE_EXTRAS.coffee,
] as const

const EXTRA_MESSAGES = [
  'Moda e apresentação de produtos',
  'Cardápio e experiência de pedidos',
  'Portfólio e posicionamento de beleza',
  'Estrutura e oferta de cursos',
  'Cardápio e experiência de cafeteria',
] as const

export const RESEARCH_SCENES: readonly ResearchScene[] = CORE_RESEARCH_SCENES.map((scene, index) => ({
  ...scene,
  sources: [
    ...scene.sources,
    ...EXTRA_GROUPS[index].map(([name, url]) => source(name, url, EXTRA_MESSAGES[index])),
  ],
}))
