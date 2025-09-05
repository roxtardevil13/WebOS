/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',           // <-- replaces `next export`
  images: { unoptimized: true } // helpful for static hosting
};

export default nextConfig;
