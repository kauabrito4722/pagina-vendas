# 06 · Manifesto visual

| ID | Seção | Encaixe | Conteúdo real | Referência de composição (modelo) | Método | Status |
|---|---|---|---|---|---|---|
| IMG-01 | Hero / Oferta | `.hero-media` 570×360 (290 no celular) | capa + 3 páginas + app | `ProductComposition`, `hero-capa-principal` | camadas CSS com arquivos reais | aprovado |
| IMG-02 | Galeria | cartões 280 px, ~3:4 | 6 páginas do ebook | `gallery-card` | captura real do leitor | aprovado |
| IMG-03 | Demonstração | `.usage-photo` 3:4 | 6 telas do app | `uso-*.webp` | tela real em moldura (Pillow) | aprovado |
| IMG-04 | Pitch | `.mid-pitch-media` 1536×1024 | capas + app | `mockup-midpitch-v3` | composição Pillow | aprovado |
| IMG-05 | Produto completo | `.receive-media` 1536×1024 | capas + 2 telas | `mockup-receive-v2` | composição Pillow | aprovado |
| IMG-06..08 | Bônus | capa + 2 páginas | capas e páginas reais | `bonus-*-capa/pagina` | arquivos reais | aprovado |

**Aviso de método:** as composições foram montadas com os arquivos reais do produto e não com o Image 2.5 High. A ferramenta de geração não estava disponível nesta sessão, e mockup montado com arquivo real não inventa nem altera capa, texto ou tela. O script está em `work/gerar-imagens.py`. Se quiser o acabamento do Image 2.5 High, é só gerar os 3 mockups (IMG-01, 04 e 05) a partir desses mesmos arquivos.
