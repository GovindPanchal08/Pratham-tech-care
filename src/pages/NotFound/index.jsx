import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { Home } from 'lucide-react';
import SEOHead from '../../components/common/SEOHead';

export default function NotFoundPage() {
  const shouldReduce = useReducedMotion();

  return (
    <>
      <SEOHead title="404 — Page Not Found | Pratham Tech Care" />
      <section className="min-h-[80vh] flex items-center justify-center bg-bg relative overflow-hidden">
        <div className="relative container-xl py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={shouldReduce ? { duration: 0 } : { duration: 0.4, ease: 'easeOut' }}
          >
            <div className="font-mono text-8xl lg:text-[10rem] font-extrabold text-text-secondary/10 select-none leading-none mb-8">
              404
            </div>
            <h1 className="font-headings text-2xl lg:text-3xl font-bold text-text-primary mb-3">
              Page Not Found
            </h1>
            <p className="text-text-secondary mb-8 max-w-md mx-auto">
              The page you're looking for doesn't exist or has been moved. Let's get you back on track.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <motion.div
                whileHover={shouldReduce ? {} : { scale: 1.02 }}
                whileTap={shouldReduce ? {} : { scale: 0.98 }}
                transition={{ duration: 0.15 }}
              >
                <Link to="/" className="btn-primary">
                  <Home size={16} strokeWidth={1.5} />
                  Go Home
                </Link>
              </motion.div>
              <motion.div
                whileHover={shouldReduce ? {} : { scale: 1.02 }}
                whileTap={shouldReduce ? {} : { scale: 0.98 }}
                transition={{ duration: 0.15 }}
              >
                <Link to="/contact" className="btn-secondary">
                  Contact Support
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
