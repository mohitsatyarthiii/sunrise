/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['yfogpdtrsswcbijnqltl.supabase.co', 'image2url.com'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // ✅ allow all domains
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
