# Home: Evolving the First Decision Point

![placeholder](placeholder)

## Overview

I owned Dream11’s Home experience from 2019 to May 2026. Home helped users discover matches, decide what to play, track joined matches, and support seasonal initiatives.

Its core question remained:

> **What deserves attention, when does it matter, and how much space should it occupy?**

The examples below are selected interventions from that work. They were not part of one redesign, but reflect how I worked across Product, Design, Tech, Analytics, Research, and Marketing to evolve the experience over time.

---

## My Role

I owned Home alongside other product areas. In late 2022, Home and Contest became a dedicated pod, with two designers reporting to me.

My responsibilities included:

* Product strategy and quarterly planning
* Prioritisation with Product and Tech
* UX, interaction, and visual design
* Experimentation and iteration
* Cross-functional execution

Prioritisation typically began with Product, Design, and Tech leads using ICE scoring, followed by alignment with the founder and CXOs.

We used analytics, funnel behaviour, research, and A/B testing to guide decisions. New features were often launched to a small user segment, iterated, and progressively rolled out.

---

## 01. :: DreamSale

### Turning a marketing campaign into a product experience

DreamSale began in 2023 as a one-week IPL campaign. In 2026, Marketing wanted to turn it into a tournament-long campaign with a new offer each week: **“Iss hafte naya kya?”**

The challenge was to make a changing campaign feel native to the fantasy journey while remaining consistent with external communication.

### The constraints

The experience had to fit within a fixed area of Home while making each weekly offer clear and engaging.

Animation was important to the campaign, but Lottie files also had to remain small enough to avoid materially affecting Home’s load time.

The challenge was balancing:

```pointers
 Placement : Where the campaign should live
 Context : How users would understand the offer
 Continuity : How the space could support a new offer each week
 Consistency : How the in-app experience connected to external communication
 Performance : How to use animation without increasing load time unnecessarily
```

### Exploring the direction

Three designers, including me, explored three directions across placement and visual treatment. We evaluated how naturally each fit into Home and how well it could support weekly changes.

```screens
Base Screen : https://pub-74f51145ab1c46dcabc851a4cda5d6a0.r2.dev/d11-home/d11-base-home.png : This was the base screen we started off with.
Concept 1 &nbsp; ❌ : https://pub-74f51145ab1c46dcabc851a4cda5d6a0.r2.dev/d11-home/explorations-1.png : Animated overlay banner to bring the campaign to life.
Concept 2 &nbsp; ❌ : https://pub-74f51145ab1c46dcabc851a4cda5d6a0.r2.dev/d11-home/explorations-2.png : Visually rich match cards combining core match information with campaign messaging.
Concept 3 &nbsp; ✅ : https://pub-74f51145ab1c46dcabc851a4cda5d6a0.r2.dev/d11-home/explorations-3.png : Compact match cards with greater visual emphasis on the campaign.
```

Concept 3 was selected as the direction for final design.

### Designing with the teams

Marketing defined the weekly offer narrative. Product and Design tracked campaign deliverables, while Tech joined early to identify feasibility and implementation constraints.

![wide: DreamSale deliverables and weekly narratives tracking sheet](https://pub-74f51145ab1c46dcabc851a4cda5d6a0.r2.dev/d11-home/dreamsale-deliverables.png)

A daily one-hour catch-up helped resolve blockers and keep the campaign moving.

### The result

The campaign was integrated across three key touchpoints in the fantasy journey: Home, Contest Cards, and Contest Details. Each touchpoint carried the campaign context forward, creating a consistent experience from discovery to contest entry.

```screens 360x740
Home : https://pub-74f51145ab1c46dcabc851a4cda5d6a0.r2.dev/d11-home/dreamsale-home.mp4 : This was the base screen we started off with.
Contest Cards : https://pub-74f51145ab1c46dcabc851a4cda5d6a0.r2.dev/d11-home/dreamsale-contest-card.mp4 : This was the base screen we started off with.
Contest Details : https://pub-74f51145ab1c46dcabc851a4cda5d6a0.r2.dev/d11-home/dreamsale-contest-details.mp4 : This was the base screen we started off with.
```

With support from an illustrator, graphic designer, and animator, DreamSale evolved from a one-week promotion into an IPL-long experience, using the same Home real estate to deliver a fresh animated campaign story each week without structural changes.

```evolution 360x740
Teaser : https://pub-74f51145ab1c46dcabc851a4cda5d6a0.r2.dev/d11-home/teaser-mockup.mp4 : The final DreamSale experience in 2026
Week 1 : https://pub-74f51145ab1c46dcabc851a4cda5d6a0.r2.dev/d11-home/teaser-mockup.mp4 : The final DreamSale experience in 2026
```

---

## 02. :: Highlighted Players

### Helping users decide whether a match was worth playing

Home supported matches with very different levels of popularity. While users recognised players in major matches, lower-tier matches lacked that familiarity.

### The insight

Research found lower Create Team completion rates for lower-tier matches. One possible reason was that users did not know enough about the players to decide whether to play.

This suggested an opportunity to introduce familiarity earlier, on Home.

### The intervention

The existing match card already showed key information, including the mega-contest prize pool. We explored ways to add player familiarity without making the card denser:

* Multiple players
* Names versus images
* Different explanations and placements
* Icons and supporting treatments

We chose to show one marquee player, enough to create a familiarity cue without competing with the card’s primary hierarchy.

We also explored rotating multiple player names, but rejected it because it reduced clarity.

![medium: Marquee player card treatment](https://pub-74f51145ab1c46dcabc851a4cda5d6a0.r2.dev/d11-home/marquee-player-final-mc.png)

### Measuring the decision

We ran an A/B test:

* **Control:** Existing match card
* **Experiment:** Match card with a marquee player

The experiment produced a **1.4% uplift in matches played for non-popular matches** and was progressively rolled out.

Sports Operations managed the player shown for each match using existing tooling and signals such as popularity and performance.

### What this changed

The intervention was small, but the underlying decision was broader:

**Familiarity can be useful decision-making information.**

---

## 03. :: My Matches

### Reconsidering what deserves permanent space

My Matches showed the tension between persistent visibility and contextual relevance.

### The problem

The horizontal My Matches carousel could occupy as much vertical space as a standard match card. It was most useful when a joined match was:

* About to start
* Live
* Recently completed

```screens 360x728
https://pub-74f51145ab1c46dcabc851a4cda5d6a0.r2.dev/d11-home/my-matches-default.png : Horizontal carousel of joined matches
annotation: left, 220px, Carousel occupies vertical real estate when match is far away.
```

When matches were far away, it consumed valuable Home space with limited immediate value. It also duplicated matches shown in the upcoming list.

### A second access point

My Matches was also available through the second item in the bottom navigation. That destination contained all joined matches across Upcoming, Live, and Completed states.

```screens 360x728
https://pub-74f51145ab1c46dcabc851a4cda5d6a0.r2.dev/d11-home/my-matches-tab.png : Bottom navigation with My Matches as the second of five navigation items
annotation: left, y=600px, x=68px, Dedicated my matches page entry point.
```

Because the carousel handled much of the interaction, bottom-nav adoption was lower, approximately 25%.

This raised an information architecture question:

> **Could we remove the persistent carousel without making My Matches harder to access?**

### The proposed direction

I explored consolidating My Matches into a contextual **quick drawer** above the bottom navigation.

The drawer would surface:

**Upcoming → Live → Completed**

This preserved access while removing duplication and returning Home space to information that was more consistently relevant.

### Exploration snapshots

The explorations examined different ways to make My Matches accessible without reserving a persistent carousel on Home.

![wide: Explorations for entry-point placement, and state-based organisation.](https://pub-74f51145ab1c46dcabc851a4cda5d6a0.r2.dev/d11-home/my-matches-explorations.png)

### Final designs

The prototype illustrates the proposed quick drawer from a single contextual entry point. This also frees up crucial Home real estate, allowing more upcoming matches to be surfaced within the first fold.

```screens 360x728
Base Screen : https://pub-74f51145ab1c46dcabc851a4cda5d6a0.r2.dev/d11-home/my-matches-default.png : Horizontal carousel of joined matches
New Version : https://pub-74f51145ab1c46dcabc851a4cda5d6a0.r2.dev/d11-home/my-matches-final.mp4 : Drawer for joined matches
```

The drawer was designed to adapt to the user's match context, surfacing the most relevant information at each stage of the journey, from upcoming matches to live and completed games.

![Wide: Match is far from starting](https://pub-74f51145ab1c46dcabc851a4cda5d6a0.r2.dev/d11-home/my-matches-1.png)

![Wide: Match starting soon](https://pub-74f51145ab1c46dcabc851a4cda5d6a0.r2.dev/d11-home/my-matches-2.png)

![Wide: During the live match](https://pub-74f51145ab1c46dcabc851a4cda5d6a0.r2.dev/d11-home/my-matches-3.png)

![Wide: After the match](https://pub-74f51145ab1c46dcabc851a4cda5d6a0.r2.dev/d11-home/my-matches-4.png)

![Wide: Winning state](https://pub-74f51145ab1c46dcabc851a4cda5d6a0.r2.dev/d11-home/my-matches-5.png)

### What happened

The concept was designed but never entered development. It was completed shortly before India’s national ban on real-money fantasy sports.

There is no shipped-product metric or usability result to claim. The next step would have been usability testing and experimentation before rollout.

---

## What these iterations show

These were separate interventions, not one Home redesign.

Together, they reflect a consistent approach to a constrained, high-traffic surface:

### Start with the problem, not the UI.

* **Highlighted Players:** Help users evaluate unfamiliar matches.
* **My Matches:** Question whether important information needs permanent space.
* **DreamSale:** Integrate a changing business initiative without turning Home into a promotional canvas.

Across each, the work balanced **information, attention, space, and context**, with decisions shaped through close collaboration across Product, Tech, Marketing, and other teams.
