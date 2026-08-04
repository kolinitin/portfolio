# Launching a social sports experience from concept to launch in ~2 months

![placeholder](placeholder)

```summary
CHALLENGE: RMG ban disrupted the core business, leaving millions of users without a meaningful product and immediate risk to engagement.
STRATEGY: Reframed the problem and built a watch-along platform, taking the product from concept to launch in **~2 months**.
RESULTS: Grew from 5M to 7M+ WAU within 2 months of launch, with 19.8 mins avg daily time spent, driving strong engagement during a high-uncertainty transition.
```

---

## Challenge :: When the Core Business Was Switched Off

With sudden RMG restrictions across India, Dream11’s core business faced immediate disruption. We were **burning capital to retain ~5M weekly active users**, without a clear product they could engage with.

This wasn't incremental innovation. It was a **survival problem**..
&nbsp;

### The Mandate

Build a new, non-RMG product that:

- Goes live quickly
- Retains the existing sports audience
- Creates a reason to return during live matches

**Guiding principle:** “No sports fan wants to watch a match alone.”

---

## Strategy :: Reframing the Core Experience

Instead of asking “What else can users play?”, we shifted to: “What do sports fans already do, and how can we amplify that?”

This led to a **Watch-Along platform**:

- Real-time match experience
- Social interaction layered on top
- Engagement without monetary dependency

**Team:** Cross-functional team of ~13, including 5 designers (1 lead), 5 product managers (1 lead), and 3 data analysts, over 2 months. Contributed as Principal Product Designer (IC).
&nbsp;

### Finding Direction, Fast

A 1-week sprint covered:

```timeline
Competitive Benchmarking : Twitch, Playback, YouTube, Instagram
Core Experience Definition : The watch-along loop
Engagement Design Exploration : Chat, reactions, predictions
Feasibility & Scalability Validation : Speed and scale trade-offs
Stakeholder Alignment : Get early buy-in on what to build
```

### Designing for Speed and Continuity
- Tight collaboration with Product, Engineering, and Content
- **Owned: Live-stream Engagement,** one of three workstreams alongside Creator Panel and Profile. Defined the core screen architecture and engagement tools with the design lead and one other designer.

---

## Concepts :: Early Explorations

```screens:small
https://pub-74f51145ab1c46dcabc851a4cda5d6a0.r2.dev/d11-watch-along/watch-along-1.png : Watch-along home: live creators surfaced at a glance
https://pub-74f51145ab1c46dcabc851a4cda5d6a0.r2.dev/d11-watch-along/watch-along-2.png : Fantasy page: free-to-play format continued through creator-led contests
https://pub-74f51145ab1c46dcabc851a4cda5d6a0.r2.dev/d11-watch-along/watch-along-3.png : Live-streaming screen (early concepts): live scores, running chat, raise-hand to go on stage
https://pub-74f51145ab1c46dcabc851a4cda5d6a0.r2.dev/d11-watch-along/watch-along-4.png : Creator-led contest leaderboard
https://pub-74f51145ab1c46dcabc851a4cda5d6a0.r2.dev/d11-watch-along/watch-along-5.png : Friends watch-along with live score animations
https://pub-74f51145ab1c46dcabc851a4cda5d6a0.r2.dev/d11-watch-along/watch-along-6.png : In-stream prediction games for the live match
https://pub-74f51145ab1c46dcabc851a4cda5d6a0.r2.dev/d11-watch-along/watch-along-7.png : Create and manage groups for friends watch-along
https://pub-74f51145ab1c46dcabc851a4cda5d6a0.r2.dev/d11-watch-along/watch-along-8.png : Rivalry Room: fan-vs-fan hype around match events through chat and reactions
https://pub-74f51145ab1c46dcabc851a4cda5d6a0.r2.dev/d11-watch-along/watch-along-9.png : Moments: reel-style short clips from creators and highlights from past watch-alongs
```

### Deprioritized for Launch

- **Raise-hand to go on stage:** High build effort with unclear demand, unproven whether users would proactively request to join a creator's stream. Replaced with a simpler flow: creators invite users on stage directly from the Creator Panel.

- **Live leaderboard rank on stream:** High cost to compute and surface real-time rank across multiple joined teams. Moved fantasy leaderboard access behind a click in the bottom controls instead of surfacing it live on-screen.

- **Friends watch-along:** Full friend-invite and group-management flow was too large a scope for the 2-month timeline. Launched with creator-led watch-alongs only.

- **Rivalry Room:** Unproven concept with high build uncertainty. Didn't make the cut for launch.

---

## launch :: Final Screens

With scope locked, we moved into final UI and interaction design across the full flow.

Screens shown reflect post-launch refinements. Initial launch prioritized speed; UX improvements followed in subsequent iterations.
&nbsp;

```evolution 412x892 width=320
Live-Stream Landing : https://pub-74f51145ab1c46dcabc851a4cda5d6a0.r2.dev/d11-watch-along/live-stream-landing.mp4 : Screen users see on landing in a live stream
Shoutouts : https://pub-74f51145ab1c46dcabc851a4cda5d6a0.r2.dev/d11-watch-along/shoutouts-compressed.mp4 : Tap to open shoutouts sent by others
Activity Bar : https://pub-74f51145ab1c46dcabc851a4cda5d6a0.r2.dev/d11-watch-along/activity-bar-compressed.mp4 : Activity bar with squad goals and updates on the current live stream
Scores & Fantasy Entry : https://pub-74f51145ab1c46dcabc851a4cda5d6a0.r2.dev/d11-watch-along/fantasy-and-reactions-compressed.mp4 : Entry point to scores and fantasy contests
Live Predictions : https://pub-74f51145ab1c46dcabc851a4cda5d6a0.r2.dev/d11-watch-along/hit-or-miss-compressed.mp4 : Real-time match engagement tools, like over-by-over predictions
Chat & Shoutouts : https://pub-74f51145ab1c46dcabc851a4cda5d6a0.r2.dev/d11-watch-along/send-shout-out-compressed.mp4 : Send a shoutout or a message to the stream
Home Page : https://pub-74f51145ab1c46dcabc851a4cda5d6a0.r2.dev/d11-watch-along/home-compressed.mp4 : Full home page: fantasy, live streams, moments, and upcoming streams
In-App Currency : https://pub-74f51145ab1c46dcabc851a4cda5d6a0.r2.dev/d11-watch-along/db-low-balance.png : Dreambucks purchase screen, triggered on low balance
```

---

## Results :: Shipping Under Pressure

End-to-end execution across ideation → design → development → launch, delivered in ~2 months under high uncertainty.

```results
USER GROWTH : 5M → 7M : Grew within 2 months of launching Watch Along on the Free-to-Play platform.
ENGAGEMENT : 19.8 mins : Avg daily time spent, driven by live match interactions and social participation
EXPANSION : New Line : Non-RMG product built on the existing sports audience and infra
```

---

## Updates :: Post-Launch Iterations

Launching in 2 months meant living with known UX gaps. Post-launch, we used engagement data to prioritize and refine the flows that mattered most.

```screens:big
https://pub-74f51145ab1c46dcabc851a4cda5d6a0.r2.dev/d11-watch-along/new-home.png : Redesigned Watch-Along home
https://pub-74f51145ab1c46dcabc851a4cda5d6a0.r2.dev/d11-watch-along/livestream-portrait-veiw.png : Widened the stream into landscape form, rearranging a few aspects of the screen
https://pub-74f51145ab1c46dcabc851a4cda5d6a0.r2.dev/d11-watch-along/squad-goal-expanded.png : Engagement tools got an expand and collapse mode, for quick swiping between them
https://pub-74f51145ab1c46dcabc851a4cda5d6a0.r2.dev/d11-watch-along/poll-text-expanded.png : Introduced textual polls
https://pub-74f51145ab1c46dcabc851a4cda5d6a0.r2.dev/d11-watch-along/polls-expanded.png : Introduced visual A-vs-B real-time polls
https://pub-74f51145ab1c46dcabc851a4cda5d6a0.r2.dev/d11-watch-along/hit-or-miss-expanded.png : Hit or Miss, shown in the expanded activity card alongside DB balance
https://pub-74f51145ab1c46dcabc851a4cda5d6a0.r2.dev/d11-watch-along/join-the-stage.png : Introduced Join the Stage: paid entry for 1:1 chat with the creator
https://pub-74f51145ab1c46dcabc851a4cda5d6a0.r2.dev/d11-watch-along/send-shoutout.png : Revisited shoutouts, bringing it upfront while typing a message
https://pub-74f51145ab1c46dcabc851a4cda5d6a0.r2.dev/d11-watch-along/new-shoutouts.png : Tap to open and read shoutouts
https://pub-74f51145ab1c46dcabc851a4cda5d6a0.r2.dev/d11-watch-along/gifts.png : Replaced reactions with gifts, giving users another way to get highlighted on stream and show their fandom
https://pub-74f51145ab1c46dcabc851a4cda5d6a0.r2.dev/d11-watch-along/entertainment-drawer.png : New activity drawer, replacing the horizontal dump of engagement tools
https://pub-74f51145ab1c46dcabc851a4cda5d6a0.r2.dev/d11-watch-along/livestream-controls.png : Video controls to enter landscape mode
https://pub-74f51145ab1c46dcabc851a4cda5d6a0.r2.dev/d11-watch-along/livestream-landscape.png : Default landscape view
https://pub-74f51145ab1c46dcabc851a4cda5d6a0.r2.dev/d11-watch-along/chat-shoutout-landscape.png : Drawer opens when the user taps the expand arrow
https://pub-74f51145ab1c46dcabc851a4cda5d6a0.r2.dev/d11-watch-along/squad-goal-landscape.png : Squad goals and other active engagement activities
```

---

## Key Takeaways

- **Move fast when it matters most** 
- Clear principles align teams faster than detailed plans
- Good design leadership is about making clear decisions in uncertainty

