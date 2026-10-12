# 06. Manifesto visual

Referência de composição: componentes e ativos correspondentes do starter oficial 50 Lições/Enem. Referência de conteúdo: arquivos reais do produto (pendentes).

| ID | Seção | Encaixe | Produto real (conteúdo) | Referência oficial 50 Lições/Enem (composição) | Saída | Método | Status |
|---|---|---|---|---|---|---|---|
| M01 | Hero | 570×360, 3:2; mobile 290 | capa-ebook + tela-resumo + tela-acompanhamento + tela-momento | `ProductComposition` + `hero-capa-principal.webp` | `ProductComposition` (CSS) | HTML/CSS com arquivos reais | aguardando arquivos reais |
| M02 | Galeria | cartão 9:19,5 | 6 prints (momento, capítulo, resumo, acompanhamento, central, biblioteca) | `mapa-*.webp` (carrossel em loop) | arquivos reais diretos | sem regeneração | aguardando arquivos reais |
| M03 | Mecanismo | celular 210 px | tela-momento | mecanismo com página real em destaque | `.phone-mockup--static` | HTML/CSS | aguardando arquivo real |
| M04 | Uso | cartão 9:19,5 | tela-audio, tela-anotacoes, tela-certificado, tela-modo-escuro | `uso/*.webp` (carrossel de uso) | arquivos reais em moldura | HTML/CSS (sem pessoas) | aguardando arquivos reais |
| M05 | Pitch | ~3:2, 410 de altura | capa-ebook + tela-capitulo | `mockup-midpitch-v3.png` | `.pitch-composition` | HTML/CSS | aguardando arquivos reais |
| M06 | Recebe | 760×420 | capa-ebook + 2 capas de bônus | `mockup-receive-v2.png` | `.collection` | HTML/CSS | aguardando arquivos reais |
| M07 | Bônus 01 | 3:4 | bonus-liberdade-capa | `bonus-edital-mockup-v3.png` | `.bonus-book` | HTML/CSS, capa isolada | aguardando arquivo real |
| M08 | Bônus 02 | 3:4 | bonus-financas-capa | `bonus-plano-mockup-v3.png` | `.bonus-book` | HTML/CSS, capa isolada | aguardando arquivo real |
| M09 | Bônus 03 | 9:19,5 | tela-biblioteca | `bonus-plano-mockup-v3.png` | `.bonus-device` | HTML/CSS (sem capa: novos ebooks semanais) | aguardando arquivo real |
| M10 | Oferta | ~2:1 | igual ao hero | `ProductComposition compact` | `ProductComposition compact` | HTML/CSS | aguardando arquivos reais |
| — | Antes × Depois | — | — | comparador | — | — | **omitido** (sem fonte legítima) |
| — | Prova social | — | — | avatares | — | — | **omitido** (sem depoimentos) |
| — | Garantia | — | — | — | HTML/CSS + ícone | HTML/CSS | aprovado |

## Nota de método (Image 2.5 High)

A skill pede Image 2.5 High como padrão para hero, coleção, bônus, oferta e cenas de uso. Para este produto, **a composição foi feita em HTML/CSS com os arquivos reais**, porque:

1. todo o conteúdo visual é interface de app e capas de ebook, onde qualquer redesenho de texto pela IA reprova o ativo;
2. o manifesto permite HTML/CSS quando fidelidade literal pesa mais que ambientação;
3. não foi possível confirmar a seleção explícita de Image 2.5 High nesta sessão.

Se o usuário quiser mockups ambientados (por exemplo, o celular sobre uma mesa), isso pode ser gerado depois, a partir dos mesmos arquivos reais.

## Cenas com pessoas

Nenhuma. Sem depoimentos e sem fotos reais autorizadas, não há pessoa decorativa na página.
