# Website fonts

Self-hosted fonts, all under the SIL Open Font License 1.1. No Google Fonts requests are made by visitors.

- Source Sans 3 Regular and Semibold: https://github.com/adobe-fonts/source-sans/tree/release/WOFF2/TTF
- Source Serif 4 Regular: https://github.com/adobe-fonts/source-serif/tree/release/WOFF2/TTF
- Academic Serif SC: renamed character subset of Noto Serif CJK SC Regular, https://github.com/notofonts/noto-cjk/tree/main/Serif/OTF/SimplifiedChinese
- Playfair Display Latin, weights 600–700: `playfair-display-latin.woff2`; upstream https://github.com/google/fonts/tree/main/ofl/playfairdisplay; license `playfairdisplay-LICENSE.txt`.
- Merriweather Latin, weights 400–700: `merriweather-latin.woff2`; upstream https://github.com/google/fonts/tree/main/ofl/merriweather; license `merriweather-LICENSE.txt`.

Licenses are stored beside the font files. The Playfair Display and Merriweather files are self-hosted Latin WOFF2 subsets obtained through Google Fonts CSS, with their SIL Open Font License text from the upstream Google Fonts repository. Keep the subset files, weight declarations, and licenses in sync when replacing them; Chinese text uses platform fallbacks.

Home, Research, Talks, and CV use one shared typography system across both languages: Playfair Display for centered `.page-heading` titles and section headings, Merriweather for body text, and Source Sans 3 for navigation, contact details, News, metadata, and diagram labels. The homepage role and affiliation also use Playfair Display. All eight routes preload the two serif fonts; Chinese text uses platform serif fallbacks. Source Serif 4 and the Academic Serif SC subset remain available but are not requested by the current profile layout.

Shared page titles use 64px on desktop and 44px on phones, with responsive body and metadata sizes. Navy headings (#06417c), blue links (#0b5394), the wide borderless header/navigation, and the 1100px reading width are consistent across all four page types. `assets/css/profile.css` owns shared font declarations, tokens, navigation, headings, content typography, responsive behavior, and compact print-CV styles. `assets/css/home.css` contains only the portrait, biography, and News layout; it must not define a separate homepage palette or typography system. Preserve Source Sans 3 for diagram labels so changing body typography does not change their text widths.
