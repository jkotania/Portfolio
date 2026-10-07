import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CaseStudy from "@/components/CaseStudy";
import { getProject, projects } from "@/data/projects";
import { alternatesFor, getLanguage } from "@/app/i18n/getLanguage";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  const lang = await getLanguage();
  const content = project[lang];
  const title = `${project.title}: ${content.type} | Jan Kotania`;
  const path = `/projekty/${slug}`;

  return {
    title,
    description: content.summary,
    keywords: [
      project.title,
      "Jan Kotania",
      "fullstack developer",
      "AI engineer",
      ...project.tech,
    ],
    alternates: alternatesFor(path),
    openGraph: {
      title,
      description: content.summary,
      url: path,
      siteName: "Jan Kotania",
      locale: lang === "pl" ? "pl_PL" : "en_US",
      type: "article",
      images: [
        {
          url: project.image.src,
          width: project.image.width,
          height: project.image.height,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: content.summary,
      images: [project.image.src],
    },
  };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const lang = await getLanguage();
  const content = project[lang];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: content.summary,
    url: `https://jkotania.pl/projekty/${slug}`,
    image: `https://jkotania.pl${project.image.src}`,
    keywords: project.tech.join(", "),
    inLanguage: lang,
    author: {
      "@type": "Person",
      name: "Jan Kotania",
      url: "https://jkotania.pl",
      jobTitle: "Fullstack Developer & AI Engineer",
    },
    ...(project.link ? { sameAs: project.link } : {}),
  };

  return (
    <div className="relative w-full overflow-x-clip bg-mono-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="dot-pattern pointer-events-none absolute inset-x-0 top-0 h-[100vh] opacity-40" />
      <div className="relative z-10 w-full">
        <Navbar />
        <main>
          <CaseStudy slug={slug} />
        </main>
        <Footer />
      </div>
    </div>
  );
}
