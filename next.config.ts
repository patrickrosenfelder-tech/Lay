import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    tsconfigPath: "tsconfig.vercel.json",
  },
  async redirects() {
    return [
      {
        source: "/LASIK/PK/PRK",
        destination: "/lasik-pk-prk",
        statusCode: 301,
      },
      {
        source: "/post-laser-vision",
        destination: "/lasik-pk-prk",
        statusCode: 301,
      },
    ];
  },
};

export default nextConfig;
