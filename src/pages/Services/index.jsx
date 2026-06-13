import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase, isSupabaseConfigured } from '../../services/supabase';

import SEOHead from '../../components/common/SEOHead';
import PageHero from '../../components/common/PageHero';
import SectionHeader from '../../components/common/SectionHeader';
import CTABanner from '../../components/sections/CTABanner';
import { SEO } from '../../constants/seo';
import { SERVICES as STATIC_SERVICES } from '../../constants/services';

function DynamicIcon({ name, size = 20, strokeWidth = 1.5, className }) {
  const IconComponent = LucideIcons[name] || LucideIcons.HelpCircle;
  return <IconComponent size={size} strokeWidth={strokeWidth} className={className} />;
}

export default function ServicesPage() {
  const shouldReduce = useReducedMotion();
  const configured = isSupabaseConfigured();

  const { data: services = [] } = useQuery({
    queryKey: ['public-services'],
    queryFn: async () => {
      if (!configured) return [];
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('active', true)
        .order('created_at', { ascending: true });
      if (error) {
        console.error('Failed to load services from DB:', error);
        return [];
      }
      return data || [];
    },
    enabled: configured,
  });

  const servicesToRender = STATIC_SERVICES;

  return (
    <>
      <SEOHead {...SEO.services} />
      <PageHero
        tag="Our Services"
        title="End-to-End IT Services for Enterprise"
        subtitle="Comprehensive IT solutions spanning infrastructure, security, cloud, and managed services — all from a single, trusted partner."
        breadcrumbs={[{ label: 'Services' }]}
      />

      {/* Services Detail */}
      <section className="section-padding bg-bg">
        <div className="container-xl">
          <div className="space-y-8">
            {servicesToRender.map((service, i) => {
              const isReversed = i % 2 === 1;
              return (
                <motion.div
                  key={service.id}
                  id={service.slug || service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={
                    shouldReduce ? { duration: 0 } : { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
                  }
                  className="relative"
                >
                  <div className="grid lg:grid-cols-12 gap-6 lg:gap-2  items-stretch">
                    {/* Image Block — spans 5 columns */}
                    <div
                      className={`relative lg:col-span-5 h-64 lg:h-[440px] rounded-2xl overflow-hidden z-0 ${
                        isReversed ? 'lg:order-2' : 'lg:order-1'
                      }`}
                    >
                      <motion.img
                        src={service.image}
                        alt={service.title}
                        className="absolute inset-0 w-full h-full object-cover"
                        initial={{ scale: 1.1 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={
                          shouldReduce
                            ? { duration: 0 }
                            : { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
                        }
                      />
                      {/* gradient for text legibility */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                      {/* large number watermark — move inside normal bounds */}
                      <span className="absolute bottom-2 right-3 text-[100px] font-headings font-black text-white/[0.12] leading-none select-none pointer-events-none">
                        {String(i + 1).padStart(2, '0')}
                      </span>

                      {/* title overlay */}
                      <div className="absolute bottom-0 left-2 p-6 lg:p-7 w-full">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-9 h-9 rounded-lg bg-white/10 backdrop-blur-sm border border-white/15 flex items-center justify-center shrink-0">
                            <DynamicIcon name={service.icon} size={16} className="text-white" />
                          </div>
                          <p className="text-[10px] font-semibold tracking-widest uppercase text-white/70">
                            Service {String(i + 1).padStart(2, '0')} /{' '}
                            {String(servicesToRender.length).padStart(2, '0')}
                          </p>
                        </div>
                        <h2 className="font-headings text-xl lg:text-2xl font-bold text-white leading-snug max-w-[85%]">
                          {service.title}
                        </h2>
                      </div>
                    </div>

                    {/* Content Block — spans 7 columns */}
                    <div
                      className={`lg:col-span-7 ${
                        isReversed ? 'lg:order-1 lg:-mr-10' : 'lg:order-2 lg:-ml-10'
                      } relative z-10`}
                    >
                      <div className="group h-full bg-bg-subtle border border-border rounded-2xl p-7 lg:p-9 hover:border-accent/30 transition-colors duration-300 relative overflow-hidden">
                        {/* top glow */}
                        <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        <div
                          className={`flex flex-col h-full ${isReversed ? 'lg:pr-14' : 'lg:pl-14'}`}
                        >
                          {/* description */}
                          <p className="text-sm text-text-secondary leading-relaxed mb-6">
                            {service.description}
                          </p>

                          {/* capabilities grid */}
                          <div className="mb-7">
                            <p className="text-[10px] font-semibold tracking-widest uppercase text-text-tertiary mb-3">
                              Key Capabilities
                            </p>
                            <div className="grid sm:grid-cols-2 gap-2.5">
                              {service.features.map((f) => (
                                <div key={f} className="flex items-start gap-2.5">
                                  <div className="w-4 h-4 rounded-md bg-accent/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-accent/15 transition-colors duration-200">
                                    <LucideIcons.Check
                                      size={10}
                                      className="text-accent"
                                      strokeWidth={2.5}
                                    />
                                  </div>
                                  <span className="text-sm text-text-secondary leading-snug">
                                    {f}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* CTA */}
                          <div className="mt-auto pt-5 border-t border-border flex items-center justify-between">
                            <motion.div
                              whileHover={shouldReduce ? {} : { x: 2 }}
                              transition={{ duration: 0.15 }}
                            >
                              <Link
                                to={service.path}
                                className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:gap-3 transition-all duration-200"
                              >
                                Learn more about this service
                                <LucideIcons.ArrowRight size={15} strokeWidth={1.75} />
                              </Link>
                            </motion.div>

                            <div className="w-9 h-9 rounded-full border border-border flex items-center justify-center group-hover:border-accent/40 group-hover:bg-accent/5 transition-colors duration-200 shrink-0">
                              <LucideIcons.ArrowUpRight
                                size={14}
                                className="text-text-tertiary group-hover:text-accent transition-colors duration-200"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
