# 04. Direção visual: Jornada com Deus

**Leitura de design:** página de vendas low-ticket para cristãos adultos que adiam o tempo com Deus, com linguagem acolhedora, espiritual e elegante, preservando o template oficial 50 Lições/Enem e usando uma direção estética de luz dourada sobre creme e fundo escuro quente.

**Modo detectado:** página nova no template oficial.

## Dials

| Dial | Valor | Motivo |
|---|---|---|
| Variação visual | 4 | Template oficial preservado; variação só em tipografia serifada e paleta |
| Movimento | 3 | Dois carrosséis em loop com pausa, `prefers-reduced-motion` respeitado |
| Densidade | 5 | Público com pouco tempo e celular: blocos curtos, uma ideia por tela |

## Tokens (identidade informada pelo usuário)

| Token | Valor | Papel |
|---|---|---|
| `--ink` | `#0E0B08` | Estrutura: títulos, oferta, fecho (papel do marinho no template) |
| `--tint` | `#F6EFE2` | Creme secundário (hero, galeria, mid-pitch, recebe, passos) |
| `--bg` | `#fdfaf3` | Branco quente de leitura |
| `--gold` | `#E7BE6E` | Ação (CTA), badges, acentos sobre fundo escuro |
| `--brown` / `--green-dark` | `#8C5D18` / `#6f4910` | Ícones, kickers, checks, preço sobre claro |
| `--text` / `--muted` | `#3b2f22` / `#65574a` | Corpo e apoio |

- Papéis preservados: estrutura escura, creme alternado, **ação sempre dourada** (um só tipo de CTA). Vermelho não usado (sem urgência real).
- Alternância: creme (hero) → branco quente → creme → branco → creme/branco → escuro (oferta) → branco → creme → branco → escuro (fecho) → rodapé.
- Raios: controle 12px, card 16px, composição destacada 20 a 26px (telas).
- Sombras: borda sutil primeiro; sombra profunda só no mockup do hero e no card da oferta.

## Tipografia

- Títulos: **Playfair Display** 700 (local, `font-display: swap`). Hero em `clamp(30px, 4.3vw, 46px)`, entrelinha 1.12 a 1.15.
- Corpo: **Inter** 400 a 800 (local). 16px de base, nunca abaixo de 12px nos chips compactos.
- Preload apenas de Playfair 700 e Inter 400.

## Linguagem de imagem

- Conteúdo soberano: capas e prints reais do usuário, sem redesenho.
- Composição em HTML/CSS com os arquivos reais: capa com lombada escura e sombra de contato; telas com moldura fina escura; celular de moldura fina com tela encaixada por `object-fit`.
- Luz: sombras quentes `rgba(14,11,8,.18 a .28)`, direção do canto superior esquerdo.
- Sem fotografia de pessoas (não há prova social; cenas decorativas ficam fora).
- Ícones: lucide-react (única família), decorativos com `aria-hidden`.
- Logo: cruz branca em quadrado dourado arredondado (SVG a partir da descrição do usuário), usada no favicon e no rodapé.

## Micro-rótulos (limite: ceil(17 seções / 3) = 6)

1. Badge do hero (nome oficial)
2. Olho do mecanismo (`VEJA COMO FUNCIONA CADA DIA`)
3. Olho do uso (`NO SEU DIA A DIA`)
4. Olho dos bônus (`E NÃO PARA POR AÍ...`)
5. Kicker do plano (`ACESSO COMPLETO`)
6. Olho do fecho

> O olho do mecanismo aparece no texto de apoio da seção, não como rótulo extra. Total efetivo: 5 a 6.

## Hero (ordem validada)

Badge → headline → mockup → subheadline → três bullets → CTA → linha de amplitude. Sem menu, sem cabeçalho, sem botão flutuante, sem barra de urgência.
