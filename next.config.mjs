/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["s3.ir-tbz-sh1.arvanstorage.ir", "blog.dolox.ir"]
  },
};

export default nextConfig;
