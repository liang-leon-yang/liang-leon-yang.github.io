# Website fonts

Self-hosted fonts, all under the SIL Open Font License 1.1. No Google Fonts requests are made by visitors.

- Source Sans 3 Regular and Semibold: https://github.com/adobe-fonts/source-sans/tree/release/WOFF2/TTF
- Source Serif 4 Regular: https://github.com/adobe-fonts/source-serif/tree/release/WOFF2/TTF
- Academic Serif SC: renamed character subset of Noto Serif CJK SC Regular, https://github.com/notofonts/noto-cjk/tree/main/Serif/OTF/SimplifiedChinese
- Playfair Display Latin, weights 600–700: `playfair-display-latin.woff2`; upstream https://github.com/google/fonts/tree/main/ofl/playfairdisplay; license `playfairdisplay-LICENSE.txt`.
- Merriweather Latin, weights 400–700: `merriweather-latin.woff2`; upstream https://github.com/google/fonts/tree/main/ofl/merriweather; license `merriweather-LICENSE.txt`.

Licenses are stored beside the font files. The Playfair Display and Merriweather files are self-hosted Latin WOFF2 subsets obtained through Google Fonts CSS, with their SIL Open Font License text from the upstream Google Fonts repository. Keep the subset files, weight declarations, and licenses in sync when replacing them; Chinese text uses platform fallbacks.

The homepage uses Playfair Display for its centered name, role, and affiliation, and Merriweather for its biography. Its inline dated News bullets and compact navigation/contact details use the existing Source Sans 3, matching the reference's sans-serif Updates. These choices follow the reference site's academic typography and are scoped to `.page-home`. Research, CV, and Talks keep Source Sans 3 Regular and Semibold for headings, body text, and navigation, with platform sans-serif fallbacks for Chinese. Source Serif 4 and the Academic Serif SC subset remain available but are not requested by the current profile layout.

Outside the homepage, body text remains 17px on desktop and 16px on mobile, major section headings 25px / 23px, and metadata and secondary actions 14–15px. Body line-height remains 1.65 (1.8 for Chinese), publication titles 1.4–1.45, and research introductions 1.7. The homepage has its own centered display headings, portrait/biography spacing, and responsive serif text rules in `assets/css/home.css`.
