/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://jkotania.pl",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  sitemapSize: 5000,
  alternateRefs: [
    {
      href: "https://jkotania.pl",
      hreflang: "x-default",
    },
    {
      href: "https://jkotania.pl",
      hreflang: "pl",
    },
    {
      href: "https://jkotania.pl",
      hreflang: "en",
    },
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
  },
  changefreq: "monthly",
  priority: 1.0,
  transform: async (config, path) => {
    const fullPath = `${config.siteUrl}${path}`;
    return {
      loc: fullPath,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString(),
      alternateRefs: config.alternateRefs,
    };
  },
  filter: (path) => {
    return path === "/";
  },
};
