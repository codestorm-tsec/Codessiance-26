# Codessiance '26 — "Hack Wrapped" 
### Build Specification & Agent Prompt Pack
**Event:** TSEC CodeStorm's flagship 24-hour offline hackathon
**Theme:** Spotify Wrapped — the hackathon told as your year-end music wrap
**Reference (last year):** tseccodestorm.dev/CodeStorm (One Piece theme)
**Stack:** Next.js (App Router) · TypeScript · Tailwind CSS · shadcn/ui · React Bits · GSAP (+ScrollTrigger) · Three.js (react-three-fiber)

---

## 0. Concept in one line

The site *is* a Spotify Wrapped playback. You don't "scroll a webpage" — you **press play** on Codessiance, and each section is a Wrapped "slide" (Top Artist → Top Genre → Minutes Listened, etc., remapped to Domains → Timeline → Prizes → Sponsors → FAQ). A persistent music-player bar at the bottom drives a "track" whose progress = how far you've scrolled through the event experience, and every section transition plays the same abstract-blob morph transition Spotify Wrapped uses between slides.

---

## 1. Design System

### 1.1 Colors (pull exact tokens from the shared Figma — Spotify Community file — before coding; these are the canonical Spotify values to use as fallback)

| Token | Hex | Usage |
|---|---|---|
| `--spotify-black` | `#121212` | Primary background |
| `--spotify-black-pure` | `#000000` | Player bar, deepest sections |
| `--spotify-elevated` | `#181818` | Cards, elevated surfaces |
| `--spotify-elevated-hover` | `#282828` | Card hover state |
| `--spotify-green` | `#1DB954` | Primary accent, CTAs |
| `--spotify-green-bright` | `#1ED760` | Hover/active accent |
| `--spotify-white` | `#FFFFFF` | Primary text |
| `--spotify-grey` | `#B3B3B3` | Secondary text |
| `--spotify-grey-subtle` | `#727272` | Tertiary/disabled text |
| Wrap gradient accents | `#F037A5, #536AE2, #FFCC00, #FF6437` | Used ONLY inside the abstract blob transition + wrap-style section backgrounds (Spotify Wrapped uses saturated duotone gradients per "slide," not just green) |

Each major section should get **one duotone gradient identity** (like real Wrapped slides do), e.g.:
- Hero / Intro → green → black radial
- Domains ("Your Top Genres") → purple → blue gradient
- Timeline ("Minutes Listened") → orange → pink gradient
- Prizes ("Top Artist") → yellow → green gradient
- Sponsors ("Featuring") → blue → green gradient
- FAQ / Outro ("Recap") → full duotone loop back to green/black

### 1.2 Typography
- Display face: a heavy, condensed grotesque (Spotify uses **Spotify Circular / Circular Std**, which is proprietary — use **"Inter Tight" or "Archivo"** at weight 800–900 as the closest free alternative, condensed and tight tracking for big Wrapped-style numerals).
- Body face: **Inter** (400–600).
- Numerals (big stat callouts like "24 HOURS", "₹60,000 PRIZE POOL") should always use the display face at very large scale, mimicking Wrapped's giant number cards.

### 1.3 Component surface language
- Cards: `bg-[--spotify-elevated]`, `rounded-lg` (Spotify uses fairly small radii, 8px, not overly rounded), subtle scale+shadow on hover, never a bright border — use glow instead.
- Player bar: fixed bottom, `bg-[--spotify-black-pure]`, 3-zone flex layout (now playing / center controls / volume-analog progress), exactly like Spotify/Gaana desktop player.
- Buttons: pill-shaped primary CTA in `--spotify-green`, black text, scales up ~4% on hover (Spotify's signature button hover).

### 1.4 Motion language
- Section-to-section transitions: full-viewport **liquid blob morph wipe** (SVG path morph via GSAP, or a WebGL shader plane) in the current section's gradient colors, ~600–900ms, easing `power3.inOut`.
- Scroll-linked reveals: GSAP ScrollTrigger `scrub` for parallax/pin sections, not just fade-ins.
- Micro-interactions: card hover = play-button overlay fades in (like a Spotify track row), icon rotates/scales.
- Global "now playing" timeline: a slim progress bar pinned to the player, filled by overall scroll progress (`0–100%`) across the entire site, with a "timestamp" (mm:ss) counting up as if a track were playing — purely decorative, tied to `ScrollTrigger.create({ onUpdate })`.

---

## 2. Site Map (mapped from last year's IA → Wrapped vocabulary)

| Old (One Piece) | New (Wrapped) | Purpose |
|---|---|---|
| Loading | **Loading / "Buffering your year"** | Custom loader, see §4.0 |
| Home/Hero | **Intro — "Codessiance Wrapped '26"** | Press Play hero |
| Domains | **"Your Top Genres"** | Hackathon tracks/domains as genre cards |
| Crew Recruitment | **"Featured Artists" / Team Recruitment** | CodeStorm committee/organizer showcase |
| Timeline | **"Minutes Listened" — Event Timeline** | 24-hr schedule as a continuous playing track |
| Prizes | **"Top Artist of the Year"** | Prize pool reveal, big numeral cards |
| Sponsors | **"In Rotation" / Sponsors** | Sponsor logos as album art grid |
| FAQ | **"Your Recap" / FAQ** | Accordion, shadcn |
| Footer/Register | **Outro — "Add to Playlist" (Register CTA)** | Final CTA + socials, styled like a Wrapped share card |

Keep this order — it mirrors the actual Spotify Wrapped narrative arc (identity reveal → genres → artists → minutes → recap → share), so the page-transition metaphor makes sense.

---

## 3. Tech Stack & Libraries

```
Framework:      Next.js 14+ (App Router, TypeScript)
Styling:        Tailwind CSS + CSS variables for the token system above
UI primitives:  shadcn/ui (accordion, dialog, tabs, tooltip, navigation-menu, sheet, progress)
Animated cards: React Bits (SpotlightCard, TiltedCard, MagicBento or similar — pick components matching "playlist card" and "track row" feel)
Animation:      GSAP + ScrollTrigger + (optionally SplitText for headline reveals) + Lenis (smooth scroll)
3D:             three.js via @react-three/fiber + @react-three/drei (glassy/frosted 3D elements — MeshTransmissionMaterial from drei is ideal for the "3D glassy" ask)
Fonts:          next/font (Inter Tight or Archivo + Inter)
Icons:          lucide-react
Deployment:     Vercel
```

Key packages to install:
```bash
npx create-next-app@latest codessiance-26 --typescript --tailwind --app --eslint
cd codessiance-26
npx shadcn@latest init
npm i gsap @gsap/react lenis
npm i three @react-three/fiber @react-three/drei
npm i clsx tailwind-merge lucide-react
npm i framer-motion   # optional, only if React Bits components require it
```

---

## 4. Section-by-Section Spec

### 4.0 Loader ("Buffering your year")
- Full-black screen, centered circular progress ring styled exactly like Spotify's loading spinner (thin ring, green arc sweeping).
- Percentage counter 0→100 in the display font.
- Below it, a line of text that cycles like Wrapped's loading copy: "Counting your commits…", "Analyzing your caffeine intake…", "Mixing your hackathon playlist…".
- On 100%, ring collapses into a green dot, dot expands to fill screen (GSAP scale to `9999px` clip-path circle), revealing Hero underneath — this is the classic Spotify Wrapped "burst open" transition.

### 4.1 Hero / Intro — "Codessiance Wrapped '26"
- Full-viewport, deep black→green radial gradient background.
- 3D glassy element (react-three-fiber): a large frosted-glass rotating shape (torus/blob using `MeshTransmissionMaterial`) slowly rotating behind the headline, mouse-parallax on desktop.
- Headline: giant Wrapped-style stat card treatment — "24 HOURS. 1 CAMPUS. YOUR STORY." (big display numerals like the Wrapped "You listened to X minutes" card).
- Sub-copy: one line about Codessiance '26 + dates + TSEC CodeStorm.
- Primary CTA: pill button "▶ Press Play to Register" → scrolls to outro/registration or links to Unstop (external, same as last year).
- Secondary CTA (ghost): "Scroll to explore your wrap ↓"
- A visible "now playing" strip at the very bottom (this is actually the persistent player, see §5).

### 4.2 "Your Top Genres" — Domains
- Section background: purple→blue duotone.
- Each hackathon domain (Web/App, AI/ML, Industry track, etc. — confirm actual domains for '26) is a **playlist card**: album-art-style square, gradient-filled, domain icon, name, team-slot count, prize tag — built with React Bits `TiltedCard` or `SpotlightCard`.
- On hover: play-button circle fades in center of card (exact Spotify track-row hover pattern), card lifts + tilts toward cursor.
- Cards animate in via GSAP ScrollTrigger stagger (translateY + fade), pinned section while cards cascade in like a horizontal "genre carousel" (optional horizontal-scroll-on-vertical-scroll pattern, Wrapped-style).

### 4.3 "Featured Artists" — Crew / Organizer Recruitment
- Grid of CodeStorm committee "artist cards" (circular photo like an Artist Wrapped card), duotone-filled backgrounds per card, name + role + monthly-listener-style stat swapped for a fun stat ("500+ commits reviewed" etc.)
- Recruitment CTA block styled like Spotify's "Follow" button pattern.

### 4.4 "Minutes Listened" — Event Timeline
- The **signature interaction** of the site. A single continuous horizontal "track" (like a Spotify progress scrubber) spans this section; as the user scrolls, a playhead moves along it in sync (GSAP scrub tied to section scroll progress).
- Each timeline milestone (Reporting, Inauguration, Hackathon Kickoff, Lunch, Mentoring Round, Dinner, Judging, Results...) is a **timestamp marker** on the scrubber, like chapter markers on a podcast player. Marker pops/glows as the playhead passes it, with the event label + time revealing above/below.
- Background: orange→pink duotone, waveform SVG (static, styled like an audio waveform) running behind the whole timeline for texture.
- On mobile: rotate to a vertical scrubber, same mechanic.

### 4.5 "Top Artist of the Year" — Prizes
- Big numeral "reveal" cards, exactly like Wrapped's #1-Artist card: massive prize amount in display font, gradient background (yellow→green), confetti-particle burst (small GSAP/canvas particle burst, or three.js instanced particles) triggered once when scrolled into view.
- 3 domain-prize cards laid out like a "Top 3" countdown (#3, #2, #1) with #1 (grand prize) visually dominant, matching Wrapped's ranked-list pattern.

### 4.6 "In Rotation" — Sponsors
- Sponsor logos displayed as an "album art" grid — square tiles, logo centered on a soft duotone card, subtle continuous horizontal auto-scroll marquee (GSAP infinite loop) for the tier of sponsors with more logos, like a "recently played" row.
- Tier labels (Title Sponsor, Powered By, Partners) styled like Wrapped's category labels ("Genre", "Podcast", "Artist").

### 4.7 "Your Recap" — FAQ
- shadcn `Accordion`, styled dark, green accent on expand icon.
- Section framed as "frequently played questions" — keep copy from last year (participation, cost, application, prizes, no-code-experience, remote/offline) updated for TSEC/Codessiance '26 specifics.

### 4.8 Outro — "Add to Playlist" / Register + Footer
- Final full-viewport duotone (loops back to green/black, closing the "wrap" narrative).
- Big CTA replicating Wrapped's shareable summary card aesthetic: a stat-card mockup of "Your Codessiance Wrap" (e.g., "Top Genre: AI/ML", "Duration: 24 Hours", "Prize Pool: ₹XX,000") with a "Register Now →" button styled like Wrapped's share button.
- Footer: quick links, contact, social icons (Instagram/LinkedIn/X), copyright — reuse last year's footer content, restyle to dark Spotify chrome.

---

## 5. Persistent Music Player Bar (global component)

Fixed bottom bar, present on every section (like Spotify desktop/Gaana web player):
- **Left zone:** "Now Playing" = current section name + a tiny rotating vinyl/icon that reflects which section is in view (e.g., shows "Your Top Genres" when in §4.2). Update via ScrollTrigger `onEnter`/IntersectionObserver.
- **Center zone:** decorative playback controls (prev / play-pause / next) — play-pause can be *functional*: toggles background ambient audio (optional, muted by default, small speaker toggle) or simply toggles autoplay of scroll-linked animations.
- **Center-bottom:** scrubber bar = overall page scroll progress (0–100%), draggable to jump between sections (nice-to-have stretch goal), with mm:ss timestamp that maps section order to a "runtime" (e.g., total site scroll mapped to a fictional 3:24 track length).
- **Right zone:** volume-style icon repurposed as a quick section-jump menu (shadcn `NavigationMenu` or `Sheet`) — this doubles as the site's nav.

---

## 6. Page Transitions ("blob morph")

Between each major section (or on route change if using multiple routes):
1. On trigger, render a full-screen fixed `<svg>`/canvas with a blob path in the **outgoing** section's gradient colors.
2. GSAP morphs the blob path (multiple `<path>` keyframes via `MorphSVGPlugin` if licensed, or manual path array + `gsap.to(path, {attr:{d:...}})` if avoiding the paid plugin) while scaling it to cover the viewport.
3. Cross-fade to the **incoming** section's gradient as the blob covers 100%, then reverse-morph/shrink away.
4. Alternative if avoiding MorphSVG entirely: use several overlapping blurred `radial-gradient` divs animated with GSAP `scale`/`clipPath` — cheaper, still reads as "abstract colored shape" transition, and is what's actually shown in the brief.

This transition should also gate scroll (temporarily lock scroll, or use it as a "chapter" reveal) at least once — for the Hero → Genres transition — to establish the motif; subsequent section transitions can be lighter-weight scroll-tied versions of the same blob motif so the site doesn't feel like it's constantly interrupting the user.

---

## 7. 3D / Glassy Elements (three.js)

- Use `@react-three/fiber` + `@react-three/drei`'s `MeshTransmissionMaterial` (or `MeshPhysicalMaterial` with high transmission/roughness=0) for frosted-glass shapes.
- Suggested placements: Hero background shape, a glass "vinyl record"/disc floating near the Prizes section, a glass phone/speaker mockup near the player-bar concept if doing a dedicated "player" showcase section.
- Keep polycount low, use `<Suspense>` fallback, lazy-load the R3F canvas (`next/dynamic`, `ssr:false`) so it never blocks first paint.
- Respect `prefers-reduced-motion`: freeze rotation/parallax when set.

---

## 8. Folder Structure

```
/app
  /layout.tsx           -> fonts, global providers, Lenis smooth-scroll wrapper
  /page.tsx              -> composes all sections in order
  /globals.css            -> Tailwind + CSS var tokens
/components
  /player/PlayerBar.tsx
  /player/ScrollProgress.tsx
  /loader/Loader.tsx
  /transitions/BlobTransition.tsx
  /sections/Hero.tsx
  /sections/Genres.tsx        (Domains)
  /sections/Artists.tsx       (Crew)
  /sections/Timeline.tsx
  /sections/TopArtist.tsx     (Prizes)
  /sections/InRotation.tsx    (Sponsors)
  /sections/Recap.tsx         (FAQ)
  /sections/Outro.tsx         (Register + Footer)
  /three/GlassShape.tsx
  /three/GlassCanvas.tsx
  /ui/...                     shadcn generated components
/lib
  /gsapConfig.ts          -> ScrollTrigger registration, Lenis + GSAP ticker sync
  /constants.ts           -> domains, timeline events, sponsors, faq data (typed)
  /colors.ts              -> exported token map mirrored from globals.css
/public
  /fonts, /icons, /images
```

---

## 9. Build Phases (do these in order; each phase should be a separate agent session/prompt)

**Phase 0 — Scaffold & Design Tokens**
Set up Next.js + Tailwind + shadcn, wire the color/typography tokens from §1, install all libraries from §3, set up Lenis + GSAP ScrollTrigger sync in `lib/gsapConfig.ts`.

**Phase 1 — Static Layout (no animation yet)**
Build every section from §4 as static, fully-responsive components with real (or clearly-marked placeholder) copy and shadcn primitives. Get the full page scrollable top to bottom with correct content and layout before adding any motion.

**Phase 2 — Player Bar + Global Nav**
Build the persistent player bar (§5), wire section-detection (IntersectionObserver), wire the scroll-progress fill.

**Phase 3 — Loader + Entry Animation**
Build the loader (§4.0) and its burst-open transition into the Hero.

**Phase 4 — Scroll Animations per Section**
Add GSAP ScrollTrigger reveals/pins/scrub animations to each section per §4's individual specs, starting with the Timeline scrubber (§4.4) since it's the signature piece.

**Phase 5 — Blob/Section Transitions**
Implement §6's transition system and hook it to section boundaries.

**Phase 6 — 3D Glass Elements**
Add the react-three-fiber glass shapes per §7, lazy-loaded.

**Phase 7 — Polish Pass**
Cross-browser/device QA, reduced-motion support, Lighthouse pass (target 90+ perf on mobile even with 3D — lazy-load aggressively), replace all placeholder copy/images/sponsor logos with real assets, meta tags/OG image (styled like a Wrapped share card), favicon.

---

## 10. Ready-to-Use Agent Prompts

Copy each block below as a separate message to your coding agent, in order. Each assumes the previous phase is complete and in the repo.

### Prompt — Phase 0
```
Set up a new Next.js 14 App Router project in TypeScript called "codessiance-26".
Install and configure: Tailwind CSS, shadcn/ui (init with the "slate" base then override
tokens), GSAP + @gsap/react + ScrollTrigger, Lenis for smooth scroll, three.js with
@react-three/fiber and @react-three/drei, lucide-react.

In globals.css, define these CSS variables for a Spotify-inspired dark theme:
--spotify-black:#121212; --spotify-black-pure:#000000; --spotify-elevated:#181818;
--spotify-elevated-hover:#282828; --spotify-green:#1DB954; --spotify-green-bright:#1ED760;
--spotify-white:#FFFFFF; --spotify-grey:#B3B3B3; --spotify-grey-subtle:#727272.
Also define 5 duotone gradient pairs as CSS variables for section identities:
genres (purple->blue), timeline (orange->pink), prizes (yellow->green),
sponsors (blue->green), outro (green->black).

Load "Archivo" (weight 400-900) as the display font and "Inter" (400-600) as body font
via next/font/google, expose as Tailwind font families "font-display" and "font-body".

Create lib/gsapConfig.ts that registers ScrollTrigger, initializes Lenis, and syncs Lenis's
scroll event to GSAP's ticker (per Lenis + GSAP ScrollTrigger integration best practices, using
lenis.on('scroll', ScrollTrigger.update) and gsap.ticker.add).

Set up the base app/layout.tsx to wrap children in the Lenis smooth-scroll provider and
apply the fonts/theme. Confirm the dev server runs cleanly with no console errors.
```

### Prompt — Phase 1
```
Using the design system and site map already established (5 duotone section identities:
genres=purple/blue, timeline=orange/pink, prizes=yellow/green, sponsors=blue/green,
outro=green/black; fonts font-display/font-body; colors --spotify-*), build fully static,
fully responsive (mobile-first) versions of these sections as separate components in
/components/sections, and compose them in order on app/page.tsx:

1. Hero.tsx — "Your Top Genres" full-bleed headline treatment: giant stat-style headline
   "24 HOURS. 1 CAMPUS. YOUR STORY.", one-line subcopy about Codessiance '26 by TSEC CodeStorm,
   a primary pill CTA button ("Press Play to Register") and a ghost secondary CTA
   ("Scroll to explore your wrap"). Leave a labeled placeholder div for a future 3D canvas.

2. Genres.tsx — "Your Top Genres" domains section. Build a responsive grid of playlist-style
   cards using shadcn Card as a base (I'll swap in React Bits card components later) for:
   Web/App, AI/ML, and Industry Track domains (use placeholder team-count/prize values,
   clearly marked TODO). Duotone purple/blue section background.

3. Artists.tsx — "Featured Artists" grid of ~6 placeholder committee member cards (circular
   avatar placeholder, name, role) plus a recruitment CTA block.

4. Timeline.tsx — "Minutes Listened" event timeline. For now render it as a clean vertical
   (mobile) / horizontal (desktop) list of milestones with time + label, using this schedule
   (placeholder, mark TODO to confirm final): 08:00 Reporting & Registration, 10:00 Inauguration,
   11:00 Hackathon Begins, 13:30 Lunch, 19:00 Mentoring Round, 21:00 Dinner, next day 11:00
   Internal Judging, 12:30 Shortlist Announcement, 14:00-16:00 Final Judging,
   17:00 Closing Ceremony & Results. Orange/pink duotone background.

5. TopArtist.tsx — "Top Artist of the Year" prizes section: 3 ranked prize cards (#3 Industry,
   #2 AI/ML, #1 Web/App — TODO mark actual amounts, use ₹20,000 each as placeholder),
   #1 visually largest/most prominent. Yellow/green duotone.

6. InRotation.tsx — "In Rotation" sponsors: logo grid grouped by tier (Title Sponsor,
   Powered By, Partners) with placeholder logo boxes. Blue/green duotone.

7. Recap.tsx — "Your Recap" FAQ using shadcn Accordion, dark styled, green accent, with these
   Q&As (edit copy for Codessiance '26/TSEC specifics): who can participate, cost, how to apply,
   prizes, no-code-experience-needed, is it remote (answer: fully offline/in-person).

8. Outro.tsx — final CTA styled like a shareable Wrapped summary card (stat rows: Top Genre,
   Duration, Prize Pool) with a "Register Now" button, plus a footer with quick links,
   contact info, and social icons (Instagram/LinkedIn/X placeholders), dark chrome styling.

No animation yet — just correct semantic HTML, accessible markup, and responsive layout with
Tailwind. Use shadcn components wherever a primitive fits (Card, Accordion, Button, Separator).
```

### Prompt — Phase 2
```
Build a persistent, fixed-bottom PlayerBar component (components/player/PlayerBar.tsx),
styled like the Spotify/Gaana desktop web player, present on every page:

- Left zone: shows the name of whichever section is currently in viewport
  ("Your Top Genres", "Minutes Listened", etc.) with a small pulsing/rotating icon.
  Detect the active section using IntersectionObserver across all section refs.
- Center zone: decorative prev / play-pause / next icon buttons (lucide-react). Play-pause
  should be functionally wired to a Zustand or React Context "isPlaying" state (default true)
  that other components can later read (e.g., to pause ambient audio or looping animations).
- Below center: a slim horizontal progress bar representing overall page scroll progress
  (0-100%), updated on scroll (use the Lenis/ScrollTrigger setup from Phase 0), with a
  "runtime" timestamp (mm:ss) that maps 0-100% scroll to a fictional 3:24 track length,
  formatted like "1:47 / 3:24".
- Right zone: a button opening a shadcn Sheet or NavigationMenu listing all sections as
  quick-jump links (smooth-scrolls via Lenis to that section).

Bar background: --spotify-black-pure, subtle top border, sits above all content with proper
z-index, doesn't overlap content on mobile (adjust bottom padding site-wide). Fully keyboard
accessible.
```

### Prompt — Phase 3
```
Build a Loader component (components/loader/Loader.tsx) shown on initial page load, full-black
screen, centered:
- A thin circular progress ring (SVG stroke-dashoffset animated with GSAP) sweeping in
  --spotify-green from 0-100% over ~2.5s.
- A percentage counter (0-100) in font-display, large, centered inside the ring.
- Below the ring, cycle through these loading lines every ~500ms using GSAP text
  crossfade: "Counting your commits...", "Analyzing your caffeine intake...",
  "Mixing your hackathon playlist...", "Tuning 24 hours of code...".

On reaching 100%: animate the ring/dot scaling up via clip-path circle() from a small radius
to fully cover the viewport (GSAP, power3.inOut, ~800ms), revealing the Hero section beneath
once the circle fully covers the screen, then fade the loader element out and remove it from
the DOM. Guard this with a check so the loader only plays once per session (sessionStorage flag),
not on every client-side navigation. Respect prefers-reduced-motion by skipping straight to a
simple fade instead of the circle-expand.
```

### Prompt — Phase 4
```
Add GSAP ScrollTrigger-driven animations to each section, building on the static Phase 1
components. Register all animations inside useGSAP (from @gsap/react) scoped to each
section's ref, and clean up on unmount.

1. Hero: on mount (not scroll), staggered fade+slide-up of headline words (split by word),
   subcopy, and CTAs (~0.6s stagger 0.08s).

2. Genres (domains): pin the section while its cards cascade in via ScrollTrigger scrub -
   each card staggers in with a translateY(40px)->0 + opacity fade + slight scale, triggered
   as the section enters. On card hover: a centered circular play-button overlay fades/scales
   in (0-1), matching Spotify's track-row hover pattern; card lifts (translateY -6px) and
   gets a soft box-shadow glow in the section's accent color.

3. Timeline: THIS IS THE SIGNATURE INTERACTION. Build a single continuous scrubber
   (a long line/track, horizontal on desktop scrolling within a pinned/wide section,
   vertical stacked on mobile) with a "playhead" dot that moves along it in sync with
   ScrollTrigger scrub tied to this section's scroll progress (0-1 mapped to 0%-100% along
   the track). Each timeline milestone is a marker positioned along the track; as the
   playhead passes a marker, that marker's dot glows/scales up and its time+label
   (previously dimmed) animates to full opacity/scale. Add a static SVG audio-waveform
   graphic behind the track for texture (looping bars of varying height, no need to
   animate the waveform itself, just style it).

4. TopArtist (prizes): trigger a one-time particle "confetti burst" (small canvas or GSAP
   physics-lite particle burst, ~30-40 particles in green/gold) when the #1 prize card
   scrolls into view, using ScrollTrigger with once:true.

5. InRotation (sponsors): implement an infinite horizontal auto-scrolling marquee of sponsor
   logos using GSAP (duplicate the logo row, animate xPercent -50 linear infinite, pause on
   hover).

6. Recap/Outro: simple scroll-triggered fade+slide reveals, nothing elaborate - the loudest
   animation was the Timeline, keep the ending calm.

Ensure all ScrollTrigger instances are properly killed/refreshed on route change and that
reduced-motion users get instant, non-scrubbed reveals instead.
```

### Prompt — Phase 5
```
Implement a full-screen abstract "blob morph" transition (components/transitions/BlobTransition.tsx)
that plays between major sections, using layered blurred radial-gradient shapes animated with
GSAP (clip-path and scale/translate transforms) in each section's duotone accent colors -
avoid the paid MorphSVG plugin; use 3-4 overlapping blurred circular divs that scale up from
0 to cover the viewport then scale back down/away, timed so the incoming section's background
is revealed at the peak of coverage.

Trigger this transition:
(a) once, heavier version (~900ms, scroll-locked) on the Hero -> Genres boundary to establish
    the motif, using ScrollTrigger with a scroll-jack/pin approach,
(b) lighter versions (~500ms, non-blocking, purely decorative, scrubbed with scroll rather than
    locking it) at each subsequent section boundary.

Make the blob's colors read from each section's CSS gradient variables so it automatically
matches the outgoing/incoming section identity. Test that it doesn't jank on mobile - reduce
particle/layer count on small viewports.
```

### Prompt — Phase 6
```
Add glassy 3D elements using @react-three/fiber and @react-three/drei:

1. In Hero.tsx, replace the placeholder div with a lazy-loaded (next/dynamic, ssr:false)
   <GlassCanvas> containing a single large torus or blobby icosahedron using drei's
   MeshTransmissionMaterial (high transmission, low roughness, subtle chromatic aberration)
   lit by an Environment preset, slowly auto-rotating, with subtle mouse-parallax on desktop
   (lerp camera or group rotation toward pointer position) and static on touch devices.

2. In TopArtist.tsx (prizes), add a smaller floating glass "vinyl disc" or "trophy" shape
   near the #1 card using the same material, auto-rotating.

Wrap all R3F canvases in <Suspense> with a lightweight fallback (blurred gradient placeholder,
not a spinner, so there's no layout jank). Cap pixel ratio at 1.5 for perf. Freeze all
rotation/parallax when prefers-reduced-motion is set. Confirm Lighthouse performance score
stays above 85 on mobile after adding these.
```

### Prompt — Phase 7
```
Final polish pass across the whole site:
- Audit every section at 375px, 768px, 1024px, 1440px widths - fix any overflow, spacing, or
  font-scaling issues.
- Verify keyboard navigation reaches every interactive element (player bar controls, nav sheet,
  accordion, CTAs) in a logical order with visible focus states.
- Run a Lighthouse pass (mobile + desktop) and address any performance flags, especially around
  the R3F canvases and GSAP ScrollTriggers (make sure ScrollTrigger.refresh() is called
  correctly on resize/route change and there are no duplicate/leaked triggers).
- Confirm prefers-reduced-motion is respected everywhere motion was added in Phases 3-6.
- Replace all TODO placeholder copy, sponsor logos, committee photos, and confirmed
  domains/timeline/prize figures with final content.
- Add metadata: page title "Codessiance '26 | TSEC CodeStorm", description, and an Open Graph
  image styled like a Spotify Wrapped share card (dark background, big stat, green accent) for
  social link previews. Add favicon.
- Do a final cross-browser check (Chrome, Safari, Firefox) especially for the
  MeshTransmissionMaterial glass effect and clip-path transitions, which vary most across
  browsers.
```

---

## 11. Open Items to Confirm Before/During Build

- [ ] Pull exact hex codes + component specs from the shared Spotify Figma community file (colors above are Spotify's public brand values as a safe fallback — the Figma may have Codessiance-specific adaptations).
- [ ] Confirm final domain list + team slots + prize amounts for '26 (used placeholders from '25).
- [ ] Confirm final 24-hr schedule/timeline for '26.
- [ ] Confirm sponsor list and logo assets for '26.
- [ ] Confirm registration platform (Unstop again, or different) for the CTA link.
- [ ] Decide whether the "play" button in the player bar should trigger real ambient audio (adds licensing/asset consideration) or stay purely decorative/animation-control.
- [ ] Decide on single-page (`/`) vs multi-route structure — spec above assumes single scrollable page with anchor-based section nav, matching last year's site and simplifying the transition system.

---

## 12. Definition of Done

- Loader → burst-open → Hero plays correctly on first load only.
- All 8 sections present, responsive, and reachable via the player bar's quick-jump nav.
- Timeline scrubber accurately reflects scroll position with working milestone markers.
- Section transitions use the duotone blob motif at least at the Hero→Genres boundary.
- Player bar's scroll-progress + timestamp updates smoothly across the whole page.
- 3D glass elements render without blocking initial paint and respect reduced-motion.
- Lighthouse mobile performance ≥ 85, accessibility ≥ 90.
- All placeholder/TODO content replaced with confirmed Codessiance '26 details.
