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
  CheckCircle
} from 'lucide-react';

import SEOHead from '../../components/common/SEOHead';
import PageHero from '../../components/common/PageHero';
import SectionHeader from '../../components/common/SectionHeader';
import CTABanner from '../../components/sections/CTABanner';
import { SEO } from '../../constants/seo';
import { CLIENTS, INDUSTRIES, CASE_STUDIES } from '../../constants/clients';

const iconMap = {
  Building2,
  Heart,
  Factory,
  GraduationCap,
  ShoppingCart,
  Truck,
  Hotel,
  Home: HomeIcon
};

function DynamicIcon({ name, size = 20, strokeWidth = 1.5, className }) {
  const IconComponent = iconMap[name];
  if (!IconComponent) return null;
  return <IconComponent size={size} strokeWidth={strokeWidth} className={className} />;
}

const COLOR_MAP = {
  brand: { bg: 'bg-bg-subtle', text: 'text-accent', border: 'border-border', badge: 'bg-accent-subtle text-accent' },
  blue:  { bg: 'bg-bg-subtle', text: 'text-accent', border: 'border-border', badge: 'bg-accent-subtle text-accent' },
  red:   { bg: 'bg-bg-subtle', text: 'text-accent', border: 'border-border', badge: 'bg-accent-subtle text-accent' },
};

export default function ClientsPage() {
  const shouldReduce = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduce ? 0 : 0.04
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
  };

  return (
    <>
      <SEOHead {...SEO.clients} />
      <PageHero
        tag="Our Clients"
        title="Trusted by 200+ Enterprises"
        subtitle="From financial services to healthcare, manufacturing to retail — businesses across India rely on Pratham Tech Care for mission-critical IT."
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
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {CLIENTS.map((client) => (
              <motion.div
                key={client.id}
                variants={itemVariants}
                className="card p-5 hover:border-accent group text-center"
              >
                <div className="w-12 h-12 rounded bg-bg-subtle group-hover:bg-accent-subtle flex items-center justify-center font-headings font-bold text-text-secondary group-hover:text-accent text-lg mx-auto mb-3 transition-colors duration-150">
                  {client.abbr.slice(0, 1)}
                </div>
                <div className="font-headings font-semibold text-text-primary text-sm mb-1">{client.name}</div>
                <div className="text-xs text-text-secondary/70">{client.industry}</div>
              </motion.div>
            ))}
          </motion.div>
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {INDUSTRIES.map((industry, i) => (
              <motion.div
                key={industry.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={shouldReduce ? { duration: 0 } : { duration: 0.4, delay: i * 0.05 }}
                className="card p-6 hover:border-accent group bg-bg"
              >
                <div className="w-10 h-10 rounded bg-accent-subtle flex items-center justify-center text-accent mb-4 group-hover:bg-accent group-hover:text-white transition-colors duration-150">
                  <DynamicIcon name={industry.icon} />
                </div>
                <h3 className="font-headings font-semibold text-text-primary text-sm mb-1">{industry.name}</h3>
                <p className="text-xs text-accent font-mono font-medium mt-1">{industry.count}</p>
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
          <div className="space-y-6">
            {CASE_STUDIES.map((cs, i) => {
              const colors = COLOR_MAP[cs.color] || COLOR_MAP.brand;
              return (
                <motion.div
                  key={cs.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={shouldReduce ? { duration: 0 } : { duration: 0.4, delay: i * 0.08 }}
                  className="card p-7 lg:p-10"
                >
                  <div className="flex flex-col lg:flex-row gap-8">
                    <div className="lg:w-1/2">
                      <div className="flex flex-wrap items-center gap-3 mb-5">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded ${colors.badge}`}>
                          {cs.industry}
                        </span>
                        <span className="text-xs text-text-secondary/70">Duration: {cs.duration}</span>
                      </div>
                      <h3 className="font-headings text-xl font-bold text-text-primary mb-3">{cs.client}</h3>
                      <div className="mb-4">
                        <div className="text-xs font-mono font-semibold uppercase tracking-widest text-text-secondary/50 mb-1.5">Challenge</div>
                        <p className="text-sm text-text-secondary leading-relaxed">{cs.challenge}</p>
                      </div>
                      <div>
                        <div className="text-xs font-mono font-semibold uppercase tracking-widest text-text-secondary/50 mb-1.5">Solution</div>
                        <p className="text-sm text-text-secondary leading-relaxed">{cs.solution}</p>
                      </div>
                    </div>
                    <div className="lg:w-1/2">
                      <div className="text-xs font-mono font-semibold uppercase tracking-widest text-text-secondary/50 mb-4">Results</div>
                      <ul className="grid sm:grid-cols-2 gap-3">
                        {cs.results.map((result) => (
                          <li key={result} className={`flex items-start gap-2.5 p-3 rounded border ${colors.bg} ${colors.border}`}>
                            <CheckCircle size={16} strokeWidth={1.5} className={`shrink-0 mt-0.5 ${colors.text}`} />
                            <span className="text-sm font-medium text-text-primary">{result}</span>
                          </li>
                        ))}
                      </ul>
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
