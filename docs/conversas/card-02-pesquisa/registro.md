# Conversa e estado do trabalho — card “Pesquisa”

**Atualizado em:** 02/10/2026
**Projeto:** MakePloy — último card (sexto) da seção “Uma ideia. A MakePloy entra em ação.”

Este registro reúne as decisões disponíveis nesta conversa e no registro anterior, além do estado confirmado no código. Serve para retomar o trabalho sem confundir o que já existe com o que ainda está planejado. Não é uma transcrição de conversas anteriores que não estejam disponíveis neste arquivo.

## Contexto da seção

- **Título:** Uma ideia. A MakePloy entra em ação.
- **Descrição:** O que já existe, o que ainda falta descobrir e tudo o que pode ajudar se juntam em uma coisa só.
- A seção tem seis cards em uma grade de duas colunas em telas médias e três em telas largas. Na ordem atual: projeto/jornada, modelos de IA, design único, ferramentas conectadas, sugestões para o momento atual e pesquisa. O card de pesquisa ocupa a última posição no código atual; a documentação de copy ainda registra que a posição final pode ser discutida.
- “Card 02” é o número da ideia no diretório de copy, não sua posição na grade.

## Texto aprovado

- **Título:** RESPOSTA COMEÇA NA PESQUISA.
- **Descrição:** Pesquisamos a fundo sites, referências e dados atualizados para chegar ao que importa.

Ambos estão aplicados no sexto card, em `src/components/intelligence/MemoryAITableSection.tsx`.
O card mostra a investigação feita antes de propor uma direção para uma dúvida concreta, sem repetir a análise geral de mercado e público já apresentada em outras partes da página.

## Direção visual escolhida

A cena começa com a caixa de pergunta que lembra a caixa principal do site. Ela fica compacta, tem fundo preto e usa apenas as cores oficiais da marca na borda animada. O usuário ajustou a largura algumas vezes; o valor atual é até 310 px. A borda percorre o contorno em seis segundos, sem brilho difuso.

A caixa mostra “Pergunte à MakePloy”, o seletor dos mesmos modelos de IA da caixa principal, as opções de nível “Leve”, “Moderado” e “Máximo” (começa em “Moderado”) e a seta de envio. O símbolo @ foi removido. A seta e o cursor são parte da demonstração; não enviam uma pergunta real. Os dois menus são escuros, exibem os ícones dos modelos e permitem navegação por teclado.

Os modelos compartilhados com a caixa principal são GPT 5.6 Terra, GPT 5.6 Sol, GPT 5.6 Luna, Gemini 3.1 Pro, Gemini 3.8 Flash, Soneto 5 e Fábula 5. Os menus fecham ao clicar fora, rolar ou redimensionar a janela; `Escape` devolve o foco ao seletor. `DeepSearchPreview.tsx` centraliza a miniatura dentro do card preto, que tem borda discreta, cantos arredondados, título e descrição acima da demonstração.

## Animação implementada

1. Quando pelo menos metade da caixa entra na área visível, começa um ciclo de **27 segundos**. Há **900 ms** de espera inicial e depois uma das cinco ideias é digitada a cada **65 ms**: “Quero abrir uma loja de roupas.”, “Quero criar um aplicativo de delivery.”, “Quero lançar uma marca de cosméticos.”, “Quero criar uma plataforma de cursos.” ou “Quero abrir uma cafeteria.” Depois da quinta, a sequência recomeça.
2. Ao terminar a digitação, há uma pausa de **850 ms**. O cursor se desloca por **850 ms** até a seta e simula o clique.
3. **260 ms** após o início do clique, os seletores e a seta desaparecem com uma transição.
4. A caixa sobe **36 px** e mostra “Analisamos sua ideia” centralizado, junto de um indicador de atividade. Após a última fonte e uma pausa adicional de **450 ms**, o indicador se transforma em um check com pulso mais lento e o texto muda para “Pesquisa concluída”. O estado final permanece visível antes do próximo ciclo.
5. Cerca de **350 ms** depois do início da análise, surge abaixo da caixa uma sequência de fontes, solta no card e sem painel de fundo. Cada ideia percorre **100 sites ilustrativos próprios**. Os seis primeiros entram a cada **340 ms**; os 91 seguintes, a cada **150 ms**; as três últimas, a cada **700 ms**. Cada entrada tem logo, nome e motivo da consulta. Até três ficam visíveis ao mesmo tempo. A fonte mais antiga sai quando outra entra. A última permanece **750 ms** antes de surgir uma frase própria para cada ideia, como “Sua loja começa a ganhar forma”. A sequência muda junto com a ideia e volta ao início no próximo ciclo.

A contagem pausa quando a aba fica em segundo plano. Com movimento reduzido, mostra a primeira ideia completa, sem digitação, deslocamento da caixa ou borda em movimento. Caixa e painel usam o mesmo relógio e índice de ideia. O painel não aparece no modo de movimento reduzido porque a análise não começa nesse modo.

## Direção escolhida para a pesquisa

O usuário descartou mini páginas inventadas por parecerem artificiais. Escolheu a estrutura de etapas conectadas do componente `ToolCallsSection` que enviou como referência. A adaptação conserva o cabeçalho expansível, a linha entre ações e a entrada progressiva, sem caixa de fundo envolvendo as fontes. Remove o texto técnico “Used tools” e blocos de `Input`/`Output` para caber no card. Cada fonte tem logo, nome, descrição curta e link. O cabeçalho visível é “Explorando referências”; a sequência é uma demonstração preparada para o card, não uma navegação ao vivo executada pela MakePloy.

As 100 fontes de cada ideia, seus links e as mensagens curtas ficam em `researchSourceData.ts` e `researchSourceExtras.ts`. As fontes adicionais foram selecionadas do Name Suggestion Index e dos sites oficiais registrados no Wikidata, com revisão pontual de entradas inadequadas. São 500 nomes e domínios únicos no total; nenhuma fonte se repete entre ideias. `researchSourceData.test.ts` verifica essa restrição. Não são exibidos resultados de busca fabricados ou capturas alteradas de páginas de terceiros. A sequência usa nomes de serviços conhecidos sem imitar uma página de resultados do Google. A navegação por dezenas de sites e simulações segue sem confirmação como funcionalidade real da plataforma.

## Próxima revisão

Conferir a animação visualmente no navegador com o usuário, especialmente o espaço disponível no card, a velocidade da troca de fontes e a leitura das mensagens. A sequência ainda não produz uma resposta de pesquisa da plataforma.

## Arquivos relevantes

- `src/components/intelligence/MemoryAITableSection.tsx` — título, descrição e posição do card na grade.
- `src/components/intelligence/DeepSearchPreview.tsx` — encaixe da demonstração no card.
- `src/components/intelligence/ResearchStepsPreview.tsx` — sequência animada das fontes por ideia.
- `src/components/intelligence/researchSourceData.ts` — nomes, mensagens e links das cinco listas de fontes.
- `src/components/intelligence/researchSourceExtras.ts` — fontes adicionais por ideia, curadas a partir de catálogos públicos.
- `src/components/intelligence/researchSourceData.test.ts` — garante que nomes e domínios não se repetem.
- `src/components/ui/demo.tsx` — caixa compacta, ideias e cronologia da digitação e do clique.
- `src/components/ui/model-selector.tsx` — menus de modelo e nível de análise.
- `src/components/ui/ai-models.ts` — lista compartilhada de modelos usada também pela caixa principal em `src/components/cta/AIIdeaSection.tsx`.
- `src/components/ui/border-beam.tsx` e `src/components/ui/chat-input.css` — borda e cores da marca.
- `docs/copy/inteligencia/cards/card-02-pesquisa.md` — ideia, texto aprovado e estado da implementação.
- `docs/copy/inteligencia/README.md` — visão geral das seis ideias.

## Verificação em 01/10/2026

- `npm.cmd run build` e o lint direcionado aos quatro arquivos alterados da interface passaram. `git diff --check` passou.
- `npm.cmd run lint` já falhava por um aviso e quatro erros em `src/components/creation/VisualToCodePreview.tsx`, fora dos arquivos deste card.
- `npm.cmd test` terminou com 33 testes aprovados e um teste de acessibilidade da página completa falhando por SVGs sem texto alternativo em outros componentes; os ícones apontados não pertencem ao painel novo.
- A conferência visual no navegador ficou pendente porque nenhum navegador estava disponível para a conexão nesta sessão.
- Há alterações locais ainda não commitadas nos arquivos da seção e da demonstração. A cena de etapas de pesquisa foi implementada nesta atualização.

## Atualização em 02/10/2026

- O usuário pediu que as fontes ficassem soltas no card, sem painel ou fundo envolvendo a sequência. O contêiner visual e o fundo da síntese foram removidos.
- A versão intermediária percorria 100 referências de um conjunto compartilhado, repetindo logos. O usuário corrigiu essa direção e depois especificou 100 sites por ideia. A versão atual tem 500 sites únicos no total, sem repetição de nomes, domínios ou imagens de favicon. O ciclo dura 27 segundos; as seis primeiras fontes entram a cada 340 ms, as 91 seguintes a cada 150 ms e as três últimas a cada 700 ms, com três visíveis ao mesmo tempo.
- Em 02/10/2026, as 500 URLs de favicon usadas pela interface responderam com sucesso e produziram 500 hashes de imagem distintos. `npm.cmd run build`, lint direcionado e o teste de unicidade passaram.
- `npm.cmd run build`, lint direcionado de `ResearchStepsPreview.tsx` e `git diff --check` passaram. O navegador integrado não estava disponível para revisão visual.
