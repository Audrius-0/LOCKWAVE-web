import type { NextConfig } from "next";

// One week. Media files get a new name whenever their content changes, so a long cache is safe.
const WEEK = 60 * 60 * 24 * 7;

const nextConfig: NextConfig = {
  images: {
    // AVIF first (roughly a fifth to a third smaller than WebP), WebP for browsers without it.
    formats: ["image/avif", "image/webp"],
    // How long an optimised image stays cached before it is made again.
    minimumCacheTTL: WEEK,
  },
  async headers() {
    return [
      {
        // Photos, posters and videos straight from public/: returning visitors reuse them
        // for a week instead of asking the server again on every page.
        source: "/:all*(jpg|jpeg|png|webp|avif|svg|mp4)",
        headers: [{ key: "Cache-Control", value: `public, max-age=${WEEK}, stale-while-revalidate=86400` }],
      },
    ];
  },
};

export default nextConfig;
