// Host canonicalizer + security headers in front of the static Astro build.
// aaditgolwala.com is canonical; www.aaditgolwala.com 301s to it.
const CANONICAL_HOST = "aaditgolwala.com";

// Moved pages. The old post had been live for five weeks before it was rewritten
// under a new title; its URL keeps working.
const REDIRECTS = {
  "/writing/reading-the-mood-of-a-song": "/writing/predict-a-songs-mood",
};

const SECURITY_HEADERS = {
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "X-Frame-Options": "DENY",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.hostname === `www.${CANONICAL_HOST}`) {
      url.hostname = CANONICAL_HOST;
      return Response.redirect(url.toString(), 301);
    }

    const moved = REDIRECTS[url.pathname.replace(/\/$/, "")];
    if (moved) {
      url.pathname = moved;
      return Response.redirect(url.toString(), 301);
    }

    const response = await env.ASSETS.fetch(request);
    const headers = new Headers(response.headers);
    for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
      headers.set(key, value);
    }
    return new Response(response.body, { status: response.status, headers });
  },
};
