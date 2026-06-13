import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useLenis, useLenisScrollTo } from './SmoothScroll';

/**
 * ScrollToTopOnRouteChange
 * -------------------------------------------------------------------------
 * Resets scroll position to top whenever the route changes.
 * Uses Lenis (instant, no animation) so it doesn't fight with the
 * smooth scroll instance.
 *
 * Usage — place once near the root, inside your Router:
 *   <BrowserRouter>
 *     <SmoothScroll>
 *       <ScrollToTopOnRouteChange />
 *       <Routes>...</Routes>
 *     </SmoothScroll>
 *   </BrowserRouter>
 * -------------------------------------------------------------------------
 */
export function ScrollToTopOnRouteChange() {
  const { pathname, hash } = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    // if navigating to a hash anchor (#services etc.), let the page handle it
    if (hash) return;

    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [pathname, hash, lenis]);

  return null;
}

/**
 * ScrollToTopButton
 * -------------------------------------------------------------------------
 * Floating "back to top" button. Appears after scrolling past a threshold,
 * smooth-scrolls to top via Lenis on click, with framer-motion enter/exit
 * and micro-interactions.
 *
 * Usage — place once near the root, anywhere inside SmoothScroll:
 *   <ScrollToTopButton />
 * -------------------------------------------------------------------------
 */
export function ScrollToTopButton({ threshold = 400 }) {
  const [visible, setVisible] = useState(false);
  const shouldReduce = useReducedMotion();
  const lenis = useLenis();
  const scrollTo = useLenisScrollTo();

  useEffect(() => {
    function handleScroll(y) {
      setVisible(y > threshold);
    }

    if (lenis) {
      const onScroll = ({ scroll }) => handleScroll(scroll);
      lenis.on('scroll', onScroll);
      return () => lenis.off('scroll', onScroll);
    } else {
      const onScroll = () => handleScroll(window.scrollY);
      window.addEventListener('scroll', onScroll, { passive: true });
      return () => window.removeEventListener('scroll', onScroll);
    }
  }, [lenis, threshold]);

  const handleClick = () => {
    scrollTo(0);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={handleClick}
          aria-label="Scroll to top"
          initial={shouldReduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.9 }}
          animate={shouldReduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
          exit={shouldReduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.9 }}
          whileHover={shouldReduce ? {} : { y: -3, transition: { duration: 0.18 } }}
          whileTap={shouldReduce ? {} : { scale: 0.92 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-accent text-white shadow-lg flex items-center justify-center hover:bg-accent/90 transition-colors duration-200"
        >
          <motion.span
            animate={shouldReduce ? {} : { y: [0, -2, 0] }}
            transition={shouldReduce ? {} : { duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowUp size={18} strokeWidth={2} />
          </motion.span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
