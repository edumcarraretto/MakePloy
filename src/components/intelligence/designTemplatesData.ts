const templateIdentities = [
  { name: 'Natural', brand: 'flora', label: 'VIDA AO AR LIVRE', layout: 'natural', platform: 'lovable', headline: 'Respire lá fora.', icon: 'leaf' },
  { name: 'Urbano', brand: 'METRO', label: 'ARQUITETURA · 2026', layout: 'urban', platform: 'bolt', headline: 'Novos espaços.', icon: 'building' },
  { name: 'Minimal', brand: 'mono.', label: 'OBJETOS ESSENCIAIS', layout: 'minimal', platform: 'v0', headline: 'Menos, melhor.', icon: 'circle' },
  { name: 'Energia', brand: 'VOLT', label: 'MOVE YOUR WORLD', layout: 'energy', platform: 'replit', headline: 'Ative seu ritmo.', icon: 'bolt' },
  { name: 'Studio', brand: 'lume®', label: 'ESTÚDIO CRIATIVO', layout: 'studio', platform: 'lovable', headline: 'Um novo olhar.', icon: 'camera' },
  { name: 'Essencial', brand: 'FLOW', label: 'DESIGN PARA O DIA A DIA', layout: 'classic', platform: 'bolt', headline: 'Leve o essencial.', icon: 'bottle' },
  { name: 'Essência', brand: 'aqua', label: 'PUREZA EM CADA GOTA', layout: 'essence', platform: 'v0', headline: 'Naturalmente puro.', icon: 'drop' },
  { name: 'Reflexo', brand: 'PRISMA', label: 'JOIAS CONTEMPORÂNEAS', layout: 'reflect', platform: 'replit', headline: 'Raro como você.', icon: 'diamond' },
  { name: 'Luz', brand: 'solis', label: 'DIAS MAIS LEVES', layout: 'light', platform: 'lovable', headline: 'Viva o lado solar.', icon: 'sun' },
  { name: 'Forma', brand: 'VÉRTICE', label: 'DESIGN & OBJETOS', layout: 'shape', platform: 'bolt', headline: 'Além da forma.', icon: 'hexagon' },
  { name: 'Sólido', brand: 'FORT', label: 'PROTEÇÃO INTELIGENTE', layout: 'solid', platform: 'v0', headline: 'Seu mundo seguro.', icon: 'shield' },
  { name: 'Origem', brand: 'aurora', label: 'NOVOS COMEÇOS', layout: 'origin', platform: 'replit', headline: 'Tudo começa aqui.', icon: 'star' },
] as const

// Fictional storefronts and illustrative offers; product photography is stored locally.
const products = [
  { photo: 'plant', product: 'Kit de jardinagem', headline: 'Seu jardim começa aqui.', description: 'Ferramentas para cultivar seu cantinho verde, do primeiro vaso à próxima colheita.', price: 'R$ 89,90', detail: 'Para vasos e pequenos jardins', benefit: 'Cultive no seu ritmo', category: 'CASA & JARDIM' },
  { photo: 'chair', product: 'Cadeira Nordic', headline: 'Seu novo lugar favorito.', description: 'Linhas leves, assento estofado e pés de madeira para transformar o seu espaço.', price: 'R$ 649,00', detail: 'Madeira e tecido em harmonia', benefit: 'Conforto para ficar', category: 'MÓVEIS & DESIGN' },
  { photo: 'headphones', product: 'Headphone Studio', headline: 'Dê espaço ao seu som.', description: 'Um headphone para acompanhar suas playlists, o trabalho e os momentos de pausa.', price: 'R$ 299,90', detail: 'Design com almofadas macias', benefit: 'Sua playlist, seu momento', category: 'ÁUDIO & ESTILO' },
  { photo: 'shoes', product: 'Tênis de corrida', headline: 'O próximo passo é seu.', description: 'Visual esportivo e perfil leve para colocar mais movimento na sua rotina.', price: 'R$ 399,90', detail: 'Do treino ao fim de semana', benefit: 'Movimento todos os dias', category: 'NOVA COLEÇÃO ESPORTIVA' },
  { photo: 'camera', product: 'Câmera + lente', headline: 'Histórias em cada clique.', description: 'Explore enquadramentos, luz e novas perspectivas com um kit para fotografar.', price: 'R$ 3.490,00', detail: 'Câmera e lente no mesmo kit', benefit: 'Um novo olhar', category: 'FOTOGRAFIA' },
  { photo: 'bottle', product: 'Garrafa Everyday', headline: 'Leve uma pausa com você.', description: 'Acabamento fosco e formato prático para acompanhar a mesa, a bolsa e a rotina.', price: 'R$ 129,90', detail: 'Design simples, presença marcante', benefit: 'Sempre por perto', category: 'ESSENCIAIS DO DIA A DIA' },
  { photo: 'skincare', product: 'Óleo facial botânico', headline: 'Um ritual só seu.', description: 'Textura delicada e aplicação com conta-gotas para o seu momento de autocuidado.', price: 'R$ 119,00', detail: 'Aplicação gota a gota', benefit: 'Uma pausa para cuidar', category: 'BELEZA & CUIDADO' },
  { photo: 'jewelry', product: 'Colar delicado', headline: 'O detalhe que fica.', description: 'Uma corrente delicada que ilumina o look, sozinha ou em novas combinações.', price: 'R$ 189,90', detail: 'Delicado em cada detalhe', benefit: 'Combine do seu jeito', category: 'COLEÇÃO DE JOIAS' },
  { photo: 'sunglasses', product: 'Óculos Solar', headline: 'Veja os dias com leveza.', description: 'Armação fina e lentes arredondadas em um acessório para levar a toda parte.', price: 'R$ 249,90', detail: 'Silhueta redonda e atemporal', benefit: 'Seu estilo ao sol', category: 'ACESSÓRIOS' },
  { photo: 'lamp', product: 'Luminária de mesa', headline: 'Luz para suas ideias.', description: 'Uma peça de linhas industriais para dar personalidade à mesa e ao seu espaço.', price: 'R$ 219,00', detail: 'Acabamento em tom grafite', benefit: 'Seu espaço, sua luz', category: 'ILUMINAÇÃO & DESIGN' },
  { photo: 'watch', product: 'Relógio Classic', headline: 'Tempo para o essencial.', description: 'Mostrador analógico e pulseira de visual clássico para acompanhar cada ocasião.', price: 'R$ 459,90', detail: 'Mostrador com detalhes precisos', benefit: 'Estilo além das horas', category: 'RELÓGIOS' },
  { photo: 'bag', product: 'Mochila Urbana', headline: 'Pronta para o seu dia.', description: 'Bolsos externos e uma silhueta compacta para carregar o que faz parte da sua rotina.', price: 'R$ 179,90', detail: 'Seus essenciais organizados', benefit: 'Do trabalho ao passeio', category: 'BOLSAS & MOCHILAS' },
] as const

export const designTemplates = templateIdentities.map((identity, index) => ({
  ...identity,
  ...products[index],
  image: `/images/design-products/${products[index].photo}.jpg`,
}))
