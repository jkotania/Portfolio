/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://jkotania.tech",
  generateRobotsTxt: true,
  alternateRefs: [
    {
      href: 'https://jkotania.tech',
      hreflang: 'x-default',
    },
    {
      href: 'https://jkotania.tech',
      hreflang: 'pl',
    },
    {
      href: 'https://jkotania.tech',
      hreflang: 'en',
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
  changefreq: 'monthly',
  priority: 1.0,
  transform: async (config, path) => {
    // Upewnij się, że ścieżka zaczyna się od https://
    const fullPath = path.startsWith('http') ? path : `${config.siteUrl}${path}`;
    
    return {
      loc: fullPath,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString(),
      alternateRefs: config.alternateRefs ?? [],
    }
  },
};
