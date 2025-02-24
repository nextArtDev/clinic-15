/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // experimental: {
  //   reactCompiler: true,
  // },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mye-commerce.storage.iran.liara.space',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
      },
    ],
  },
}

module.exports = nextConfig
