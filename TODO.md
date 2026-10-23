# TODO.md — Plano de execução

> **Público-alvo:** executor sem capacidade de inferência (modelo de IA ou pessoa seguindo passos).
> **Regra de ouro:** execute as tarefas **na ordem numérica**. Não pule, não combine, não "melhore" nada que não esteja escrito aqui. Se um teste falhar, pare e corrija antes de seguir.
> **Documentos de referência:** `SPEC.md` (o que construir) e `AGENTS.md` (como construir). Este arquivo é o "como fazer, passo a passo".
> **Status:** nenhuma tarefa executada. Marque `[x]` ao concluir e registre no §12.

---

## 0. Regras para o executor

1. **Não invente conteúdo.** Todo texto vem da §7 do `SPEC.md`. Se faltar informação, use `TODO` em comentário HTML e pare no checkpoint indicado.
2. **Não adicione dependências.** Sem npm, sem framework, sem CDN, sem fonte externa. Apenas HTML, CSS, JS e arquivos locais.
3. **Caminhos sempre relativos** (`./assets/...`). O site roda em subpasta (`/pagina-pessoal/`).
4. **Um commit por tarefa**, com a mensagem indicada.
5. **Todo teste tem resultado esperado explícito.** "Parece certo" não é teste.
6. **Pare e pergunte** somente nos checkpoints marcados `🛑 CHECKPOINT`.
7. Ambiente: Windows + PowerShell, na pasta `C:\Users\inaci\OneDrive\Documentos\Projeto Padrão`.
8. Ferramentas disponíveis: `git 2.55`, `gh` autenticado como `inacio-w-oliveira`, `node 24`, `npx 11`, `python 3.14`.

---

## FASE 0 — Preparação do ambiente

### [ ] T-001 — Verificar ferramentas

Execute:

```powershell
git --version
gh auth status
python --version
```

**Esperado:** git ≥ 2.40; `gh` mostra `Logged in to github.com account inacio-w-oliveira`; python ≥ 3.10.
**Se falhar:** pare a execução e reporte.

---

### [ ] T-002 — Inicializar repositório local

```powershell
git init -b main
git remote add origin https://github.com/inacio-w-oliveira/pagina-pessoal.git
git remote -v
```

**Esperado:** duas linhas `origin ... (fetch)` e `(push)`.
**Se `origin` já existir:** use `git remote set-url origin https://github.com/inacio-w-oliveira/pagina-pessoal.git`.

---

### [ ] T-003 — Criar `.gitignore`

Crie o arquivo `.gitignore` com exatamente:

```
# Sistema e editor
.DS_Store
Thumbs.db
desktop.ini
.vscode/
.idea/

# Dependências e build (não usados, mas evitam lixo)
node_modules/
dist/

# Temporários
*.log
*.tmp
```

**Teste:** `Get-Content .gitignore` mostra as linhas acima.

---

### [ ] T-004 — Criar `.nojekyll`

```powershell
New-Item -ItemType File -Name .nojekyll -Force
```

**Teste:** `Test-Path .nojekyll` retorna `True`.

---

### [ ] T-005 — Criar estrutura de pastas

```powershell
New-Item -ItemType Directory -Force -Path assets/css, assets/js, assets/img, assets/img/projects, .github/workflows
```

**Teste:** `Get-ChildItem assets -Recurse -Directory | Select-Object FullName` lista `css`, `js`, `img`, `img/projects`.

Commit: `chore: inicializa estrutura do projeto`

---

## FASE 1 — Ativos placeholder

> Necessários para que nenhum link quebre antes do envio do material real.
> 🛑 **CHECKPOINT 1** após T-011: peça ao dono a foto, o currículo e a lista de tecnologias. Se ele disser "siga com placeholders", continue.

### [ ] T-010 — Gerar `assets/img/foto.jpg` placeholder

Salve o script abaixo como `tools/make-placeholder.ps1` e execute. Ele gera uma imagem 800×800 com as iniciais "IO" sobre fundo índigo→violeta.

```powershell
New-Item -ItemType Directory -Force -Path tools | Out-Null
@'
Add-Type -AssemblyName System.Drawing
$size = 800
$bmp = New-Object System.Drawing.Bitmap($size, $size)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = "AntiAlias"
$rect = New-Object System.Drawing.Rectangle(0, 0, $size, $size)
$brush = New-Object System.Drawing.Drawing2D.LinearGradientBrush($rect,
  [System.Drawing.Color]::FromArgb(79,70,229),
  [System.Drawing.Color]::FromArgb(236,72,153), 45)
$g.FillRectangle($brush, $rect)
$font = New-Object System.Drawing.Font("Segoe UI", 220, [System.Drawing.FontStyle]::Bold)
$fmt = New-Object System.Drawing.StringFormat
$fmt.Alignment = "Center"; $fmt.LineAlignment = "Center"
$white = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
$g.DrawString("IO", $font, $white, (New-Object System.Drawing.RectangleF(0,0,$size,$size)), $fmt)
$bmp.Save("$PSScriptRoot\..\assets\img\foto.jpg", [System.Drawing.Imaging.ImageFormat]::Jpeg)
$g.Dispose(); $bmp.Dispose()
'@ | Set-Content -Encoding UTF8 tools/make-placeholder.ps1
powershell -ExecutionPolicy Bypass -File tools/make-placeholder.ps1
```

**Teste:** `Get-Item assets/img/foto.jpg | Select-Object Length` → `Length` maior que `10000`.

---

### [ ] T-011 — Gerar `assets/cv.pdf` placeholder

Salve como `tools/make-cv.py` e execute `python tools/make-cv.py`. O script calcula o xref corretamente.

```python
from pathlib import Path

lines = [
    "Inacio Wellington Oliveira",
    "Curriculo - versao placeholder",
    "Substituir este arquivo por assets/cv.pdf real.",
]
content = "BT /F1 16 Tf 72 760 Td (" + lines[0] + ") Tj ET\n"
content += "BT /F1 11 Tf 72 730 Td (" + lines[1] + ") Tj 0 -20 Td (" + lines[2] + ") Tj ET\n"

objs = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>",
    f"<< /Length {len(content)} >>\nstream\n{content}endstream",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
]

out = "%PDF-1.4\n"
offsets = []
for i, body in enumerate(objs, start=1):
    offsets.append(len(out))
    out += f"{i} 0 obj\n{body}\nendobj\n"

xref = len(out)
out += f"xref\n0 {len(objs)+1}\n0000000000 65535 f \n"
for off in offsets:
    out += f"{off:010d} 00000 n \n"
out += f"trailer\n<< /Size {len(objs)+1} /Root 1 0 R >>\nstartxref\n{xref}\n%%EOF\n"

Path("assets/cv.pdf").write_bytes(out.encode("latin-1"))
print("ok")
```

**Teste:** `(Get-Item assets/cv.pdf).Length` > 600 e abrir o PDF mostra o texto. Se não abrir, refaça.

---

### [ ] T-012 — Criar `assets/img/favicon.svg`

Conteúdo exato:

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="IO">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#4F46E5"/>
      <stop offset=".5" stop-color="#7C3AED"/>
      <stop offset="1" stop-color="#EC4899"/>
    </linearGradient>
  </defs>
  <rect width="64" height="64" rx="14" fill="url(#g)"/>
  <text x="32" y="43" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif"
        font-size="28" font-weight="700" fill="#fff">IO</text>
</svg>
```

**Teste:** abrir no navegador mostra "IO" sobre gradiente, sem erro de XML.

---

### [ ] T-013 — Gerar `assets/img/og-image.png` placeholder (1200×630)

Reutilize o script de T-010 trocando `$size`, o texto e o caminho:

```powershell
Add-Type -AssemblyName System.Drawing
$w = 1200; $h = 630
$bmp = New-Object System.Drawing.Bitmap($w, $h)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = "AntiAlias"
$rect = New-Object System.Drawing.Rectangle(0,0,$w,$h)
$brush = New-Object System.Drawing.Drawing2D.LinearGradientBrush($rect,
  [System.Drawing.Color]::FromArgb(79,70,229),
  [System.Drawing.Color]::FromArgb(236,72,153), 35)
$g.FillRectangle($brush, $rect)
$fmt = New-Object System.Drawing.StringFormat
$fmt.Alignment = "Center"; $fmt.LineAlignment = "Center"
$white = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
$f1 = New-Object System.Drawing.Font("Segoe UI", 56, [System.Drawing.FontStyle]::Bold)
$f2 = New-Object System.Drawing.Font("Segoe UI", 26, [System.Drawing.FontStyle]::Regular)
$g.DrawString("Inacio Wellington Oliveira", $f1, $white, (New-Object System.Drawing.RectangleF(0,250,$w,90)), $fmt)
$g.DrawString("Em transicao para desenvolvimento de software", $f2, $white, (New-Object System.Drawing.RectangleF(0,350,$w,60)), $fmt)
$bmp.Save("assets/img/og-image.png", [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose(); $bmp.Dispose()
```

**Teste:** `(Get-Item assets/img/og-image.png).Length` > `20000` e dimensões 1200×630.

Commit: `chore: adiciona ativos placeholder`

🛑 **CHECKPOINT 1** — informe ao dono que foto, currículo, og-image e stack são placeholders (SPEC §19).

---

## FASE 2 — CSS (design system)

> Arquivo único: `assets/css/styles.css`. Construa **em blocos, na ordem abaixo**, salvando ao fim de cada tarefa. Não reordene.
> Todos os valores vêm do `SPEC.md` §8. Onde houver dúvida, copie literalmente deste TODO.

### [ ] T-020 — Bloco 1: tokens e reset

Estrutura do arquivo:

```css
/* 1. Tokens */
:root { color-scheme: light; /* tokens claros */ }
[data-theme="dark"] { color-scheme: dark; /* tokens escuros */ }

/* 2. Reset */
*, *::before, *::after { box-sizing: border-box; }
* { margin: 0; }
html { -webkit-text-size-adjust: 100%; scroll-behavior: smooth; }
body { min-height: 100vh; line-height: 1.65; -webkit-font-smoothing: antialiased; }
img, svg { display: block; max-width: 100%; }
button, input, select, textarea { font: inherit; color: inherit; }
a { color: inherit; }
:focus-visible { outline: 3px solid var(--focus); outline-offset: 3px; border-radius: 4px; }
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after { animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; }
}
```

Tokens obrigatórios (nomes exatos, valores do SPEC §8.2):

```
--bg, --surface, --surface-2, --text, --muted, --border,
--brand-1, --brand-2, --brand-3, --accent, --gradient, --focus,
--radius-sm, --radius-md, --radius-lg, --radius-full,
--shadow-sm, --shadow-md,
--space-1: 4px, --space-2: 8px, --space-3: 12px, --space-4: 16px,
--space-5: 24px, --space-6: 32px, --space-7: 48px, --space-8: 64px,
--space-9: 96px,
--container: 1120px, --header-h: 72px
```

**Teste:** abrir `assets/css/styles.css` e conferir que `:root` e `[data-theme="dark"]` existem e que há ≥ 25 declarações de cor/token.

---

### [ ] T-021 — Bloco 2: base tipográfica e utilitários

- `body { background: var(--bg); color: var(--text); font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; }`
- Escala: `.eyebrow`, `h1`, `h2`, `h3`, `p`, `.lead` conforme SPEC §8.3 (`clamp` no h1/h2).
- `.container { width: 100%; max-width: var(--container); margin-inline: auto; padding-inline: 20px; }`
- `.section { padding-block: 64px; }` e `@media (min-width: 1024px) { .section { padding-block: 96px; } }`
- `.skip-link` visível apenas no foco.
- `.visually-hidden`.
- `#top, #sobre, #projetos, #contato { scroll-margin-top: calc(var(--header-h) + 16px); }`

**Teste:** nenhuma cor hexadecimal fora do bloco de tokens (`Select-String -Path assets/css/styles.css -Pattern '#[0-9A-Fa-f]{3,6}'` deve retornar **somente** linhas dentro de `:root`/`[data-theme]`).

---

### [ ] T-022 — Bloco 3: header, nav e seletor

- `.site-header` fixo, altura `var(--header-h)`, `backdrop-filter: blur(12px)`, fundo `color-mix(in srgb, var(--surface) 82%, transparent)`, borda inferior.
- `.site-header.is-scrolled` reduz altura para 60px (transição 200ms).
- Nav com links `Sobre`, `Projetos`, `Contato`; `.nav__link[aria-current="page"]` com sublinhado em gradiente.
- `.lang-switch` com dois botões; `.lang-switch button[aria-pressed="true"]` com sublinhado gradiente.
- `.theme-toggle` 44×44.
- `.menu-toggle` 44×44, visível só abaixo de 768px.

**Teste:** em 360px, a nav horizontal está oculta e o botão de menu visível; em 1024px, o inverso.

---

### [ ] T-023 — Bloco 4: hero

- Grid de 1 coluna no mobile (foto acima, 200px, `border-radius: var(--radius-lg)`), 2 colunas ≥ 768px (55/45), foto 320px no desktop.
- Foto com moldura: `padding: 6px; background: var(--gradient); border-radius: calc(var(--radius-lg) + 6px);`
- H1 com `clamp(2.25rem, 6vw, 3.5rem)`, `letter-spacing: -0.02em`.
- Botões: `.btn`, `.btn--primary` (gradiente, texto branco), `.btn--secondary` (contorno). Altura mínima 48px, raio full.
- Hover do primário: `transform: translateY(-1px)` + `--shadow-md`; transição 180ms.

**Teste:** em 360px não há overflow horizontal (`document.documentElement.scrollWidth === 360` no console).

---

### [ ] T-024 — Bloco 5: sobre, projetos, contato, footer

- `.about__grid`: texto + `.learning` (card com lista de pills). 1 coluna → 2 colunas ≥ 1024px.
- `.projects__grid`: 1 / 2 (≥768) / 3 colunas (≥1024), `gap: var(--space-6)`.
- `.card--project`: conforme SPEC §8.5 (hover eleva 2px + sombra md).
- `.empty-state`: card centralizado, borda tracejada `--border`, ícone SVG, texto e CTA.
- `.contact__list`: 4 linhas clicáveis, cada uma com ícone, rótulo, valor e seta; hover em `--accent`.
- `.site-footer`: borda superior, texto `--muted`, 14px, layout em coluna → linha ≥768px.

**Teste:** abrir a página (T-030) e conferir visualmente os 4 blocos; console sem erros.

---

### [ ] T-025 — Bloco 6: responsivo e print

- Media queries em `min-width: 480px, 768px, 1024px, 1280px`.
- `@media print`: esconder `.site-header`, `.menu-toggle`, `.lang-switch`, `.theme-toggle`, `.btn`; `body { background:#fff; color:#000 }`; `a[href^="http"]::after { content: " (" attr(href) ")"; font-size: 11px }`; `.card, .section { break-inside: avoid }`; `@page { size: A4; margin: 15mm }`.

**Teste:** `Ctrl+P` na página mostra prévia A4 legível, sem header nem botões.

Commit: `feat: implementa design system e estilos`

---

## FASE 3 — HTML

### [ ] T-030 — Criar `index.html`

Ordem **obrigatória** do documento:

1. `<!doctype html>`
2. `<html lang="pt-BR" data-theme="light">`
3. `<head>`:
   - `meta charset="utf-8"`, `meta name="viewport" content="width=device-width, initial-scale=1"`
   - `title` e `meta name="description"` (SPEC §13)
   - `link rel="canonical"` → `https://inacio-w-oliveira.github.io/pagina-pessoal/`
   - favicon: `<link rel="icon" href="./assets/img/favicon.svg" type="image/svg+xml">`
   - Open Graph + Twitter Card completos (`og:image` → `./assets/img/og-image.png` **absoluto** em produção: `https://inacio-w-oliveira.github.io/pagina-pessoal/assets/img/og-image.png`)
   - JSON-LD `Person` com `name`, `url`, `jobTitle`, `sameAs` (LinkedIn e GitHub)
   - `<link rel="stylesheet" href="./assets/css/styles.css">`
   - **Script anti-flash** (inline, antes do CSS):

     ```html
     <script>
       (function () {
         try {
           var t = localStorage.getItem('iwo.theme');
           if (!t) t = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
           document.documentElement.dataset.theme = t;
           document.documentElement.style.colorScheme = t;
         } catch (e) {}
       })();
     </script>
     ```
4. `<body>`:
   - `<a class="skip-link" href="#main">Ir para o conteúdo</a>`
   - `<header class="site-header">` com marca, `<nav aria-label="Principal">`, seletor `PT/EN` (`aria-pressed`), botão de tema e botão de menu.
   - `<main id="main">` com as 4 seções da SPEC §6, **nesta ordem**: `#top` (hero), `#sobre`, `#projetos`, `#contato`.
   - `<footer class="site-footer">`
   - `<script type="module" src="./assets/js/main.js"></script>`

### Estrutura mínima de cada seção

```html
<section id="top" class="hero" aria-labelledby="hero-title">
  <div class="container hero__inner">
    <div class="hero__content">
      <p class="eyebrow" data-i18n="hero.eyebrow">Portfólio</p>
      <h1 id="hero-title" data-i18n="hero.title">Inácio Wellington Oliveira</h1>
      <p class="hero__subtitle" data-i18n="hero.subtitle">Em transição de carreira para desenvolvimento de software</p>
      <p class="lead" data-i18n="hero.support">…</p>
      <div class="hero__actions">
        <a class="btn btn--primary" href="#projetos" data-i18n="hero.ctaPrimary">Ver projetos</a>
        <a class="btn btn--secondary" href="#contato" data-i18n="hero.ctaSecondary">Falar comigo</a>
      </div>
    </div>
    <div class="hero__media">
      <img src="./assets/img/foto.jpg" width="800" height="800" alt="Foto de Inácio Wellington Oliveira" data-i18n-attr="alt:hero.photoAlt" fetchpriority="high">
    </div>
  </div>
</section>

<section id="sobre" class="section" aria-labelledby="about-title">
  <div class="container">
    <p class="eyebrow" data-i18n="about.eyebrow">Sobre</p>
    <h2 id="about-title" data-i18n="about.title">Sobre mim</h2>
    <!-- parágrafos com data-i18n="about.p1|p2|p3" -->
    <!-- card .learning com h3 data-i18n="about.learningTitle" e lista de tecnologias (TODO) -->
    <!-- CTA <a class="btn btn--secondary" href="./assets/cv.pdf" download data-i18n="about.ctaCv">Baixar currículo</a> -->
  </div>
</section>

<section id="projetos" class="section" aria-labelledby="projects-title">
  <div class="container">
    <p class="eyebrow" data-i18n="projects.eyebrow">Portfólio</p>
    <h2 id="projects-title" data-i18n="projects.title">Projetos</h2>
    <!-- #projects-grid vazio -->
    <!-- .empty-state com data-i18n="projects.emptyTitle|emptyText" e CTA para o GitHub -->
  </div>
</section>

<section id="contato" class="section" aria-labelledby="contact-title">
  <div class="container">
    <h2 id="contact-title" data-i18n="contact.title">Vamos conversar</h2>
    <p class="lead" data-i18n="contact.text">…</p>
    <ul class="contact__list">
      <!-- 4 <li> com <a> para e-mail, LinkedIn, GitHub, WhatsApp -->
    </ul>
  </div>
</section>
```

### Links de contato (valores exatos — não alterar)

| Canal | `href` |
| --- | --- |
| E-mail | `mailto:inacio.w.oliveira@gmail.com` |
| LinkedIn | `https://www.linkedin.com/in/inaciooliveira` |
| GitHub | `https://github.com/inacio-w-oliveira` |
| WhatsApp | `https://wa.me/5554997005822` |
| Currículo | `./assets/cv.pdf` |

Links externos: `target="_blank" rel="noopener noreferrer"` + `<span class="visually-hidden"> (abre em nova aba)</span>`.

**Teste:**

```powershell
Select-String -Path index.html -Pattern 'href="#"'          # deve retornar vazio
Select-String -Path index.html -Pattern 'linkedin.com/in/inaciooliveira'  # 1 ocorrência
Select-String -Path index.html -Pattern 'wa.me/5554997005822'             # 1 ocorrência
Select-String -Path index.html -Pattern '<h1'                            # exatamente 1
```

Commit: `feat: cria estrutura semântica da página`

---

## FASE 4 — JavaScript

> Todos os módulos são ES modules. Nenhuma string visível ao usuário fora do `i18n.js`.

### [ ] T-040 — `assets/js/i18n.js`

1. Exporte `translations = { pt: {...}, en: {...} }`.
2. Chaves obrigatórias (todas presentes nos dois idiomas):

```
meta.title, meta.description,
nav.about, nav.projects, nav.contact, nav.menu, nav.close,
lang.pt, lang.en, lang.label,
theme.toLight, theme.toDark, theme.label,
hero.eyebrow, hero.title, hero.subtitle, hero.support, hero.ctaPrimary, hero.ctaSecondary, hero.photoAlt,
about.eyebrow, about.title, about.p1, about.p2, about.p3, about.learningTitle, about.ctaCv,
projects.eyebrow, projects.title, projects.emptyTitle, projects.emptyText, projects.ctaGithub,
projects.viewCode, projects.viewLive, projects.tagsLabel,
contact.eyebrow, contact.title, contact.text,
contact.email, contact.emailValue, contact.linkedin, contact.linkedinValue,
contact.github, contact.githubValue, contact.whatsapp, contact.whatsappValue,
contact.cv, contact.cvValue,
footer.rights, footer.built, a11y.newTab
```

3. Exporte:

```js
export function t(key, lang = getLang()) { ... }            // fallback pt + console.warn
export function getLang() { ... }                            // ?lang → localStorage → 'pt'
export function setLang(lang) { ... }                        // atualiza <html lang>, storage, aplica
export function applyTranslations(lang) { ... }              // [data-i18n], [data-i18n-attr], title, meta
export function initI18n() { ... }                           // liga os botões e aplica idioma inicial
```

4. `applyTranslations` deve percorrer `[data-i18n]` (usa `textContent`) e `[data-i18n-attr]` no formato `attr:key` (separe múltiplos por `,`).
5. Mapeamento de `<html lang>`: `pt` → `pt-BR`, `en` → `en`.
6. Atualize `aria-label` e `aria-pressed` dos botões de idioma.

**Teste (console do navegador, após T-042):**

```js
Object.keys((await import('./assets/js/i18n.js')).translations.pt).length
Object.keys((await import('./assets/js/i18n.js')).translations.en).length
```

Esperado: **os dois números iguais e ≥ 45**.
Se faltar chave, o inglês está incompleto — corrija antes de seguir.

---

### [ ] T-041 — `assets/js/main.js` (tema, header, menu, reveal, âncoras)

Implemente, nesta ordem, funções independentes chamadas por `init()`:

1. `initTheme()` — alterna `data-theme` em `<html>`, persiste `iwo.theme`, atualiza `aria-pressed`, `aria-label` e ícone (sol/lua via `classList`).
2. `initHeader()` — adiciona `.is-scrolled` quando `scrollY > 8`.
3. `initMenu()` — abre/fecha `.nav` no mobile, sincroniza `aria-expanded`, prende foco, fecha com `Esc` e ao clicar em link.
4. `initReveal()` — `IntersectionObserver` adiciona `.is-visible`; se `prefers-reduced-motion`, adiciona em todos imediatamente.
5. `initActiveNav()` — `IntersectionObserver` marca `aria-current="page"` no link da seção visível (pode falhar sem quebrar).
6. `initYear()` — escreve o ano atual no elemento `[data-year]`.

Regras: sem `innerHTML`; usar `addEventListener`; nada de `onclick` inline.

**Teste:** no console, `localStorage.getItem('iwo.theme')` alterna entre `light`/`dark` ao clicar; após recarregar, o tema escolhido permanece.

---

### [ ] T-042 — `assets/js/projects.js` + render

1. Exporte `projects = []` (vazio nesta fase) e o modelo comentado do SPEC §12.
2. Em `main.js`, implemente `renderProjects()`:
   - se `projects.length === 0`: mantém `.empty-state` visível e `#projects-grid` vazio (ou oculto);
   - se > 0: remove `.empty-state` do fluxo (`hidden`), renderiza cards com `document.createElement` e `textContent`, imagem com `loading="lazy"`, `width`/`height`, `alt` do título, links `repoUrl`/`liveUrl`.
3. Não use template string com dados externos.

**Teste:** com `projects = []`, a página mostra o estado vazio e nenhum card. Depois, adicione temporariamente 1 objeto de teste, recarregue, confirme 1 card, e **remova o objeto** antes do commit.

Commit: `feat: implementa tema, i18n e renderização de projetos`

---

## FASE 5 — Conteúdo e páginas auxiliares

### [ ] T-050 — Preencher copy PT no HTML e EN no dicionário

1. Copie o texto de `SPEC.md` §7 para o HTML (PT) e para `translations.en` (EN).
2. Substitua `TODO: stack principal` pela lista real de tecnologias **somente se o dono já tiver informado**; caso contrário, mantenha 4 pills com `<!-- TODO: tecnologias -->` e o texto neutro: `Conhecimentos em construção — atualizo esta lista conforme avanço.` / EN: `Skills in progress — I update this list as I go.`
3. Nenhum `TODO` visível na página renderizada.

**Teste:**

```powershell
Select-String -Path index.html -Pattern 'TODO:' | Where-Object { $_.Line -notmatch '<!--' }
```

Esperado: vazio (todos os TODOs são comentários).

---

### [ ] T-051 — Criar `404.html`

- Mesmo `<head>` básico, mesmo CSS e `main.js`, `lang="pt-BR"`.
- Conteúdo: `404`, `Página não encontrada`, texto `O endereço que você tentou abrir não existe ou mudou.`, botão `Voltar ao início` → `./`.
- Deve funcionar sem JS e em tema escuro.

**Teste:** abrir `404.html` localmente; layout íntegro, botão retorna ao index.

---

### [ ] T-052 — Criar `robots.txt` e `sitemap.xml`

`robots.txt`:

```
User-agent: *
Allow: /
Sitemap: https://inacio-w-oliveira.github.io/pagina-pessoal/sitemap.xml
```

`sitemap.xml`: uma única `<url>` com `loc` = `https://inacio-w-oliveira.github.io/pagina-pessoal/`, `lastmod` = data do dia (formato `YYYY-MM-DD`), `changefreq` = `monthly`, `priority` = `1.0`.

**Teste:** `[xml](Get-Content sitemap.xml)` não lança erro.

---

### [ ] T-053 — Criar `README.md`

Conteúdo mínimo: nome do projeto, URL pública, descrição em 2 linhas, stack, como rodar localmente, estrutura de pastas, como adicionar projeto, créditos.

Como rodar localmente — inclua **exatamente**:

```powershell
# Na pasta PAI do repositório (simula o subcaminho do GitHub Pages)
cd "C:\Users\inaci\OneDrive\Documentos"
python -m http.server 8000
# Abra: http://localhost:8000/Projeto%20Padr%C3%A3o/
```

Commit: `docs: adiciona conteúdo, 404, SEO e README`

---

## FASE 6 — Deploy

### [ ] T-060 — Criar `.github/workflows/deploy.yml`

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with:
          path: .
      - id: deployment
        uses: actions/deploy-pages@v4
```

**Teste:** `python -c "import yaml,sys; yaml.safe_load(open('.github/workflows/deploy.yml'))"` — se `yaml` não existir, valide visualmente a indentação (2 espaços, sem tabs).

---

### [ ] T-061 — Primeiro commit completo

```powershell
git add -A
git status
git commit -m "feat: publica versão inicial do portfólio"
```

**Esperado no `git status` antes do commit:** nenhum arquivo indesejado (sem `tools/*.log`, sem `node_modules`).
**Teste:** `git log --oneline` mostra 1+ commits.

---

### [ ] T-062 — Push e ativar GitHub Pages

```powershell
git push -u origin main
gh api --method POST /repos/inacio-w-oliveira/pagina-pessoal/pages -f build_type=workflow
```

**Se retornar 409** (Pages já configurado):

```powershell
gh api --method PUT /repos/inacio-w-oliveira/pagina-pessoal/pages -f build_type=workflow
```

**Teste:**

```powershell
gh api /repos/inacio-w-oliveira/pagina-pessoal/pages --jq '.build_type, .html_url'
```

Esperado: `workflow` e a URL do site.

---

### [ ] T-063 — Acompanhar o deploy

```powershell
gh run list --limit 3
gh run watch
```

**Esperado:** conclusão `success`. Se falhar, leia o log (`gh run view --log-failed`), corrija e repita T-061–T-063.

Commit (se houver correção): `fix: ajusta workflow de deploy`

---

## FASE 7 — Testes de aceitação

> Execute **todos** os testes desta fase. Registre o resultado no §12. Um item reprovado bloqueia a entrega.

### [ ] T-070 — Teste de estrutura e links (automatizado)

```powershell
# 1. Sem links mortos
(Select-String -Path index.html -Pattern 'href="#"').Count            # esperado: 0

# 2. Arquivos referenciados existem
$refs = Select-String -Path index.html -Pattern '(?:src|href)="\./([^"#?]+)"' -AllMatches |
  ForEach-Object { $_.Matches } | ForEach-Object { $_.Groups[1].Value } | Sort-Object -Unique
$refs | ForEach-Object { "{0} -> {1}" -f $_, (Test-Path $_) }           # esperado: todas True

# 3. Um h1
(Select-String -Path index.html -Pattern '<h1').Count                  # esperado: 1

# 4. Links oficiais
Select-String -Path index.html -Pattern 'linkedin.com/in/inaciooliveira|wa.me/5554997005822|mailto:inacio.w.oliveira@gmail.com|github.com/inacio-w-oliveira'
# esperado: 4 linhas

# 5. Sem caminhos absolutos de asset
(Select-String -Path index.html -Pattern '(?:src|href)="/assets').Count # esperado: 0
```

**Se qualquer item falhar:** corrija o HTML e repita.

---

### [ ] T-071 — Teste de i18n

1. Abrir a página local. Idioma inicial: **português**; `<html lang="pt-BR">`.
2. Clicar em `EN` → todo texto visível muda; `<html lang="en"`; botão `EN` com `aria-pressed="true"`.
3. Recarregar → permanece em inglês.
4. Abrir com `?lang=pt` → volta para português.
5. Em EN, conferir: hero, 3 parágrafos do Sobre, estado vazio de Projetos, 4 canais de contato, rodapé. **Nenhum texto em português deve restar e nenhum texto deve aparecer vazio/undefined.**
6. Limpar `localStorage` e recarregar → PT.

**Falha comum:** chave ausente → aparece `undefined` ou texto antigo. Corrija em `i18n.js` e repita.

---

### [ ] T-072 — Teste de tema

1. Sistema em claro → site abre claro; em escuro → abre escuro.
2. Alternar manualmente → troca sem flash e persiste após recarregar.
3. Em ambos os temas, verificar contraste de `--muted` sobre `--surface-2` (usar DevTools ou https://webaim.org/resources/contrastchecker/). **Mínimo 4.5:1.**
4. `color-scheme` acompanha o tema (controles nativos escuros no tema escuro).

---

### [ ] T-073 — Teste responsivo e overflow

Em DevTools, para 320px, 360px, 768px, 1024px, 1440px e 1920px:

```js
document.documentElement.scrollWidth <= window.innerWidth
```

Esperado: `true` em **todas** as larguras.
Verificar visualmente: hero não quebra, cards empilham, menu mobile funciona, nenhum texto cortado.

---

### [ ] T-074 — Teste de teclado e acessibilidade

1. `Tab` desde o topo: primeiro foco é o skip link; `Enter` leva a `#main`.
2. Percorrer todos os links e botões apenas com teclado; foco sempre visível.
3. Menu mobile abre com `Enter`, fecha com `Esc`.
4. Seletor de idioma e tema operáveis por teclado, com estado anunciado.
5. Leitor de tela (NVDA ou Narrator): headings em ordem, imagem com alt, links externos anunciam nova aba.
6. Zoom 200% sem perda de conteúdo.

---

### [ ] T-075 — Teste de impressão

`Ctrl+P` → A4: sem header, menu, botões ou seletor; links externos mostram a URL; cards não se partem entre páginas; texto preto em fundo branco.

---

### [ ] T-076 — Teste de performance (Lighthouse)

```powershell
npx --yes lighthouse https://inacio-w-oliveira.github.io/pagina-pessoal/ --only-categories=performance,accessibility,best-practices,seo --preset=desktop --output=json --output-path=./lighthouse.json --chrome-flags="--headless=new"
```

Depois:

```powershell
$r = Get-Content lighthouse.json -Raw | ConvertFrom-Json
$r.categories.PSObject.Properties | ForEach-Object { "{0}: {1}" -f $_.Name, [math]::Round($_.Value.score*100) }
```

**Esperado:** performance ≥ 95, accessibility 100, best-practices 100, seo ≥ 95.
Se falhar: corrigir o item apontado (imagem sem dimensão, contraste, `meta description`, `alt`) e repetir. **Não** considere concluído com acessibilidade < 100.

---

### [ ] T-077 — Teste em produção

```powershell
$u = "https://inacio-w-oliveira.github.io/pagina-pessoal/"
(Invoke-WebRequest $u -UseBasicParsing).StatusCode                       # 200
(Invoke-WebRequest "${u}assets/css/styles.css" -UseBasicParsing).StatusCode  # 200
(Invoke-WebRequest "${u}assets/js/main.js" -UseBasicParsing).StatusCode       # 200
(Invoke-WebRequest "${u}assets/img/foto.jpg" -UseBasicParsing).StatusCode     # 200
(Invoke-WebRequest "${u}assets/cv.pdf" -UseBasicParsing).StatusCode           # 200
(Invoke-WebRequest "${u}assets/img/og-image.png" -UseBasicParsing).StatusCode # 200
```

Também:

- Abrir no celular real (rede móvel) e conferir layout e menu.
- Compartilhar a URL em um preview (WhatsApp/LinkedIn) e confirmar que a imagem OG aparece.
- Abrir uma URL inexistente (`/pagina-pessoal/nao-existe`) → página 404 personalizada.

---

### [ ] T-078 — Revisão final contra o SPEC

Percorrer `SPEC.md` §18 (Critérios de aceitação) item por item e marcar ✅/❌ em um comentário no PR ou no §12 deste arquivo. **Nenhum ❌ pode permanecer.**

Commit: `test: valida critérios de aceitação`

---

## FASE 8 — Entrega

### [ ] T-080 — Atualizar documentação

- Marcar no `SPEC.md` o status: `Implementado — v1.0` e atualizar a data.
- Atualizar `README.md` com a URL final e o print/estado atual.
- Registrar decisões tomadas durante a execução no §12 deste TODO.

### [ ] T-081 — Relatório final ao dono

Entregar:

1. URL pública.
2. Lista do que foi implementado.
3. Resultado dos testes T-070 a T-077 (números do Lighthouse).
4. Pendências humanas restantes (§11).
5. Como adicionar um projeto no futuro.

Commit: `docs: atualiza status e relatório de entrega`

---

## 9. Testes rápidos de fumaça (após qualquer alteração futura)

Execute sempre que mudar algo:

```powershell
python -m http.server 8000   # na pasta pai
# Em outra janela:
(Invoke-WebRequest "http://localhost:8000/Projeto%20Padr%C3%A3o/" -UseBasicParsing).StatusCode  # 200
```

- [ ] Página abre sem erro no console.
- [ ] PT/EN completo nos dois sentidos.
- [ ] Tema alterna e persiste.
- [ ] 4 canais de contato funcionam.
- [ ] Nenhum `TODO` visível.
- [ ] Layout em 360px sem scroll horizontal.

---

## 10. Ordem resumida (checklist mestre)

```
T-001..005  ambiente e estrutura
T-010..013  ativos placeholder        🛑 CHECKPOINT 1
T-020..025  CSS
T-030       HTML
T-040..042  JavaScript
T-050..053  conteúdo e páginas
T-060..063  deploy
T-070..078  testes de aceitação
T-080..081  entrega
```

---

## 11. Pendências humanas (não executáveis por um modelo)

| # | Item | Quem | Bloqueia |
| --- | --- | --- | --- |
| H-01 | Foto real 800×800 em `assets/img/foto.jpg` | Dono | Qualidade do hero/OG |
| H-02 | Currículo real em `assets/cv.pdf` | Dono | Botão de download |
| H-03 | Lista de tecnologias que está estudando | Dono | Bloco "O que estou estudando" |
| H-04 | Aprovação final da copy PT/EN | Dono | Fase 2 |
| H-05 | Lista real de projetos | Dono | Seção Projetos |
| H-06 | og-image definitiva 1200×630 | Dono/Design | Preview social |
| H-07 | Teste em dispositivo móvel real | Dono | T-077 |

---

## 12. Registro de execução

Preencha uma linha por tarefa concluída.

| Tarefa | Data | Executor | Resultado | Observações |
| --- | --- | --- | --- | --- |
| T-001 | | | | |
| T-002 | | | | |
| T-003 | | | | |
| T-004 | | | | |
| T-005 | | | | |
| T-010 | | | | |
| T-011 | | | | |
| T-012 | | | | |
| T-013 | | | | |
| T-020 | | | | |
| T-021 | | | | |
| T-022 | | | | |
| T-023 | | | | |
| T-024 | | | | |
| T-025 | | | | |
| T-030 | | | | |
| T-040 | | | | |
| T-041 | | | | |
| T-042 | | | | |
| T-050 | | | | |
| T-051 | | | | |
| T-052 | | | | |
| T-053 | | | | |
| T-060 | | | | |
| T-061 | | | | |
| T-062 | | | | |
| T-063 | | | | |
| T-070 | | | | |
| T-071 | | | | |
| T-072 | | | | |
| T-073 | | | | |
| T-074 | | | | |
| T-075 | | | | |
| T-076 | | | | |
| T-077 | | | | |
| T-078 | | | | |
| T-080 | | | | |
| T-081 | | | | |

**Critério de conclusão do projeto:** todas as tarefas T-* marcadas, todos os testes T-07x com resultado esperado, nenhuma pendência H-01..H-05 em aberto e status `Implementado — v1.0` no `SPEC.md`.
