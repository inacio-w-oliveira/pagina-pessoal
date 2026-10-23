# Portfólio — Inácio Wellington Oliveira

Site pessoal e portfólio de projetos, publicado no GitHub Pages.

**URL pública:** https://inacio-w-oliveira.github.io/pagina-pessoal/

Profissional em transição de carreira — das vendas de peças para o desenvolvimento de software. O site reúne trajetória, projetos e canais de contato, em português e inglês.

## Stack

HTML, CSS e JavaScript puro. Sem build, sem dependências, sem fontes externas. Deploy automático via GitHub Actions.

## Rodar localmente

O site é publicado em um subcaminho (`/pagina-pessoal/`), então sirva a pasta **pai** do repositório para simular o ambiente real:

```powershell
# Na pasta pai do repositório
cd "C:\Users\inaci\OneDrive\Documentos"
python -m http.server 8000
# Abra: http://localhost:8000/Projeto%20Padr%C3%A3o/
```

## Estrutura

```
.
├── index.html
├── 404.html
├── robots.txt
├── sitemap.xml
├── assets/
│   ├── css/styles.css
│   ├── js/
│   │   ├── main.js       # tema, menu, reveal, render de projetos
│   │   ├── i18n.js       # dicionário PT/EN e troca de idioma
│   │   └── projects.js   # dados dos projetos
│   ├── img/              # foto, favicon, og-image
│   └── cv.pdf
├── .github/workflows/deploy.yml
├── AGENTS.md             # instruções para agentes/contribuidores
├── SPEC.md               # especificação do produto
└── TODO.md               # plano de execução e testes
```

## Adicionar um projeto

1. Coloque a imagem 16:9 em `assets/img/projects/` (idealmente `.webp`, até 150 KB).
2. Adicione um objeto em `assets/js/projects.js`:

```js
export const projects = [
  {
    id: 'meu-projeto',
    title: { pt: 'Meu projeto', en: 'My project' },
    description: { pt: 'O que ele resolve.', en: 'What it solves.' },
    tags: ['HTML', 'CSS', 'JavaScript'],
    image: './assets/img/projects/meu-projeto.webp',
    repoUrl: 'https://github.com/inacio-w-oliveira/meu-projeto',
    liveUrl: 'https://exemplo.dev',
    year: 2026,
    featured: true
  }
];
```

3. Commit e push: o grid aparece e o estado vazio é escondido automaticamente.

## Trocar foto e currículo

Substitua os arquivos mantendo os nomes: `assets/img/foto.jpg` (800×800) e `assets/cv.pdf`.

## Deploy

Cada push na `main` dispara o workflow `.github/workflows/deploy.yml` e publica a raiz do repositório no GitHub Pages.

---

Documentação completa: [`SPEC.md`](SPEC.md) · Instruções de trabalho: [`AGENTS.md`](AGENTS.md) · Plano e testes: [`TODO.md`](TODO.md)
