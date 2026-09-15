// Single source of truth for identity, links, and nav.
//
// The copy below is a DRAFT written from your résumé so the design could be
// built against real text instead of lorem ipsum. Read it in your own voice and
// change anything that does not sound like you — especially `intro` and
// `about`, which are the two places a site stops sounding like a template.

export const site = {
  name: "Aadit Golwala",
  // Under ten words. Sits directly under the name.
  tagline: "ML and software engineer",
  // One line, present tense. Signals the site is alive — research is blunt
  // that a stale-looking site reads as careless.
  currently: "SWE intern at Unlearn · ML research at Purdue ECE",
  intro:
    "I'm a computer engineering student at Purdue. Right now I'm at Unlearn, working on the models and data tooling behind clinical-trial digital twins, and in Purdue's ECE department building multimodal computer vision for a holographic display.",
  about: [
    "Most of what I build outside of research gets shipped rather than left in a notebook — an iOS app on TestFlight, an ACL-safe RAG service on AWS, a pair of smart glasses that read a homework problem out loud and answer it.",
    "I came up through FRC robotics, which is why a CNC router and a 3D printer feel about as normal to me as a terminal. That is also how a posture-corrective backpack ended up going from a spec sheet to pre-production samples.",
  ],
  location: "West Lafayette, IN",
  email: "24agolwala@gmail.com",
  // Empty until the PDF is in public/. Links to it are hidden while unset,
  // so CI does not fail on a link to a file that is not there yet.
  resume: "" as string,
  url: "https://aaditgolwala.com",
} as const;

export const links = {
  github: "https://github.com/aaditg",
  linkedin: "https://www.linkedin.com/in/aadit-golwala",
} as const;

export const nav = [
  { href: "/#work", label: "Work" },
  { href: "/#projects", label: "Projects" },
  { href: "/#writing", label: "Writing" },
  { href: "/#about", label: "About" },
] as const;

// Roles, newest first. Mirrors the résumé; keep the two in sync.
export const experience = [
  {
    company: "Unlearn",
    role: "Software Engineering Intern",
    period: "2026 —",
    note: "ML for clinical-trial digital twins: model architecture and tracking, data protocols and curation, agentic workflows, internal tooling.",
  },
  {
    company: "Perception Innovations · Purdue ECE",
    role: "Machine Learning Engineer",
    period: "2025 —",
    note: "Multimodal computer vision for the Lightform 1 holographic display — head and gaze tracking, gesture recognition from live video.",
  },
  {
    company: "Oro Labs",
    role: "Software Engineering Intern",
    period: "2025",
    note: "CI/CD and deployment pipelines in GitHub Actions, plus internal tooling. ~10% dev time saved, ~80% of routine fixes automated.",
  },
  {
    company: "DataMermaid",
    role: "Software Engineering Intern",
    period: "2023",
    note: "R and Python ETL pulling coral-reef survey data from several research platforms into one analysis surface through their APIs.",
  },
] as const;
