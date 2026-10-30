# Website fonts

Self-hosted fonts, all under the SIL Open Font License 1.1. No Google Fonts requests are made by visitors.

- Source Sans 3 Regular and Semibold: https://github.com/adobe-fonts/source-sans/tree/release/WOFF2/TTF
- Source Serif 4 Regular: https://github.com/adobe-fonts/source-serif/tree/release/WOFF2/TTF
- Academic Serif SC: renamed character subset of Noto Serif CJK SC Regular, https://github.com/notofonts/noto-cjk/tree/main/Serif/OTF/SimplifiedChinese
- Playfair Display Latin, weights 600–700: `playfair-display-latin.woff2`; upstream https://github.com/google/fonts/tree/main/ofl/playfairdisplay; license `playfairdisplay-LICENSE.txt`.
- Merriweather Latin, weights 400–700: `merriweather-latin.woff2`; upstream https://github.com/google/fonts/tree/main/ofl/merriweather; license `merriweather-LICENSE.txt`.

Licenses are stored beside the font files. The Playfair Display and Merriweather files are self-hosted Latin WOFF2 subsets obtained through Google Fonts CSS, with their SIL Open Font License text from the upstream Google Fonts repository. Keep the subset files, weight declarations, and licenses in sync when replacing them; Chinese text uses platform fallbacks.

Home, Research, and Talks use Source Sans 3 Regular and Semibold for all headings, body text, navigation, contact details, Updates, metadata, and diagram labels. Dates use a system monospace stack; Chinese text uses platform sans-serif fallbacks. All six bilingual routes share this typography; preload only the active sans-serif font assets. Source Serif 4, Academic Serif SC, Playfair Display, and Merriweather remain stored with their licenses for archival reuse but are not loaded or preloaded by the current layout.

Shared page titles are left-aligned at 40px on desktop and 34px on phones, with compact responsive spacing. Ink (#18212f), muted text (#647084), one blue accent (#2563eb), aligned compact navigation, thin rules, and a 960px reading frame define the shared minimalist technology style. `assets/css/profile.css` owns font declarations, tokens, navigation, headings, content typography, responsive behavior, and print styles. `assets/css/home.css` owns the explicit identity/portrait/contact grid, separate paragraph-based About section, and Updates layout; it must not introduce a separate homepage palette or typography system. Keep diagram labels in Source Sans 3 so their widths remain stable.

The public CV and its aliases are removed. Homepage education, research, and publication paragraphs share the same body typography and normal-flow paragraph spacing; their length must not affect portrait placement. The supplied portrait remains at its natural aspect ratio, 144px wide on desktop and 88px on phones.
