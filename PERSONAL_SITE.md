# Personal website content

The six bilingual pages use `_layouts/profile.html`. `assets/css/profile.css` owns fonts, colors, navigation, page headings, content widths, Research references, and shared responsive/print styles. `assets/css/research-network.css` owns the connected research animation. `assets/css/home.css` owns the homepage identity grid, portrait, contact links, two-paragraph About section, and Updates layout.

| Page | English | Chinese |
| --- | --- | --- |
| Home | `/` | `/zh/` |
| Research | `/publications/` | `/zh/publications/` |
| Talks | `/talks/` | `/zh/talks/` |

## Content sources

- `_data/profile.yml` uses JSON syntax, which is valid YAML. `about.en` and `about.zh` each contain exactly two prose paragraphs. The first introduces the verified doctoral affiliation and explains the three connected research questions in more detail; the second covers methods, related interests in digital therapeutics and online communities, and existing publications. Do not include enrollment/graduation dates, earlier schools, visiting affiliations, advisors, bullet points, or resume-style subsection labels in the biography.
- The verified affiliation is the School of Management, Beijing Institute of Technology: doctoral study in Management Science and Engineering, specializing in Management Information Systems. Preserve the distinction between published work and manuscripts under revision.
- `_data/profile_ui.yml` contains bilingual interface labels. `_data/news.yml` contains dated homepage events. Keep dates at their source precision; do not derive announcement or acceptance dates from publication years.
- Keep the stored education, project, patent, service, original publication, overview, and highlight records. CV, Chinese CV, CV JSON, and resume aliases remain removed; do not introduce a replacement public CV or links to its former anchors.
- Publication titles remain stored in their original form and language. Citation display components live in each paper's `citation` object. `reference_sort` provides author/year/title ordering for Liquid. Author roles and review stages remain separate source fields.
- If a paper changes status or title, also update its legacy `_publications` record.

## Design and behavior

Home, Research, and Talks share a minimalist white layout, a 960px reading frame, Source Sans 3, ink #18212f, muted text #647084, and blue #2563eb. Fonts are self-hosted, with platform sans-serif fallbacks for Chinese. Dates use system monospace. Do not add decorative graphics, promotional cards, gradients, or homepage animation.

Home uses explicit identity/portrait/link grid areas followed by a normal-flow About section. Keep the user-provided `images/portrait.png` unchanged at its natural aspect ratio: 144px wide on desktop and 88px on phones. Contact links remain simple text links. The biography has two paragraphs separated by normal paragraph spacing.

Updates displays the five newest actual events in reverse chronological order. Earlier events appear in a native `details` disclosure labeled More updates / 更多动态. The label changes when expanded; keyboard operation and no-JavaScript operation are native browser behavior. Detail links appear only where a relevant public destination exists. There are eight stored events; the three older additions use two explicitly recorded patent filing dates and the existing ICIS 2024 talk month.

Research is a simple APA 7-style list, grouped in this order: under review/revision, working papers, journal publications, conference proceedings. Each group has a clear top rule, heading, count, and spacing. Keep all 20 publication records and their paper anchors. Alphabetize references within groups. Use author/date/title/source order, sentence-case article titles, italic manuscript titles and journal/volume components, a half-inch hanging indent, and double line spacing. Under-review journal names, review stages, author roles, and source-year notes appear separately from the reference. Undated manuscripts use `n.d.`. Do not invent dates, DOI links, missing volume/issue data, or proceedings editors/pages. The 2027 issue year remains explicitly annotated as recorded in the source CV.

Research starts with one compact connected research overview, rendered by `_includes/profile-research-network.html` and styled by `assets/css/research-network.css`. Three complementary directions (understanding people, explaining health risks, and grounding health information) branch from the shared theme AI for digital health. These are links between research themes, not a claimed integrated model or sequential workflow. Each direction has two links to its original paper anchors. Bilingual labels are in `_data/research_agenda.yml`, including `network` and each direction's `connection` fields. Desktop uses a thin SVG network with slow traveling signals; phones use a vertical connected rail with staggered node and heading emphasis. Keep labels and paper links visible throughout.

Only Research loads `assets/js/research-network.js`. One pause/play control manages a twelve-second cycle with staggered branches. Manual pause persists across visibility changes; offscreen, hidden-document, print, and reduced-motion states stop motion. No JavaScript or missing motion APIs leave the complete static overview and working paper links. Print hides the overview. The APA reference sections remain clear and complete below it. Research displays no paper figures or expanded summaries. Retain the original figures, overviews, old animation source files, and provenance (`assets/images/FIGURE_SOURCES.md`) in storage.

Talks retains the complete stored list. All six routes have matching canonical and language-alternate links. Navigation and Updates work without JavaScript.

## Validation

The production build remains the existing Jekyll workflow: `bundle exec jekyll build`. No new production dependencies were introduced.

APA-list baseline, 2026-10-31 (before restoring animation): all six routes rendered with LiquidJS and passed headless Edge checks at 320, 390, 768, and 1440px. Verified no horizontal overflow, complete unchanged source publication records, four Research groups and alphabetic entry order, APA hanging indent/double line spacing, no Research images or scripts, exactly two bilingual biography paragraphs, original portrait sizes, 5-to-8 Updates expansion/collapse using the keyboard, 12 internal link/anchor destinations, and no browser errors or failed page assets. Local screenshots are in ignored `local/screenshots/apa-*.png`. This environment lacks Ruby/Bundler, so the full native Jekyll build was not run. Those checks preceded deployment.


Connected research overview, 2026-10-31: six bilingual routes passed headless Edge checks at 320, 390, 768, and 1440px, with no overflow, browser errors, or failed assets. Verified three linked research directions, six valid paper anchors, preserved 20 APA references, keyboard pause/resume, manual pause across viewport changes, reduced motion, print events, static API fallback, actual signal movement, automatic offscreen pause/resume, and native paper navigation with JavaScript disabled. Home's two paragraphs and More updates behavior also passed. Screenshots are in ignored `local/screenshots/network-*.png`. Native Jekyll remains untested because Ruby/Bundler is unavailable. Those checks preceded deployment.


Expanded About, 2026-10-31: Home now has two fuller bilingual paragraphs (242 English words in total). They describe the shared research questions, concrete methods, related interests in digital therapeutics and online communities, and recorded publications/revision statuses. All six routes again passed the four-width browser checks, including paragraph count/content, spacing, portrait geometry, navigation, Research animation and APA references, and More updates. No new affiliations, degree dates, findings, or review-status changes were introduced. The current changes are intended for the existing master branch and GitHub Pages workflow.
