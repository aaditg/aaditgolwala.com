// Single source of truth for identity, links, and nav.
// Everything user-facing reads from here so there is one place to edit.

export const site = {
  name: "Aadit Golwala",
  // <=10 words. Answers "what do you do" above the fold. See PLAN.md §2.
  tagline: "TODO: one line — ML and software engineer, Purdue CE",
  // 2-3 sentences, first person, no "passionate developer who loves to code".
  intro: "TODO: see PLAN.md §2 for what belongs here.",
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
  { href: "/#about", label: "About" },
] as const;

// Roles, newest first. Mirrors the resume; keep the two in sync.
export const experience = [
  {
    company: "Unlearn",
    role: "Software Engineering Intern",
    period: "2026 — present",
    note: "ML models for clinical trial digital twins: model architecture and tracking, data protocols and curation, agentic workflows, internal tooling.",
  },
  {
    company: "Perception Innovations (Purdue ECE)",
    role: "Machine Learning Engineer",
    period: "2025 — present",
    note: "Multimodal CV for the Lightform 1 holographic display — head/gaze tracking and gesture recognition from live video.",
  },
  {
    company: "Oro Labs",
    role: "Software Engineering Intern",
    period: "Summer 2025",
    note: "CI/CD and deployment pipelines in GitHub Actions; internal tooling and automation. ~10% dev time saved, ~80% of routine fixes automated.",
  },
  {
    company: "DataMermaid",
    role: "Software Engineering Intern",
    period: "Summer 2023",
    note: "R and Python ETL pulling coral reef survey data from multiple research platforms into one analysis surface via their APIs.",
  },
] as const;
