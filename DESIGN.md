---
name: Wedding Invitation (Card)
description: A sealed envelope opens into one continuous dusk-lit scroll of blush paper, terracotta frames and antique gold ornament.
colors:
  sky-top: "#f3b9cc"
  sky-mid: "#f7cdb4"
  sky-low: "#fde6c8"
  lilac: "#cfa8dc"
  lilac-deep: "#b184c4"
  blush: "#fcecef"
  ivory: "#fff8f3"
  paper-edge: "#f1d3d6"
  rose: "#c96d6a"
  rose-ink: "#a04a4e"
  terracotta: "#c9735f"
  terracotta-ink: "#a4513d"
  gold: "#b98a3a"
  gold-bright: "#e0b457"
  gold-deep: "#8a6420"
  gold-soft: "#f1d79a"
  plum: "#4a1d3b"
  plum-soft: "#5d2d4d"
  mauve: "#6b3f5c"
typography:
  display:
    fontFamily: "Gilda Display, Georgia, serif"
    fontSize: "36px"
    fontWeight: 400
    lineHeight: 1.25
  accent:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontSize: "36px"
    fontWeight: 400
    lineHeight: 1
  body:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "11px"
    fontWeight: 500
    letterSpacing: "0.22em"
  devanagari:
    fontFamily: "Tiro Devanagari Hindi, Noto Serif Devanagari, serif"
    fontWeight: 400
rounded:
  field: "14px"
  card: "28px"
  scroll-card: "30px"
  pill: "9999px"
spacing:
  page-gutter: "24px"
  section-gap: "96px"
  field-gap: "20px"
components:
  button-primary:
    backgroundColor: "{colors.plum}"
    textColor: "{colors.gold-soft}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "16px 24px"
  button-ghost:
    backgroundColor: "rgba(255,255,255,0.4)"
    textColor: "{colors.plum}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "14px 28px"
  button-link-map:
    textColor: "{colors.terracotta-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "10px 16px"
  field:
    backgroundColor: "rgba(255,255,255,0.72)"
    textColor: "{colors.plum}"
    rounded: "{rounded.field}"
    padding: "14px 16px"
  card-day:
    backgroundColor: "{colors.ivory}"
    textColor: "{colors.plum}"
    rounded: "{rounded.scroll-card}"
    padding: "36px 28px 48px"
  card-form:
    backgroundColor: "rgba(255,255,255,0.7)"
    rounded: "{rounded.card}"
    padding: "24px"
---

# Design System: Wedding Invitation (Card)

## Overview

**Creative North Star: "The Opened Envelope"**

This is a new world, built from a user-supplied reference video, not an inherited system. Opening the invitation is the ritual: a sealed envelope opens into one continuous dusk-lit scroll in which each section is a different physical object (arched card, scroll-and-tassel day cards, framed paintings, torana countdown). The ground is a pink-to-peach-to-lavender dusk sky; content sits on blush-ivory paper with terracotta-rose frame lines, antique gold ornament and deep plum ink.

Density is low and the pace is slow: a single 440px mobile column, large type, generous vertical gaps, ambient motion (floating petals, swaying tassels, pulsing seal halo) that never competes with the text.

Provenance: all art is hand-built placeholder SVG (src/components/art/Ornaments.tsx, Scenes.tsx); gallery photos (public/gallery) are the family's own. Motion has a prefers-reduced-motion path (ambient classes switch off, petals and lanterns freeze at 0.55 opacity, scroll-behavior returns to auto). Small text uses the ink tokens (rose-ink, terracotta-ink, mauve, plum-soft) for contrast, never the bright rose or terracotta.

**Key Characteristics:**
- Dusk gradient ground, paper cards, gold hairline inner frames
- Arches, jharokha frames, tassels, torana, lanterns, petals, all authored SVG
- Plum is the only action colour; gold appears as ornament and as focus/selected glow
- Blurred, plum- or rose-tinted ambient shadows only
- Gilda headings, Instrument Serif italic accents, Figtree small labels

## Colors

A dusk-sky ground, blush paper, and one dark plum ink, with gold reserved for ornament.

### Primary
- **Deep Plum** (plum): body text, headings, primary button fill, focus outline.
- **Antique Gold** (gold): inner frame hairlines, dividers, field focus border; gold-bright and gold-soft carry highlights, gold-soft is the text on plum buttons and the selection colour; gold-deep is the shade end of gold gradients.

### Secondary
- **Terracotta** (terracotta) and **Rose** (rose): outer card frame (2px at 70%), error border, decorative fills. Never for small text.
- **Terracotta Ink** (terracotta-ink) and **Rose Ink** (rose-ink): the darker twins for small text (date lines, map link, validation message), at least 4.5:1 on blush.

### Neutral
- **Dusk Sky** (sky-top, sky-mid, sky-low) with **Lilac** (lilac, lilac-deep): page background (body is sky-top; themeColor matches) and sky scenes.
- **Blush / Ivory / Paper Edge** (blush, ivory, paper-edge): paper cards (ivory-to-blush gradient), field borders.
- **Plum Soft** (plum-soft) and **Mauve** (mauve): secondary text, subtitles, form labels, placeholders.

### Named Rules
**The Ink Twin Rule.** Text under 18px uses rose-ink, terracotta-ink, mauve or plum-soft. The bright rose and terracotta are for lines and fills only.

**The Gold Is Ornament Rule.** Gold marks frames, dividers, rods, focus and selected states. It is not the action colour; plum is.

## Typography

**Display Font:** Gilda Display (Georgia, serif)
**Accent Font:** Instrument Serif, italic (Georgia, serif)
**Body/Label Font:** Figtree (system-ui, sans-serif)
**Script font:** Tiro Devanagari Hindi, for the Hindi blessing only

**Character:** A classical high-contrast display face for names and headings, an italic serif for warm asides, and a quiet geometric sans for the practical details.

### Hierarchy
- **Display** (Gilda, 34-40px, 1.25): section headings, names; names may go to 56px.
- **Accent** (Instrument Serif italic, 18-36px, 1 to 1.375): day titles (36px), section subtitles (18-19px).
- **Title** (Gilda, 16-26px): ceremony names (16px), success heading (26px), counts (24px).
- **Body** (Figtree, 13-15px, 1.4-1.625): venues, notes, messages; form text is 16px to prevent iOS zoom.
- **Label** (Figtree 500, 10-11px, 0.22em tracking, uppercase, class "caps"): buttons, form labels, times and date lines; "caps-tight" (0.12em, 0.04em under 380px) where space is short; tabular lining numerals on times.

### Named Rules
**The Three Voices Rule.** Headings in Gilda, asides in Instrument Serif italic, functional text in Figtree. Do not add a fourth face.

## Layout

A single centred column, max-width 440px (class "column"), with 24px page gutters, mobile-first and not redesigned for desktop. Sections stack as one continuous scroll; day cards are 86vw up to 330px with 96px gaps and alternate a slight tilt on entry. Text uses balanced wrapping. The first viewport is a full-height (min-h-svh) scene. Body scroll locks while the envelope is closed.

## Elevation & Depth

Depth is physical: paper cards lift off the sky with soft, offset-down blurred shadows tinted plum or rose, never hard or black.

### Shadow Vocabulary
- **Card lift** (`0 22px 34px -14px rgba(120,50,70,0.35)`): day cards; form card uses `0 28px 44px -20px rgba(74,29,59,0.4)`.
- **Button lift** (`0 14px 24px -10px rgba(74,29,59,0.6)`): primary plum button.
- **Gold rod** (`0 2px 6px rgba(120,70,20,0.3)`): scroll rods.
- **Focus glow** (`0 0 0 4px rgba(185,138,58,0.18)` with gold border): field focus.

### Named Rules
**The Soft Shadow Rule.** Shadows are blurred with a negative spread and tinted plum or rose; the fixed offsets are vertical.

## Shapes

Soft and arched. Cards use 26-30px radii, nested gold hairline frames inset 8px with a 23px radius, fields 14px, all buttons and toggles full pills, with floral corners overhanging card corners. Petals are leaf shapes (100% 0 100% 0 radius). Arches, jharokha and torana silhouettes come from the SVG art.

## Components

### Buttons
- **Shape:** full pill (9999px).
- **Primary:** plum fill, gold-soft label in tracked caps 11px, padding 16px 24px, button-lift shadow, a slow diagonal shimmer (5s). Tap scales to 0.97.
- **Ghost:** 40% white fill, 1px plum/40 border, plum caps label, hover to 70% white.
- **Outline link (map):** 1px terracotta/50 border, terracotta-ink caps label with a pin icon, hover terracotta/10.
- **Focus:** global 2px plum outline, 3px offset.

### Cards / Containers
- **Day card (scroll):** ivory-to-blush gradient, 2px terracotta/70 border, 30px radius, inner gold hairline, four floral corners, gold scroll rod on one side, five swaying bead tassels below.
- **Form card:** 70% white, white/80 border, 28px radius.

### Inputs / Fields
- **Style:** 1px paper-edge border, 72% white fill, 14px radius, plum text, mauve placeholder.
- **Focus:** gold border, 4px gold glow, solid white fill. **Error:** rose border plus rose-ink message. 
- **Toggle and stepper:** pill segmented control with a sliding plum pill; guest stepper with 44px round targets.

### Signature: Wax seal envelope
Gold wax seal with a pulsing halo centred on a pale envelope on a carved pedestal; tapping opens it. It is the only primary action in the first viewport, with a quiet Skip pill.

## Do's and Don'ts

### Do:
- **Do** keep plum as the only action colour and gold as ornament.
- **Do** use ink-twin tokens for any text under 18px.
- **Do** build ornament as authored SVG in src/components/art/ and give every ambient animation a reduced-motion path.
- **Do** animate only transform and opacity, with the ease-out curve cubic-bezier(0.16, 1, 0.3, 1).
- **Do** keep labels in tracked caps for functional text (buttons, field labels, times).

### Don't:
- **Don't** use bright rose or terracotta for small text.
- **Don't** introduce hard-edged or black shadows.
- **Don't** add faces beyond the three voices (plus Devanagari for Hindi).
- **Don't** stack generic hero, feature-card and form blocks; each section is its own object.

**Not canonized:** 10-11px label text (the build uses it widely; it is small, treat as a legibility risk, not a standard), and the placeholder-art and no-music state.
