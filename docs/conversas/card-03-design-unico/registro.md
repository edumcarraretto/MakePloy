# Conversa e estado do trabalho — terceiro card “Design Único”

**Atualizado em:** 01/10/2026
**Projeto:** MakePloy — card 3 da seção “Uma ideia. A MakePloy entra em ação.”

Este registro preserva os pedidos e decisões desta conversa e permite retomar o trabalho. É um resumo fiel, não uma transcrição literal de cada mensagem.

## Objetivo original

O terceiro card da seção de inteligência apresenta a criação visual da MakePloy. O texto aplicado é:

- **Título:** DESIGN ÚNICO
- **Descrição:** Criamos visuais e conteúdos com identidade própria para seu projeto, sem aparência de modelo pronto.

O usuário quer que a animação mostre, de forma convincente, uma criação feita pela MakePloy.

## Pedidos e decisões da conversa

1. O usuário avisou que estava trabalhando no terceiro card e pediu para eu me atualizar. Localizei o card em `src/components/intelligence/MemoryAITableSection.tsx` e o trabalho em `DesignUniquePreview`.
2. O cursor parava abaixo da logo. A camada e as coordenadas foram ajustadas para clicar no centro da logo. O build revelou também um controle de ciclos incompleto, que foi corrigido.
3. Depois do clique na logo, a barra passa a dizer **“Criar com a MAKEPLOY”**. MAKEPLOY usa as cores da marca. O usuário pediu uma barra mais moderna, então foi trocada por azul; depois pediu preto puro, que está aplicado. A seta no fim do texto foi removida; o ícone de brilho do início continua.
4. O usuário pediu mini páginas mais bonitas, diferentes e com conteúdo real. Foram criadas lojas fictícias com textos, preços e ofertas próprios, além de 12 fotos locais de produtos. As fontes das fotografias estão em `public/images/design-products/SOURCES.md`.
5. O usuário pediu aparência comparável a páginas de venda feitas no Lovable. Ficou definido usar como referência as artes já exibidas na coleção do próprio site, sem sugerir que sejam exemplos reais do Lovable.
6. As referências disponíveis são **oito artes completas** em `src/components/showcase/showcaseData.ts`: Luma, Nativa, Maestro, Aura, Mana, Lumi, Pata e Conexa. Quatro são verticais e quatro horizontais.
7. Foi discutido que oito artes em uma grade, igual à galeria inicial, permitiriam comparar a primeira coleção com o resultado MakePloy. O usuário especificou que quer **uma coleção no mesmo estilo da primeira parte do card, com vários mini sites**, e sugeriu usar as oito imagens, cada uma representando uma mini página.
8. Também foi pedido que a imagem se montasse parte por parte. A solução atual divide visualmente cada arte em 24 recortes, animados em sequência, com as etapas “Montando a estrutura”, “Compondo os textos”, “Construindo o visual”, “Refinando os detalhes” e “Criado com MakePloy”.

## Estado atual do código

A sequência animada implementada é:

1. As oito mini lojas de “Outras plataformas” se montam por partes, em ritmo rápido.
2. A galeria rola acompanhando as quatro linhas e retorna ao topo.
3. O cursor aparece apenas para clicar no centro da logo MakePloy.
4. A barra preta “Criar com a MAKEPLOY” aparece e recebe o segundo clique.
5. A galeria dá lugar às oito artes MakePloy, com montagem mais lenta, sem molduras ou fundos individuais.
6. A coleção rola pelas linhas inferiores, mantém o resultado visível, retorna ao topo e reinicia.

**Atualização após retomada:** o usuário aprovou aplicar o efeito de montagem também em “Outras plataformas” e remover o clique que abria uma mini página e a navegação dentro dela. Essa modificação está implementada. O ciclo dura aproximadamente 28 segundos. Com movimento reduzido, as oito artes MakePloy aparecem prontas, sem animação. Testes (2), build e lint passaram; a inspeção visual continua pendente pela indisponibilidade do navegador integrado.

## Arquivos relevantes

- `src/components/intelligence/DesignUniquePreview.tsx` — moldura, barra, duas galerias e cursor da transição.
- `src/components/intelligence/useDesignPreviewAnimation.ts` — cronologia, cursores, cliques, revelação e reinício.
- `src/components/intelligence/MakeployCollection.tsx` e `.css` — grade das oito artes e as 24 regiões animadas por arte.
- `src/components/intelligence/DesignTemplateGallery.tsx` e `DesignStorefronts.css` — galeria inicial de mini lojas.
- `src/components/intelligence/designTemplatesData.ts` — textos e dados das lojas fictícias.
- `src/components/intelligence/DesignUniquePreview.test.tsx` — testes da sequência e preferência de movimento reduzido.
- `src/components/showcase/showcaseData.ts` — inventário e caminhos das oito artes existentes.
- `public/images/design-products/SOURCES.md` — créditos e fontes das fotos de produto da galeria inicial.

## Verificação conhecida

No estado registrado, `npm.cmd test -- src/components/intelligence/DesignUniquePreview.test.tsx` passou com **2 testes** e `npm.cmd run build` passou. O navegador integrado estava indisponível, então não foi possível fazer inspeção visual no browser.

## Histórico anterior da interface

Na seção existem seis cards. O terceiro é “DESIGN ÚNICO”; a documentação antiga do card descreve uma galeria de seis modelos e uma animação anterior. O código de galeria agora tem 12 lojas. A documentação de copy foi atualizada para a galeria de 12 lojas e a coleção final de oito artes.

## Ajuste de apresentação solicitado após a implementação
O usuário rejeitou os cards de fundo que simulavam a construção. Foram removidos o fundo quadriculado, as molduras de navegador, os fundos individuais e as legendas. A cena mantém as oito artes se montando diretamente sobre o fundo da coleção, com proporções preservadas e rolagem.

Ajuste de ritmo: a pedido do usuário, a montagem, a rolagem e as pausas de “Outras plataformas” ganharam 60% mais tempo. A primeira fase passa de 8,3 para 13,3 segundos; o ciclo completo fica em aproximadamente 28 segundos.

## Ajuste de composição — 01/10/2026
O usuário apontou excesso de espaço vazio. A coleção MakePloy passou de três colunas com caixas de 108px para quatro pares, cada um com uma arte vertical e uma horizontal. As colunas têm proporção 27:64, mantendo a mesma altura natural por linha e preenchendo a largura disponível. Margens e espaçamentos foram reduzidos; a rolagem acompanha os pares. As imagens preservam sua proporção, sem molduras ou fundos individuais. Testes (2) e build passaram; inspeção visual no navegador permanece pendente.

## Quantidade da galeria inicial — 01/10/2026
A pedido do usuário, “Outras plataformas” agora mostra oito mini páginas também (Natural, Urbano, Minimal, Energia, Studio, Essencial, Essência e Reflexo). A rolagem acompanha as três linhas existentes. O ritmo desacelerado foi mantido, com mais tempo para apreciar a galeria pronta antes da transição. Testes da sequência passaram.

Ajuste de espaçamento: a galeria “Outras plataformas” passou a duas colunas e quatro linhas completas, com duas mini páginas por linha. A rolagem foi adaptada aos pares. Testes da sequência passaram.

Ajuste da entrada do cursor: removida a espera herdada da galeria de 12 itens. A montagem mantém a velocidade aprovada; após terminar aos 7,56 segundos, a galeria retorna ao topo e o mouse começa a aparecer aos 8,48 segundos (antes: 13,28 segundos). O ciclo completo agora dura aproximadamente 28 segundos. Testes passaram.

Novo ajuste de velocidade: a montagem e a rolagem de “Outras plataformas” ganharam mais 37,5% de duração (multiplicador de 1,6 para 2,2). A montagem termina aos 10,4 segundos; o cursor começa a aparecer aos 11,33 segundos, preservando uma pausa inferior a um segundo. O ciclo atual dura aproximadamente 30,8 segundos. Testes passaram.

Ajuste da coleção MakePloy: montagem, rolagem e pausas finais receberam 40% mais tempo, mantendo o ritmo já aprovado de “Outras plataformas” e a entrada rápida do cursor. O ciclo completo atual dura aproximadamente 37,4 segundos. Testes da sequência passaram.

## Verificação antes do commit
Build e lint dos arquivos deste card passaram. Suíte completa: 33 testes passaram e 1 falhou por ícones SVG sem texto alternativo em outras seções (incluindo AIConstellationPreview). O lint geral aponta problemas preexistentes em VisualToCodePreview.tsx. Essas partes não foram alteradas neste trabalho. A validação visual continua pendente pela indisponibilidade do navegador integrado.
