import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function PageHero({ tag, title, subtitle, breadcrumbs = [] }) {
  const shouldReduce = useReducedMotion();

  return (
    <section className="relative bg-bg-subtle border-b border-border overflow-hidden">
      <div className="relative container-xl py-16 lg:py-20">
        {/* Breadcrumbs */}
        {breadcrumbs.length > 0 && (
          <nav className="flex items-center gap-2 mb-6 text-sm text-text-secondary" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-accent transition-colors duration-150">Home</Link>
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-2">
                <ChevronRight size={14} className="text-text-secondary/50 shrink-0" strokeWidth={1.5} />
                {crumb.path ? (
                  <Link to={crumb.path} className="hover:text-accent transition-colors duration-150">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-text-primary font-medium">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={shouldReduce ? { duration: 0 } : { duration: 0.4, ease: 'easeOut' }}
          className="max-w-3xl"
        >
          {tag && <div className="label-tag mb-5">{tag}</div>}
          <h1 className="font-headings text-4xl lg:text-5xl font-extrabold text-text-primary tracking-tight leading-[1.05] text-balance">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-4 text-base lg:text-lg text-text-secondary leading-relaxed max-w-2xl">
              {subtitle}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
