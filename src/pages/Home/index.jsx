import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Server,
  Settings,
  Network,
  Shield,
  Cloud,
  Briefcase,
  Award,
  Clock,
  Users,
  TrendingUp,
  FileCheck,
  Building2,
  Heart,
  Factory,
  GraduationCap,
  ShoppingCart,
  Truck,
  Hotel,
  Home as HomeIcon,
  ArrowRight,
  ChevronRight,
  Star
} from 'lucide-react';

import SEOHead from '../../components/common/SEOHead';
import SectionHeader from '../../components/common/SectionHeader';
import CTABanner from '../../components/sections/CTABanner';
import { SEO } from '../../constants/seo';
import { SERVICES } from '../../constants/services';
import { TESTIMONIALS } from '../../constants/testimonials';
import { CLIENTS, INDUSTRIES } from '../../constants/clients';
import { WHY_CHOOSE_US, TECH_STACK } from '../../constants/theme';

const iconMap = {
  Server,
  Settings,
  Network,
  Shield,
  Cloud,
  Briefcase,
  Award,
  Clock,
  Users,
  TrendingUp,
  FileCheck,
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

// ─── Hero ────────────────────────────────────────────────────────────────────
function Hero() {
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
    <section className="relative bg-bg border-b border-border py-20 lg:py-28 overflow-hidden">
      <div className="container-xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl text-left md:text-center lg:text-left mx-auto lg:mx-0"
        >
          {/* Eyebrow */}
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
            <span className="text-xs font-sans font-medium tracking-widest uppercase text-text-secondary">
              Trusted by 200+ enterprises across India
            </span>
          </motion.div>

          {/* H1 */}
          <motion.h1
            variants={itemVariants}
            className="font-headings text-5xl lg:text-6xl font-extrabold text-text-primary tracking-tight leading-[1.05]"
          >
            Enterprise IT Solutions
            <br />
            Built for Reliability.
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={itemVariants}
            className="mt-6 text-lg lg:text-xl text-text-secondary leading-relaxed max-w-2xl md:mx-auto lg:mx-0"
          >
            Pratham Tech Care delivers enterprise IT infrastructure, managed services, cybersecurity, and cloud solutions engineered for uptime and scale.
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={itemVariants}
            className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-start md:justify-center lg:justify-start gap-3"
          >
            <motion.div
              whileHover={shouldReduce ? {} : { scale: 1.02 }}
              whileTap={shouldReduce ? {} : { scale: 0.98 }}
              transition={{ duration: 0.15 }}
            >
              <Link to="/contact" className="btn-primary">
                Get a Free Consultation
                <ArrowRight size={16} strokeWidth={1.5} />
              </Link>
            </motion.div>
            <motion.div
              whileHover={shouldReduce ? {} : { scale: 1.02 }}
              whileTap={shouldReduce ? {} : { scale: 0.98 }}
              transition={{ duration: 0.15 }}
            >
              <Link to="/services" className="btn-ghost">
                Explore Services
                <ChevronRight size={16} strokeWidth={1.5} />
              </Link>
            </motion.div>
          </motion.div>

          {/* Stat Chips */}
          <motion.div
            variants={itemVariants}
            className="mt-14 pt-8 border-t border-border flex flex-wrap gap-x-6 gap-y-3 justify-start md:justify-center lg:justify-start text-xs font-mono text-text-secondary/65"
          >
            <span>500+ Projects</span>
            <span>·</span>
            <span>12 Years</span>
            <span>·</span>
            <span>99.9% Uptime</span>
            <span>·</span>
            <span>200+ Clients</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Services Grid ────────────────────────────────────────────────────────────
function ServicesGrid() {
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
    <section className="section-padding bg-bg">
      <div className="container-xl">
        <SectionHeader
          tag="What We Do"
          title="Complete IT Services for Enterprise"
          subtitle="From infrastructure design to 24×7 managed support — we handle your entire IT ecosystem so you can focus on your business."
        />
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {SERVICES.map((service) => (
            <motion.div key={service.id} variants={itemVariants}>
              <Link
                to={service.path}
                className="card-hover flex flex-col h-full p-6 lg:p-7"
              >
                <div className="w-10 h-10 rounded-md bg-accent-subtle text-accent flex items-center justify-center mb-5">
                  <DynamicIcon name={service.icon} />
                </div>
                <h3 className="font-headings font-semibold text-text-primary text-lg mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed flex-1 mb-4">
                  {service.shortDesc}
                </p>
                <div className="inline-flex items-center gap-1 text-xs font-semibold text-accent">
                  Learn more <ArrowRight size={14} strokeWidth={1.5} className="ml-0.5" />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Why Choose Us ────────────────────────────────────────────────────────────
function WhyUs() {
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
    <section className="section-padding bg-bg-subtle border-y border-border">
      <div className="container-xl">
        <SectionHeader
          tag="Why Pratham Tech Care"
          title="The IT Partner You Can Rely On"
          subtitle="We combine deep technical expertise with a genuine commitment to your business outcomes. Here's what sets us apart."
        />
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {WHY_CHOOSE_US.map((item) => (
            <motion.div key={item.title} variants={itemVariants} className="card p-6">
              <div className="w-10 h-10 rounded-md bg-accent-subtle text-accent flex items-center justify-center mb-4">
                <DynamicIcon name={item.icon} />
              </div>
              <h3 className="font-headings font-semibold text-text-primary text-base mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Industries ────────────────────────────────────────────────────────────────
// Pill tags only in Industries section
function Industries() {
  const shouldReduce = useReducedMotion();

  return (
    <section className="section-padding bg-bg">
      <div className="container-xl">
        <SectionHeader
          tag="Industries We Serve"
          title="Deep Expertise Across Verticals"
          subtitle="Our solutions are tailored to the unique compliance, security, and operational requirements of each industry."
        />
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={shouldReduce ? { duration: 0 } : { duration: 0.4, ease: 'easeOut' }}
          className="flex flex-wrap gap-2.5 max-w-4xl"
        >
          {INDUSTRIES.map((industry) => (
            <div
              key={industry.name}
              className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-full text-sm font-sans font-medium text-text-primary bg-bg hover:bg-accent-subtle hover:border-accent hover:text-accent transition-all duration-150 cursor-default"
            >
              <DynamicIcon name={industry.icon} size={16} className="text-accent" />
              <span>{industry.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Tech Stack ────────────────────────────────────────────────────────────────
function TechExpertise() {
  return (
    <section className="section-padding bg-bg-subtle border-y border-border">
      <div className="container-xl">
        <SectionHeader
          tag="Technology Expertise"
          title="We Work With the Best"
          subtitle="Our certified engineers are proficient with leading technology platforms across networking, servers, cloud, and security."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TECH_STACK.map((category) => (
            <div
              key={category.category}
              className="bg-bg border border-border rounded-lg p-5"
            >
              <div className="font-mono text-xs font-semibold tracking-widest uppercase text-accent mb-4">
                {category.category}
              </div>
              <div className="flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <span
                    key={item}
                    className="text-xs font-mono px-2.5 py-1 rounded border border-border bg-bg text-text-primary"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials Preview ──────────────────────────────────────────────────────
function TestimonialsPreview() {
  const shouldReduce = useReducedMotion();
  const featured = TESTIMONIALS.slice(0, 3);

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
    <section className="section-padding bg-bg">
      <div className="container-xl">
        <SectionHeader
          tag="Client Stories"
          title="Trusted by Enterprise Teams"
          subtitle="Don't take our word for it. Here's what business leaders say about working with Pratham Tech Care."
        />
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-5"
        >
          {featured.map((t) => (
            <motion.div key={t.id} variants={itemVariants} className="card p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" className="text-amber-400" />
                  ))}
                </div>
                <blockquote className="text-sm text-text-secondary leading-relaxed italic mb-6">
                  "{t.quote.slice(0, 180)}..."
                </blockquote>
              </div>
              <div className="pt-4 border-t border-border flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-accent-subtle flex items-center justify-center font-headings font-bold text-accent text-xs">
                  {t.avatar}
                </div>
                <div>
                  <div className="text-sm font-semibold text-text-primary">{t.name}</div>
                  <div className="text-xs text-text-secondary">{t.title}, {t.company}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        <div className="mt-10 text-left sm:text-center">
          <Link to="/testimonials" className="btn-secondary">
            View All Testimonials
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Clients Logos ────────────────────────────────────────────────────────────
function ClientLogos() {
  return (
    <section className="section-padding-sm bg-bg border-t border-border">
      <div className="container-xl">
        <p className="text-xs font-mono font-medium tracking-widest uppercase text-text-secondary mb-8">
          Trusted by 200+ companies across India
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
          {CLIENTS.map((client) => (
            <div
              key={client.id}
              className="card p-4 flex items-center justify-start gap-3 hover:border-accent group"
            >
              <div className="w-8 h-8 rounded bg-bg-subtle flex items-center justify-center font-headings font-bold text-text-secondary group-hover:text-accent group-hover:bg-accent-subtle transition-colors duration-150 text-xs">
                {client.abbr.slice(0, 1)}
              </div>
              <div className="text-xs font-semibold text-text-primary leading-tight">{client.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      <SEOHead {...SEO.home} />
      <Hero />
      <ServicesGrid />
      <WhyUs />
      <Industries />
      <TechExpertise />
      <TestimonialsPreview />
      <ClientLogos />
      <CTABanner />
    </>
  );
}
