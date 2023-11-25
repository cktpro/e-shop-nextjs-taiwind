/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.unsplash.com", "pub-50cd0051de0b47509baf9c4fc482606a.r2.dev"],
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
