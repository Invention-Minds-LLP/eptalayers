---
name: Epta Layers
description: Field certification reports laid on a graphite instrument panel.
colors:
  graphite-950: "#101316"
  graphite-900: "#16191c"
  graphite-800: "#1b1f23"
  graphite-700: "#252a30"
  graphite-600: "#343b43"
  graphite-line: "#3d454e"
  on-graphite: "#eef1f0"
  on-graphite-2: "#a9b3b0"
  ground: "#e1e6e4"
  sheet: "#eef1f0"
  sheet-under: "#e6eae8"
  sheet-deep: "#cfd7d4"
  rule: "#c3ccc9"
  rule-strong: "#9aa5a2"
  ink: "#16191c"
  ink-2: "#454f59"
  ink-3: "#505a64"
  pass: "#0e9f6e"
  pass-ink: "#0a7552"
  pass-lit: "#2fd39a"
  limit: "#d7263d"
  limit-ink: "#b01d31"
  cable: "#1e5aa8"
  cable-deep: "#174a8b"
  cable-lit: "#7fb0ee"
  on-cable: "#ffffff"
typography:
  display:
    fontFamily: "'Archivo Variable', 'Archivo', system-ui, sans-serif"
    fontSize: "clamp(2.3rem, 4.6vw, 4.4rem)"
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: "-0.035em"
    fontVariation: "'wdth' 108"
  headline:
    fontFamily: "'Archivo Variable', 'Archivo', system-ui, sans-serif"
    fontSize: "clamp(2rem, 3.6vw, 3.25rem)"
    fontWeight: 800
    lineHeight: 1.04
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 110"
  title:
    fontFamily: "'Archivo Variable', 'Archivo', system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 800
    lineHeight: 1.04
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 110"
  row-title:
    fontFamily: "'Archivo Variable', 'Archivo', system-ui, sans-serif"
    fontSize: "1.3125rem"
    fontWeight: 750
    lineHeight: 1.3
    letterSpacing: "-0.01em"
    fontVariation: "'wdth' 105"
  lede:
    fontFamily: "'Archivo Variable', 'Archivo', system-ui, sans-serif"
    fontSize: "1.1875rem"
    fontWeight: 400
    lineHeight: 1.6
  body:
    fontFamily: "'Archivo Variable', 'Archivo', system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
    fontVariation: "'wdth' 100"
  body-sm:
    fontFamily: "'Archivo Variable', 'Archivo', system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.45
  label:
    fontFamily: "'Archivo Variable', 'Archivo', system-ui, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "0.06em"
    fontVariation: "'wdth' 75"
  data:
    fontFamily: "'Martian Mono Variable', 'Martian Mono', ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    letterSpacing: "0"
    fontFeature: "'tnum', 'zero'"
    fontVariation: "'wdth' 87.5"
rounded:
  none: "0px"
  sheet: "2px"
  control: "3px"
spacing:
  gutter: "clamp(16px, 4vw, 48px)"
  max-width: "1320px"
  section-top: "128px"
  section-top-compact: "88px"
  section-bottom: "48px"
  head-gap: "48px"
  folio-gap: "72px"
  column-gap: "clamp(40px, 6vw, 96px)"
  row: "12px"
  field: "20px"
components:
  button-primary:
    backgroundColor: "{colors.cable}"
    textColor: "{colors.on-cable}"
    rounded: "{rounded.control}"
    padding: "0 1.25rem"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.cable-deep}"
    textColor: "{colors.on-cable}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "0 1.25rem"
    height: "48px"
  button-ghost-hover:
    backgroundColor: "{colors.sheet-under}"
    textColor: "{colors.ink}"
  button-ghost-dark:
    backgroundColor: "transparent"
    textColor: "{colors.on-graphite}"
    rounded: "{rounded.control}"
    padding: "0 1.25rem"
    height: "48px"
  button-ghost-dark-hover:
    backgroundColor: "{colors.graphite-700}"
    textColor: "{colors.on-graphite}"
  verdict-chip:
    backgroundColor: "{colors.pass}"
    textColor: "{colors.graphite-950}"
    typography: "{typography.data}"
    rounded: "{rounded.sheet}"
    padding: "0.2em 0.55em 0.2em 0.45em"
  report-sheet:
    backgroundColor: "{colors.sheet}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sheet}"
    padding: "24px 28px 20px"
  field-input:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "10px 0"
    height: "48px"
  file-tab:
    backgroundColor: "{colors.sheet-deep}"
    textColor: "{colors.ink-2}"
    rounded: "{rounded.control}"
    padding: "10px 16px 12px"
  file-tab-selected:
    backgroundColor: "{colors.sheet}"
    textColor: "{colors.ink}"
  nav-link:
    textColor: "{colors.on-graphite-2}"
    padding: "8px 12px"
  nav-link-active:
    textColor: "{colors.on-graphite}"
---

# Design System: Epta Layers

## Overview

**Creative North Star: "The Signed Test Report"**

Every surface is a page from one continuous field certification report: a cool report-white sheet laid on a desk ground, or a graphite instrument panel that frames the report and closes it. Content is not "presented", it is measured, ruled and signed. Headings behave like report titles, supporting facts sit in hairline-ruled rows, measured values and IDs are set in a monospace, and every readout carries a short plain-language summary beside it. A verdict chip (PASS, SIGNED OFF) is the only badge the world knows.

The system is flat. Depth comes only from sheets overlapping sheets and from the contrast between the graphite panel and the paper. There are no soft shadows, no gradient washes and no photography; diagrams native to cable certification (wiremaps, limit-line plots, scope traces, layer bars, leader lines to limits) do the illustrative work. Density is report-like: tight ruled rows inside generous section air.

The world extends beyond the homepage. Each of the other site pages (solutions, case studies, story, careers, contact, blog, legal) is another report in the same binder, with its own subject-specific scenario (a solution's test log, a case file's recorded results, a careers requisition sheet) drawn from the same materials: sheet, rule, label, data value, verdict, folio. The report ID and folio sequence are per-page; the materials are fixed.

**Key Characteristics:**
- Graphite instrument panel (header, hero, NOC, continuity, footer) framing cool report-white sheets on a desk ground.
- Archivo across its width axis: wide heavy heads, condensed uppercase labels. Martian Mono only for measured values, IDs and codes.
- Hairline-ruled tables with heavy 2px ink rules at a sheet's head and sign-off foot.
- Three semantic colors (pass green, limit red, Cat6 cable blue) and no decorative color.
- Flat depth: sheets overlap, never float.
- Every section ends in a folio: report ID, a hairline, section name, sheet n / total.

## Colors

A cool, near-neutral graphite-and-paper palette where the only saturated color carries meaning: pass, limit, or interactive cable blue.

### Primary
- **Cat6 Cable Blue** (cable): the one interface accent. Primary buttons, focus rings, caret, text selection, in-sheet links, active layer bars, the LAER trace, the testing probe band. Hover deepens to **Cable Deep** (cable-deep). On graphite, links, focus and target lines use **Cable Lit** (cable-lit).

### Secondary
- **Pass Green** (pass): the verdict. Fills the PASS / SIGNED OFF chip and the recorded-value band on gauges. **Pass Ink** (pass-ink) sets passed numerals and recorded figures on paper; **Pass Lit** (pass-lit) is the live signal on graphite: scope traces, NOC readouts, the header nav underline, the wordmark's seventh bar, the uninterrupted-service line.

### Tertiary
- **Limit Red** (limit): the limit line and the fault. Dashed limit lines on plots, alert spikes on scope traces, the failover fault mark, invalid field underlines. **Limit Ink** (limit-ink) sets limit tags, error messages and the status-page header on paper. Never decorative, never a CTA.

### Neutral
- **Graphite 900** (graphite-900): header and hero panel.
- **Graphite 800** (graphite-800): NOC panel; also the pin blocks of the wiremap.
- **Graphite 950** (graphite-950): the close of the page (continuity and footer) and the NOC console face; text on the pass chip.
- **Graphite 700 / 600 / Line** (graphite-700, graphite-600, graphite-line): row rules, hover fills and panel borders on graphite; scrollbar thumb.
- **On-Graphite / On-Graphite 2** (on-graphite, on-graphite-2): primary and secondary text on graphite.
- **Desk Ground** (ground): the page body behind light sections; empty layer-bar cells.
- **Report White** (sheet): every report sheet, the solutions log band, the selected file tab.
- **Sheet Under / Sheet Deep** (sheet-under, sheet-deep): the sheets beneath (hover fills, unselected tabs, alternating stacked sheets, gauge tracks).
- **Rule / Rule Strong** (rule, rule-strong): hairline row rules; stronger rules for table heads, field underlines, ghost button edges, placeholder slots.
- **Ink / Ink 2 / Ink 3** (ink, ink-2, ink-3): headings and heavy rules; body support text; labels, codes and folios.

### Named Rules
**The Meaning-Only Color Rule.** Saturated color states a result or an action: green passed, red is the limit, blue is what you can act on. If a color cannot be read as one of those three, it does not belong on the page.

**The Wire-Colors-Are-Data Rule.** The wiremap's pair colors (orange, green, blue, brown, solid and white-striped) are the physical T568 cable code, scoped to cable diagrams. They are data, not palette, and never appear on buttons, text or section surfaces.

**The Darkest-At-The-Close Rule.** Graphite 950 is reserved for where the report ends: the continuity band and the footer. Opening panels use 900; mid-page instrument panels use 800.

## Typography

**Display Font:** Archivo Variable (with Archivo, system-ui, sans-serif)
**Body Font:** Archivo Variable, same family, width axis at 100%
**Label/Mono Font:** Martian Mono Variable (with Martian Mono, ui-monospace, monospace)

**Character:** One grotesque family worked across its width axis: heads pushed wide and heavy like a report title block, labels pulled condensed and uppercase like a column header on test equipment. The monospace is an instrument readout, never a voice.

### Hierarchy
- **Display** (800, clamp(2.3rem, 4.6vw, 4.4rem), 0.98, width 108%, -0.035em): the page H1 in the graphite report header. 2.25rem at 640px and below.
- **Headline** (800, clamp(2rem, 3.6vw, 3.25rem), 1.04, width 110%): section H2s. The closing continuity statement may run larger (up to 4.5rem, width 112%).
- **Title** (800, 1.5rem, width 108–112%): sheet titles, strength heads, form sheet heads. Case-file titles scale up to clamp(1.6rem, 3vw, 2.4rem).
- **Row title** (750, 1.3125rem, width 105%): the name in a log row.
- **Lede** (400, 1.1875rem, 1.6, max 40ch): the one paragraph under a Display or closing Headline.
- **Body** (400, 1.0625rem, 1.6): running text, 44–58ch measure.
- **Body small** (400, 0.9375rem): table cells, verifications, addresses, captions (0.875rem).
- **Label** (600, 0.6875rem, width 75%, 0.06em, uppercase): column heads, field labels, strip keys, folio names, diagram axis names.
- **Data** (Martian Mono 400–700, 0.625–0.75rem, width 87.5%, tabular, slashed zero): report IDs, layer codes (L1–L7), solution codes, phone numbers, timestamps, verdict text, readouts. Recorded headline figures run 1.125rem, 700, in pass-ink.

### Named Rules
**The Measured-Only Mono Rule.** Martian Mono is for things a meter could print: IDs, codes, counts, timestamps, phone numbers, readouts. Sentences, headings and labels stay in Archivo.

**The Width-Axis Rule.** Hierarchy is carried by width as much as size: heads at 105–112% width, body at 100%, labels at 75%. Don't reach for a second family.

## Layout

A centered wrap (max 1320px, fluid gutter clamp(16px, 4vw, 48px)) holding asymmetric two-column grids, most often 5/12 copy against a 7/12 sheet or instrument, with clamp(40px, 5–6vw, 80–96px) column gaps. Section heads pair a wide headline (1.25fr) with a short summary paragraph (1fr), aligned to the baseline end, 48px above the content.

Sections run 128px top and 48px bottom (112–120px on graphite bands), and each closes with a folio 72px below its content, so the rhythm is: air, report, running foot. At 860px and below, sections compress to 88px / 32px and two-column grids stack. At 1080px the hero stacks to copy, sheet, findings, and the header collapses to a drawer. At 640px ruled tables reflow to two-line rows (label + verdict, then the detail line), and table heads hide.

Within sheets, spacing is tight and ruled: 10–12px row padding, 20px between form fields, 24–40px sheet padding (18–20px on mobile).

**The Folio Rule.** Every section of a report page ends with the folio: report ID, a 35%-opacity hairline, the section name in label type, and "nn / nn" sheet numbering. It is the running foot of the document and the page's only section marker; there are no numbered eyebrows above headings.

## Elevation & Depth

Flat. Nothing floats and nothing casts light. Depth is conveyed only by flat sheets overlapping other flat sheets (stacked OSI sheets offset 18px per layer, file tabs sitting behind the active case file, a report-white sheet on the desk ground) and by the tonal step between graphite panels and paper. State changes are expressed as fills and rules: a hover moves a row to sheet-under; the testing probe is a translucent cable-blue band with a 2px cable rule along its foot.

### Named Rules
**The No-Soft-Light Rule.** No drop shadows, no blurred shadows, no gradient washes or glows. Hard-edged devices that belong to the instrument world are allowed because they are rules, not light: an inset 2px rule at a probe's foot, a 1px scope graticule, white-striped wire pairs.

**The Overlap Rule.** When something must sit "above" something else, offset it as another sheet: shift it, change its tone one step (sheet, sheet-under, sheet-deep), give it a hairline. Never lift it.

## Shapes

Nearly square. Sheets and verdict chips take a 2px corner, interactive controls (buttons, tabs, the NOC console frame, the menu toggle) a 3px corner, and form fields none at all: they are underlines on the sheet, not boxes. The only round form is the live indicator dot. Borders do the structural work: 1px hairlines between rows, 2px ink rules at a sheet's head and sign-off foot, a 6px ink top edge on standalone form and status sheets, dashed borders only for empty slots awaiting supplied content and for leader lines to targets.

## Components

### Buttons
Direct and physical, like a labelled key on test equipment.
- **Shape:** squared (3px), 48px minimum height, 1.25rem side padding, Archivo 650 at 90% width, 1rem.
- **Primary:** cable blue fill, white text, optional trailing arrow icon (18px).
- **Hover / Focus:** fill and edge deepen to cable-deep over 0.25s ease-out; the arrow nudges 3px right over 0.35s. Focus is the global 2px cable outline at 3px offset (cable-lit on graphite).
- **Ghost (paper):** transparent, ink text, rule-strong edge; hover fills sheet-under and darkens the edge to ink.
- **Ghost (graphite):** transparent, on-graphite text, graphite-line edge; hover fills graphite-700.
- **Instrument key (small):** 36px, rule-strong edge, 0.8125rem, used for in-sheet controls such as "Run again".

### Verdict chip
- **Style:** pass-green fill, graphite-950 text, Martian Mono 700 0.75rem uppercase, 2px corners, leading 13px check icon.
- **Use:** PASS, SIGNED OFF, READY TO SEND. It is a result, not a tag; there is no neutral or category chip.

### Report sheet
- **Corner Style:** 2px, or square with a 6px ink top edge when standalone.
- **Background:** sheet on the ground or on graphite; 1px rule border when it sits on the ground.
- **Shadow Strategy:** none (see Elevation & Depth).
- **Structure:** title block over a 2px ink rule (title, reference line, label/data meta at right), hairline-ruled rows, a 2px ink sign-off foot carrying the summary and signature.
- **Internal Padding:** 24–40px desktop, 16–20px mobile.

### Inputs / Fields
- **Style:** transparent, underline only (1px rule-strong), no radius, 48px min height, body size text, label-type caption above.
- **Focus:** underline becomes 2px cable; no outline box. Hover darkens the underline to ink.
- **Error:** 2px limit underline and a limit-ink message in plain words below.

### Navigation
- **Header:** sticky graphite-900 bar, 72px, hairline graphite-line foot. Links on-graphite-2 at 0.95rem, 500, 92% width; hover/active turn on-graphite and draw a 2px pass-lit underline from the left (0.35s). Phone number in data type; primary button at right.
- **Mobile (1080px and below):** 48px squared toggle opens a drawer of 56px ruled rows, 1.25rem 650 text with trailing arrows, phone last.
- **Footer:** graphite-950, label-type column heads, on-graphite links underlined in pass-lit on hover, legal line under a graphite-700 rule.

### File tabs
Folder tabs on a case-file stack: sheet-deep at rest, sheet-under on hover, sheet when selected so the active tab joins its sheet. Each shows a data ID over a condensed sector name. Arrow keys, Home and End move between tabs.

### Report log row
The list pattern for any set of things (solutions, services, roles): a heavy 2px ink rule over the table, label-type head row, then ruled rows of data code, row title with a one-line summary, supporting detail, a seven-cell layer bar (cable-blue cells on ground-colored empties), and a trailing arrow. The whole row is the link; hover fills sheet-under, deepens the bar and moves the arrow 4px in cable blue.

### Instrument diagrams (signature)
Diagrams native to cable certification, drawn with non-scaling strokes and no fills: the wiremap (graphite pin blocks, pair-colored wires drawing in with a 70ms stagger), the limit-line plot (ink axes, rule graticule, dashed limit-red target, 3px cable trace, 1px ink leader lines down to phase labels), the scope console (graphite-950 face, 10px graticule, pass-lit traces, cable-lit dashed targets with leader lines to readouts), and the failover line. Each carries a plain-language caption, and anything illustrative says so ("Schematic, not client data").

### Motion
Values settle with an exponential ease-out (cubic-bezier(0.16, 1, 0.3, 1)); leader lines and traces draw once when they enter view and never loop, except live scope traces on the NOC console. The signature interaction is a layer-by-layer test run resolving each row to PASS. All motion collapses under prefers-reduced-motion.

## Do's and Don'ts

### Do:
- **Do** build every new page as another report in the binder: its own subject-specific scenario (test log, case file, requisition, sign-off) built from sheet, rule, label, data value, verdict and folio.
- **Do** set every measured value, ID, code, timestamp and phone number in Martian Mono with tabular, slashed-zero numerals.
- **Do** put a two-second plain-language summary beside every readout, gauge or diagram.
- **Do** use hairline rules (1px rule) between rows and 2px ink rules to open and sign off a sheet.
- **Do** close every section with the folio.
- **Do** keep form fields as underlines on the sheet, 48px tall, with a 2px cable underline on focus.
- **Do** mark empty content slots (OEM logos, testimonials) with dashed rule-strong placeholders that say what is awaited, rather than filling them.

### Don't:
- **Don't** use drop shadows, blurred shadows, glows or gradient washes; depth is sheets overlapping.
- **Don't** introduce a second accent. Cable blue is the only interface accent; green and red mean pass and limit.
- **Don't** use wire pair colors outside cable diagrams.
- **Don't** use a navy gradient hero, data-center photography, or a grid of icon service cards.
- **Don't** put numbered or uppercase eyebrow kickers above headings; section position lives in the folio.
- **Don't** set sentences or headings in the monospace.
- **Don't** round corners beyond 3px or box form fields.
