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
    <section className="px-3 sm:px-6 lg:px-8 py-8 lg:py-16">
      <div className="max-w-6xl mx-auto">
        <div className="bg-accent text-white relative overflow-hidden rounded-2xl sm:rounded-3xl">
          {/* decorative circles — sized down on mobile */}
          <div className="absolute -top-10 -left-10 w-40 h-40 sm:w-64 sm:h-64 rounded-full bg-white/5 pointer-events-none" />
          <div className="absolute -bottom-14 -right-8 w-52 h-52 sm:w-80 sm:h-80 rounded-full bg-white/5 pointer-events-none" />
          <div className="absolute top-6 right-20 w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-white/5 pointer-events-none" />

          <div className="relative py-10 sm:py-14 lg:py-24 px-5 sm:px-10 lg:px-20">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={shouldReduce ? { duration: 0 } : { duration: 0.4, ease: 'easeOut' }}
              className="flex flex-col items-center gap-6 sm:gap-8"
            >
              <div className="text-center max-w-2xl">
                <h2 className="font-headings text-xl sm:text-2xl lg:text-3xl font-bold text-white text-balance leading-snug">
                  {title}
                </h2>
                <p className="mt-3 text-white/80 text-sm sm:text-base lg:text-lg leading-relaxed">
                  {subtitle}
                </p>
              </div>

              <div className="flex flex-col xs:flex-row sm:flex-row items-center gap-3 w-full sm:w-auto">
                <motion.div
                  className="w-full sm:w-auto"
                  whileHover={shouldReduce ? {} : { scale: 1.02 }}
                  whileTap={shouldReduce ? {} : { scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                >
                  <Link
                    to={primaryHref}
                    className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 bg-white text-accent font-semibold text-sm rounded-full hover:bg-white/90 transition-colors duration-150"
                  >
                    {primaryLabel}
                    <ArrowRight size={16} strokeWidth={1.5} />
                  </Link>
                </motion.div>

                <motion.div
                  className="w-full sm:w-auto"
                  whileHover={shouldReduce ? {} : { scale: 1.02 }}
                  whileTap={shouldReduce ? {} : { scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                >
                  <Link
                    to={secondaryHref}
                    className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 bg-transparent text-white font-semibold text-sm rounded-full hover:bg-white/10 border border-white/20 transition-colors duration-150"
                  >
                    {secondaryLabel}
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
