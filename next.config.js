/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  async rewrites() {
    return [
      {
        source: "/cdn/:path*/",
        destination: "http://localhost:9425/cdn/:path*/",
      },
      {
        // source: "/api/(.*)",
        source: "/api/:path*/",
        destination: "http://localhost:9425/api/:path*/",
      },
    ];
  },
  images: {
    domains: [
      "localhost",
      "pbs.twimg.com",
      "images.unsplash.com",
      "twitter-clone-api.itsbohara.com",
    ],
  },
};

module.exports = nextConfig;
