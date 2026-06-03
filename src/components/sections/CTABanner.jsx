import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function CTABanner({
  title = 'Ready to transform your IT infrastructure?',
  subtitle = 'Speak with our enterprise technology consultants and get a customized solution for your business.',
  primaryLabel = 'Get a Free Consultation',
  primaryHref = '/contact',
  secondaryLabel = 'View Our Services',
  secondaryHref = '/services',
}) {
  const shouldReduce = useReducedMotion();

  return (
    <section className="bg-accent text-white relative overflow-hidden">
      <div className="relative container-xl py-16 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={shouldReduce ? { duration: 0 } : { duration: 0.4, ease: 'easeOut' }}
          className="flex flex-col lg:flex-row items-center  gap-8"
        >
          <div className="text-center lg:text-left max-w-2xl">
            <h2 className="font-headings text-2xl lg:text-3xl font-bold text-white text-balance">
              {title}
            </h2>
            <p className="mt-3 text-white/95 text-base lg:text-lg">{subtitle}</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <motion.div
              whileHover={shouldReduce ? {} : { scale: 1.02 }}
              whileTap={shouldReduce ? {} : { scale: 0.98 }}
              transition={{ duration: 0.15 }}
            >
              <Link
                to={primaryHref}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-accent font-semibold text-sm rounded-lg hover:bg-white/90 transition-colors duration-150"
              >
                {primaryLabel}
                <ArrowRight size={16} strokeWidth={1.5} />
              </Link>
            </motion.div>
            <motion.div
              whileHover={shouldReduce ? {} : { scale: 1.02 }}
              whileTap={shouldReduce ? {} : { scale: 0.98 }}
              transition={{ duration: 0.15 }}
            >
              <Link
                to={secondaryHref}
                className="inline-flex items-center gap-2 px-6 py-3 bg-transparent text-white font-semibold text-sm rounded-lg hover:bg-white/10 border border-white/20 transition-colors duration-150"
              >
                {secondaryLabel}
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
