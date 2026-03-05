/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['yfogpdtrsswcbijnqltl.supabase.co', 'image2url.com'],
     remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Allows all domains (use with caution)
      },
    ],
  },
};

export default nextConfig;
