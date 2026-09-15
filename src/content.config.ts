import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// The schema is opinionated on purpose: `hardPart` and `metrics` are the two
// fields hiring engineers actually read, so the content model asks for them
// rather than leaving them to whoever writes the markdown. See PLAN.md §3.
const projects = defineCollection({
  loader: glob({ base: "./src/content/projects", pattern: "**/*.md" }),
  schema: z.object({
    title: z.string(),
    // One sentence, plain language, no adjectives. Shown on the card.
    blurb: z.string(),
    role: z.string(),
    period: z.string(),
    stack: z.array(z.string()),
    status: z.enum(["shipped", "beta", "active", "research", "archived"]),
    // Which homepage section this belongs to.
    group: z.enum(["product", "research", "project"]).default("project"),
    // Homepage prose: two or three short paragraphs of what it is and where
    // it stands. This is the substance; `blurb` is only the one-liner.
    description: z.array(z.string()).default([]),
    // Specific things built or found. Concrete beats adjectives.
    highlights: z.array(z.string()).default([]),
    // Where to see it: live site, beta, campaign, code. Shown as pills.
    links: z.array(z.object({ label: z.string(), href: z.url() })).default([]),
    // Only projects with a written case study get a /projects/<slug> page.
    caseStudy: z.boolean().default(false),
    // Featured projects get a full case study page; the rest are list rows.
    featured: z.boolean().default(false),
    order: z.number().default(99),
    repo: z.url().optional(),
    demo: z.url().optional(),
    // What broke and what you did about it. One or two sentences on the card,
    // expanded in the body. This is the differentiator — do not skip it.
    hardPart: z.string().optional(),
    // Numbers only: latency, throughput, users, cost, accuracy.
    metrics: z.array(z.string()).default([]),
    draft: z.boolean().default(true),
  }),
});

const writing = defineCollection({
  loader: glob({ base: "./src/content/writing", pattern: "**/*.md" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    draft: z.boolean().default(true),
  }),
});

export const collections = { projects, writing };
