# aaditgolwala.com — content plan

Written 14 September 2026, alongside the scaffold. This is the working doc: what
goes on the site, why, and what is still missing. The code is a skeleton; this
is the part that decides whether the site works.

---

## 1. What the research actually says

Six sources, mostly agreeing (links at the bottom). The findings that changed
decisions here:

| Finding | What it means for this site |
| --- | --- |
| Visitors decide in **under 30 seconds** | Everything that matters is above the fold: name, one line on what you do, links, résumé. No hero animation, no scroll-to-reveal. |
| **3–5 projects beat 10+** | Five featured. Everything else is a one-line row that links to GitHub. |
| **84% of employers want a working demo**, not just a repo | Every featured project needs a live link, a video, or a screenshot. A repo link alone is the weakest option. |
| Tutorial projects are the #1 tell | No todo app, no weather app, no calculator. Nothing from a course. |
| "Show the process, not the polish" | Each case study has a **hard part** section. This is the single biggest differentiator and the one most people skip. The content schema requires the field so it cannot be forgotten. |
| Generic About sections kill credibility | No "passionate developer who loves solving problems". Say what you actually work on. |
| Stale sites read as careless | A visible "last updated", and the uptime job keeps you honest about the site being alive. |
| Skill bars are actively bad | Stack is a plain list per project. No percentages, no star ratings. |

Design consensus across the examples (Brittany Chiang, Josh Comeau, Julian
Ramirez): one column, one or two typefaces, generous whitespace, curated
projects, subtle motion at most. The scaffold follows this.

---

## 2. Positioning — ML / software engineer

Chosen deliberately over the wider "builds hardware and software" framing. That
story is true but diffuses the signal for SWE/MLE internship screens, which is
what this site is for right now.

**Tagline** (fill in `src/site.ts`) — under 10 words, concrete. Drafts:

- "ML and software engineer. Purdue CE, currently at Unlearn."
- "I build ML systems and the software around them."
- "Computer engineering at Purdue. ML research, shipped products."

**Intro** (2–3 sentences). Should carry: Purdue CE, the Unlearn internship, the
Perception Innovations research, and the fact that you ship whole products, not
just notebooks. Written in first person, no adjectives about yourself.

**About section.** Longer, still short. Somewhere to put the range — the
backpack, the CNC and 3D printing, FRC — as texture rather than as the headline.
It makes you memorable without confusing the pitch.

---

## 3. The project lineup

### Featured — full case studies (5)

| # | Project | Why it leads | What it needs from you |
| --- | --- | --- | --- |
| 1 | **Lightform 1** — gaze + gesture tracking | Real research, ongoing, with a named professor and a physical system behind it. Almost no undergrad has this. | ⚠️ Repo is marked proprietary. Get Prof. Alan's OK on what you can describe. Writeup only, no code. A demo clip (even face-mesh overlay on your own webcam) would carry it. |
| 2 | **Petnix** | The only thing here that is genuinely *shipped* — App Store track, real schema, E2E suite gating builds. Product engineering, not a demo. | Screenshots or a 20s screen recording. Decide if `PetPal` goes public. Live link already exists: petnix.app. |
| 3 | **PAOS** | Systems depth: isolation, permissions, approvals, audit. Reads as architecture, not glue code. | Private repo — writeup only, or extract a public core. An architecture diagram would do more than a paragraph. |
| 4 | **VerityRAG** | Already public. FastAPI + SQS worker + Terraform on AWS, ACL-safe retrieval. Infra + retrieval in one. | Clean the README. The ACL-safety angle is the interesting part — lead with it, not with "RAG". |
| 5 | **Mentra paper solver** | Short, delightful, instantly legible. Smart glasses, voice trigger, vision, spoken answer. The one people remember. | A 15-second GIF of it working is worth more than the rest of the page. Repo is private — publish it. |

### Second tier — one-line rows

`foodeals` · `ALIGNA` · `MusicSentimentAnalysis` · `TensorFlow CNN generator`

ALIGNA sits here rather than in the featured set only because of the ML/SWE
positioning. If a conversation ever goes toward hardware or product, it moves up.

### Leave off entirely

`Basic-Neural-Net`, `Neural-Net-Stock-Predictor`, `ViteReactTestTeach`,
`Spotipy-Use`, `Discord-Connectivity-Bot`, `Color-Based-Subject-Selection`,
`MyProjects` (2019), `Posh-Pricing-Model`.

These are learning exercises. On a public GitHub they are fine; linked from a
portfolio they drag the average down. Consider archiving them on GitHub so the
profile itself reads curated — that page gets clicked as often as this site.

### One worth reconsidering

`yunServerAdaptable` (Arduino Yún, C++) is the only embedded thing you have
public. It is old and thin, so it stays off — but note that for a *computer
engineering* résumé, the absence of anything bare-metal, RTL, or PCB is the one
real gap in this lineup. Not a problem for ML/SWE roles. Worth one project
sometime if you ever want CE-specific roles open to you.

---

## 4. Site structure

One page, four anchors, plus a case-study page per featured project.

```
/                    Hero → Work → Selected projects → Also → About
/projects/<slug>     Problem · What I built · The hard part · Results · What I'd change
/404
```

`Work` lists Unlearn, Perception Innovations, Oro Labs, DataMermaid — already
filled in from the résumé in `src/site.ts`. Keep it in sync with the PDF.

A `/writing` section exists in the content schema but is not routed yet. Add it
when there is a first post; an empty blog is worse than no blog.

---

## 5. Open items

1. **Résumé PDF** — drop `Aadit_Golwala_Resume_SWE.pdf` into `public/` as
   `Aadit_Golwala_Resume.pdf`. The footer and hero already link to it.
2. **Proprietary check on Lightform 1** before that page goes live.
3. **Repo visibility** — `mentra`, `PetPal`, `personal-agent-platform` are
   private. Featured projects want either a public repo or a strong writeup.
4. **Media.** Every featured project needs one real image, clip, or live link.
   This is the difference between the site working and not.
5. **Design pass.** The scaffold is intentionally plain — tokens in
   `src/styles/global.css`, no committed visual direction yet.
6. **Every project is `draft: true`.** They are excluded from production builds
   until flipped, so nothing half-written can leak to the live site.

---

## 6. Suggested order

1. Résumé into `public/`, tagline and intro in `src/site.ts` — the site is then
   already useful.
2. Petnix and Mentra first. Both have obvious media and short stories.
3. Lightform 1 once you have the clearance.
4. VerityRAG and PAOS.
5. Design pass last, when there is real content to design around.

---

## Sources

- [sitebuilderreport — engineer portfolios](https://www.sitebuilderreport.com/inspiration/engineer-portfolios)
- [sitebuilderreport — software engineer portfolios](https://www.sitebuilderreport.com/inspiration/software-engineer-portfolios)
- [Lovable — student portfolio examples](https://lovable.dev/guides/student-portfolio-examples)
- [Hakia — developer portfolio guide 2026](https://hakia.com/skills/building-portfolio/)
- [DEV — portfolios that actually get you hired](https://dev.to/__be2942592/how-to-build-a-developer-portfolio-that-actually-gets-you-hired-2026-6kn)
- [curious.page — personal websites for developers](https://curious.page/blog/best-personal-website-examples-developers)
