/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['coffee-famous-reindeer-467.mypinata.cloud'],
    unoptimized: true, 
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'coffee-famous-reindeer-467.mypinata.cloud',
        port: '',
        pathname: '/ipfs/**',
      },
    ],
  },
};



module.exports = nextConfig;