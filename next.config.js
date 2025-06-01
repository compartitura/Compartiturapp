/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/270525', // 👈 esto es lo clave
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

