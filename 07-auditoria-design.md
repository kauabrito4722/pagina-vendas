# 07 · Auditoria

## Testes automáticos (Playwright, build local) — 17/17
desktop 1280, tablet 768, celular 390 e 360: sem erro no console e sem rolagem lateral · CTA do hero → `#previas` · CTAs intermediários e fecho → `#oferta` · só o card de preço usa o checkout (placeholder) · sem barra de urgência, contador, comparador ou valor riscado · sem placeholder visível · headline no hero e no fecho · setas dos 2 carrosséis avançam · FAQ abre · 8 benefícios, 6 situações, 3 bônus · todas as imagens com `alt` · imagens abaixo da dobra com lazy loading · com movimento reduzido o carrossel não anda sozinho.

## Portão antiachismo (resumo)
- Toda promessa aponta para o ebook, o app ou o briefing (tabela abaixo).
- Nenhum depoimento, selo, número de clientes, urgência, valor riscado, "vitalício" ou "100%".
- Sincronia dos bônus: 3 em cabeçalho, cards, badge, lista do plano, FAQ e oferta.

## Fatos (origem)
F01 ebook de 10 capítulos, perguntas nos cap. 2 e 7, resumo personalizado · F02 plano de 21 dias, 3 semanas, 10 a 30 min por dia · F03 Dia 4 = 2 minutos, Dia 5 = horário fixo, Dia 9 = 25 min · F04 Dia 2 = raiz (medo, perfeccionismo, cansaço, propósito) · F05 páginas reais · F06 Dia 16/17 = 5 etapas, primeira concluída · F07 19 ferramentas, Momento com Deus ~5 min, sequência e meta semanal · F08 telas do app · F09 Liberdade com Deus (30 dias) · F10 Finanças com Deus (30 dias); ebook novo toda semana (briefing do dono) · F11 R$ 9,90, taxa R$ 0,99, total R$ 10,89, Pix/cartão/PicPay · F12 garantia 7 dias · F13 primeiro acesso com o e-mail da compra · I01 dores = inferência (sem pesquisa específica).

## Pendências do dono
1. Checkout: trocar `checkoutUrl` em `src/comercial.js` por `https://pay.cakto.com.br/wf95dmj_1169418` (não conectei sem pedido).
2. E-mail de suporte e razão social/CNPJ (ocultos até existirem).
3. Termos de uso e política de privacidade (links removidos por não existirem).
4. Taxa de R$ 0,99: hoje está explicada no card e no FAQ. Decidir se absorve ou mantém.
5. Prova social: quando houver relatos autorizados, entra no bloco 12.
6. Meta Pixel: não instalado.

## Como gerar de novo
`cd app && ./build.sh` (esbuild; o Vite não instalou porque o registro npm está bloqueado aqui). A pasta `app/dist` é o site pronto.
