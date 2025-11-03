import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

/**
 * Hook for fade-in animation on scroll
 * @param {Object} options - Animation options
 * @param {number} options.duration - Animation duration
 * @param {number} options.delay - Animation delay
 * @param {number} options.stagger - Stagger delay between elements
 * @param {string} options.start - ScrollTrigger start position
 * @param {string} options.end - ScrollTrigger end position
 * @param {number} options.yOffset - Y offset for slide animation
 * @returns {Object} - ref to attach to element
 */
export const useFadeInUp = (options = {}) => {
  const ref = useRef(null);
  const {
    duration = 0.8,
    delay = 0,
    stagger = 0.1,
    start = 'top 80%',
    end = 'top 50%',
    yOffset = 50,
  } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const children = element.querySelectorAll('[data-animate]');
    if (children.length === 0) return;

    gsap.from(children, {
      duration,
      delay,
      opacity: 0,
      y: yOffset,
      stagger,
      scrollTrigger: {
        trigger: element,
        start,
        end,
        markers: false,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [duration, delay, stagger, start, end, yOffset]);

  return ref;
};

/**
 * Hook for fade-in animation on scroll (single element)
 */
export const useFadeIn = (options = {}) => {
  const ref = useRef(null);
  const {
    duration = 0.8,
    delay = 0,
    start = 'top 80%',
  } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    gsap.from(element, {
      duration,
      delay,
      opacity: 0,
      scrollTrigger: {
        trigger: element,
        start,
        markers: false,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [duration, delay, start]);

  return ref;
};

/**
 * Hook for slide-in animation on scroll
 */
export const useSlideInLeft = (options = {}) => {
  const ref = useRef(null);
  const {
    duration = 0.8,
    delay = 0,
    start = 'top 80%',
    xOffset = -100,
  } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    gsap.from(element, {
      duration,
      delay,
      opacity: 0,
      x: xOffset,
      scrollTrigger: {
        trigger: element,
        start,
        markers: false,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [duration, delay, start, xOffset]);

  return ref;
};

/**
 * Hook for counter animation (0 to target number)
 */
export const useCounterAnimation = (targetValue, options = {}) => {
  const ref = useRef(null);
  const {
    duration = 2,
    start = 'top 80%',
    suffix = '',
    prefix = '',
  } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const countObj = { value: 0 };

    gsap.to(countObj, {
      value: targetValue,
      duration,
      scrollTrigger: {
        trigger: element,
        start,
        markers: false,
        invalidateOnRefresh: true,
      },
      onUpdate: () => {
        element.textContent = `${prefix}${Math.round(countObj.value)}${suffix}`;
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [targetValue, duration, start, suffix, prefix]);

  return ref;
};

/**
 * Hook for parallax effect
 */
export const useParallax = (options = {}) => {
  const ref = useRef(null);
  const { speed = 0.5 } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    gsap.to(element, {
      y: () => window.innerHeight * speed,
      scrollTrigger: {
        trigger: element,
        start: 'top center',
        end: 'bottom center',
        scrub: true,
        markers: false,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [speed]);

  return ref;
};

/**
 * Hook for progress bar animation
 */
export const useProgressBar = (options = {}) => {
  const ref = useRef(null);
  const { targetPercentage = 100, duration = 1, start = 'top 80%' } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const progressObj = { width: 0 };

    gsap.to(progressObj, {
      width: targetPercentage,
      duration,
      scrollTrigger: {
        trigger: element,
        start,
        markers: false,
        invalidateOnRefresh: true,
      },
      onUpdate: () => {
        if (element) {
          element.style.width = `${progressObj.width}%`;
        }
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [targetPercentage, duration, start]);

  return ref;
};

/**
 * Hook for scale animation on scroll
 */
export const useScaleIn = (options = {}) => {
  const ref = useRef(null);
  const {
    duration = 0.8,
    delay = 0,
    start = 'top 80%',
    fromScale = 0.8,
  } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    gsap.from(element, {
      duration,
      delay,
      opacity: 0,
      scale: fromScale,
      scrollTrigger: {
        trigger: element,
        start,
        markers: false,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [duration, delay, start, fromScale]);

  return ref;
};

export default {
  useFadeInUp,
  useFadeIn,
  useSlideInLeft,
  useCounterAnimation,
  useParallax,
  useProgressBar,
  useScaleIn,
};
