# UjanOS appearance refinement

Implemented locally on 2026-10-05. The new direction uses the cool materials, restrained chrome, native typography, and depth of Sonoma/Sequoia. Existing UjanOS identity, project evidence, descriptions, direct URLs, and application behavior are preserved. Appearance ownership was coordinated with the other active audit task; its focus and mobile-navigation fixes were retained.

## Palette

The semantic system is defined in `src/styles.css`. Legacy application color names resolve to the new semantic values.

| Role | Value |
| --- | --- |
| Desktop fallback | `#BACCE9` |
| Window / secondary content | `#F5F5F7` |
| Reading surface | `#FFFFFF` |
| Active / inactive title bar | `#EEEFF2` / `#F5F5F7` |
| Toolbar / sidebar | `#F3F4F6` / `#EFF0F4` |
| Dock / menu fallback | `#E9EDF5` / `#F5F6F9` |
| Primary / secondary / disabled text | `#1D1D1F` / `#62626A` / `#85858C` |
| Border / stronger border / separator | `#DEDEE3` / `#BFC1C9` / `#E8E8ED` |
| Active / inactive selection | `#E5EFFF` / `#E8E8EE` |
| Accent and focus / link / primary action | `#007AFF` / `#0068D9` / `#0067D9` |
| Hover / pressed | `#ECEEF3` / `#DFE3EB` |
| Success / warning / error | `#267449` / `#8A5D10` / `#C5313A` |
| Task chart blue / teal / purple / ochre / rose | `#246FC2` / `#287E78` / `#8054AC` / `#996C25` / `#B75271` |
| Shadow base | `#172544`, with separate active-window, inactive-window, and floating-surface layers |

Secondary text and link/action blues are slightly darker than the starting references to improve contrast. On opaque content, primary text is 16.83:1, secondary text 6.04:1, and primary-button text 5.33:1. These are analytical calculations, not measurements from rendered screenshots.

## Materials and components

- Original local `public/wallpapers/ujan-flow.svg`: broad blue, lavender, and restrained teal folds; no animation, external asset, noise filter, or raster dependency.
- Windows use 12px corners, fine separators, edge highlights, clipped content, and separate active/inactive shadows. Title bars and toolbars are neutral; reading areas are opaque. Notebook uses a quiet sidebar and blue selection.
- Traffic lights are on the left: red close, yellow minimize, green maximize/restore. Accessible names and existing handlers are retained. Desktop targets are 26 by 32px; mobile exposes a functional close control with a 44px target. Controls are excluded from title-bar dragging and double-click maximize.
- The desktop dock is centered, frosted, rounded, and bordered. Each project retains its original custom glyph, with its own icon treatment. About is now also in the dock. Running dots, hover/focus labels, and fixed hit areas surround modest icon scaling.
- Blur is limited to the desktop system bar, dock, and floating launcher. Standard and Safari-prefixed declarations have opaque fallbacks. Mobile surfaces and reduced-transparency mode remove blur.
- Native system font stack replaces Plex and serif display type. Utility headings and buttons are smaller; tabs and checkpoint controls use segmented styling. Research tables retain tabular numerals. Task bars retain digit labels and exact percentages; unseen values also receive hatching.
- Mobile uses a readable opaque application surface over the wallpaper, a touch-friendly application menu, and no compressed desktop dock. Reduced-motion mode removes transitions, launcher animation, and dock scaling.
- Light appearance is implemented consistently. There was no existing theme system; dark appearance and a manual theme override were not introduced.

## Verification

Passed:

- `npm run build`, including TypeScript project checking and the production bundle.
- `npm run lint`.
- `npm test`: seven window-state tests, including minimize/restore/close, arrangement, viewport bounds, dock separation, and Memory Lab preview expansion.
- `npm run check:ui`: DOM interactions across nine applications and thirteen tab views; project controls, keyboard tab navigation, clipboard, launcher focus/dismissal, window controls, and mobile switching.
- Analytical material audit: 56 CSS tokens resolve, 27 contrast checks pass, and eleven local routes/assets respond successfully. Report: `.verification/macos/material-audit.json`.

**Rendered verification remains unavailable.** Playwright browser launch returned `spawn EPERM`; the regular Chromium attempt terminated with Windows IPC/access-denied errors. No screenshots were captured or inspected. Desktop, narrow-laptop, and mobile layout judgment, actual composited contrast, Safari rendering, hover smoothness, and GPU/blur performance still need real-browser review. DOM and analytical checks do not establish those results.

`npm run check:browser` provides the screenshot/layout matrix (1920, 1440, 1366, 800, 390, and 320px widths), with application views, disclosures, maximized states, launcher/focus, and reduced-motion captures. Run it where browser launch is permitted, with `SITE_URL` set to the URL printed by Vite. An existing inspectable browser can be selected through `CDP_URL`.

No deployment or remote push was performed.
