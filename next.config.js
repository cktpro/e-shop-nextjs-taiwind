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
      "grecoshoes.mx",
      "cdn.computerhoy.com",
      "p.turbosquid.com",
      "m.media-amazon.com",
      "media.vogue.mx",
    ],
  },
  i18n: {
    locales: ["en", "vi"],
    defaultLocale: "en",
  },
  async redirects() {
    return [
      {
        source: "/paymentv2/Ncb/Transaction/Index.html/",
        destination: "https://sandbox.vnpayment.vn",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
