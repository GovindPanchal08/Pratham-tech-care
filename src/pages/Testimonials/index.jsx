import { motion, useReducedMotion } from 'framer-motion';
import { Star, TrendingUp } from 'lucide-react';
import SEOHead from '../../components/common/SEOHead';
import PageHero from '../../components/common/PageHero';
import CTABanner from '../../components/sections/CTABanner';
import { SEO } from '../../constants/seo';
import { TESTIMONIALS, STATS } from '../../constants/testimonials';

export default function TestimonialsPage() {
  const shouldReduce = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduce ? 0 : 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
  };

  return (
    <>
      <SEOHead {...SEO.testimonials} />
      <PageHero
        tag="Client Testimonials"
        title="What Our Clients Say"
        subtitle="Real feedback from the business leaders and IT decision-makers who trust Pratham Tech Care with their most critical technology infrastructure."
        breadcrumbs={[{ label: 'Testimonials' }]}
      />

      {/* Stats */}
      <section className="section-padding-sm bg-bg border-b border-border">
        <div className="container-xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-left sm:text-center">
                <div className="font-headings text-4xl font-extrabold text-accent">{stat.value}</div>
                <div className="mt-1 text-sm text-text-secondary">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="section-padding bg-bg-subtle border-b border-border">
        <div className="container-xl">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {TESTIMONIALS.map((t) => (
              <motion.div
                key={t.id}
                variants={itemVariants}
                className="bg-bg border border-border rounded-lg p-7 flex flex-col justify-between"
              >
                <div>
                  {/* Stars */}
                  <div className="flex items-center gap-0.5 mb-5">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" className="text-amber-400" />
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-text-primary leading-relaxed text-sm italic mb-5">
                    "{t.quote}"
                  </blockquote>
                </div>

                <div>
                  {/* Metric badge */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent-subtle/50 border border-accent/10 rounded mb-5">
                    <TrendingUp size={14} className="text-accent" strokeWidth={1.5} />
                    <span className="text-xs font-semibold text-accent">{t.metric}</span>
                  </div>

                  {/* Author */}
                  <div className="pt-4 border-t border-border flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent-subtle flex items-center justify-center font-headings font-bold text-accent text-sm shrink-0">
                      {t.avatar}
                    </div>
                    <div>
                      <div className="font-headings font-semibold text-text-primary text-sm">{t.name}</div>
                      <div className="text-xs text-text-secondary">{t.title}, {t.company}</div>
                    </div>
                    <div className="ml-auto hidden sm:block">
                      <span className="text-xs font-semibold px-2 py-1 bg-bg-subtle text-text-secondary border border-border rounded">
                        {t.industry}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <CTABanner
        title="Ready to become our next success story?"
        subtitle="Join 200+ enterprises that trust Pratham Tech Care for their most critical IT operations."
      />
    </>
  );
}
