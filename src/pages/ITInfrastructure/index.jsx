import { motion, useReducedMotion } from 'framer-motion';
import {
  Network,
  Server,
  ShieldCheck,
  HardDrive,
  Activity,
  Headphones,
  Check
} from 'lucide-react';

import SEOHead from '../../components/common/SEOHead';
import PageHero from '../../components/common/PageHero';
import SectionHeader from '../../components/common/SectionHeader';
import CTABanner from '../../components/sections/CTABanner';
import { SEO } from '../../constants/seo';
import { INFRASTRUCTURE_SERVICES, SUPPORT_PLANS } from '../../constants/services';

const iconMap = {
  Network,
  Server,
  ShieldCheck,
  HardDrive,
  Activity,
  Headphones
};

function DynamicIcon({ name, size = 20, strokeWidth = 1.5, className }) {
  const IconComponent = iconMap[name];
  if (!IconComponent) return null;
  return <IconComponent size={size} strokeWidth={strokeWidth} className={className} />;
}

export default function ITInfrastructurePage() {
  const shouldReduce = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduce ? 0 : 0.07
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
  };

  return (
    <>
      <SEOHead {...SEO.infrastructure} />
      <PageHero
        tag="IT Infrastructure"
        title="Enterprise Infrastructure That Never Sleeps"
        subtitle="We design, build, and manage rock-solid IT infrastructure — from network fabric and servers to storage and security — engineered for uptime, performance, and scale."
        breadcrumbs={[{ label: 'Services', path: '/services' }, { label: 'IT Infrastructure' }]}
      />

      {/* Services Grid */}
      <section className="section-padding bg-bg">
        <div className="container-xl">
          <SectionHeader
            tag="Infrastructure Services"
            title="Every Layer Covered"
            subtitle="Our infrastructure practice covers the full stack — from physical hardware procurement to hypervisor management and everything in between."
          />
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {INFRASTRUCTURE_SERVICES.map((svc) => (
              <motion.div key={svc.id} id={svc.id} variants={itemVariants} className="card p-6 hover:border-accent group">
                <div className="w-10 h-10 rounded-md bg-accent-subtle text-accent flex items-center justify-center mb-4">
                  <DynamicIcon name={svc.icon} />
                </div>
                <h3 className="font-headings font-semibold text-text-primary text-base mb-2">{svc.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed mb-4">{svc.description}</p>
                <ul className="space-y-1.5 border-t border-border pt-4">
                  {svc.specs.map((spec) => (
                    <li key={spec} className="flex items-center gap-2 text-xs text-text-secondary">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                      {spec}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Support Plans */}
      <section className="section-padding bg-bg-subtle border-t border-border">
        <div className="container-xl">
          <SectionHeader
            tag="Support Plans"
            title="Flexible Support for Every Business"
            subtitle="Choose the level of managed support that fits your team size, complexity, and budget. All plans include our certified engineers and documented SLAs."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SUPPORT_PLANS.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={shouldReduce ? { duration: 0 } : { duration: 0.4, delay: i * 0.08 }}
                className={`relative rounded-lg p-6 flex flex-col justify-between border ${
                  plan.highlight
                    ? 'bg-accent text-white border-transparent'
                    : 'bg-bg border-border text-text-secondary shadow-sm'
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-amber-400 text-amber-950 text-[9px] font-mono font-bold tracking-widest uppercase rounded">
                    Most Popular
                  </div>
                )}
                <div>
                  <h3 className={`font-headings font-bold text-lg ${plan.highlight ? 'text-white' : 'text-text-primary'}`}>
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline gap-0.5 mt-2 mb-4">
                    <span className={`font-headings text-3xl font-bold ${plan.highlight ? 'text-white' : 'text-text-primary'}`}>
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className={`text-xs font-mono ml-1 ${plan.highlight ? 'text-white/80' : 'text-text-secondary/80'}`}>
                        {plan.period}
                      </span>
                    )}
                  </div>
                  <p className={`text-xs leading-relaxed mb-6 ${plan.highlight ? 'text-white/85' : 'text-text-secondary'}`}>
                    {plan.description}
                  </p>
                  <ul className="space-y-2.5 mb-8 border-t border-current/10 pt-4">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <Check
                          size={14}
                          strokeWidth={1.5}
                          className={`shrink-0 mt-0.5 ${plan.highlight ? 'text-white' : 'text-accent'}`}
                        />
                        <span className={`text-xs leading-relaxed ${plan.highlight ? 'text-white/90' : 'text-text-secondary'}`}>
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <motion.div
                  whileHover={shouldReduce ? {} : { scale: 1.02 }}
                  whileTap={shouldReduce ? {} : { scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                >
                  <a
                    href="/contact"
                    className={`block text-center text-sm font-semibold py-2.5 px-4 rounded-lg transition-colors duration-150 ${
                      plan.highlight
                        ? 'bg-bg text-accent hover:opacity-90'
                        : 'bg-accent-subtle text-accent border border-accent/10 hover:bg-accent hover:text-white'
                    }`}
                  >
                    Get Started
                  </a>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title="Need a custom infrastructure solution?"
        subtitle="Our architects work with you to design infrastructure that fits your exact requirements and budget."
        primaryLabel="Schedule a Discovery Call"
        secondaryLabel="View All Services"
        secondaryHref="/services"
      />
    </>
  );
}
