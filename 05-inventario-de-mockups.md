# 05. Inventário de mockups: contêineres definitivos

Método: composição em **HTML/CSS com os arquivos reais** (fidelidade literal). Nenhuma imagem de IA é necessária para esta página; veja a nota de método no `06-manifesto-visual.md`.

| ID | Seção | Contêiner (desktop) | Contêiner (mobile) | Proporção | Ponto focal | Área segura | Estrutura CSS | Fit |
|---|---|---|---|---|---|---|---|---|
| M01 | Hero | 570 × 360 | 100% × 290 | 3:2 | Capa central | 8% | `.product-composition` (capa 86% de altura, duas telas em leque raso, celular à frente, selo `19 FERRAMENTAS`) | `contain` nas telas; `cover` topo no celular |
| M02 | Galeria (prévias) | cartão 230 px de largura | 62vw | 9:19,5 | Tela inteira | 100% | `.screen-frame` dentro de `ScrollRail` em loop | `contain` |
| M03 | Mecanismo | celular 210 px | 190 px | 9:19,5 | Tela do Momento com Deus | 100% | `.phone-mockup--static` | `cover` topo |
| M04 | Uso (4 funções do app) | cartão 240 px | 62vw | 9:19,5 | Tela inteira | 100% | `.screen-frame--dark` em `ScrollRail` em loop | `contain` |
| M05 | Pitch intermediário | 1fr × 410 | 100% × 340 | ~3:2 | Capa à esquerda | 6% | `.pitch-composition` (capa rotacionada -3° + celular com tela de capítulo) | `contain` na capa |
| M06 | Recebe (coleção) | 760 × 420 | 100% × 300 | ~9:5 | Capa do ebook | 10% | `.collection` (capa do ebook ao centro, capas dos dois bônus em leque raso) | `contain`, sem celular |
| M07 | Bônus 01 | topo do card, 215 de altura | 255 | 3:4 | Capa | 8% | `.bonus-book` (capa isolada com lombada e sombra) | `cover` 3:4 |
| M08 | Bônus 02 | idem | idem | 3:4 | Capa | 8% | `.bonus-book` | `cover` 3:4 |
| M09 | Bônus 03 | topo do card | 255 | 9:19,5 | Tela da biblioteca | 8% | `.bonus-device` (celular fino com a tela real) | `contain` |
| M10 | Oferta | card 520 × 270 | 100% × 235 | ~2:1 | Capa | 10% | `ProductComposition compact` | igual ao hero |

Regras: preço, CTA, garantia e promessa ficam em HTML. Nada de texto comercial dentro de imagem. Nenhuma tela é desenhada com `div` e texto.

## Arquivos reais necessários (e nomes finais)

| Arquivo | Conteúdo | Proporção esperada |
|---|---|---|
| `public/assets/telas/capa-ebook.webp` | Capa do ebook "Como Vencer a Procrastinação com Deus" | 3:4 |
| `public/assets/telas/bonus-liberdade-capa.webp` | Capa do bônus Liberdade com Deus | 3:4 |
| `public/assets/telas/bonus-financas-capa.webp` | Capa do bônus Finanças com Deus | 3:4 |
| `public/assets/telas/tela-momento.webp` | Print: Momento com Deus do dia | celular, ~9:19,5 |
| `public/assets/telas/tela-capitulo.webp` | Print: capítulo do ebook com pergunta interativa | celular |
| `public/assets/telas/tela-resumo.webp` | Print: Seu Resumo Personalizado | celular |
| `public/assets/telas/tela-acompanhamento.webp` | Print: sequência de dias, calendário, meta semanal | celular |
| `public/assets/telas/tela-central.webp` | Print: Central das 19 ferramentas | celular |
| `public/assets/telas/tela-biblioteca.webp` | Print: biblioteca de ebooks | celular |
| `public/assets/telas/tela-audio.webp` | Print: ouvir em voz alta | celular |
| `public/assets/telas/tela-anotacoes.webp` | Print: anotações e destaques | celular |
| `public/assets/telas/tela-certificado.webp` | Print: certificado de conclusão | celular |
| `public/assets/telas/tela-modo-escuro.webp` | Print: app em modo escuro | celular |

Hoje esses arquivos são **marcadores neutros** (fundo creme com o nome do arquivo). Substituir pelo arquivo real com o mesmo nome faz a página inteira atualizar sem mexer em código. Os originais devem ir para `public/assets/originais/`.
