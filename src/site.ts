// Single source of truth for identity, links, nav, and work history.
//
// The prose here is a DRAFT written from your résumé and your project docs so
// the site has real text. Read it in your own voice and change what does not
// sound like you.

export const site = {
  name: "Aadit Golwala",
  tagline: "ML and software engineer",
  currently: "SWE intern at Unlearn · ML research at Purdue ECE",
  intro:
    "I'm a computer engineering student at Purdue. Right now I'm at Unlearn, working on the models and data tooling behind clinical-trial digital twins, and in Purdue's ECE department building multimodal computer vision for a holographic display. Outside of that I ship things: an iOS app on TestFlight, a backpack that went from a spec sheet to pre-production samples, a RAG service that respects document permissions.",
  about: [
    "Most of what I build gets shipped rather than left in a notebook. That is partly temperament and partly where I came from: FRC robotics, where a design that only exists in CAD has not happened yet. A CNC router and a 3D printer feel about as normal to me as a terminal, which is how a laptop backpack ended up on this page next to a RAG service.",
    "The through-line is the same either way — find the part that is actually hard, measure it, and be honest about what did not work.",
  ],
  location: "West Lafayette, IN",
  email: "24agolwala@gmail.com",
  // Empty until the PDF is in public/. Links to it stay hidden while unset.
  resume: "" as string,
  // Optional. Drop a photo in public/ (e.g. public/me.jpg, square-ish, ≥ 600px)
  // and set the path; the hero renders it. A candid one reads better than a
  // headshot. Nothing renders while this is empty.
  photo: "" as string,
  url: "https://aaditgolwala.com",
} as const;

export const links = {
  github: "https://github.com/aaditg",
  linkedin: "https://www.linkedin.com/in/aadit-golwala",
} as const;

export const nav = [
  { href: "/#building", label: "Building" },
  { href: "/#research", label: "Research" },
  { href: "/#work", label: "Work" },
  { href: "/#writing", label: "Writing" },
  { href: "/#about", label: "About" },
] as const;

// Roles, newest first. Bullets mirror the résumé; keep the two in sync.
export const experience = [
  {
    company: "Unlearn",
    url: "https://unlearn.ai",
    what: "AI-generated digital twins of patients, to run smaller and faster clinical trials.",
    role: "Software Engineering Intern",
    period: "2026 — present",
    bullets: [
      "Model architecture and experiment tracking for the disease-progression models behind the digital twins, alongside published researchers.",
      "Data protocols and curation, agentic workflows, and the internal tooling the research team runs on.",
    ],
  },
  {
    company: "Perception Innovations · Purdue ECE",
    what: "The Lightform 1 holographic display.",
    role: "Machine Learning Engineer",
    period: "2025 — present",
    bullets: [
      "Neural networks that detect face position and eye angle from live video, so the hologram stays in the viewer's line of sight.",
      "Gesture-detection models that track hands and movement for touchless interaction. With Prof. Alan, Purdue ECE.",
    ],
  },
  {
    company: "Oro Labs",
    url: "https://orolabs.ai",
    what: "Agentic procurement orchestration for enterprises.",
    role: "Software Engineering Intern",
    period: "Summer 2025",
    bullets: [
      "Streamlined CI/CD and deployment pipelines in GitHub Actions — roughly 10% of engineering time saved.",
      "Internal tools and automation scripts that took about 80% of routine fixes off people's plates.",
      "Backend development and testing, with AWS.",
    ],
  },
  {
    company: "DataMermaid",
    url: "https://datamermaid.org",
    what: "An open platform for coral-reef survey data.",
    role: "Software Engineering Intern",
    period: "Summer 2023",
    bullets: [
      "R and Python pipelines that pull survey data from several research platforms, transform it, and load it into MERMAID through its APIs.",
      "The result: researchers analyse data from multiple platforms in one place instead of reconciling exports by hand.",
    ],
  },
] as const;
