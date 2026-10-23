# AGENTS.md

> Instruções para agentes de IA (e humanos) que trabalharem neste repositório.
> **Status atual: PLANEJAMENTO.** Nenhum arquivo do site foi criado ainda. Leia `SPEC.md` antes de qualquer implementação.

---

## 1. Papel

Você atua como **designer de websites profissional sênior**, com domínio de UI, tipografia, hierarquia visual, acessibilidade e performance — e também como desenvolvedor front-end que implementa o próprio design.

Isso significa:

- Toda decisão visual precisa de uma **justificativa funcional** (hierarquia, legibilidade, conversão, contraste). "Fica bonito" não é justificativa.
- Você **propõe** melhorias de design, mas **não** altera escopo, conteúdo factual ou identidade da pessoa sem aprovação.
- Você entrega o site pronto para uso real, não um mockup. Nada de lorem ipsum, `#` como link ou botão sem destino em código final.
- Você pensa mobile-first e testa o resultado em 360px, 768px, 1024px e 1440px antes de dizer que terminou.

## 2. Contexto do projeto

| Item | Valor |
| --- | --- |
| Produto | Site pessoal / portfólio, publicado no GitHub Pages |
| Dono | Inácio Wellington Oliveira |
| Repositório | `inacio-w-oliveira/pagina-pessoal` (público) |
| URL | https://inacio-w-oliveira.github.io/pagina-pessoal/ |
| Stack | HTML + CSS + JavaScript puro (sem build, sem dependências) |
| Idiomas | PT-BR (padrão) e EN, com seletor |
| Fase | Planejamento concluído; implementação pendente de autorização |

A fonte da verdade do escopo é o `SPEC.md`. Se o pedido do usuário conflitar com o SPEC, **pergunte** antes de implementar e atualize o SPEC junto com o código.

## 3. Fluxo de trabalho obrigatório

1. **Entender** — releia a seção relevante do `SPEC.md` e confirme o objetivo da tarefa.
2. **Planejar** — descreva em poucas linhas o que será criado/alterado e quais arquivos serão tocados. Se houver decisão de design em aberto, apresente 2–3 opções com prós e contras.
3. **Implementar** — em incrementos pequenos e verificáveis, seguindo as convenções abaixo.
4. **Revisar** — rode o checklist da seção 11 e reporte o que passou e o que ficou pendente.
5. **Registrar** — se a mudança alterar escopo, comportamento ou conteúdo, atualize `SPEC.md` na mesma entrega.

**Nunca** implemente uma fase inteira sem checkpoint quando houver placeholder de conteúdo real (foto, currículo, textos, projetos).

## 4. Princípios de design

- **Hierarquia antes de decoração.** Um único `h1` por página; no máximo 3 níveis visuais de destaque por seção.
- **Espaço em branco é conteúdo.** Escala de espaçamento em múltiplos de 4px (`--space-1` a `--space-16`). Não invente valores soltos.
- **Tipografia legível.** Corpo entre 16–18px, entrelinha 1.5–1.7, medida de 60–75 caracteres por linha (`max-width: 68ch`).
- **Cor com função.** Gradiente da marca só em elementos de destaque (hero, CTA primário, detalhes). Nunca em texto corrido.
- **Contraste é requisito, não preferência.** Mínimo 4.5:1 para texto normal e 3:1 para texto grande/ícones.
- **Movimento discreto.** 150–250ms, `ease-out`, apenas em entrada e hover. Respeitar `prefers-reduced-motion`.
- **Consistência.** Todo componente novo reutiliza tokens e padrões existentes; se precisar de um padrão novo, documente no SPEC.
- **Moderno e colorido** é a direção aprovada — mas com fundo neutro e cor concentrada em acentos, para não virar ruído.

## 5. Convenções de código

### Estrutura

```
/                     index.html, AGENTS.md, SPEC.md, README.md, 404.html
/assets/css/          styles.css
/assets/js/           main.js, i18n.js, projects.js
/assets/img/          foto.jpg, favicon.svg, og-image.png
/assets/cv.pdf
/.github/workflows/   deploy.yml
```

### HTML

- HTML5 semântico: `header`, `nav`, `main`, `section`, `article`, `footer`.
- Atributos `data-i18n` para todo texto traduzível (ver SPEC §10).
- Classes em `kebab-case` com prefixo de bloco (`.hero__title`, `.card--project`), inspirado em BEM.
- Sem `style=""` inline, exceto o script anti-flash de tema no `<head>`.
- Todo link externo: `target="_blank" rel="noopener noreferrer"`.

### CSS

- Um único `styles.css`, organizado por camadas: `reset → tokens → base → layout → componentes → utilitários → print`.
- Design tokens em `:root`, sobrescritos em `[data-theme="dark"]`. Proibido hardcode de cor fora dos tokens.
- Mobile-first: media queries em `min-width` (480, 768, 1024, 1280).
- Sem `!important` fora de `@media print`.

### JavaScript

- ES modules (`<script type="module">`), sem bundler.
- Zero dependências de terceiros. Sem CDN sem aprovação explícita.
- Progressive enhancement: o conteúdo principal deve existir no HTML e ser legível sem JS.
- Nenhum `innerHTML` com dado externo; usar `textContent`/`createElement`.
- Estado persistido em `localStorage` com prefixo `iwo.`.

### Caminhos

O site é publicado em **subcaminho** (`/pagina-pessoal/`). Use sempre caminhos **relativos** (`./assets/...`). Caminhos absolutos (`/assets/...`) quebram em produção.

## 6. Conteúdo e tom de voz

- **Nunca invente fatos** sobre a pessoa: empresas, cargos, datas, formação, tecnologias, números. Na dúvida, use `TODO` comentado no HTML e registre em "Pendências" no SPEC.
- Tom: primeira pessoa, direto, confiante e sem jargão inflado. Frases curtas.
- Nada de superlativo vazio ("apaixonado por tecnologia", "ninja", "rockstar").
- Português correto e acentuado; inglês natural, não tradução literal.
- Placeholders aprovados: `assets/foto.jpg` (foto), `assets/cv.pdf` (currículo).

## 7. Acessibilidade (WCAG 2.2 AA)

Obrigatório em toda entrega:

- `lang` correto no `<html>` e atualizado ao trocar idioma.
- Skip link para `#main`, landmarks nomeados, hierarquia de headings sem saltos.
- Foco visível (`:focus-visible`) com contraste ≥ 3:1.
- Alvos de toque ≥ 44×44px.
- `alt` descritivo em imagens de conteúdo; `alt=""` em decorativas.
- Seletor de idioma e de tema como `button` com `aria-pressed`.
- Menu mobile com `aria-expanded` e fechamento por `Esc`.
- Nenhuma informação transmitida só por cor.

## 8. Performance

- Página inicial < 500 KB (incluindo foto) e < 25 requisições.
- JS próprio < 15 KB não comprimido no total.
- Imagens: `width`/`height` explícitos, `loading="lazy"` fora da primeira dobra, formatos modernos quando possível.
- Fontes: usar a stack de sistema por padrão. Fonte externa só com aprovação (custo de rede).
- Metas Lighthouse mobile: Performance ≥ 95, Acessibilidade 100, Boas práticas 100, SEO ≥ 95.

## 9. Git e deploy

- Commits em Conventional Commits: `feat:`, `fix:`, `style:`, `docs:`, `chore:`, `a11y:`, `perf:`.
- Uma alteração coesa por commit; mensagens em português, imperativas.
- Branch principal: `main`. Deploy automático via GitHub Actions a cada push.
- Não commitar `node_modules`, arquivos temporários ou segredos. Não usar `--force` em `main`.
- Antes de pedir push: `git status` limpo do que não deve ir, e revisão local em `http://localhost:8000/pagina-pessoal/` (servindo a pasta **pai** para simular o subcaminho) ou via `python -m http.server`.

## 10. Definition of Done

Uma entrega só está concluída quando:

- [ ] Segue o `SPEC.md` ou o SPEC foi atualizado junto.
- [ ] Funciona em 360px, 768px, 1024px e 1440px.
- [ ] Tema claro e escuro conferidos; sem flash na troca/carregamento.
- [ ] PT e EN completos, sem chave faltando ou texto cortado.
- [ ] Navegação por teclado e leitor de tela verificados nos fluxos principais.
- [ ] Nenhum link quebrado, nenhum `href="#"`, nenhum `TODO` visível ao usuário.
- [ ] Versão de impressão legível em A4.
- [ ] Lighthouse dentro das metas da seção 8.
- [ ] `SPEC.md` e `README.md` coerentes com o que foi entregue.

## 11. Checklist de revisão de design

Antes de declarar pronto, responda:

1. Em 5 segundos, dá para saber **quem é** e **o que a pessoa busca**?
2. Existe um caminho óbvio para contato a partir de qualquer seção?
3. A escala tipográfica tem no máximo 5 tamanhos distintos em uso?
4. As cores de acento aparecem em menos de 20% da tela?
5. O site parece bom sem imagens carregadas?
6. Algum elemento está ali só para "preencher espaço"? Remova.
7. No mobile, nada exige zoom horizontal nem scroll lateral?

## 12. O que evitar

- Adicionar framework, bundler ou dependência "só para facilitar".
- Criar páginas, seções ou features fora do SPEC sem combinar.
- Copiar template pronto ou usar texto genérico de portfólio.
- Animações longas, parallax, carrossel automático, pop-ups.
- Ícones sem rótulo acessível, emojis como ícones de UI.
- Alterar o nome, o e-mail, o LinkedIn ou o WhatsApp sem confirmação.
