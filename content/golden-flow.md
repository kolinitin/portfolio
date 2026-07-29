# Evolving the Golden Flow: Screens & Features Over 10 Years

![placeholder](placeholder)

## Context

I owned design across Dream11's core fantasy journey — home to live tracking — over multiple years and IPL seasons, for a product used by 250M+ users. I started as a Front-End Developer on Dream11's Progressive Web App, moving into design just an year and a half into my role. Every screen and feature here shipped as a scoped iteration, not a single planned redesign — a flow at this scale can't absorb a big-bang rebuild.

Patterns like the live mini scorecard, side-by-side team comparison, and points-linked commentary didn't exist elsewhere in fantasy sports when we built them — there was no reference UX to adapt. They later became standard across the category.

*(Real-money fantasy sports platforms, including Dream11, have been suspended in India since the Online Gaming Act, August 2025. This case study documents work done while the product was live.)*

---

## Overview

One gameplay journey: choose a match and contest, build a team, track it live. What follows is a selection of core screens and features from that journey — some are screens every user passed through, others are capabilities layered on top. Each shipped against a specific friction point or evolved through years of refinement.

### Screens & Features
1. Home (Screen) — Match Cards
2. Contest Listing (Screen) — Contest Cards
3. Create Team (Screen)
4. My Teams (Screen)
5. Lineups View (Feature)
6. Live Leaderboard (Screen) — with Live Mini Scorecard (Feature)
7. Compare Teams (Feature)
8. Fantasy Commentary (Feature)

*This is a curated selection — not the full scope of work on this flow.*

---

## Screen :: Match Cards (Home)

The primary discovery screen and first decision point when a user opens the app. Iterated the home screen and match card design across multiple versions over several seasons, expanding from a single-sport match list to a multi-sport, while refining visual density without adding clutter.

Also housed the DreamSale campaign — "Is Hafte Naya Kya?" — an 11-week themed weekly-offer structure. Outcome not independently measured; coincides with peak IPL traffic, so usage shifts can't be isolated to the redesign.
&nbsp;

```evolution
2016–17 : https://pub-74f51145ab1c46dcabc851a4cda5d6a0.r2.dev/d11-16-17.png : Earliest version of match cards.
2017–18 : https://pub-74f51145ab1c46dcabc851a4cda5d6a0.r2.dev/d11-17-18.png : Introduced more visual elements to a previously text-heavy screen.
2018–19 : https://pub-74f51145ab1c46dcabc851a4cda5d6a0.r2.dev/d11-18-19.png : Added sport selector tabs as coverage expanded beyond cricket, plus bottom nav for quick access to key sections.
2020–21 : https://pub-74f51145ab1c46dcabc851a4cda5d6a0.r2.dev/d11-20-21.png : Redesigned match cards to surface more critical match info (bottom nav carried over, not shown in this crop).
2022–23 : https://pub-74f51145ab1c46dcabc851a4cda5d6a0.r2.dev/d11-22-23.png : Redesigned home to include story-style marketing content, with a dedicated section for IPL as the marquee tournament.
2024–25 : https://pub-74f51145ab1c46dcabc851a4cda5d6a0.r2.dev/teaser_mockup.mp4 : Extended the yearly IPL campaign further — mirroring external marketing communication directly and seamlessly within the app.
```

---

## Screen :: Contest Cards

Primary screen driving contest joins — the core revenue decision point in the app. Evolved through incremental aesthetic refinements over several years, no full overhaul. Outcome not independently measured.
&nbsp;

```evolution
2016–17 : https://pub-74f51145ab1c46dcabc851a4cda5d6a0.r2.dev/d11-contests-16-17.png : Early contest card version — PWA cash contests list.
2017–18 : https://pub-74f51145ab1c46dcabc851a4cda5d6a0.r2.dev/d11-contests-17-18.png : Small incremental improvements, including a FOMO-driven progress bar to signal contest fill status.
2018–19 : https://pub-74f51145ab1c46dcabc851a4cda5d6a0.r2.dev/d11-contests-18-19.png : Focused on edge-case scenarios and running continuous A/B tests to validate changes.
2020–21 : https://pub-74f51145ab1c46dcabc851a4cda5d6a0.r2.dev/d11-contests-20-21.png : Revamped contest cards to surface critical data points, based on what research showed users actually scanned for.
2022–23 : https://pub-74f51145ab1c46dcabc851a4cda5d6a0.r2.dev/d11-contests-22-23.png : Added Quick Join to cut the time power users spent joining hundreds of contests, plus a Create Team FAB and quick contest navigation.
2024–25 : https://pub-74f51145ab1c46dcabc851a4cda5d6a0.r2.dev/d11-contests-24-25.png : Cleaned up the top section with a scalable approach to Quick Join and sorting pills, alongside minor visual refinements.
```

---

## Screen :: Create Team

The core team-creation screen, where the challenge was surfacing player stats, credits, and rules simultaneously without overwhelming users under a countdown timer. Structured the player list around role-based tabs (WK/BAT/AR/BOWL), with inline credit and points tracking, and persistent match context (score, time left, credits left) pinned to the top.

```results
COMPLETION RATE : 90% : On team creation funnel.
```

```evolution
2016–17 : https://pub-74f51145ab1c46dcabc851a4cda5d6a0.r2.dev/d11-create-team-16-17.png : PWA version of Create Team.
2017–18 : https://pub-74f51145ab1c46dcabc851a4cda5d6a0.r2.dev/d11-create-team-17-18.png : Explored and shipped different layouts for player cells and player categories.
2018–19 : https://pub-74f51145ab1c46dcabc851a4cda5d6a0.r2.dev/d11-create-team-18-19.png : Licensed player images enabled a redesign of player cells and the team-progress tracker.
2020–21 : https://pub-74f51145ab1c46dcabc851a4cda5d6a0.r2.dev/d11-create-team-20-21.png : Moved progression and team details to the top; player cells now show announced playing XI status.
2022–23 : https://pub-74f51145ab1c46dcabc851a4cda5d6a0.r2.dev/d11-create-team-22-23.png : Delivered a new categorization style for announced players, alongside a revamped FAB and quick stats.
2024–25 : https://pub-74f51145ab1c46dcabc851a4cda5d6a0.r2.dev/d11-create-team-24-25.png : Learned that stats weren't adding much value — removed redundant data points and optimized for a cleaner screen.
```

---

## Screen :: My Teams

Team preview cards were originally generic grey boxes with names and numbers. Redesigned into full identity cards with captain/vice-captain photos and role breakdown. Outcome not independently measured; core design held unchanged after launch.
&nbsp;

```evolution
2016–17 : https://pub-74f51145ab1c46dcabc851a4cda5d6a0.r2.dev/d11-my-teams-16-17.png : PWA version of My Teams.
2017–18 : https://pub-74f51145ab1c46dcabc851a4cda5d6a0.r2.dev/d11-my-teams-17-18.png : Brought team composition info upfront, with direct edit and preview actions.
2020–21 : https://pub-74f51145ab1c46dcabc851a4cda5d6a0.r2.dev/d11-my-teams-20-21.png : Carried the pitch background from full team preview onto the card itself — signaling it as a compact version, not plain text boxes.
2023–24 : https://pub-74f51145ab1c46dcabc851a4cda5d6a0.r2.dev/d11-my-teams-23-24.png : Held steady with minor visual tweaks, combining Lineups View entry point with the Create Team FAB.
```

---

## Feature :: Lineups View

**Problem:** Users relied on post-toss batting order to finalize picks, often leaving the app to check it elsewhere.

**Solution:** Built a side-by-side lineups view for both teams; later evolved to support team creation directly from within it.

```results
ADOPTION : 45% : Of match-active users
RETENTION : 60% : Of match-active users
```

```evolution
Initial Launch : https://pub-74f51145ab1c46dcabc851a4cda5d6a0.r2.dev/d11-lineups-initial.png : Read-only side-by-side batting order. Research showed users wanted to build teams directly from here.
Team Creation Integrated : https://pub-74f51145ab1c46dcabc851a4cda5d6a0.r2.dev/d11-lineups-create-team.png : Letting users create teams within lineups view saw near-default usage — planned as the primary flow, but never shipped before the ban.
```

---

## Screen / Feature :: Leaderboard with Live Mini Scorecard — Screen / Feature

**Problem**: Users left the app to track live match scores separately from their fantasy rank.

**Solution**: Added a persistent mini scorecard on the leaderboard, combining match score and fantasy rank in one view.

```results
ADOPTION : 85% : Of match-active users
RETENTION : 80% : Of match-active users
```

```evolution
2016–17 : https://pub-74f51145ab1c46dcabc851a4cda5d6a0.r2.dev/d11-leaderboard-16-17.png : Initial PWA leaderboard, no live score tracking.
2017–18 : https://pub-74f51145ab1c46dcabc851a4cda5d6a0.r2.dev/d11-leaderboard-17-18.png : Introduced a simple scorecard for match tracking.
2020–21 : https://pub-74f51145ab1c46dcabc851a4cda5d6a0.r2.dev/d11-leaderboard-20-21.png : Visual improvements to bring more match excitement into the scorecard.
2022–23 : https://pub-74f51145ab1c46dcabc851a4cda5d6a0.r2.dev/d11-leaderboard-22-23.png : Added ball-by-ball events, engaging users to track each ball alongside their fantasy rank.
2024–25 : https://pub-74f51145ab1c46dcabc851a4cda5d6a0.r2.dev/d11-leaderboard-24-25.mp4 : Added special-event animations and let users open the full scorecard directly from the mini version, without switching tabs.
```

---

## Feature :: Fantasy Commentary

**Problem**: Ball-by-ball commentary didn't connect match events to fantasy points earned.

**Solution**: Merged commentary with live points earned per event, attributed to the players involved.

```results
ADOPTION : 60% : Of match-active users
RETENTION : 40% : Of match-active users
```

```screen
https://pub-74f51145ab1c46dcabc851a4cda5d6a0.r2.dev/d11-fantasy-commentary.png : Merged commentary with Fantasy points
```

---

## Feature :: Compare Teams

**Problem**: Users manually opened and closed other users' teams to mentally compare against their own — slow and error-prone.

**Solution**: Dedicated compare view showing both users' full 11 side by side, split into differing players and common players with different captain choices.

```results
ADOPTION : 8% : Of match-active users
RETENTION : 15% : Of match-active users
```

```screen
https://pub-74f51145ab1c46dcabc851a4cda5d6a0.r2.dev/d11-compare-team.png : Dedicated side-by-side team comparison view
```

---

*This is a curated selection — not the full scope of work on this flow, which also included player info, full scorecard, private contests, team preview, my matches, my contests, winning states, contest details, choose captain & vice-captain, stats, and many other features built on top of these flows.*

<!-- *A few related initiatives are documented as separate case studies, given their different scope from the UX/screen work above:* 

- *Optimising Overlays with Flexible Prize Pools — redesigning contest prize-pool structures to reduce overlay costs (~40% reduction), business/monetization-focused.*

- *Quick Join Mode (Contest Screen) — a streamlined join flow that drove a 3% increase in paid contest joins, conversion-focused.*

- *Design System — platform/infra work, distinct from user-facing feature/screen work.* -->