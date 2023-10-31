/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["pinterest.com", "images.unsplash.com", "thuthuatphanmem.vn", "i.postimg.cc", "fakestoreapi.com"],
  },
  i18n: {
    locales: ["en", "vi"],
    defaultLocale: "en",
  },
};

module.exports = nextConfig;
