export const translations = {
    pl: {
      meta: {
        title: "Portfolio - Jan Kotania | Web Developer",
        description: "Portfolio prezentujące doświadczenie i umiejętności programistyczne w JavaScript i innych technologiach. Jan Kotania to pasjonat nowych technologii i doświadczony Developer specjalizujący się w React, Next.js i nowoczesnych rozwiązaniach webowych.",
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
        ]
        
      },
      navbar: {
        about: "O mnie",
        projects: "Projekty",
        skills: "Umiejętności",
        contact: "Kontakt",
        resume: "CV"
      },
      resumePopup: {
        title: "Wybierz wersję CV",
        englishVersion: "English Version",
        polishVersion: "Polska Wersja"
      },
      skills:
      {
         name: "Umiejętności",
      },
      projects: {
        title: "Projekty",
        viewProject: "Zobacz Projekt",
        items: {
          mogo: {
            description: "Strona internetowa dla fikcyjnej firmy meblowej z systemem autoryzacji.",
            type: "Strona internetowa"
          },
          kombuczara: {
            description: "Strona stworzona w celu promocji herbaty fermentowanej w Polsce przez influencerkę znaną jako 'Kombuczara'.",
            type: "Strona internetowa"
          },
          foodar: {
            description: "Aplikacja mobilna z funkcją wykrywania obiektów. Wykorzystuje model AI YOLO do rozpoznawania obiektów i Firebase do przechowywania danych.",
            type: "Aplikacja mobilna z AI"
          },
          logix: {
            description: "Platforma dla firm programistycznych. Frontend zbudowany przy użyciu Next.js z Tailwind CSS.",
            type: "Strona internetowa"
          },
          portfolio: {
            description: "Dokładnie ta sama strona, na której się teraz znajdujesz, gdzie możesz dowiedzieć się więcej o mnie. :P",
            type: "Strona internetowa"
          },
          radioSilesia: {
            description: "W pełni funkcjonalny prototyp stworzony specjalnie do współpracy z Radio Silesia. Osiągnął najwyższe oceny w konkursie.",
            type: "Design"
          }
        }
      },
      hero: {
        title: "Full Stack & Mobile Developer",
        links: {
          github: "Mój profil GitHub",
          linkedin: "Mój profil LinkedIn",
          email: "Wyślij email"
        }
      },
      description: {
        firstPart: "Tworzę nowoczesne aplikacje używając",
        and: "oraz",
        lastPart: ", wzbogacone o możliwości sztucznej inteligencji. Specjalizuję się w tworzeniu wydajnych rozwiązań cross-platformowych."
      },
      contact: {
        title: "Kontakt",
        subtitle: "Napisz do mnie, jeśli szukasz programisty, masz pytanie lub po prostu chcesz nawiązać kontakt.",
        email: {
            label: "Email",
            placeholder: "Adres email"
        },
        location: {
            label: "Lokalizacja",
            value: "Śląsk, Polska"
        },
        form: {
            name: "Imię i nazwisko",
            message: "Twoja wiadomość",
            send: "Wyślij wiadomość",
            sending: "Wysyłanie...",
            success: "Wiadomość została wysłana!",
            error: "Nie udało się wysłać wiadomości. Spróbuj ponownie.",
            cooldown: (minutes) => `Poczekaj ${minutes} ${minutes === 1 ? 'minutę' : 'minuty'} przed wysłaniem kolejnej wiadomości.`
        },
        responseTime: "Czas odpowiedzi: zazwyczaj w ciągu 24 godzin"
      }
    },
    en: {
      meta: {
        title: "Portfolio - Jan Kotania | Web Developer",
        description: "Portfolio showcasing experience and programming skills in JavaScript and beyond. Jan Kotania is a passionate developer of new technologies and an experienced Developer specializing in React, Next.js and modern web solutions. He creates fast, responsive and intuitive web applications, taking care of code quality, performance optimization and UX/UI best practices.",
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
        ]
      },
      navbar: {
        about: "About me",
        projects: "Projects",
        skills: "Skills",
        contact: "Contact",
        resume: "Resume"
      },
      resumePopup: {
        title: "Select Resume Version",
        englishVersion: "English Version",
        polishVersion: "Polska Wersja"
      },
      skills:
    {
       name: "Skills",
    },
      projects: {
        title: "Projects",
        viewProject: "View Project",
        types: {
          website: "Website",
          mobileApp: "Mobile App with AI",
          design: "Design"
        },
        items: {
          mogo: {
            description: "Website for a fictional furniture company with authentication system.",
            type: "Website"
          },
          kombuczara: {
            description: "Website created to promote fermented tea in Poland by an influencer known as 'Kombuczara'.",
            type: "Website"
          },
          foodar: {
            description: "Mobile application with object detection functionality. Uses YOLO AI model for object recognition and Firebase for data storage.",
            type: "Mobile App with AI"
          },
          logix: {
            description: "Platform for software development companies. Frontend built with Next.js using Tailwind CSS.",
            type: "Website"
          },
          portfolio: {
            description: "Exactly the same website you're on right now where you can learn more about me. :P",
            type: "Website"
          },
          radioSilesia: {
            description: "A fully functional prototype created specifically for collaboration with Radio Silesia. Achieved the highest ratings in the competition.",
            type: "Design"
          }
        }
      },
      hero: {
        title: "Full Stack & Mobile Developer",
        links: {
          github: "My GitHub profile",
          linkedin: "My LinkedIn profile",
          email: "Send email"
        }
      },
      description: {
        firstPart: "I create modern applications using",
        and: "and",
        lastPart: ", enhanced with artificial intelligence capabilities. I specialize in creating efficient cross-platform solutions."
      },
      contact: {
        title: "Contact",
        subtitle: "Feel free to reach out if you're looking for a developer, have a question, or just want to connect.",
        email: {
            label: "Email",
            placeholder: "Email"
        },
        location: {
            label: "Location",
            value: "Silesia, Poland"
        },
        form: {
            name: "Full Name",
            message: "Your Message",
            send: "Send Message",
            sending: "Sending...",
            success: "Message sent successfully!",
            error: "Failed to send message. Please try again.",
            cooldown: (minutes) => `Please wait ${minutes} minute${minutes > 1 ? 's' : ''} before sending another message.`
        },
        responseTime: "Response time: Usually within 24 hours"
      }
    }
  };