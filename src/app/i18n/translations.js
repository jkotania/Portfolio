export const translations = {
  pl: {
    meta: {
      title: "Jan Kotania | Web Developer & AI Engineer",
      description:
        "Portfolio prezentujące doświadczenie i umiejętności programistyczne w JavaScript i innych technologiach. Jan Kotania to pasjonat nowych technologii i doświadczony Developer specjalizujący się w React, Next.js i nowoczesnych rozwiązaniach webowych.",
      keywords: [
        "Jan Kotania",
        "jkotania",
        "programista frontend",
        "programista fullstack",
        "programista react",
        "programista next.js",
        "programista webowy",
        "tworzenie stron internetowych",
        "programista AI",
        "Flutter",
        "aplikacje webowe",
        "JavaScript",
        "TypeScript",
        "projektowanie UI/UX",
      ],
    },
    navbar: {
      about: "O mnie",
      projects: "Projekty",
      skills: "Umiejętności",
      contact: "Kontakt",
      resume: "CV",
    },
    resumePopup: {
      title: "Wybierz wersję CV",
      englishVersion: "English Version",
      polishVersion: "Polska Wersja",
    },
    skills: {
      name: "Umiejętności",
    },
    projects: {
      title: "Projekty",
      viewProject: "Zobacz Projekt",
      items: {
        mogo: {
          description:
            "Strona projektowa dla fikcyjnej firmy meblarskiej. Przygotowana jako projekt na studia i rozbudowana do perfekcji, przy pomocy React.",
          type: "Strona internetowa",
        },
        kombuczara: {
          description:
            "Strona stworzona w celu promocji herbaty fermentowanej w Polsce przez influencerkę znaną jako 'Kombuczara'.",
          type: "Strona internetowa",
        },
        foodar: {
          description:
            "Aplikacja mobilna z funkcją wykrywania obiektów. Wykorzystuje model AI YOLO do rozpoznawania obiektów i Firebase do przechowywania danych.",
          type: "Aplikacja mobilna z AI",
        },
        logix: {
          description:
            "Platforma dla software house'ów. Frontend zbudowany przy użyciu Next.js z Tailwind CSS.",
          type: "Strona internetowa",
        },
        portfolio: {
          description:
            "Portfolio składające się ze stworzonych przeze mnie designów UI/UX, zrobionych w programie Figma. Dzięki temu możesz zobaczyć moje umiejętności projektowe.",
          type: "Figma Design",
        },
        radioSilesia: {
          description:
            "W pełni funkcjonalny prototyp stworzony specjalnie do współpracy z Radio Silesia. Osiągnął najwyższe oceny w konkursie.",
          type: "Design",
        },
      },
    },
    hero: {
      title: "Web Developer & AI Engineer",
      description:
        "Tworzę nowoczesne strony internetowe i aplikacje mobilne z uwzględnieniem jakości kodowania, optymalizacji wydajności i najlepszych praktyk UX/UI. Dodatkowo, interesuje się również rozwojem sztucznej inteligencji i uczenia maszynowego.",
      links: {
        github: "Mój profil GitHub",
        linkedin: "Mój profil LinkedIn",
        email: "Wyślij email",
      },
    },
    contact: {
      title: "Kontakt",
      subtitle:
        "Napisz do mnie, jeśli szukasz programisty, masz pytanie lub po prostu chcesz nawiązać kontakt.",
      email: {
        label: "Email",
        placeholder: "Adres email",
      },
      location: {
        label: "Lokalizacja",
        value: "Śląsk, Polska",
      },
      form: {
        name: "Imię i nazwisko",
        message: "Twoja wiadomość",
        send: "Wyślij wiadomość",
        sending: "Wysyłanie...",
        success: "Wiadomość została wysłana!",
        error: "Nie udało się wysłać wiadomości. Spróbuj ponownie.",
        cooldown: (minutes) =>
          `Poczekaj ${minutes} ${
            minutes === 1 ? "minutę" : "minuty"
          } przed wysłaniem kolejnej wiadomości.`,
      },
      responseTime: "Czas odpowiedzi: zazwyczaj w ciągu 24 godzin",
    },
  },
  en: {
    meta: {
      title: "Jan Kotania | Web Developer & AI Engineer",
      description:
        "Portfolio showcasing experience and programming skills in JavaScript and beyond. Jan Kotania is a passionate developer of new technologies and an experienced Developer specializing in React, Next.js and modern web solutions. He creates fast, responsive and intuitive web applications, taking care of code quality, performance optimization and UX/UI best practices.",
      keywords: [
        "Jan Kotania",
        "jkotania",
        "frontend developer",
        "fullstack developer",
        "react developer",
        "next.js developer",
        "web developer",
        "web development",
        "AI developer",
        "Flutter",
        "web applications",
        "JavaScript",
        "TypeScript",
        "UI/UX design",
      ],
    },
    navbar: {
      about: "About me",
      projects: "Projects",
      skills: "Skills",
      contact: "Contact",
      resume: "Resume",
    },
    resumePopup: {
      title: "Select Resume Version",
      englishVersion: "English Version",
      polishVersion: "Polska Wersja",
    },
    skills: {
      name: "Skills",
    },
    projects: {
      title: "Projects",
      viewProject: "View Project",
      items: {
        mogo: {
          description:
            "Website for a fictional furniture company. Prepared as a university project and expanded to perfection using React.",
          type: "Website",
        },
        kombuczara: {
          description:
            "Website created to promote fermented tea in Poland by an influencer known as 'Kombuczara'.",
          type: "Website",
        },
        foodar: {
          description:
            "Mobile application with object detection functionality. Uses YOLO AI model for object recognition and Firebase for data storage.",
          type: "Mobile App with AI",
        },
        logix: {
          description:
            "Platform for software houses. Frontend built with Next.js using Tailwind CSS.",
          type: "Website",
        },
        portfolio: {
          description:
        "Portfolio consisting of UI/UX designs created by me in Figma. This allows you to see my design skills.",
      type: "Figma Design",
        },
        radioSilesia: {
          description:
            "A fully functional prototype created specifically for collaboration with Radio Silesia. Achieved the highest ratings in the competition.",
          type: "Design",
        },
      },
    },
    hero: {
      title: "Web Developer & AI Engineer",
      description:
        "I create modern websites and mobile apps with a focus on code quality, performance optimization and UX/UI best practices. Additionally, I'm interested in artificial intelligence and machine learning development.",
      links: {
        github: "My GitHub profile",
        linkedin: "My LinkedIn profile",
        email: "Send email",
      },
    },
    contact: {
      title: "Contact",
      subtitle:
        "Feel free to reach out if you're looking for a developer, have a question, or just want to connect.",
      email: {
        label: "Email",
        placeholder: "Email",
      },
      location: {
        label: "Location",
        value: "Silesia, Poland",
      },
      form: {
        name: "Full Name",
        message: "Your Message",
        send: "Send Message",
        sending: "Sending...",
        success: "Message sent successfully!",
        error: "Failed to send message. Please try again.",
        cooldown: (minutes) =>
          `Please wait ${minutes} minute${
            minutes > 1 ? "s" : ""
          } before sending another message.`,
      },
      responseTime: "Response time: Usually within 24 hours",
    },
  },
};
