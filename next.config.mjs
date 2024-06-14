/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '**'
      }
    ],
  },
  env: {
    LOGO_CLOUDNAME: process.env.LOGO_CLOUDNAME,
    LOGO_API_KEY: process.env.LOGO_API_KEY,
    LOGO_API_SECRET: process.env.LOGO_API_SECRET,
    PREVIEW_CLOUDNAME: process.env.PREVIEW_CLOUDNAME,
    PREVIEW_API_KEY: process.env.PREVIEW_API_KEY,
    PREVIEW_API_SECRET: process.env.PREVIEW_API_SECRET,
  },
};

console.log(nextConfig);

export default nextConfig;
