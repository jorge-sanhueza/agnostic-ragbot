import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["pdf"],
  i18n: {
    locales: ["en", "es"],
    defaultLocale: "en",
  },
};

export default nextConfig;
