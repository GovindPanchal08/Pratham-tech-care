import { motion, useReducedMotion } from 'framer-motion';
import {
  Building2,
  Heart,
  Factory,
  GraduationCap,
  ShoppingCart,
  Truck,
  Hotel,
  Home as HomeIcon,
  CheckCircle,
} from 'lucide-react';
import * as LucideIcons from 'lucide-react';

import SEOHead from '../../components/common/SEOHead';
import PageHero from '../../components/common/PageHero';
import SectionHeader from '../../components/common/SectionHeader';
import CTABanner from '../../components/sections/CTABanner';
import { SEO } from '../../constants/seo';
import { CLIENTS, INDUSTRIES, CASE_STUDIES } from '../../constants/clients';
import ClientDirectory from '../../components/sections/ClientDirectory';
import { SITE_CONFIG } from '../../constants/siteConfig';
const iconMap = {
  Building2,
  Heart,
  Factory,
  GraduationCap,
  ShoppingCart,
  Truck,
  Hotel,
  Home: HomeIcon,
};

const DynamicIcon = ({ name, size = 20, className = '' }) => {
  const IconComponent = LucideIcons[name];
  if (!IconComponent) {
    return <LucideIcons.HelpCircle size={size} className={className} />;
  }

  return <IconComponent size={size} className={className} />;
};

const COLOR_MAP = {
  brand: {
    bg: 'bg-bg-subtle',
    text: 'text-accent',
    border: 'border-border',
    badge: 'bg-accent-subtle text-accent',
  },
  blue: {
    bg: 'bg-bg-subtle',
    text: 'text-accent',
    border: 'border-border',
    badge: 'bg-accent-subtle text-accent',
  },
  red: {
    bg: 'bg-bg-subtle',
    text: 'text-accent',
    border: 'border-border',
    badge: 'bg-accent-subtle text-accent',
  },
};

export default function ClientsPage() {
  const shouldReduce = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduce ? 0 : 0.04,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  };

  return (
    <>
      <SEOHead {...SEO.clients} />
      <PageHero
        tag="Our Clients"
        title={`Trusted by ${SITE_CONFIG.clients} Enterprises`}
        subtitle={`From financial services to healthcare, manufacturing to retail — businesses across India rely on ${SITE_CONFIG.name} for mission-critical IT.`}
        breadcrumbs={[{ label: 'Clients' }]}
      />
      {/* Client Grid */}
      <section className="section-padding bg-bg">
        <div className="container-xl">
          <SectionHeader
            tag="Our Client Portfolio"
            title="Companies That Trust Us"
            subtitle="A selection of the businesses we partner with across industries and geographies."
          />

          <ClientDirectory />
        </div>
      </section>

      {/* Industries */}
      <section className="section-padding bg-bg-subtle border-y border-border">
        <div className="container-xl">
          <SectionHeader
            tag="Industries Served"
            title="Deep Vertical Expertise"
            subtitle="We understand that different industries have different compliance requirements, risk profiles, and operational patterns. Our solutions are tailored accordingly."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {INDUSTRIES.map((industry, i) => (
              <motion.div
                key={industry.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={shouldReduce ? { duration: 0 } : { duration: 0.35, delay: i * 0.05 }}
                whileHover={{ y: -3, transition: { duration: 0.18 } }}
                className="group relative bg-bg border border-border rounded-2xl p-6 overflow-hidden hover:border-accent/30 transition-colors duration-200 flex flex-col"
              >
                {/* top glow */}
                <div className="absolute top-0 left-5 right-5 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* index + icon row */}
                <div className="flex items-start justify-between mb-5">
                  <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/15 transition-colors duration-200 shrink-0">
                    <DynamicIcon name={industry?.icon} size={18} className="text-accent" />
                  </div>
                  <span className="text-[10px] font-semibold tracking-widest text-text-tertiary">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* name */}
                <h3 className="font-headings font-semibold text-text-primary text-sm leading-snug mb-1 flex-1">
                  {industry.name}
                </h3>

                {/* bottom — count */}
                <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
                  <span className="text-[11px] text-text-tertiary font-medium">
                    {industry.count}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-accent/40 group-hover:bg-accent transition-colors duration-200" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="section-padding bg-bg">
        <div className="container-xl">
          <SectionHeader
            tag="Case Studies"
            title="Real Outcomes, Documented"
            subtitle="A glimpse into how we've solved real enterprise IT challenges across industries."
          />

          <div className="relative mt-2">
            {CASE_STUDIES.map((cs, i) => {
              const colors = COLOR_MAP[cs.color] || COLOR_MAP.brand;

              return (
                <div key={cs.id} className="sticky" style={{ top: `${72 + i * 20}px` }}>
                  <motion.div
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={
                      shouldReduce ? { duration: 0 } : { duration: 0.55, ease: [0.22, 1, 0.36, 1] }
                    }
                    className="mb-4 rounded-2xl border border-border bg-bg overflow-hidden"
                    style={{
                      boxShadow: `0 ${2 + i * 4}px ${12 + i * 10}px -2px rgba(0,0,0,0.05)`,
                    }}
                  >
                    {/* top colored strip per card */}
                    <div
                      className={`h-0.5 w-full ${colors.text}`}
                      style={{ background: 'currentColor', opacity: 0.5 }}
                    />

                    <div className="p-7 lg:p-9">
                      {/* ── header row ── */}
                      <div className="flex items-start justify-between gap-6 mb-7">
                        <div className="flex items-start gap-4">
                          {/* index badge */}
                          <div className="w-9 h-9 rounded-xl bg-bg-subtle border border-border flex items-center justify-center shrink-0">
                            <span className="text-xs font-bold font-headings text-text-tertiary">
                              {String(i + 1).padStart(2, '0')}
                            </span>
                          </div>
                          <div>
                            <h3 className="font-headings text-lg font-bold text-text-primary leading-snug mb-1.5">
                              {cs.client}
                            </h3>
                            <div className="flex items-center gap-2">
                              <span
                                className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border ${colors.badge}`}
                              >
                                {cs.industry}
                              </span>
                              <span className="text-[10px] text-text-tertiary">·</span>
                              <span className="text-[10px] text-text-tertiary">{cs.duration}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* ── divider ── */}
                      <div className="w-full h-px bg-border mb-7" />

                      {/* ── body ── */}
                      <div className="grid lg:grid-cols-3 gap-6 lg:gap-10">
                        {/* challenge */}
                        <div>
                          <p className="text-[10px] font-semibold tracking-widest uppercase text-text-tertiary mb-2.5">
                            Challenge
                          </p>
                          <p className="text-sm text-text-secondary leading-relaxed">
                            {cs.challenge}
                          </p>
                        </div>

                        {/* solution */}
                        <div>
                          <p className="text-[10px] font-semibold tracking-widest uppercase text-text-tertiary mb-2.5">
                            Solution
                          </p>
                          <p className="text-sm text-text-secondary leading-relaxed">
                            {cs.solution}
                          </p>
                        </div>

                        {/* results */}
                        <div>
                          <p className="text-[10px] font-semibold tracking-widest uppercase text-text-tertiary mb-2.5">
                            Results
                          </p>
                          <ul className="space-y-2">
                            {cs.results.map((result) => (
                              <li key={result} className="flex items-start gap-2">
                                <CheckCircle
                                  size={13}
                                  strokeWidth={1.5}
                                  className={`shrink-0 mt-0.5 ${colors.text}`}
                                />
                                <span className="text-sm text-text-secondary leading-snug">
                                  {result}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}

            <div className="h-20" />
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
