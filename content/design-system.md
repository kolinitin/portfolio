# Design System for Dream11

![placeholder](placeholder)

```summary
CHALLENGE: Rapid growth led to inconsistent UI, slow design-to-dev handoff, and teams diverging on shared patterns, with no dedicated team or budget to fix it.
STRATEGY: Initiated and led a tokenized design system, syncing Figma directly to code via the Figma API, taking it from concept to v1 launch in **~6 months** with a 3-designer, 3-engineer team working part-time alongside regular delivery work.
RESULTS: Reduced manual QA back-and-forth and design-to-dev handoff time through reusable, drag-and-drop components; the system remained Dream11's core UI foundation through the platform's shutdown.
```

---

## CHALLENGE :: The Problem

Three compounding issues:

```pointers
Inconsistent UI : Similar components looked and behaved differently depending on which team built them.
Slow handoff : Every screen required manual spec documentation and back-and-forth QA between design and engineering.
Fragmentation : No shared source of truth meant teams were solving the same problems repeatedly, in different ways.
```

There was no dedicated team or mandate to fix this. I initiated the conversation to build a design system.

### My Role

I led the initiative from the planning phase, working with three engineers to define the technical approach. In this phase I was the only designer involved: framing the problem, running explorations, and driving the team toward a final architecture.

---

## STRATEGY :: The Approach

The core decision: tokenize everything, and have engineering consume tokens directly via the Figma API rather than through manual spec handoff.

Alongside the token architecture, we defined:
- Naming conventions for tokens and components
- Component prioritization and build sequence
- Timelines for phased rollout
- Error-prevention checks to catch inconsistencies before they shipped

**Governance model:** I held sole edit access to the main library file. Contributors worked in branches; I reviewed and merged. This kept the system coherent as more people touched it.

#### Figma to code, in four steps

```pipeline
Figma library : Tokens as variables
Figma API : Syncs token values
Token file : Platform-agnostic JSON
Codebase : Components consume tokens
```
&nbsp;

#### Naming convention, applied
![wide: Every attribute named by component, variant, state, and property: no ambiguity for engineering to consume](https://pub-74f51145ab1c46dcabc851a4cda5d6a0.r2.dev/component-tokens-breakdown.png)

### Team and Execution

Once the approach was locked, three designers joined to execute, split by domain: color palette, typography, base components, and tokenization.

The harder problem was organizational, not technical: there was no dedicated headcount for this work. We negotiated to protect 30-40% of our time (roughly 2-3 hours a day) while still delivering regular feature work the rest of the time. Sustaining that bandwidth, and keeping the team aligned across the switching, was the main constraint on progress.

---

## What Shipped (v1, 6 months)

Eighteen tokenized foundations and components went live in the first version:

### Foundations

Colors, Typography, Spacing, Radius, Border, Elevation, Opacity

![Global tokens feed alias tokens, scoped so Figma only surfaces what's relevant: background colors on a frame, text colors on text](https://pub-74f51145ab1c46dcabc851a4cda5d6a0.r2.dev/design-system-colors.png)
![Typography tokens spanning two typefaces, structured by use case: headline, title, label, button, body, caption](https://pub-74f51145ab1c46dcabc851a4cda5d6a0.r2.dev/design-system-typography.png)
![Spacing tokens, built from a single 4px unit into a full system of multiples and halves](https://pub-74f51145ab1c46dcabc851a4cda5d6a0.r2.dev/design-system-spacing.png)

### Components

A tokenized library across actions, inputs, navigation, and feedback.

![wide: A tokenized component library, one shared source of truth](https://pub-74f51145ab1c46dcabc851a4cda5d6a0.r2.dev/all-components.png)

---

## RESULTS :: The Impact

Directionally, after adoption:
- Manual QA back-and-forth on minor UI details dropped, since components matched spec by default
- Design-to-dev handoff sped up, as designers could drag and drop existing components instead of redesigning from scratch
- Cross-team consistency improved

### Evolution

v1 remained the core system through to the platform's shutdown. Only minor iterations followed. Colors, typography, and a handful of additional components. No major revamp was needed.

---

## External Validation

In 2024, I presented this work at the Figma Design & Dev Leaders meet, covering the challenges we faced, our approach, how we built and maintained the system, and what we learned.

![Presenting at the Figma Design & Dev Leaders Meetup, 2024](https://pub-74f51145ab1c46dcabc851a4cda5d6a0.r2.dev/speaker-figma-event.jpg)

---

## Key Learning

Persistent collaboration and a deliberate execution strategy are what got this built, not tooling or process alone. Without dedicated headcount, the system only existed because a small group kept fighting for the time to build it, in parallel with regular delivery work.
