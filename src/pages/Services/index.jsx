import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Server,
  Settings,
  Network,
  Shield,
  Cloud,
  Briefcase,
  Check,
  ArrowRight
} from 'lucide-react';

import SEOHead from '../../components/common/SEOHead';
import PageHero from '../../components/common/PageHero';
import SectionHeader from '../../components/common/SectionHeader';
import CTABanner from '../../components/sections/CTABanner';
import { SEO } from '../../constants/seo';
import { SERVICES } from '../../constants/services';

const iconMap = {
  Server,
  Settings,
  Network,
  Shield,
  Cloud,
  Briefcase
};

function DynamicIcon({ name, size = 20, strokeWidth = 1.5, className }) {
  const IconComponent = iconMap[name];
  if (!IconComponent) return null;
  return <IconComponent size={size} strokeWidth={strokeWidth} className={className} />;
}

const PROCESS = [
  { step: '01', title: 'Discovery & Assessment', desc: 'We begin with a thorough assessment of your current IT environment, understanding your business objectives, pain points, and requirements.' },
  { step: '02', title: 'Solution Design', desc: 'Our architects design a tailored solution that addresses your specific needs — not a one-size-fits-all package.' },
  { step: '03', title: 'Implementation', desc: 'Our certified engineers deploy the solution with minimal disruption to your operations, following documented change management processes.' },
  { step: '04', title: 'Testing & Handover', desc: 'Rigorous testing ensures everything works as designed. We provide full documentation and knowledge transfer.' },
  { step: '05', title: 'Ongoing Support', desc: 'Post-implementation, our team provides monitoring, maintenance, and continuous improvement to ensure long-term success.' },
];

export default function ServicesPage() {
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
            {SERVICES.map((service, i) => (
              <motion.div
                key={service.id}
                id={service.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={shouldReduce ? { duration: 0 } : { duration: 0.4 }}
                className="card p-8 lg:p-10"
              >
                <div className={`flex flex-col lg:flex-row gap-8 ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                  <div className="lg:w-2/3">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-10 h-10 rounded-md bg-accent-subtle text-accent flex items-center justify-center">
                        <DynamicIcon name={service.icon} />
                      </div>
                      <h2 className="font-headings text-xl font-bold text-text-primary">{service.title}</h2>
                    </div>
                    <p className="text-text-secondary leading-relaxed mb-6">{service.description}</p>
                    <motion.div
                      whileHover={shouldReduce ? {} : { scale: 1.02 }}
                      whileTap={shouldReduce ? {} : { scale: 0.98 }}
                      transition={{ duration: 0.15 }}
                      className="inline-block"
                    >
                      <Link to={service.path} className="btn-primary">
                        Learn More
                        <ArrowRight size={16} strokeWidth={1.5} />
                      </Link>
                    </motion.div>
                  </div>
                  <div className="lg:w-1/3">
                    <div className="bg-bg-subtle border border-border rounded-lg p-5">
                      <div className="font-mono text-xs font-semibold tracking-widest uppercase text-text-secondary/50 mb-4">
                        Key Capabilities
                      </div>
                      <ul className="space-y-2.5">
                        {service.features.map((f) => (
                          <li key={f} className="flex items-start gap-2.5">
                            <Check size={16} className="text-accent shrink-0 mt-0.5" strokeWidth={1.5} />
                            <span className="text-sm text-text-secondary">{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-padding bg-bg-subtle border-t border-border">
        <div className="container-xl">
          <SectionHeader
            tag="Our Process"
            title="How We Work With You"
            subtitle="A structured, transparent engagement model that ensures successful outcomes every time."
          />
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-4"
          >
            {PROCESS.map((step) => (
              <motion.div
                key={step.step}
                variants={itemVariants}
                className="flex gap-6 bg-bg border border-border rounded-lg p-6 hover:border-accent transition-colors duration-150"
              >
                <div className="font-mono text-4xl font-extrabold text-text-secondary/20 shrink-0 leading-none mt-1">
                  {step.step}
                </div>
                <div>
                  <h3 className="font-headings font-semibold text-text-primary mb-2">{step.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
