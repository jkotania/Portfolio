// hooks/useAnalytics.js
"use client";

export const useAnalytics = () => {
    const trackPageView = () => {
        if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', 'page_view');
        }
    };

    const trackEvent = (action, category, label, value) => {
        if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', action, {
                event_category: category,
                event_label: label,
                value: value
            });
        }
    };

    return { trackPageView, trackEvent };
};