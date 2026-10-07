// Projects shown on the homepage stack and on /projekty/[slug].
//
// `description`, `role` and the first three `features` appear on the homepage card; the rest feeds the project page.
// Everything here comes from the original project descriptions and what the screenshots show.
// Fields set to null are hidden.
// TODO(user): add `year` and fill `result` with real outcomes (numbers, competition name, client feedback).

export const projects = [
  {
    slug: "portfolio",
    title: "Portfolio",
    link: "https://www.figma.com/design/7wtDekjzJ61ef6IIGeMvw3/Portfolio?node-id=93-1886&t=Frx0UelJzym9MJdK-1",
    image: { src: "/portfolio-preview.png", width: 1440, height: 1024 },
    tech: ["Figma"],
    color: "#d4d4d4",
    year: null,
    pl: {
      type: "Figma Design",
      description:
        "Moje projekty UI/UX zebrane w jednym pliku Figmy. Gotowe realizacje i koncepcje aplikacji mobilnych oraz stron, podzielone na dwie sekcje, żeby łatwo było znaleźć to, co Cię interesuje.",
      summary:
        "Zbiór moich projektów UI/UX przygotowanych w Figmie: gotowe realizacje oraz koncepcje aplikacji mobilnych i stron internetowych.",
      role: "Projekt UX/UI",
      problem:
        "Kod pokazuje, jak buduję, ale nie zawsze pokazuje, jak myślę o interfejsie. Chciałem mieć jedno miejsce, w którym klient albo rekruter zobaczy sam proces projektowania: układ ekranów, typografię, kolory i to, jak użytkownik przechodzi od jednego kroku do następnego.",
      approach: [
        "Zebrałem w jednym pliku Figmy projekty, które powstały w trakcie studiów informatycznych. Część z nich to ukończone realizacje, część to koncepcje i pomysły. Razem pokazują, że o wygodzie użytkownika myślę od pierwszego szkicu, a nie dopiero na końcu.",
        "Plik ma własną stronę startową w ciemnym stylu i jest podzielony na dwie sekcje: aplikacje mobilne i strony internetowe. Można od razu przejść do kategorii, która interesuje Cię najbardziej. Studia informatyczne pomagają mi przy tym myśleć o tym, jak dany projekt zostanie później zbudowany w kodzie.",
      ],
      features: [
        "Osobne sekcje dla aplikacji mobilnych i stron internetowych",
        "Gotowe realizacje obok koncepcji i wczesnych pomysłów",
        "Projekty przygotowane z myślą o późniejszym wdrożeniu w kodzie",
      ],
      result: null,
    },
    en: {
      type: "Figma Design",
      description:
        "My UI/UX work collected in a single Figma file. Finished projects and concepts for mobile apps and websites, split into two sections so you can go straight to what interests you.",
      summary:
        "A collection of my UI/UX work in Figma: finished projects and concepts for mobile apps and websites.",
      role: "UX/UI design",
      problem:
        "Code shows how I build, but it doesn't always show how I think about an interface. I wanted one place where a client or a recruiter can see the design process itself: screen layout, typography, colour and how a user moves from one step to the next.",
      approach: [
        "I gathered the designs I made while studying IT into a single Figma file. Some are finished projects, some are concepts and ideas. Together they show that I think about the user from the first sketch, not at the very end.",
        "The file has its own dark landing page and is split into two sections, mobile apps and websites, so you can jump straight to the category you care about. Studying IT also helps me design with the build in mind, thinking about how each screen will later be put together in code.",
      ],
      features: [
        "Separate sections for mobile apps and websites",
        "Finished projects shown next to concepts and early ideas",
        "Designs prepared with the later build in mind",
      ],
      result: null,
    },
  },
  {
    slug: "foodar",
    title: "FoodAR",
    link: null,
    image: { src: "/mobile-preview.png", width: 1920, height: 900 },
    tech: ["Flutter", "Firebase", "YOLO AI", "TensorFlow Lite", "Figma"],
    color: "#63D471",
    year: null,
    pl: {
      type: "Aplikacja mobilna z AI",
      description:
        "Aplikacja we Flutterze, która rozpoznaje jedzenie na zdjęciach. Model AI YOLO działa w aplikacji dzięki TensorFlow Lite, a ekran wprowadzający uczy, jak zrobić zdjęcie, które model odczyta.",
      summary:
        "Aplikacja mobilna, która rozpoznaje jedzenie na zdjęciach dzięki modelowi AI YOLO działającemu bezpośrednio w aplikacji.",
      role: "Projekt i programowanie",
      problem:
        "Rozpoznawanie jedzenia na zdjęciu brzmi prosto, dopóki nie spojrzy się na zdjęcia robione w prawdziwym życiu: bałagan na talerzu, telefon trzymany za blisko, jedzenie w szklanym pojemniku. Aplikacja musiała działać w takich warunkach i jasno pokazywać użytkownikowi, jakiego zdjęcia potrzebuje.",
      approach: [
        "Aplikację zbudowałem we Flutterze. Do rozpoznawania obiektów użyłem modelu YOLO uruchamianego przez TensorFlow Lite, czyli w wersji przystosowanej do pracy na telefonie. Dane aplikacji przechowuje Firebase.",
        "Zanim napisałem kod, zaprojektowałem ekrany w Figmie. Ważną częścią projektu jest ekran wprowadzający „How To?”. Na przykładach pokazuje dobre zdjęcie oraz trzy typowe błędy: bałagan, zdjęcie zrobione za blisko i jedzenie sfotografowane przez szkło. Dzięki temu model dostaje zdjęcia, które potrafi odczytać.",
      ],
      features: [
        "Rozpoznawanie obiektów modelem YOLO",
        "Model AI działający w aplikacji dzięki TensorFlow Lite",
        "Ekran wprowadzający, który uczy robić czytelne zdjęcia",
        "Przechowywanie danych w Firebase",
      ],
      result: null,
    },
    en: {
      type: "Mobile App with AI",
      description:
        "A Flutter app that recognises food in photos. A YOLO AI model runs inside the app with TensorFlow Lite, and the onboarding teaches people how to take a photo the model can read.",
      summary:
        "A mobile app that recognises food in photos using a YOLO AI model that runs inside the app.",
      role: "Design and development",
      problem:
        "Recognising food in a photo sounds simple until you look at photos people actually take: a messy plate, a phone held too close, food in a glass container. The app had to cope with that and show people clearly what kind of photo it needs.",
      approach: [
        "I built the app in Flutter. Object detection uses a YOLO model running through TensorFlow Lite, the version made to run on a phone. Firebase stores the app's data.",
        "Before writing code I designed the screens in Figma. A key part of the project is the “How To?” onboarding screen. It shows a good photo next to three common mistakes: a messy plate, a photo taken too close and food shot through glass. That way the model gets photos it can actually read.",
      ],
      features: [
        "Object detection with a YOLO model",
        "AI model running in the app with TensorFlow Lite",
        "Onboarding that teaches people to take readable photos",
        "Data stored in Firebase",
      ],
      result: null,
    },
  },
  {
    slug: "mogo",
    title: "Mogo",
    link: "https://mogo-ruby.vercel.app/",
    image: { src: "/mogo-preview.png", width: 1920, height: 833 },
    tech: ["Next.js", "Tailwind CSS", "Supabase", "Auth"],
    color: "#1258FF",
    year: null,
    pl: {
      type: "Strona internetowa",
      description:
        "Strona fikcyjnej firmy meblarskiej, która zaczęła się jako projekt na studia. Rozwinąłem ją w Next.js i podłączyłem Supabase, więc dziś ma logowanie i konta użytkowników.",
      summary:
        "Strona fikcyjnej firmy meblarskiej. Zaczęła się jako projekt na studia, a potem rozbudowałem ją o konta użytkowników i bazę danych.",
      role: "Projekt i programowanie (fullstack)",
      problem:
        "Na studiach dostałem zadanie przygotowania strony dla firmy meblarskiej. Strona miała w prosty sposób przedstawić ofertę i realizacje firmy oraz zachęcić do kontaktu.",
      approach: [
        "Po oddaniu projektu nie zostawiłem go w szufladzie. Rozwinąłem stronę w Next.js i Tailwind CSS, a do obsługi danych i logowania podłączyłem Supabase. Z prostej wizytówki zrobiła się aplikacja z kontami użytkowników.",
        "Wizualnie postawiłem na jasny, spokojny układ z dużymi zdjęciami wnętrz, tak żeby to meble grały główną rolę. Nawigacja prowadzi do projektów, oferty i kontaktu, a ikony konta i ustawień są zawsze pod ręką w prawym górnym rogu.",
      ],
      features: [
        "Logowanie i konta użytkowników w Supabase",
        "Sekcje projektów, oferty i kontaktu",
        "Duże zdjęcia wnętrz na pierwszym planie",
        "Frontend w Next.js i Tailwind CSS",
      ],
      result: null,
    },
    en: {
      type: "Website",
      description:
        "A website for a fictional furniture company that started as a university project. I developed it further in Next.js and connected Supabase, so it now has sign in and user accounts.",
      summary:
        "A website for a fictional furniture company. It started as a university project, and I later extended it with user accounts and a database.",
      role: "Design and fullstack development",
      problem:
        "At university I was asked to build a website for a furniture company. It had to present the company's offer and past projects simply and encourage people to get in touch.",
      approach: [
        "After handing it in I kept going. I developed the site further in Next.js and Tailwind CSS and connected Supabase for data and sign in. A simple brochure site turned into an app with user accounts.",
        "Visually I went for a light, calm layout with large interior photos, so the furniture takes centre stage. The navigation leads to projects, the offer and contact, and the account and settings icons are always in the top right corner.",
      ],
      features: [
        "Sign in and user accounts with Supabase",
        "Projects, offer and contact sections",
        "Large interior photos up front",
        "Frontend in Next.js and Tailwind CSS",
      ],
      result: null,
    },
  },
  {
    slug: "kombuczara",
    title: "Kombuczara",
    link: "https://kombuczara.com/",
    image: { src: "/kombuczara-preview.png", width: 1836, height: 834 },
    tech: ["Zyro", "JavaScript", "API", "UX/UI", "Figma"],
    color: "#E9A85D",
    year: null,
    pl: {
      type: "Strona internetowa",
      description:
        "Strona dla influencerki promującej kombuchę w Polsce. Jej sercem jest Kombuczkomapa, interaktywna mapa miejsc z kombuchą, którą można przeszukiwać według miasta.",
      summary:
        "Strona dla Kombuczary, influencerki promującej herbatę fermentowaną w Polsce, z mapą miejsc, w których można kupić kombuchę.",
      role: "Projekt UX/UI i wdrożenie",
      problem:
        "Kombuczara promuje w Polsce kombuchę, czyli fermentowaną herbatę. Potrzebowała strony, która pokaże markę i odpowie na proste pytanie: gdzie tę kombuchę kupić.",
      approach: [
        "Stronę zaprojektowałem w Figmie i zbudowałem na Zyro, a tam, gdzie gotowe elementy nie wystarczały, dopisałem własny kod w JavaScripcie.",
        "Najważniejszym elementem jest Kombuczkomapa, interaktywna mapa oparta na API, na której pomarańczowe pinezki z literą K oznaczają miejsca z kombuchą. Mapę można przeszukiwać według miasta. Jeśli czyjegoś ulubionego miejsca brakuje, może je zgłosić przez Instagram albo formularz na stronie. Całość utrzymałem w ciepłej, pomarańczowej kolorystyce marki.",
      ],
      features: [
        "Kombuczkomapa z miejscami, w których kupisz kombuchę",
        "Wyszukiwanie miejsc według miasta",
        "Zgłaszanie nowych miejsc przez Instagram lub formularz",
        "Ciepła, pomarańczowa kolorystyka marki",
      ],
      result: null,
    },
    en: {
      type: "Website",
      description:
        "A website for an influencer promoting kombucha in Poland. Its heart is Kombuczkomapa, an interactive map of places that sell kombucha, searchable by city.",
      summary:
        "A website for Kombuczara, an influencer promoting fermented tea in Poland, with a map of places that sell kombucha.",
      role: "UX/UI design and development",
      problem:
        "Kombuczara promotes kombucha, a fermented tea, in Poland. She needed a website that presents the brand and answers one simple question: where can I buy kombucha?",
      approach: [
        "I designed the site in Figma and built it on Zyro, adding my own JavaScript where the ready made blocks weren't enough.",
        "The centrepiece is Kombuczkomapa, an interactive map built on an API where orange K pins mark places that sell kombucha. Visitors can search the map by city, and if their favourite place is missing they can suggest it on Instagram or through the form on the site. The whole site uses the brand's warm orange colours.",
      ],
      features: [
        "Kombuczkomapa with places that sell kombucha",
        "Search by city",
        "New places suggested via Instagram or a form",
        "The brand's warm orange colours",
      ],
      result: null,
    },
  },
  {
    slug: "logix",
    title: "LogiX",
    link: "https://logix-gilt.vercel.app/",
    image: { src: "/logix-preview.png", width: 1920, height: 912 },
    tech: ["Next.js", "Tailwind CSS"],
    color: "#a3a3a3",
    year: null,
    pl: {
      type: "Strona internetowa",
      description:
        "Strona platformy dla software house'ów. Ciemny, minimalistyczny pierwszy ekran z dwoma wyraźnymi przyciskami prowadzi odwiedzającego prosto do rozpoczęcia współpracy.",
      summary:
        "Strona platformy dla software house'ów z frontendem zbudowanym w Next.js i Tailwind CSS.",
      role: "Frontend",
      problem:
        "Software house sprzedaje usługi, których nie da się dotknąć, więc pierwsze wrażenie na stronie ma ogromne znaczenie. Strona LogiX miała od razu wyglądać nowocześnie i prowadzić odwiedzającego prosto do rozpoczęcia współpracy.",
      approach: [
        "Odpowiadałem za frontend, który zbudowałem w Next.js z Tailwind CSS.",
        "Pierwszy ekran ma ciemne tło z motywem połączonych punktów i krótki komunikat „Nowoczesne Rozwiązania”. Pod nim są dwa przyciski: „Rozpocznij” dla osób gotowych do kontaktu i „Dowiedz się więcej” dla tych, którzy wolą najpierw poczytać. Menu prowadzi do sekcji O nas, Usługi i Kontakt.",
      ],
      features: [
        "Ciemny, minimalistyczny pierwszy ekran",
        "Dwa wyraźne przyciski: Rozpocznij i Dowiedz się więcej",
        "Sekcje O nas, Usługi i Kontakt",
        "Frontend w Next.js i Tailwind CSS",
      ],
      result: null,
    },
    en: {
      type: "Website",
      description:
        "A website for a software house platform. A dark, minimal first screen with two clear buttons leads visitors straight to starting a project.",
      summary:
        "A website for a software house platform, with a frontend built in Next.js and Tailwind CSS.",
      role: "Frontend development",
      problem:
        "A software house sells services you can't touch, so the first impression of its website matters a lot. The LogiX site had to look modern straight away and lead visitors directly to starting a project.",
      approach: [
        "I was responsible for the frontend, which I built in Next.js with Tailwind CSS.",
        "The first screen has a dark background with a connected dots motif and a short headline, “Nowoczesne Rozwiązania” (modern solutions). Below it are two buttons: “Rozpocznij” (get started) for people ready to talk and “Dowiedz się więcej” (learn more) for those who want to read first. The menu leads to the About, Services and Contact sections.",
      ],
      features: [
        "Dark, minimal first screen",
        "Two clear calls to action: get started and learn more",
        "About, Services and Contact sections",
        "Frontend in Next.js and Tailwind CSS",
      ],
      result: null,
    },
  },
  {
    slug: "radio-silesia",
    title: "Radio Silesia",
    link: null,
    image: { src: "/radio-preview.png", width: 1920, height: 911 },
    tech: ["Figma", "UX/UI", "Mobile"],
    color: "#EF4444",
    year: null,
    pl: {
      type: "Design",
      description:
        "W pełni funkcjonalny prototyp aplikacji dla Radia Silesia, który otrzymał najwyższe oceny w konkursie. Radio na żywo, audycje, podcasty i Szlaglista w jednym miejscu.",
      summary:
        "W pełni funkcjonalny prototyp aplikacji mobilnej dla Radia Silesia, który otrzymał najwyższe oceny w konkursie.",
      role: "Projekt UX/UI",
      problem:
        "Radio Silesia to nie tylko program na żywo. Są też audycje, podcasty, wydarzenia, Koncert życzeń i Szlaglista. Zadanie polegało na zaprojektowaniu aplikacji, w której słuchacz znajdzie to wszystko w jednym miejscu i włączy radio jednym dotknięciem.",
      approach: [
        "Zaprojektowałem w Figmie klikalny prototyp, który działa jak prawdziwa aplikacja. Na górze ekranu zawsze widać przycisk „Odtwórz radio”, a pod nim wyszukiwarkę i przewijane karuzele z audycjami, podcastami i wydarzeniami.",
        "Dolny pasek nawigacji prowadzi do najważniejszych miejsc: strony głównej, Koncertu życzeń, Szlaglisty i zakładki z dodatkowymi treściami. Ciemny motyw z czerwonymi akcentami nawiązuje do kolorów stacji.",
      ],
      features: [
        "Przycisk „Odtwórz radio” zawsze pod ręką",
        "Wyszukiwarka wszystkich treści",
        "Karuzele audycji, podcastów i wydarzeń",
        "Dolna nawigacja z Koncertem życzeń i Szlaglistą",
      ],
      result: "Prototyp otrzymał najwyższe oceny w konkursie.",
    },
    en: {
      type: "Design",
      description:
        "A fully functional app prototype for Radio Silesia that received the highest marks in the competition. Live radio, shows, podcasts and the Szlaglista chart in one place.",
      summary:
        "A fully functional mobile app prototype for Radio Silesia that received the highest marks in the competition.",
      role: "UX/UI design",
      problem:
        "Radio Silesia is more than its live programme. There are shows, podcasts, events, a request show (Koncert życzeń) and the Szlaglista chart. The task was to design an app where listeners find all of it in one place and start the radio with a single tap.",
      approach: [
        "I designed a clickable prototype in Figma that behaves like a real app. A “play radio” button is always visible at the top of the screen, with search and scrolling carousels of shows, podcasts and events below it.",
        "The bottom navigation bar leads to the key places: home, the request show, the Szlaglista chart and a tab with more content. The dark theme with red accents follows the station's colours.",
      ],
      features: [
        "“Play radio” button always within reach",
        "Search across all content",
        "Carousels of shows, podcasts and events",
        "Bottom navigation with the request show and Szlaglista",
      ],
      result: "The prototype received the highest marks in the competition.",
    },
  },
];

export function getProject(slug) {
  return projects.find((project) => project.slug === slug);
}

export function getNextProject(slug) {
  const index = projects.findIndex((project) => project.slug === slug);
  return projects[(index + 1) % projects.length];
}
