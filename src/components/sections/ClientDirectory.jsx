import { AnimatePresence, useReducedMotion, motion } from 'framer-motion';
import React from 'react';
import { CLIENTS } from '../../constants/clients';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ClientCarousel() {
  const shouldReduce = useReducedMotion();
  const [page, setPage] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);

  // responsive items-per-page
  const [perPage, setPerPage] = React.useState(8);

  React.useEffect(() => {
    const updatePerPage = () => {
      if (window.innerWidth < 640)
        setPerPage(4); // mobile: 2x2
      else if (window.innerWidth < 1024)
        setPerPage(6); // tablet: 3x2
      else setPerPage(8); // desktop: 4x2
    };
    updatePerPage();
    window.addEventListener('resize', updatePerPage);
    return () => window.removeEventListener('resize', updatePerPage);
  }, []);

  const totalPages = Math.ceil(CLIENTS.length / perPage);

  // auto-advance
  React.useEffect(() => {
    if (shouldReduce || isPaused) return;
    const interval = setInterval(() => {
      setPage((p) => (p + 1) % totalPages);
    }, 4000);
    return () => clearInterval(interval);
  }, [totalPages, isPaused, shouldReduce]);

  const currentClients = CLIENTS.slice(page * perPage, page * perPage + perPage);
  const gridCols =
    perPage === 4
      ? 'grid-cols-2'
      : perPage === 6
        ? 'grid-cols-2 sm:grid-cols-3'
        : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4';

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* card grid with crossfade + slide */}
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={shouldReduce ? {} : { opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={shouldReduce ? {} : { opacity: 0, x: -24 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className={`grid ${gridCols} gap-3`}
          >
            {currentClients.map((client, i) => {
              const globalIndex = page * perPage + i;
              return (
                <motion.div
                  key={client.id}
                  initial={shouldReduce ? {} : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.04, ease: 'easeOut' }}
                  whileHover={shouldReduce ? {} : { y: -3, transition: { duration: 0.18 } }}
                  className="group relative bg-bg-subtle border border-border rounded-2xl p-5 overflow-hidden hover:border-accent/30 transition-colors duration-200"
                >
                  {/* top glow */}
                  <div className="absolute top-0 left-5 right-5 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <p className="text-[10px] font-semibold tracking-widest text-text-tertiary mb-3">
                    {String(globalIndex + 1).padStart(2, '0')}
                  </p>

                  <div className="w-10 h-10 rounded-xl bg-bg border border-border flex items-center justify-center mb-4 group-hover:border-accent/30 group-hover:bg-accent/5 transition-colors duration-200">
                    <span className="text-sm font-bold font-headings text-text-secondary group-hover:text-accent transition-colors duration-200">
                      {client.abbr.slice(0, 2)}
                    </span>
                  </div>

                  <p className="font-headings font-semibold text-text-primary text-sm leading-snug mb-1 truncate">
                    {client.name}
                  </p>
                  <p className="text-[11px] text-text-tertiary truncate">{client.industry}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* pagination controls */}
      <div className="flex items-center justify-center gap-4 mt-8">
        {/* prev */}
        <button
          onClick={() => setPage((p) => (p - 1 + totalPages) % totalPages)}
          className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:border-accent/40 hover:bg-accent/5 transition-colors duration-200 shrink-0"
          aria-label="Previous page"
        >
          <ChevronLeft size={16} className="text-text-secondary" />
        </button>

        {/* dots */}
        <div className="flex items-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className="relative h-2 rounded-full overflow-hidden transition-all duration-300"
              style={{
                width: i === page ? '24px' : '8px',
                backgroundColor: i === page ? 'transparent' : 'var(--color-border)',
              }}
              aria-label={`Go to page ${i + 1}`}
            >
              {i === page && (
                <motion.div
                  className="absolute inset-0 bg-accent rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: shouldReduce || isPaused ? 0 : 4, ease: 'linear' }}
                  style={{ originX: 0 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* next */}
        <button
          onClick={() => setPage((p) => (p + 1) % totalPages)}
          className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:border-accent/40 hover:bg-accent/5 transition-colors duration-200 shrink-0"
          aria-label="Next page"
        >
          <ChevronRight size={16} className="text-text-secondary" />
        </button>
      </div>
    </div>
  );
}
