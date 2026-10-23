# SPEC.md — Site pessoal / portfólio

| Campo | Valor |
| --- | --- |
| Projeto | `pagina-pessoal` |
| Dono | Inácio Wellington Oliveira |
| Tipo | Site pessoal estático (portfólio de projetos) |
| Status | **Planejamento aprovado — implementação não iniciada** |
| Versão | 0.1 (draft para validação) |
| Última atualização | 2026-10-23 |
| Repositório | https://github.com/inacio-w-oliveira/pagina-pessoal |
| URL de produção | https://inacio-w-oliveira.github.io/pagina-pessoal/ |

---

## 1. Visão

Um site pessoal de uma página, rápido e bilíngue, que apresente **Inácio Wellington Oliveira** como profissional **em transição de carreira — de vendas de peças para desenvolvimento de software** — e que funcione como portfólio dos projetos que ele está construindo.

O site deve transmitir, em menos de 5 segundos: quem é, de onde vem, para onde vai e como entrar em contato.

## 2. Objetivos

1. **Credibilidade na transição.** Mostrar trajetória coerente, não um currículo disfarçado.
2. **Portfólio vivo.** Espaço pronto para receber projetos assim que existirem, sem refatoração.
3. **Contato sem atrito.** LinkedIn, e-mail, GitHub e WhatsApp a um clique de qualquer ponto.
4. **Presença profissional bilíngue.** PT-BR e EN, atendendo recrutadores locais e remotos.
5. **Excelência técnica visível.** O próprio site é peça de portfólio: semântico, acessível, rápido, sem dependências.

## 3. Não objetivos

- Blog, CMS, painel administrativo ou login.
- Coleta de dados, analytics, cookies ou formulário com backend.
- Loja, pagamentos, download pago.
- Múltiplas páginas de projeto (cada projeto é um card com link externo).
- Automatizar a listagem via API do GitHub (decidido: curadoria manual posterior).

## 4. Público

| Público | O que procura | Implicação de design |
| --- | --- | --- |
| Recrutadores técnicos (BR) | Evidência de habilidades, projetos, contato rápido | Projetos e stack visíveis cedo; CV em PDF |
| Recrutadores internacionais | Inglês fluente, clareza, maturidade | Seletor EN visível no header |
| Comunidade dev | Código, links, transparência | Link para o GitHub em destaque |
| Colegas e indicações | Confirmar quem é a pessoa | Foto, nome completo, LinkedIn |

## 5. Identidade e dados oficiais

Estes valores são **fonte da verdade**. Não alterar sem confirmação.

| Dado | Valor |
| --- | --- |
| Nome de exibição | Inácio Wellington Oliveira |
| Posicionamento | Em transição de carreira: vendas de peças → desenvolvimento de software |
| LinkedIn | https://www.linkedin.com/in/inaciooliveira |
| GitHub | https://github.com/inacio-w-oliveira |
| E-mail | inacio.w.oliveira@gmail.com |
| WhatsApp | +55 54 99700-5822 → https://wa.me/5554997005822 |
| Foto | `assets/img/foto.jpg` (placeholder até envio) |
| Currículo | `assets/cv.pdf` (placeholder até envio) |
| Redes adicionais | Nenhuma |

## 6. Arquitetura de informação

Página única com âncoras. Ordem fixa:

```
Header (fixo, compacto)
├── Nome/marca (link para #top)
├── Navegação: Sobre · Projetos · Contato
├── Seletor de idioma: PT | EN
└── Botão de tema: claro/escuro

main
├── #top / Hero
│   ├── Eyebrow: "Portfólio"
│   ├── H1: Inácio Wellington Oliveira
│   ├── Subtítulo: em transição para desenvolvimento
│   ├── Parágrafo curto (2 linhas)
│   ├── CTA primário: Ver projetos
│   ├── CTA secundário: Falar comigo
│   └── Foto (retrato, moldura com gradiente)
├── #sobre
│   ├── H2: Sobre mim
│   ├── 2–3 parágrafos (origem em vendas, decisão pela tecnologia, momento atual)
│   ├── Bloco "O que estou estudando" (lista de tecnologias — TODO)
│   └── CTA: Baixar currículo
├── #projetos
│   ├── H2: Projetos
│   ├── Estado vazio (fase atual)
│   └── Grid de cards (quando houver dados)
└── #contato
    ├── H2: Vamos conversar
    ├── Frase de abertura
    └── 4 canais: E-mail, LinkedIn, GitHub, WhatsApp

footer
├── © 2026 Inácio Wellington Oliveira
└── "Feito com HTML, CSS e JS · Publicado no GitHub Pages"
```

## 7. Conteúdo (copy draft)

> Texto de trabalho, sujeito a aprovação. Inglês é adaptação, não tradução literal.

### 7.1 Hero

**PT**
- Eyebrow: `Portfólio`
- Título: `Inácio Wellington Oliveira`
- Subtítulo: `Em transição de carreira para desenvolvimento de software`
- Apoio: `Venho das vendas de peças, onde aprendi a ouvir e resolver problema no mesmo dia. Agora aplico isso escrevendo código — e construindo meu portfólio em público.`
- Botões: `Ver projetos` · `Falar comigo`

**EN**
- Eyebrow: `Portfolio`
- Title: `Inácio Wellington Oliveira`
- Subtitle: `Transitioning from auto parts sales into software development`
- Support: `I come from auto parts sales, where I learned to listen and solve problems on the spot. Now I apply that to writing code — and building my portfolio in public.`
- Buttons: `View projects` · `Get in touch`

### 7.2 Sobre

**PT (draft)**
> Passei anos na área de vendas de peças, atendendo clientes, negociando e resolvendo problemas que não podiam esperar. Foi nesse dia a dia que percebi que o que mais me interessava era entender como as coisas funcionam por dentro — e comecei a estudar programação.
>
> Hoje estou em transição de carreira para desenvolvimento de software. Estudo **TODO: stack principal**, construo projetos próprios e documento cada etapa. O que trouxe da área comercial continua valendo: comunicação clara, escuta ativa e foco em resolver o problema de quem está do outro lado.
>
> Busco minha primeira oportunidade como desenvolvedor — júnior, estágio ou projeto real — onde eu possa aprender rápido e entregar com responsabilidade.

**EN (draft)**
> I spent years in auto parts sales — serving customers, negotiating, and solving problems that could not wait. That routine is what made me realize I cared most about understanding how things work under the hood, so I started studying programming.
>
> Today I am transitioning into software development. I am learning **TODO: main stack**, building my own projects, and documenting every step. What I bring from sales still applies: clear communication, active listening, and focus on solving the other person's problem.
>
> I am looking for my first opportunity as a developer — junior role, internship, or a real project — where I can learn fast and deliver responsibly.

**Bloco "O que estou estudando"**: lista de 4–8 itens com nome da tecnologia. **TODO:** preencher.

### 7.3 Projetos — estado vazio (fase atual)

**PT**
- Título: `Projetos`
- Texto: `Ainda estou construindo meus primeiros projetos. Eles aparecem aqui assim que forem publicados.`
- CTA: `Acompanhar no GitHub` → perfil do GitHub

**EN**
- Title: `Projects`
- Text: `I am still building my first projects. They will show up here as soon as they are published.`
- CTA: `Follow on GitHub`

### 7.4 Contato

**PT**
- Título: `Vamos conversar`
- Texto: `Aberto a oportunidades de entrada em desenvolvimento, conversas sobre tecnologia e feedbacks sobre o site. Respondo mais rápido por e-mail ou WhatsApp.`
- Canais: `E-mail` · `LinkedIn` · `GitHub` · `WhatsApp`

**EN**
- Title: `Let's talk`
- Text: `Open to entry-level development opportunities, conversations about tech, and feedback on this site. Email or WhatsApp are the fastest ways to reach me.`
- Channels: `Email` · `LinkedIn` · `GitHub` · `WhatsApp`

### 7.5 Regras de conteúdo

- Sem invenção de empresa, cargo, data, formação ou tecnologia.
- Nenhum superlativo vazio; nenhuma seção "depoimentos" ou "números" sem dados reais.
- Todo `TODO` deve estar em comentário HTML ou no checklist deste SPEC — nunca visível ao usuário.

## 8. Design system

### 8.1 Direção

**Moderno e colorido**, com base neutra e cor concentrada em acentos: gradiente índigo → violeta → rosa no hero e no CTA primário, detalhes em teal, cards arredondados com sombra suave e microanimações discretas.

### 8.2 Tokens de cor

| Token | Claro | Escuro | Uso |
| --- | --- | --- | --- |
| `--bg` | `#FAFAFC` | `#0B0B12` | Fundo da página |
| `--surface` | `#FFFFFF` | `#14141F` | Cards, header |
| `--surface-2` | `#F2F2F7` | `#1C1C2A` | Blocos secundários |
| `--text` | `#12121A` | `#F2F2F7` | Texto principal |
| `--muted` | `#5A5A6E` | `#A0A0B4` | Texto secundário |
| `--border` | `#E6E6EF` | `#262636` | Bordas e divisores |
| `--brand-1` | `#4F46E5` | `#6366F1` | Índigo |
| `--brand-2` | `#7C3AED` | `#8B5CF6` | Violeta |
| `--brand-3` | `#EC4899` | `#F472B6` | Rosa |
| `--accent` | `#0D9488` | `#2DD4BF` | Teal (links, detalhes) |
| `--gradient` | `linear-gradient(135deg, var(--brand-1), var(--brand-2) 50%, var(--brand-3))` | idem | Hero, CTA primário |
| `--focus` | `#4F46E5` | `#A5B4FC` | Anel de foco |

Todas as combinações texto/fundo devem passar AA (≥ 4.5:1). Verificar `--muted` sobre `--surface-2`.

### 8.3 Tipografia

- Família: stack de sistema — `ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`. Zero requisição de fonte.
- Escala (rem, base 16px): `12 / 14 / 16 / 18 / 24 / 32 / 44 / 56`.
- H1 `clamp(2.25rem, 6vw, 3.5rem)`, peso 700, `letter-spacing: -0.02em`.
- H2 `clamp(1.75rem, 4vw, 2.25rem)`, peso 650.
- Corpo 17px (mobile 16px), entrelinha 1.65, `max-width: 68ch`.
- Eyebrow: 13px, `uppercase`, `letter-spacing: 0.12em`, cor `--accent`.

### 8.4 Espaçamento, raios e sombras

- Escala: `--space-1: 4px`, `--space-2: 8px`, `--space-3: 12px`, `--space-4: 16px`, `--space-5: 24px`, `--space-6: 32px`, `--space-7: 48px`, `--space-8: 64px`, `--space-9: 96px`.
- Container: `max-width: 1120px`, padding lateral 20px (mobile) / 32px (≥768px).
- Raios: `--radius-sm: 8px`, `--radius-md: 16px`, `--radius-lg: 24px`, `--radius-full: 999px`.
- Sombra: `--shadow-sm: 0 1px 2px rgb(0 0 0 / .06)`, `--shadow-md: 0 12px 32px -12px rgb(0 0 0 / .18)`.

### 8.5 Componentes

| Componente | Especificação |
| --- | --- |
| Header | Fixo, `backdrop-filter: blur(12px)`, fundo `--surface` com 80% de opacidade, borda inferior `--border`; encolhe ao rolar (altura 72px → 60px) |
| Botão primário | Fundo `--gradient`, texto branco, raio full, padding 14×24, hover: leve elevação (`translateY(-1px)`) + sombra |
| Botão secundário | Contorno `--border`, texto `--text`, fundo transparente, hover: `--surface-2` |
| Card de projeto | `--surface`, raio lg, borda 1px, sombra sm; hover: sombra md + `translateY(-2px)`; imagem 16:9, tags em pills, título, descrição 2 linhas, links |
| Pills de tag | Fundo `--surface-2`, texto `--muted`, 12px, raio full |
| Link de contato | Linha com ícone, rótulo e seta; hover: cor `--accent` e sublinhado |
| Seletor de idioma | Dois `button` pequenos (`PT`, `EN`), `aria-pressed`, ativo com sublinhado em gradiente |
| Toggle de tema | Botão 44×44 com ícone sol/lua, `aria-pressed` |

Ícones: SVG inline, traço 1.5–2px, `currentColor`, sempre com `aria-hidden="true"` + rótulo textual visível ou `aria-label`.

### 8.6 Layout

- Mobile (360–767): coluna única; hero com foto **acima** do texto, 200px, circular ou raio lg; nav em menu compacto (ver §9.4).
- Tablet (768–1023): hero em duas colunas 55/45; projetos em 2 colunas.
- Desktop (≥1024): hero 60/40 com foto 320px; projetos em 3 colunas; seções com `padding-block: 96px`.
- Respiro vertical entre seções: 64px mobile / 96px desktop.
- Nada de scroll horizontal em nenhuma largura.

## 9. Comportamentos

### 9.1 Tema

- Atributo `data-theme="light|dark"` no `<html>`.
- Padrão: `prefers-color-scheme` do sistema.
- Escolha manual persistida em `localStorage['iwo.theme']` e respeitada em visitas futuras.
- Script inline no `<head>` aplica o tema antes da primeira pintura (sem flash).
- `color-scheme` atualizado para os controles nativos.

### 9.2 Idioma

- Padrão: **PT-BR**. Ordem de precedência: `?lang=` na URL → `localStorage['iwo.lang']` → PT-BR.
- Troca em tempo real, sem recarregar: atualiza `<html lang>`, todos os `[data-i18n]`, `[data-i18n-attr]`, `<title>` e `meta[name=description]`.
- Persistência em `localStorage['iwo.lang']`.
- Sem chave faltando: fallback para PT e aviso no console em desenvolvimento.

### 9.3 Impressão

- `@media print`: esconde header, navegação, seletores, animações e sombras; força fundo branco e texto preto; exibe URL de links externos entre parênteses; evita quebra dentro de cards e seções; A4, margens 15mm.
- Botão "Baixar currículo" aponta para `assets/cv.pdf`; a versão de impressão do site é complementar, não substituta.

### 9.4 Navegação e microinterações

- Links de âncora com `scroll-margin-top` igual à altura do header e rolagem suave (desativada em `prefers-reduced-motion`).
- Estado ativo da seção na nav via `IntersectionObserver` (opcional, sem quebrar sem JS).
- Entrada de seções com fade/translate de 12px, uma vez, via `IntersectionObserver`.
- Menu mobile: botão hambúrguer 44×44, painel em tela cheia, foco preso, fecha com `Esc`, `aria-expanded` sincronizado.

## 10. Especificação de i18n

- Dicionário em `assets/js/i18n.js`:
  ```js
  export const translations = {
    pt: { "hero.title": "Inácio Wellington Oliveira", /* ... */ },
    en: { "hero.title": "Inácio Wellington Oliveira", /* ... */ }
  };
  ```
- HTML anotado: `<h2 data-i18n="about.title">Sobre mim</h2>` e, para atributos, `data-i18n-attr="aria-label:nav.menuLabel"`.
- O texto em PT fica **no HTML** (indexável e funcional sem JS); EN é aplicado por JS.
- **Trade-off aceito:** o conteúdo em inglês não é indexado por buscadores nesta fase. Se isso se tornar prioridade, fase futura cria `en/index.html` com `hreflang` (registrado em §17).
- Nenhuma string de UI hardcoded em `main.js`; tudo passa pelo dicionário.
- Datas e números formatados com `Intl` conforme o idioma ativo.

## 11. Estrutura de arquivos

```
pagina-pessoal/
├── index.html
├── 404.html
├── README.md
├── AGENTS.md
├── SPEC.md
├── .nojekyll
├── assets/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   ├── main.js
│   │   ├── i18n.js
│   │   └── projects.js
│   ├── img/
│   │   ├── foto.jpg          # placeholder 800×800, até envio da foto real
│   │   ├── favicon.svg
│   │   └── og-image.png      # 1200×630
│   └── cv.pdf                # placeholder até envio do currículo
└── .github/
    └── workflows/
        └── deploy.yml
```

## 12. Projetos — modelo de dados (fase futura)

Os dados viverão em `assets/js/projects.js` e serão renderizados por `main.js` **apenas se houver itens**; caso contrário, o HTML mantém o estado vazio.

```js
export const projects = [
  {
    id: "nome-do-projeto",
    title: { pt: "Nome do projeto", en: "Project name" },
    description: { pt: "Uma frase sobre o problema resolvido.", en: "One sentence about the problem solved." },
    tags: ["HTML", "CSS", "JavaScript"],
    image: "./assets/img/projects/nome-do-projeto.webp",
    repoUrl: "https://github.com/inacio-w-oliveira/nome-do-projeto",
    liveUrl: "https://exemplo.dev",
    year: 2026,
    featured: true
  }
];
```

Regras: 3–6 projetos visíveis; `featured` define destaque no topo; cards sem `liveUrl` mostram apenas "Ver código"; imagens 16:9, ≤ 150 KB cada, `loading="lazy"`; todo texto tem versão PT e EN.

**Quando os dados chegarem, o estado vazio é removido do HTML e o grid passa a renderizar.**

## 13. SEO e metadados

- `<title>`: `Inácio Wellington Oliveira — Portfólio` / EN equivalente.
- `meta description` 150–160 caracteres, específica.
- Open Graph + Twitter Card (`summary_large_image`) com `og-image.png` 1200×630.
- `lang="pt-BR"` no HTML; `hreflang` apenas se houver página EN separada.
- `robots.txt` liberando tudo e `sitemap.xml` com a URL de produção.
- JSON-LD `Person` com `name`, `url`, `sameAs` (LinkedIn, GitHub), `jobTitle`.
- URLs canônicas apontando para `https://inacio-w-oliveira.github.io/pagina-pessoal/`.

## 14. Acessibilidade

Meta: **WCAG 2.2 AA**, Lighthouse Acessibilidade 100.

- Skip link visível no foco.
- Um `h1`, headings em ordem.
- Contraste verificado nos dois temas.
- `prefers-reduced-motion` desliga animações e rolagem suave.
- Imagens com `alt` real; foto com descrição objetiva.
- Links externos indicam abertura em nova aba no texto acessível.
- Formulário: não há. Nenhum campo.
- Zoom de 200% sem perda de conteúdo.

## 15. Performance

| Métrica | Meta |
| --- | --- |
| Peso total da home | < 500 KB |
| Requisições | < 25 |
| JS próprio | < 15 KB |
| LCP (mobile, 4G simulado) | < 2.0 s |
| CLS | < 0.05 |
| Lighthouse mobile | Perf ≥ 95 · A11y 100 · BP 100 · SEO ≥ 95 |

Sem fontes externas, sem CDN, sem frameworks. Foto do hero com `width`/`height`, `fetchpriority="high"` e sem lazy.

## 16. Deploy

**GitHub Actions** (`.github/workflows/deploy.yml`):

- Gatilhos: `push` em `main` e `workflow_dispatch`.
- Permissões: `contents: read`, `pages: write`, `id-token: write`.
- Concorrência: grupo `pages`, `cancel-in-progress: true`.
- Passos: `actions/checkout@v4` → `actions/configure-pages@v5` → `actions/upload-pages-artifact@v3` com `path: .` → `actions/deploy-pages@v4`.
- Job de deploy em ambiente `github-pages`, com `url` do step de deploy.
- Configuração do repositório: Pages → Source = **GitHub Actions**.
- `.nojekyll` presente para evitar processamento do Jekyll.
- Rollback: reverter o commit na `main` e deixar o workflow republicar.

## 17. Fases

| Fase | Escopo | Critério de saída |
| --- | --- | --- |
| 0 — Planejamento | `AGENTS.md` + `SPEC.md` | Documentos aprovados pelo dono |
| 1 — Fundação | Estrutura de arquivos, tokens, layout base, header/footer, tema, i18n | Página navegável em PT/EN nos dois temas, responsiva |
| 2 — Conteúdo | Hero, Sobre, Contato, estado vazio de Projetos, metadados | Copy final aprovada, links reais funcionando |
| 3 — Acabamento | Microanimações, impressão, 404, SEO, a11y, performance | Checklist do `AGENTS.md` §10 completo |
| 4 — Publicação | Workflow, Pages ativo, primeiro deploy | URL pública respondendo |
| 5 — Projetos | Dados reais em `projects.js`, grid, imagens | 3+ projetos publicados |

## 18. Critérios de aceitação

1. A URL pública abre com o site completo, sem 404 de CSS/JS/imagem.
2. O hero identifica nome e objetivo em menos de 5 segundos.
3. O seletor PT/EN troca todo o texto, atualiza `<html lang>` e persiste após recarregar.
4. O toggle de tema alterna claro/escuro sem flash e persiste.
5. LinkedIn abre exatamente `https://www.linkedin.com/in/inaciooliveira`.
6. WhatsApp abre `https://wa.me/5554997005822` com mensagem inicial opcional.
7. E-mail usa `mailto:inacio.w.oliveira@gmail.com`.
8. Currículo baixa `assets/cv.pdf`; foto carrega de `assets/img/foto.jpg`.
9. Com projetos ausentes, o estado vazio aparece — nunca um grid quebrado.
10. Navegação completa por teclado, com foco visível.
11. Impressão em A4 legível, sem header nem botões.
12. Nenhum scroll horizontal entre 320px e 1920px.
13. Lighthouse mobile dentro das metas da §15.
14. Push na `main` publica automaticamente em até 3 minutos.

## 19. Pendências (bloqueiam a fase 2)

| # | Pendência | Impacto |
| --- | --- | --- |
| 1 | Foto real (`assets/img/foto.jpg`, ≥ 800×800) | Hero e metadados sociais |
| 2 | Currículo em PDF (`assets/cv.pdf`) | Botão de download |
| 3 | Stack/tecnologias que está estudando | Bloco "O que estou estudando" e texto do Sobre |
| 4 | Revisão da copy PT/EN | Texto final |
| 5 | Lista de projetos (quando existirem) | Seção Projetos |
| 6 | Aprovação do favicon/marca | Identidade visual |
| 7 | Confirmar se deseja `en/index.html` no futuro | SEO internacional |

## 20. Manutenção

- **Adicionar projeto:** inserir um objeto em `assets/js/projects.js` (PT + EN), subir imagem 16:9 em `assets/img/projects/` e commitar. O grid aparece automaticamente.
- **Trocar foto ou currículo:** substituir o arquivo em `assets/` mantendo o nome.
- **Alterar texto:** editar o HTML (PT) e o dicionário em `i18n.js` (EN) na mesma alteração.
- **Novo idioma:** adicionar chave no dicionário + botão no seletor; validar layout com textos 30% mais longos.
