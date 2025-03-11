/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://jkotania.tech",
  generateRobotsTxt: true,
  generateIndexSitemap: false, // Wyłącz generowanie indeksu
  sitemapSize: 5000, // Ustaw limit na 5000 URLi, aby uniknąć podziału na wiele plików
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
    const fullPath = `${config.siteUrl}${path}`;
    return {
      loc: fullPath,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString(),
      alternateRefs: config.alternateRefs,
    }
  },
  // Filtr, który zachowuje tylko główną stronę
  filter: (path) => {
    return path === '/';
  },
};
