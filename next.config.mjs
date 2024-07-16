import createNextIntlPlugin from "next-intl/plugin";
import { fileURLToPath } from "node:url";
import createJiti from "jiti";

const jiti = createJiti(fileURLToPath(import.meta.url));
const withNextIntl = createNextIntlPlugin("./src/translation/i18n.ts");
// Import env here to validate during build. Using jiti we can import .ts files :)
jiti("./src/lib/env");

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // reactCompiler: true,
    serverActions: {
      bodySizeLimit: "5mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
      {
        protocol: "https",
        hostname:
          "portfolio-gallary.36713011aaa813913a700be21f854616.r2.cloudflarestorage.com",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
