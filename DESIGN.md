---
name: Nitin Koli Portfolio
description: Personal portfolio and design leadership showcase for Nitin Koli
colors:
  bg-black: "#0d0a10"
  surface: "#18151f"
  surface-container: "#221e2b"
  white: "#FFFFFF"
  accent: "#d29f22"
  accent-red: "#5d0018"
  outline-variant: "#2d2936"
typography:
  display:
    fontFamily: "Rubik, sans-serif"
    fontWeight: 500
    letterSpacing: "-0.05em"
  body:
    fontFamily: "Noto Sans, sans-serif"
    fontWeight: 400
    lineHeight: 1.625
rounded:
  sm: "8px"
  md: "16px"
  lg: "24px"
  full: "9999px"
spacing:
  sm: "12px"
  md: "24px"
  lg: "48px"
components:
  button-primary:
    backgroundColor: "{colors.white}"
    textColor: "{colors.bg-black}"
    rounded: "{rounded.full}"
    padding: "12px 24px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.white}"
    rounded: "{rounded.full}"
    padding: "12px 24px"
---

# Design System: Nitin Koli Portfolio

## Overview

**Creative North Star: "Precision Craft & Scale Authority"**

A sleek, dark-mode portfolio interface that balances high-density product metrics, detailed design leadership narratives, and interactive case study artifacts. Built for busy executives and product leaders, the design uses high-contrast typography, deep obsidian surfaces, rich gold accents, and subtle motion transitions.

**Key Characteristics:**
- Deep obsidian backdrop (`#0d0a10`) with layered surface cards (`#18151f`, `#221e2b`).
- Sharp, modern typography pairing **Rubik** (Display) with **Noto Sans** (Body).
- Warm gold accent highlights (`#d29f22`) for metric numbers, tags, and key indicators.
- Smooth GSAP reveal transitions and interactive media components (device carousels, custom video players with frame-accurate scrubbing).

## Colors

The color system uses deep dark background tones to establish contrast, paired with crisp white text and gold accent accents.

- **Background Black (`#0d0a10`)**: Primary canvas color.
- **Surface (`#18151f`)**: Background for cards, containers, and metric highlights.
- **Surface Container (`#221e2b`)**: Slightly elevated container background.
- **Accent Gold (`#d29f22`)**: Highlight color for metric emphasis, tags, and active states.
- **Outline Variant (`#2d2936`)**: Ghost borders and section dividers.

## Typography

- **Display Font (`Rubik`)**: Used for page headers, metric numbers, and section titles with tight letter-spacing (`-0.05em`).
- **Body Font (`Noto Sans`)**: Used for narrative text, descriptions, captions, and case study body text (`line-height: 1.625`).

## Layout

- **Container Width**: Centered main container max-width of `840px` for high readability.
- **Responsive Padding**: `px-6` horizontal padding with dynamic vertical spacing (`py-16` to `py-32`).
- **Screen Tracks**: Custom horizontal scrolling tracks with dynamic gap adjustment (`gap-10` to `gap-16`) for guaranteed false-cut affordance.

## Elevation & Depth

- Tonal elevation using layered surface values (`#0d0a10` → `#18151f` → `#221e2b`).
- Glassmorphic top navigation (`backdrop-blur-2xl`) and interactive video hover overlays.
- Ghost borders (`1px solid #2d2936`) defining card edges without visual noise.

## Shapes

- Rounded pill buttons (`rounded-full`) for CTAs and tags.
- Rounded surface cards (`rounded-2xl`, `rounded-3xl`) for metric blocks and device frames.

## Components

- **Header Nav**: Fixed top navigation bar with glassmorphic blur, brand badge, desktop links, and mobile drawer.
- **Metric Cards**: Surface containers highlighting key scale numbers (250M+ users, 6 → 55 team scale).
- **Evolution Carousel**: 3D gesture-driven card carousel with dynamic device resolution support (360x720, 412x892).
- **Video Player**: Hover-activated player with center play/pause button and frame-accurate pointer-capture seek scrubbing.

## Do's and Don'ts

- **Do**: Maintain high-contrast text ratios across dark backgrounds.
- **Do**: Use `aspect-ratio` containers for device screenshots to prevent clipping.
- **Don't**: Introduce bright non-brand accent colors outside the defined gold (`#d29f22`) palette.
- **Don't**: Use static heights on media containers that break mobile aspect ratios.
