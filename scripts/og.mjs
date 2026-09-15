// Renders public/og.png (1200×630) from an inline SVG via sharp, which Astro
// already ships. Run `node scripts/og.mjs` after changing the name or tagline
// in src/site.ts; the PNG is committed so the build stays pure.
import sharp from "sharp";
import { writeFile } from "node:fs/promises";

const name = "Aadit Golwala";
const tagline = "ML and software engineer";
const line = "Purdue CE · Unlearn · Perception Innovations";
const host = "aaditgolwala.com";

// Light-theme tokens from global.css, flattened to sRGB for librsvg.
const paper = "#fbfaf8";
const ink = "#232531";
const muted = "#6b6e7c";
const faint = "#9fa1ab";
const accent = "#3b64c4";
const rule = "#e4e2dd";

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${paper}"/>
  <rect x="96" y="96" width="4" height="438" fill="${accent}"/>
  <text x="140" y="290" font-family="Inter, Helvetica, Arial, sans-serif" font-size="86" font-weight="600" letter-spacing="-2.5" fill="${ink}">${name}</text>
  <text x="140" y="352" font-family="Inter, Helvetica, Arial, sans-serif" font-size="38" fill="${muted}">${tagline}</text>
  <text x="140" y="410" font-family="Menlo, 'JetBrains Mono', monospace" font-size="20" letter-spacing="1.5" fill="${faint}">${line.toUpperCase()}</text>
  <line x1="140" y1="490" x2="1104" y2="490" stroke="${rule}" stroke-width="2"/>
  <text x="140" y="528" font-family="Menlo, 'JetBrains Mono', monospace" font-size="20" letter-spacing="1.5" fill="${faint}">${host.toUpperCase()}</text>
</svg>`;

// Rasterised at 2× then downsampled: cleaner text edges than a 1× render.
const png = await sharp(Buffer.from(svg), { density: 144 })
  .resize(1200, 630)
  .png({ compressionLevel: 9 })
  .toBuffer();
await writeFile(new URL("../public/og.png", import.meta.url), png);
console.log(`public/og.png  ${(png.length / 1024).toFixed(0)} KB`);
