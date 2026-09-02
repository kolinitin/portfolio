# Contests: Designing for More Paid Joins

![placeholder](placeholder)

## Overview

I started leading Dream11’s Contests pod in late 2022, with the goal of increasing paid contest joins while improving contest experience and economics.

Over the following years, we explored and shipped many iterations across the contest journey. The three initiatives below are a small selection of that work, representing different problems across **user behaviour, contest economics, and wallet liquidity**.

* **QuickJoin:** Reducing repetitive friction for high-frequency users
* **Guaranteed+:** Improving contest economics without compromising trust
* **Early Winnings:** Unlocking wallet liquidity during match overlaps

---

## My Role

As the design lead for the Contests pod, I was part of the leadership group responsible for roadmap prioritisation and planning.

I was involved across:

* Product strategy and roadmap prioritisation
* User research and problem framing
* UX, interaction, visual design, and prototyping
* Product, Engineering, and Data/Analytics collaboration
* Experimentation, rollout, and post-launch analysis
* Leading other designers across these initiatives

---

## 01. :: QuickJoin

### Removing friction for high-frequency contest joining

Power-user research revealed that some users had hired additional people specifically to join contests on their behalf. These users could join **100-500 contests per match**.

The problem was the repetitive process:

**Join contest → wait for it to fill → find the next contest → join again**

This created significant time wastage and opportunity cost.

Power users represented only **~5% of the user base, but contributed ~80% of revenue**, making this a high-value problem to solve.

### The opportunity

> **How might we make high-volume contest joining dramatically faster without disrupting regular users?**

### Designing QuickJoin as a mode

We introduced QuickJoin as a separate mode rather than changing the default joining experience.

Most users joined only one or two contests, and users could move in and out of the power-user segment, making permanent cohorting impractical.

The mode kept the regular experience unchanged while allowing high-frequency users to join multiple instances of the same contest simultaneously.

```screens
Base Experience : [IMAGE URL] : Existing contest joining experience.
QuickJoin Mode : [IMAGE URL] : Users switch into QuickJoin when they want to bulk join.
Multiple Joins : [IMAGE URL] : Users select how many contest instances to join.
```

### Designing for speed without removing control

A normal single-tap join triggered a mandatory confirmation popup because money could not be deducted without explicit confirmation.

Instead of removing that safeguard, QuickJoin turned the button itself into the confirmation:

**First tap → button changes state → second tap confirms**

We tested both the two-tap interaction and simultaneous multiple joins. The approach was understood smoothly, so we proceeded.

```screens
QuickJoin Confirmation : [IMAGE URL] : Two-tap confirmation replacing the traditional popup.
```

### Starting small, then scaling

The first version allowed **1-10 instances**.

The limit was influenced by backend architecture and contest mapping, while also helping reduce the possibility of power users being matched against themselves.

After analysing usage, we increased the limit to **20 instances**, retaining familiar selection intervals.

```screens
Initial Selection : [IMAGE URL] : Initial QuickJoin selection, capped at 10.
Expanded Selection : [IMAGE URL] : Later version expanded to 20 based on usage.
```

### The result

```results
UPLIFT : 3% : in paid contest joins among power users.
```

QuickJoin also significantly reduced the time spent repeatedly joining contests by removing the need to wait for each contest to fill.

---

## 02. :: Guaranteed+

### Reducing overlay costs without compromising trust

After the GST rollout, shrinking margins made contest economics increasingly important.

A major cost leakage came from **overlays**, where Dream11 funded the gap when guaranteed contests did not fill as expected.

At the time, overlays and overlay protection accounted for approximately **0.55% of NCEA, or ~₹275 Cr annually**.

### The opportunity

> **How might we make prize pools more flexible without compromising the trust and excitement of a guaranteed contest?**

### A new prize-pool model

We explored a model where a base prize pool remained guaranteed while the total prize pool could grow as more users joined.

**₹10L guaranteed → potentially grows to ₹15L**

We also explored the opposite:

**₹15L prize pool → only ₹10L guaranteed**

The downward model felt like an over-promise followed by an under-delivery. We chose upward flexibility because it communicated progress rather than compromise.

### Designing for a changing contest

As a contest filled, several variables could change simultaneously:

```pointers
Spots : New spots could be added
Remaining : Spots left would update
Prize Pool : Total prize pool could increase
Winner % : Winner percentage could change
1st Prize : First-prize amount could increase
```

The challenge was finding a simple way to communicate these changes without overwhelming the contest card.

We explored different placements and structures, including splitting the contest into stages and unlocking the second portion as the first filled.

```screens
Exploration 1 : [IMAGE URL] : Exploring placements and ways to communicate changing variables.
Exploration 2 : [IMAGE URL] : Exploring a staged contest structure.
Exploration 3 : [IMAGE URL] : Exploring flexible-downward prize pool communication.
Exploration 4 : [IMAGE URL] : Additional explorations.
```

The final principle was simple:

**Keep the guaranteed amount clear, and make growth feel like an opportunity rather than uncertainty.**

### The final experience

The contest card communicated the guaranteed prize pool and its potential to grow. A supporting bottom sheet provided more detail for users who wanted to understand the mechanics.

```screens
Contest Card : [IMAGE URL] : Final Guaranteed+ treatment.
Bottom Sheet : [IMAGE URL] : Explains how the prize pool can grow.
```

### The result

```results
REDUCTION : ~40% : in overlay costs post-launch.
```

Player engagement and trust remained consistent, while the model created a framework for future dynamic-guarantee experiments.

---

## 03. :: Early Winnings

### Unlocking wallet liquidity during IPL

IPL was Dream11’s highest-revenue season, but overlapping matches created a specific problem.

On some days, the **3:30 PM match was still running when the 7:30 PM match was about to begin**.

Users had limited wallet balances and often relied on winnings from the first match to fund the second. When the first match had not officially ended, those winnings remained locked.

When the overlap was significant, users often **skipped the evening match**.

### The opportunity

> **How might we make likely winnings available earlier so users can participate in the next match?**

### Using data intelligence to identify likely winners

During the final **1-2 overs**, data intelligence could identify users who were highly likely to win.

We introduced Early Winnings, allowing eligible users to access their likely winnings before the match officially concluded.

The experience was surfaced:

* On the current live match
* On the upcoming match

```screens
Current Match : [IMAGE URL] : Nudge within the live match.
Next Match : [IMAGE URL] : Nudge on the upcoming match.
```

### Designing around legal and communication constraints

We could not simply tell users **“You’ve won”**, because the match was not officially over.

At the same time, users needed to understand that:

* Money was available to use.
* It represented their likely winnings.
* The amount would be reconciled after the official result.

We explored different messaging approaches to communicate this as an offer while making the value clear.

```screens
Messaging Explorations : [IMAGE URL] : Different messaging approaches.
Final Messaging : [IMAGE URL] : Final approach balancing clarity and legal constraints.
```

### Shipping during IPL

The feature was developed while IPL matches were actively taking place, leaving little time for conventional user testing.

We worked closely with Product, Engineering, Data, and stakeholders to rapidly evaluate options and reach alignment.

The design balanced:

```pointers
Legal : Avoid implying the match was officially settled
Clarity : Make the available amount understandable
Trust : Explain early winnings and final settlement
Speed : Ship during the live IPL season
Business : Increase participation in the next match
```

We proceeded based on design judgement, stakeholder buy-in, and available data signals.

### The result

```results
₹1 Cr : NGR uplift from Early Winnings.
```

Early Winnings helped unlock wallet liquidity at a critical point between consecutive matches.

---

## What these iterations show

These three initiatives are only a small selection from several years of work on the Contests pod.

They addressed different constraints:

* **QuickJoin:** Time and effort
* **Guaranteed+:** Contest economics
* **Early Winnings:** Wallet liquidity

Across these initiatives, my role was to identify the constraint behind the behaviour, connect it to a product opportunity, and work with cross-functional teams to ship and measure solutions.

The work was not about redesigning the contest experience once. It was about **continuously finding and removing the constraints that prevented users and the business from getting more value from contests.**
