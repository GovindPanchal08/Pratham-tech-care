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

const PROCESS = [
  {
    step: '01',
    title: 'Discovery & Assessment',
    desc: 'We begin with a thorough assessment of your current IT environment, understanding your business objectives, pain points, and requirements.',
  },
  {
    step: '02',
    title: 'Solution Design',
    desc: 'Our architects design a tailored solution that addresses your specific needs — not a one-size-fits-all package.',
  },
  {
    step: '03',
    title: 'Implementation',
    desc: 'Our certified engineers deploy the solution with minimal disruption to your operations, following documented change management processes.',
  },
  {
    step: '04',
    title: 'Testing & Handover',
    desc: 'Rigorous testing ensures everything works as designed. We provide full documentation and knowledge transfer.',
  },
  {
    step: '05',
    title: 'Ongoing Support',
    desc: 'Post-implementation, our team provides monitoring, maintenance, and continuous improvement to ensure long-term success.',
  },
];

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

  const servicesToRender = services.length > 0 ? services : STATIC_SERVICES;

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduce ? 0 : 0.07,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  };

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
          <div className="space-y-5">
            {servicesToRender.map((service, i) => (
              <motion.div
                key={service.id}
                id={service.slug || service.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={
                  shouldReduce ? { duration: 0 } : { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
                }
                className="group relative bg-bg-subtle border border-border rounded-2xl overflow-hidden hover:border-accent/30 transition-colors duration-200"
              >
                {/* top glow */}
                <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="p-7 lg:p-10">
                  <div
                    className={`flex flex-col lg:flex-row gap-8 lg:gap-12 ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
                  >
                    {/* left — content */}
                    <div className="flex flex-col lg:w-2/3">
                      {/* header */}
                      <div className="flex items-start justify-between gap-4 mb-6">
                        <div className="flex items-center gap-3">
                          <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/15 transition-colors duration-200">
                            <DynamicIcon name={service.icon} size={19} className="text-accent" />
                          </div>
                          <div>
                            <p className="text-[10px] font-semibold tracking-widest uppercase text-text-tertiary mb-0.5">
                              Service {String(i + 1).padStart(2, '0')}
                            </p>
                            <h2 className="font-headings text-lg font-bold text-text-primary leading-snug">
                              {service.title}
                            </h2>
                          </div>
                        </div>
                      </div>

                      {/* divider */}
                      <div className="w-full h-px bg-border mb-6" />

                      {/* description */}
                      <p className="text-sm text-text-secondary leading-relaxed mb-8 flex-1">
                        {service.description}
                      </p>

                      {/* cta */}
                      <div>
                        <motion.div
                          whileHover={shouldReduce ? {} : { scale: 1.02 }}
                          whileTap={shouldReduce ? {} : { scale: 0.98 }}
                          transition={{ duration: 0.15 }}
                          className="inline-block"
                        >
                          <Link to={service.path} className="btn-primary">
                            Learn More
                            <LucideIcons.ArrowRight size={15} strokeWidth={1.5} />
                          </Link>
                        </motion.div>
                      </div>
                    </div>

                    {/* right — capabilities */}
                    <div className="lg:w-1/3">
                      <div className="bg-bg border border-border rounded-xl p-5 h-full">
                        <p className="text-[10px] font-semibold tracking-widest uppercase text-text-tertiary mb-4">
                          Key Capabilities
                        </p>
                        <ul className="space-y-3">
                          {service.features.map((f) => (
                            <li key={f} className="flex items-start gap-2.5">
                              <div className="w-4 h-4 rounded-md bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                                <LucideIcons.Check size={10} className="text-accent" strokeWidth={2.5} />
                              </div>
                              <span className="text-sm text-text-secondary leading-snug">{f}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      {/* Process */}
      <section className="section-padding bg-bg-subtle border-t border-border">
        <div className="container-xl">
          <SectionHeader
            tag="Our Process"
            title="How We Work With You"
            subtitle="A structured, transparent engagement model that ensures successful outcomes every time."
          />

          <div className="relative">
            {/* vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-border" />

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-0"
            >
              {PROCESS.map((step, i) => (
                <motion.div
                  key={step.step}
                  variants={
                    shouldReduce
                      ? {}
                      : {
                          hidden: { opacity: 0, x: -16 },
                          visible: {
                            opacity: 1,
                            x: 0,
                            transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
                          },
                        }
                  }
                  className="relative flex gap-8 pb-10 last:pb-0"
                >
                  {/* dot on the line */}
                  <div className="relative z-10 shrink-0">
                    <div className="w-12 h-12 rounded-2xl bg-bg border border-border flex items-center justify-center group-hover:border-accent/30 transition-colors duration-200">
                      <span className="font-headings font-bold text-sm text-accent">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                  </div>

                  {/* card */}
                  <motion.div
                    whileHover={{ x: 4, transition: { duration: 0.18 } }}
                    className="group relative flex-1 bg-bg border border-border rounded-2xl p-6 overflow-hidden hover:border-accent/30 transition-colors duration-200 mb-1"
                  >
                    {/* top glow */}
                    <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="font-headings font-semibold text-text-primary text-base leading-snug">
                        {step.title}
                      </h3>
                      <span className="text-[10px] font-semibold tracking-widest text-text-tertiary shrink-0">
                        {String(i + 1).padStart(2, '0')} / {String(PROCESS.length).padStart(2, '0')}
                      </span>
                    </div>
                    <p className="text-sm text-text-secondary leading-relaxed">{step.desc}</p>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
      <CTABanner />
    </>
  );
}
