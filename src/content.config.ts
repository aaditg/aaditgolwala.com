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
    status: z.enum(["shipped", "active", "research", "archived"]),
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
