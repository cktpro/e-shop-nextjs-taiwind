/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "pinterest.com",
      "images.unsplash.com",
      "thuthuatphanmem.vn",
      "i.postimg.cc",
      "fakestoreapi.com",

      "i.imgur.com",
      "placeimg.com",
      "st3.depositphotos.com",
      "api.escuelajs.co",
      "upload.wikimedia.org",
      "eduport.webestica.com",
      "www.dhresource.com",
    ],
  },
  i18n: {
    locales: ["en", "vi"],
    defaultLocale: "en",
  },
};

module.exports = nextConfig;
