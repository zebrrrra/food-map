/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["lh3.googleusercontent.com", "img.icons8.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "maps.googleapis.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "img.icons8.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
