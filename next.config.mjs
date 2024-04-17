/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        // protocol: "https",
        hostname: "courteous-goldfinch-576.convex.cloud",
      },
    ],
  },
};

export default nextConfig;
