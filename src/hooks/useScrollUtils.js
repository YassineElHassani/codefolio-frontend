import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Custom hook for scroll progress indicator
 * Returns a ref to attach to a progress bar element
 */
export const useScrollProgress = () => {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Create a timeline that syncs with scroll
    gsap.to(element, {
      scaleX: 1,
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5,
        markers: false,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return ref;
};

/**
 * Hook for smooth scroll behavior
 */
export const useSmoothScroll = () => {
  useEffect(() => {
    // Add smooth scroll behavior to html
    const htmlElement = document.documentElement;
    const originalScroll = htmlElement.style.scrollBehavior;
    htmlElement.style.scrollBehavior = 'smooth';

    return () => {
      htmlElement.style.scrollBehavior = originalScroll;
    };
  }, []);
};

export default {
  useScrollProgress,
  useSmoothScroll,
};
