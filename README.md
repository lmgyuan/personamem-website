# PersonaMem research website

A complete static website for PersonaMem, PersonaMem-v2, and PersonaMem-v3, inspired by LiveBench’s release navigation and sortable results. All published content is in `dist/`. No build process, package installation, API key, or backend is required.

## Open the website

Double-click `dist/index.html`. Release switching, filters, sorting, examples, and downloads work locally. Clipboard copying may be restricted by your browser when opening a file directly; use the citation download instead.

For a local server, open a terminal in this project folder and run:

```sh
python3 -m http.server 4173 --bind 127.0.0.1 --directory dist
```

Then open <http://127.0.0.1:4173>. Stop the server with Ctrl+C. `npm run dev` is a shortcut if Node.js is installed; no `npm install` is needed.

## Publish

See [PUBLISHING.md](PUBLISHING.md) for GitHub Pages instructions. The included workflow deploys only `dist/`, not this documentation. The site has not been published or connected to a remote repository yet.

## What is included

- Responsive research landing page and three benchmark release tabs.
- 39 sourced result records: 15 PersonaMem rows; 16 v2 rows across two history lengths; 8 v3 model–mode configurations.
- Search, provider and evaluation-setting filters, sortable columns, tied ranking, and filtered CSV export with source URLs.
- Benchmark comparison, illustrative interactive examples, and paper/code/dataset links.
- BibTeX copy and download, author lists, accessible tab navigation, dialog keyboard support, and reduced-motion support.
- GitHub Pages deployment workflow and dependency-free validation.

## Edit the site

| File | Edit here |
| --- | --- |
| `dist/data.js` | Benchmark descriptions, statistics, scores, source links, authors, citations |
| `dist/index.html` | Page structure, introduction, comparison, footer |
| `dist/styles.css` | Colors, fonts, spacing, responsive layout |
| `dist/app.js` | Table behavior, CSV export, citations, illustrative examples |
| `dist/assets/persona-profile.svg` | Original profile illustration, embedded unchanged in a circular viewport |
| `dist/assets/persona-profile-original.png` | Unmodified user-supplied profile artwork |
| `dist/assets/favicon.svg` | Browser icon using that same profile |
| `.github/workflows/deploy.yml` | GitHub Pages deployment |

Run `node scripts/check.mjs` after changes. This validates result ranges, settings, key transcription invariants, local assets, section links, and JavaScript syntax. It does not replace checking the original paper or visually checking the page.

The website uses optional Google Fonts (DM Sans and Manrope), with system-font fallbacks. All content and interactions still work if the fonts are unavailable. Remove the first `@import` in `styles.css` to use system fonts only.

## Data and scope

Read [SOURCES.md](SOURCES.md) before adding results. Scores are historical snapshots of the paper versions linked on the page, not fresh evaluations or a live community leaderboard. They are not comparable across the three releases. No private local research data was incorporated.

The v3 paper contains different engagement totals in its prose and comparison table. The public page therefore uses the consistent user count, number of digital surfaces, approximate implicit-signal fraction, and major task-family count. The 200-user figure refers to privacy-preserving GIST-Bench user seeds from which the benchmark constructs digital worlds, not unmodified raw records from 200 identifiable people.

## Files to keep out of the published site

Only the `dist/` directory needs to be hosted. Keep experimental outputs, private data, API keys, and unpublished results outside it. Research code and dataset licenses belong to their respective linked projects; this website does not redistribute those datasets or grant a new license to them.
