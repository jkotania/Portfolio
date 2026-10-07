import { headers } from "next/headers";

// Picks the page language from the browser's Accept-Language header, respecting its order:
// "en-US,en;q=0.9,pl;q=0.8" means English first, even though Polish is also listed.
export async function getLanguage() {
  const headersList = await headers();
  const acceptLanguage = headersList.get("accept-language") || "";

  const ranked = acceptLanguage
    .split(",")
    .map((part) => {
      const [tag, quality] = part.trim().toLowerCase().split(";q=");
      return { tag, q: quality === undefined ? 1 : Number(quality) || 0 };
    })
    .sort((a, b) => b.q - a.q);

  for (const { tag } of ranked) {
    if (tag.startsWith("pl")) return "pl";
    if (tag.startsWith("en")) return "en";
  }
  return "en";
}

// Same URL serves both languages, so every hreflang points at the page itself.
export function alternatesFor(path) {
  return {
    canonical: path,
    languages: { "x-default": path, pl: path, en: path },
  };
}
