/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["lh3.googleusercontent.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "maps.googleapis.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
