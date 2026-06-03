import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Palette, X } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function ThemeSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme, themes } = useTheme();
  const shouldReduce = useReducedMotion();
  const switcherRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (switcherRef.current && !switcherRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const popoverVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 }
  };

  const transition = shouldReduce ? { duration: 0 } : { duration: 0.12, ease: 'easeOut' };

  return (
    <div className="fixed bottom-6 right-6 z-50" ref={switcherRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-12 h-12 rounded-full shadow-lg bg-accent text-white hover:opacity-90 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
        aria-label="Change theme"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={isOpen ? 'close' : 'open'}
            initial={{ rotate: -45, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 45, opacity: 0 }}
            transition={{ duration: 0.1 }}
          >
            {isOpen ? <X size={20} /> : <Palette size={20} />}
          </motion.div>
        </AnimatePresence>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={popoverVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={transition}
            className="absolute bottom-16 right-0 w-72 bg-bg border border-border rounded-xl shadow-xl p-4 origin-bottom-right"
          >
            <h3 className="text-xs font-semibold uppercase tracking-wider text-text-secondary mb-3">
              Select Theme
            </h3>
            <div className="space-y-2">
              {themes.map((t) => {
                const isActive = theme === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => {
                      setTheme(t.id);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 p-2 rounded-lg text-left transition-colors duration-150 hover:bg-bg-subtle border ${
                      isActive ? 'border-accent bg-accent-subtle/20' : 'border-transparent'
                    }`}
                  >
                    {/* Swatch */}
                    <div
                      className="w-6 h-6 rounded-md flex items-center justify-center border border-border"
                      style={{ backgroundColor: t.bg }}
                    >
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: t.accent }} />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-text-primary leading-none">
                        {t.name}
                      </div>
                      <div className="text-[10px] text-text-secondary mt-1">
                        {t.feel}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
