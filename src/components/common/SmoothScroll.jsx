import { createContext, useContext, useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { useFrame, MotionConfig, motion as m } from 'framer-motion';

const LenisContext = createContext(null);

export function useLenis() {
  return useContext(LenisContext);
}

export default function SmoothScroll({ children, options = {} }) {
  const lenisRef = useRef(null);
  const [lenis, setLenis] = useState(null);

  useEffect(() => {
    const instance = new Lenis({
      duration: 0.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo-out
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      smoothTouch: false, // smoother native feel on touch devices
      touchMultiplier: 1.2,
      ...options,
    });

    lenisRef.current = instance;
    setLenis(instance);

    // Drive Lenis's internal raf loop manually so we can sync it with
    // framer-motion's frame loop below.
    function raf(time) {
      instance.raf(time);
    }

    // We hook into framer-motion's frame loop (via requestAnimationFrame
    // fallback) so whileInView triggers + scroll listeners read the
    // smoothed scroll position, not the raw native one.
    let rafId;
    function loop(time) {
      raf(time);
      rafId = requestAnimationFrame(loop);
    }
    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      instance.destroy();
      lenisRef.current = null;
      setLenis(null);
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LenisContext.Provider>
  );
}

export function useLenisScrollTo() {
  const lenis = useLenis();

  return (target, opts = {}) => {
    if (!lenis) {
      if (typeof target === 'string') {
        document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: target, behavior: 'smooth' });
      }
      return;
    }

    lenis.scrollTo(target, {
      duration: 0.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      ...opts,
    });
  };
}
