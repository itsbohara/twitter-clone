/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  async rewrites() {
    return [
      {
        // source: "/api/(.*)",
        source: "/api/:path*/",
        destination: "http://localhost:9425/api/:path*/",
      },
    ];
  },
  images: {
    domains: ["pbs.twimg.com", "images.unsplash.com"],
  },
};

module.exports = nextConfig;
