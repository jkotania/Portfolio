"use client";

export const useAnalytics = () => {
  const trackPageView = () => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "page_view");
    }
  };

  const trackEvent = (action, category, label, value) => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", action, {
        event_category: category,
        event_label: label,
        value: value,
        non_interaction: false,
      });

      console.log(
        `Analytics event: ${action}, category: ${category}, label: ${label}`
      );
    } else {
      console.warn("Google Analytics nie jest dostępne");
    }
  };

  return { trackPageView, trackEvent };
};
