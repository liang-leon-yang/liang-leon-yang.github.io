# Personal website content

The primary pages use `_layouts/profile.html` and `assets/css/profile.css`, independently of the legacy Academic Pages archive styles.

| Page | English | Chinese |
| --- | --- | --- |
| About | `/` | `/zh/` |
| Research | `/publications/` | `/zh/publications/` |
| CV | `/cv/` | `/zh/cv/` |
| Talks | `/talks/` | `/zh/talks/` |

- Edit `_data/profile.yml` for biography, education, research, publications, projects, patents, and academic service. It uses JSON syntax, which is valid YAML. `en` and `zh` values contain the two language versions.
- Edit `_data/profile_ui.yml` for navigation and interface labels. Edit `_data/research_agenda.yml` for the bilingual research map on the Research page and its links to stored publication IDs.
- Edit `_data/news.yml` for the bilingual homepage News list. It uses JSON syntax, which is valid YAML. The homepage displays the five latest dated events in reverse chronological order, with links to the relevant research, talk, or CV details. Retain the date precision supported by the source; do not infer acceptance dates or announcement dates from bibliographic years.
- Publication groups are `journal`, `review`, `working`, and `conference`. The `highlights` data supplies selected-paper figures and summaries, with `selected` kept in sync for those paper records. Author-role labels are separate from review status.
- Publication titles remain in their original language. The 2027 journal issue year follows the supplied CV and is explicitly annotated. Review stages are a snapshot of the supplied CV, not automatically updated.
- Both language versions are static, with matching canonical and hreflang links. Navigation does not require JavaScript. JavaScript enables the CV print action and optional research-direction emphasis; printed CVs include the publication list. Text and controls remain visible and usable if JavaScript is unavailable.
- The legacy `_publications` URLs remain available. If an existing paper changes status or title, also update its legacy record.

Build with the repository's existing Jekyll workflow (`bundle exec jekyll build`). No new production dependencies are required.

Prior local validation, before the News homepage reorganization: all eight primary routes were rendered with LiquidJS and checked in headless Edge at 320, 390, 680, 768, 800, and 1440 px, including language switching, internal links, publication counts, no-JavaScript navigation, and print styles. The research map also passed bilingual paper-anchor checks, direction selection/reset, keyboard Enter/Space, static no-JavaScript reading, reduced-motion use, and print checks. A native Jekyll build was not run because Ruby/Bundler was unavailable in that editing environment.

News homepage validation: all eight bilingual routes rendered with LiquidJS and passed headless Edge checks at 320, 390, 680, 800, and 1440 px. Both homepages show five dated events in reverse chronological order; News targets and fragments resolve, including without JavaScript. Research retains all 20 publication records, four original figures, and five overviews; relocated map pause, keyboard selection/reset, and reduced-motion behavior passed. No horizontal overflow or browser JavaScript errors were found. Native Jekyll build remains unverified because Ruby/Bundler is unavailable.

Design: a restrained personal website whose homepage contains a small portrait, a concise introduction, contact links, and News. Research details, CV, and talks live on separate pages. Keep the white background and avoid decorative cards or promotional headlines. Only the current affiliation is stored in the public profile and education data. Do not restore previous education or visiting affiliations. Do not include advisor names or supervision relationships in biographies or education entries; publication author lists remain accurate. The alternate CV route redirects to `/cv/`.

Typography uses self-hosted Source Sans 3 for headings, body text, and navigation, with system sans-serif fonts for Chinese. The shared reading width is 960px. The homepage places its introduction and portrait above the News list. The three-direction research map appears on the Research page before the complete publication groups. See `assets/fonts/README.md` for licenses and subset maintenance. Research navigation and sections list under-review manuscripts first in both languages.

Selected research uses figures extracted from the actual papers, with source records in `assets/images/FIGURE_SOURCES.md`. Render figures with `object-fit: contain` and allow opening full-size images. Never substitute stock photos or figures from a different version of a paper. A selected paper without its own source figure remains text-only.

The homepage keeps research details on the Research page. That page includes every publication in the profile data, preserving complete titles, author lists, venues, years, review stages, author roles, original selected-paper figures, and available overviews. The printed CV retains the complete publication list with concise entries. Research navigation lists under-review/revision papers, journal articles, working papers, and conference papers in that order. Layout or animation changes must not reduce the scope of displayed research content.

The profile photo is the user-provided headshot at `images/portrait.png`, used by the bilingual homepage and legacy author profile. Keep the supplied image unchanged; `.profile-avatar img` centers it without additional scaling.

Selected papers have bilingual `overview.en` / `overview.zh` fields in `_data/profile.yml`. These editorial research introductions appear as visible text on the Research page; CV entries stay concise. They are summaries, not verbatim abstracts. The introductions for `empathy`, `icis25`, `icis24night`, and `icis24support` follow the corresponding local paper abstracts. The `support` introduction follows its current title and stored highlight summary because the available local source is a review letter for an earlier version; do not attribute findings or methods from that version to the current manuscript.

The visual system uses a white background, neutral black and gray text, and a single burgundy accent (#8b2439) for links and active research steps. Do not restore pastel panels, blurred gradients, portrait halos, decorative floating particles, or rounded promotional cards. Keep the existing typography and all original paper figures.

The Research page uses three compact SVG illustrations alongside the research questions, methods, and paper links. Dialogue shows a help-seeking expression, four communicating agents, and a response; health analytics connects observations with a model prediction and explanatory factors; information integrity connects text/image claims with knowledge evidence and assessment. These are conceptual theme illustrations, not a claimed unified architecture, empirical results, clinical predictions, importance values, or truth verdicts. Keep the neutral palette, original paper figures, all five selected-paper records and their overviews, and complete publication records.

The slow eight-second cycles move short signals along meaningful connections and gently emphasize agents or evidence. All labels and structural lines remain visible. One bilingual pause/play control manages the illustrations; each scene animates only while visible, and all motion pauses when the document is hidden or printing. Manual pause persists across visibility changes. Reduced motion, no JavaScript, and unavailable motion-management APIs leave complete static illustrations. Clicking a direction still emphasizes its links without hiding any research. Mobile stacks each diagram within its own direction; there is no carousel or new production dependency.
