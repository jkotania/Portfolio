/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://jkotania.tech",
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
  },
};
