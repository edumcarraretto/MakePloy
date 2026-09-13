# Conversa sobre a copy do site — 10/09/2026

Resumo para retomar o trabalho. Não é uma transcrição integral.

## Direção do projeto

O site deve convidar qualquer pessoa a tirar uma ideia do papel: desde uma ideia simples ou projeto pessoal até o sonho de criar uma empresa. Deve acolher quem não sabe começar, não tem clareza ou já tentou e parou.

A copy deve despertar emoção, motivação e vontade de ver a própria ideia acontecer. O usuário quer frases curtas, naturais, precisas e com significado; rejeita slogans genéricos e explicações longas. Cada palavra deve ter uma função. Usar persuasão com identificação, visualização e desejo de realização, sustentada pelo que o produto oferece.

## Forma de trabalhar

- Revisar seção por seção, começando pelo hero e descendo pelo site.
- Dentro da seção, revisar um elemento por vez.
- Apresentar sugestões concisas e implementar a versão escolhida quando solicitado.
- Preservar o estilo visual nas mudanças de texto.

## Hero: decisões aprovadas e implementadas

Arquivo: `src/components/hero/Hero.tsx`.

### Frase acima do título

1ª PLATAFORMA END-TO-END

Substituiu “Sua ideia merece acontecer”, que havia sido uma escolha anterior. O usuário afirma o pioneirismo da plataforma; não houve verificação independente dessa afirmação nesta conversa.

### Título

Tire sua ideia do papel

Mesmo sem saber como

Sem pontos finais nas duas frases, por preferência visual do usuário. A segunda mantém itálico e degradê.

“Você não precisa começar sozinho” foi implementada antes, mas rejeitada por ficar longa. Não voltar a essa versão.

### Espaçamento

O espaçamento superior foi aumentado para afastar a frase da navegação: `pt-28 pb-16 sm:pt-36 sm:pb-20`.

### Subtítulo rotativo

As quatro frases aprovadas, nesta ordem:

1. Uma ideia é só o começo.
2. Dê forma ao que você imagina.
3. Leve sua ideia adiante.
4. Do rascunho à construção.

Mantidos os destaques em azul e itálico e a rotação a cada 2,5 segundos, respeitando movimento reduzido. Os pontos finais dessas frases foram mantidos conforme a versão aprovada.

Ao implementar, foi encontrado um trecho incompleto no início do componente. Foram restaurados os imports, tipos e a função de rotação necessários. `npm.cmd run build` passou após essa correção.

### Palavras animadas ao fundo do logo

SONHE · CRIE · REALIZE · MAKEPLOY

Implementadas nessa ordem, preservando animação e estilo. Substituem VALIDE · MAKEPLOY · CRIE · REALIZE.

### Logo central

Mantido com seus efeitos visuais.

## Próximo passo

Continuar a revisão pelo botão principal do hero, atualmente “Começar de onde estou”. Ele abre o formulário de acesso antecipado. Ainda não foi escolhida uma nova copy para esse botão.

Depois, revisar a seta que leva a “Como funciona”, cujo texto de acessibilidade é “Conhecer o sistema”, e seguir para a próxima seção.

## Git e publicação

- Commit das alterações do hero: `b97fa9d` — `Atualiza copy e espacamento do hero`.
- Enviado com sucesso para `origin/main` em `https://github.com/edumcarraretto/MakePloy.git`.
- Antes do envio, foi integrada por rebase uma atualização remota que removia uma seção do README.
- Espera-se que o push acione a integração automática com a Vercel, mas a conclusão do deploy não foi verificada.
- Este arquivo de resumo foi criado depois do push e não está incluído naquele commit.
