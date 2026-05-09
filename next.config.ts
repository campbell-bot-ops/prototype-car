import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow external device testing
  allowedDevOrigins: ["192.168.0.100", "localhost"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
