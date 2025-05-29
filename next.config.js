/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.compartitura.org'
      },
      {
        protocol: 'https',
        hostname: 'compartiturapp.vercel.app'
      }
    ]
  }
};

export default nextConfig;
