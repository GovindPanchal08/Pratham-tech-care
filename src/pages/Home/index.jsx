import { Link } from 'react-router-dom';
import { motion, useAnimationControls, useReducedMotion } from 'framer-motion';
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
  Star,
  ArrowUpRight,
} from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import SEOHead from '../../components/common/SEOHead';
import SectionHeader from '../../components/common/SectionHeader';
import CTABanner from '../../components/sections/CTABanner';
import heroImg from '../../assets/IT.png';
import { SEO } from '../../constants/seo';
import { SERVICES } from '../../constants/services';
import { CLIENTS, INDUSTRIES } from '../../constants/clients';
import { WHY_CHOOSE_US, TECH_STACK } from '../../constants/theme';
import React from 'react';

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
  Home: HomeIcon,
};

const PROCESS = [
  {
    step: '01',
    title: 'Understand',
    desc: 'We assess your business requirements and existing IT challenges.',
  },
  {
    step: '02',
    title: 'Plan',
    desc: 'We recommend practical and cost-effective technology solutions.',
  },
  {
    step: '03',
    title: 'Implement',
    desc: 'We deploy infrastructure, hardware, networking, and security systems efficiently.',
  },
  {
    step: '04',
    title: 'Support',
    desc: 'We provide ongoing technical support and AMC services to keep your operations running smoothly.',
  },
];
const DynamicIcon = ({ name, size = 20, className = '' }) => {
  const IconComponent = LucideIcons[name];
  if (!IconComponent) {
    return <LucideIcons.HelpCircle size={size} className={className} />;
  }

  return <IconComponent size={size} className={className} />;
};

function Hero() {
  const shouldReduce = useReducedMotion();

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
    <section className="relative bg-bg  py-12 lg:py-20 overflow-hidden">
      <div className="container-xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center"
        >
          {/* Left Column: Content */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            {/* Title */}
            <motion.h1
              variants={itemVariants}
              className="font-headings text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-primary tracking-tight leading-[1.1] mb-6"
            >
              Empowering Businesses Through Reliable IT Solutions.
            </motion.h1>

            {/* Subtext */}
            <motion.p
              variants={itemVariants}
              className="text-sm sm:text-base text-text-secondary leading-relaxed max-w-xl mb-8 font-sans"
            >
              Helping organizations stay connected, secure, and productive through dependable
              technology services and expert technical support. We take the complexity out of IT, so
              businesses can focus on what matters most — growth and success.
            </motion.p>

            {/* Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 mb-10">
              <Link to="/contact" className="btn-primary rounded-full">
                Get a Free Consultation
              </Link>
              <Link to="/services" className="btn-secondary rounded-full bg-transparent">
                Explore Services
              </Link>
            </motion.div>

            {/* Stats Row */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 sm:grid-cols-4 gap-2  pt-3 sm:pt-10"
            >
              <div>
                <div className="font-display text-2xl sm:text-3xl font-semibold text-text-primary">
                  75+
                </div>
                <div className="text-[10px] sm:text-xs font-semibold text-text-secondary mt-1">
                  Projects
                </div>
              </div>
              <div>
                <div className="font-display text-2xl sm:text-3xl font-semibold text-text-primary">
                  10+
                </div>
                <div className="text-[10px] sm:text-xs font-semibold text-text-secondary mt-1">
                  Years of Experience``
                </div>
              </div>
              <div>
                <div className="font-display text-2xl sm:text-3xl font-semibold text-text-primary">
                  99.9%
                </div>
                <div className="text-[10px] sm:text-xs font-semibold text-text-secondary mt-1">
                  Uptime
                </div>
              </div>
              <div>
                <div className="font-display text-2xl sm:text-3xl font-semibold text-text-primary">
                  25+
                </div>
                <div className="text-[10px] sm:text-xs font-semibold text-text-secondary mt-1">
                  Clients
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Hero Image */}
          <motion.div variants={itemVariants} className="lg:col-span-5 relative w-full">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] sm:aspect-[1.4/1] lg:aspect-[1.15/1] border border-border shadow-sm group/hero-img">
              <img
                src={heroImg}
                alt="Finding the right talent"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1000&auto=format&fit=crop&q=80';
                }}
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover/hero-img:scale-103"
              />
              {/* Pinterest-style Link Indicator in Bottom-Right */}
              <Link
                to="/contact"
                title="Get in Touch"
                className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white text-slate-900 flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110 cursor-pointer z-10 hover:bg-slate-50 border border-slate-100"
              >
                <ArrowUpRight className="rotate-180 text-slate-900" size={18} strokeWidth={2.5} />
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function ServicesGrid() {
  const shouldReduce = useReducedMotion();

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
    <section className="section-padding bg-bg">
      <div className="container-xl">
        <SectionHeader
          tag="What We Do"
          title="Complete Technology Solutions for Modern Businesses"
          subtitle="From infrastructure design to 24×7 managed support — we handle your entire IT ecosystem so you can focus on your business."
        />
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {SERVICES.map((service) => (
            <motion.div key={service.id} variants={itemVariants}>
              <Link to={service.path} className="card-hover flex flex-col h-full p-6 lg:p-7">
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

function WhyUs() {
  const shouldReduce = useReducedMotion();
  const highlights = WHY_CHOOSE_US.slice(0, 3);

  const proofPoints = [
    { value: '25+', label: 'Businesses Served' },
    { value: '4hr', label: 'Avg. Response Time' },
    { value: '8+', label: 'Years of Experience' },
  ];

  return (
    <section className="section-padding bg-bg-subtle border-y border-border">
      <div className="container-xl">
        <SectionHeader
          tag="Why Pratham Tech Care"
          title="Reliable Technology. Trusted Support."
          subtitle="Deep expertise. Real commitment. Measurable outcomes."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: shouldReduce ? 0 : 0.1 } },
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {highlights.map((item, i) => (
            <motion.div
              key={item.title}
              variants={
                shouldReduce
                  ? {}
                  : {
                      hidden: { opacity: 0, y: 16 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
                    }
              }
              whileHover={shouldReduce ? {} : { y: -4, transition: { duration: 0.2 } }}
              className="group relative bg-bg rounded-2xl border border-border p-8 overflow-hidden hover:border-accent/30 transition-colors duration-200 flex flex-col"
            >
              {/* top glow line */}
              <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* icon + number */}
              <div className="flex items-start justify-between mb-6">
                <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/15 transition-colors duration-200 shrink-0">
                  <DynamicIcon name={item.icon} size={20} className="text-accent" />
                </div>
                <span className="text-xs font-semibold tracking-widest text-text-tertiary">
                  0{i + 1}
                </span>
              </div>

              {/* title + description */}
              <h3 className="font-headings font-semibold text-text-primary text-base mb-2 leading-snug">
                {item.title}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed flex-1">
                {item.description}
              </p>

              {/* proof point */}
              <div className="mt-8 pt-5 border-t border-border flex items-center justify-between">
                <div>
                  <p className="text-2xl font-headings font-bold text-text-primary leading-none mb-1">
                    {proofPoints[i].value}
                  </p>
                  <p className="text-xs text-text-secondary font-medium">{proofPoints[i].label}</p>
                </div>
                {/* subtle arrow indicator */}
                <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center group-hover:border-accent/40 group-hover:bg-accent/5 transition-colors duration-200">
                  <DynamicIcon
                    name="ArrowUpRight"
                    size={14}
                    className="text-text-tertiary group-hover:text-accent transition-colors duration-200"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

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
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={shouldReduce ? { duration: 0 } : { duration: 0.3 }}
          className="flex flex-wrap gap-2.5 max-w-4xl"
        >
          {INDUSTRIES.map((industry, i) => (
            <motion.div
              key={industry.name}
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={shouldReduce ? {} : { y: -2 }}
              whileTap={shouldReduce ? {} : { scale: 0.97 }}
              viewport={{ once: true }}
              transition={
                shouldReduce
                  ? { duration: 0 }
                  : { duration: 0.25, delay: i * 0.035, ease: 'easeOut' }
              }
              className="group inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-bg hover:border-accent/50 hover:bg-accent/5 transition-colors duration-200 cursor-default"
            >
              <DynamicIcon
                name={industry.icon}
                size={14}
                className="text-text-tertiary group-hover:text-accent transition-colors duration-200"
              />
              <span className="text-sm font-medium text-text-secondary group-hover:text-text-primary transition-colors duration-200">
                {industry.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function TechExpertise() {
  const shouldReduce = useReducedMotion();
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
    <section className="section-padding bg-bg-subtle border-t border-border overflow-hidden">
      <div className="container-xl">
        <SectionHeader
          tag="Our Process"
          title="How We Work With You"
          subtitle="A simple, transparent engagement model — from understanding your needs to keeping you supported long-term."
        />

        {/* desktop — horizontal flow */}
        <div className="hidden lg:block relative mt-2">
          <div className="absolute top-7 left-0 right-0 h-px bg-border" />
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={
              shouldReduce
                ? { duration: 0 }
                : { duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }
            }
            style={{ originX: 0 }}
            className="absolute top-7 left-0 right-0 h-px bg-accent/40"
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-4 gap-6"
          >
            {PROCESS.map((step, i) => (
              <motion.div
                key={step.step}
                variants={
                  shouldReduce
                    ? {}
                    : {
                        hidden: { opacity: 0, y: 16 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                        },
                      }
                }
                whileHover="hover"
                initial="rest"
                animate="rest"
                className="group relative"
              >
                {/* number node */}
                <motion.div
                  variants={{
                    rest: { scale: 1, rotate: 0 },
                    hover: { scale: shouldReduce ? 1 : 1.1, rotate: shouldReduce ? 0 : -6 },
                  }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="relative z-10 w-14 h-14 rounded-2xl bg-bg border border-border flex items-center justify-center mb-5 group-hover:border-accent/40 group-hover:bg-accent transition-colors duration-200"
                >
                  <span className="font-headings font-bold text-base text-accent group-hover:text-white transition-colors duration-200">
                    {step.step}
                  </span>
                </motion.div>

                {/* title with underline sweep */}
                <h3 className="font-headings font-bold text-text-primary text-base leading-snug mb-1.5 relative inline-block">
                  {step.title}
                  <motion.span
                    variants={{ rest: { scaleX: 0 }, hover: { scaleX: shouldReduce ? 0 : 1 } }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    style={{ originX: 0 }}
                    className="absolute -bottom-0.5 left-0 right-0 h-[1.5px] bg-accent"
                  />
                </h3>
                <motion.p
                  variants={{ rest: { opacity: 1, x: 0 }, hover: { x: shouldReduce ? 0 : 2 } }}
                  transition={{ duration: 0.2 }}
                  className="text-sm text-text-secondary leading-relaxed"
                >
                  {step.desc}
                </motion.p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* mobile / tablet — horizontal scroll snap */}
        <div className="lg:hidden mt-2">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 -mx-4 px-4 scrollbar-hide"
          >
            {PROCESS.map((step, i) => (
              <motion.div
                key={step.step}
                variants={
                  shouldReduce
                    ? {}
                    : {
                        hidden: { opacity: 0, x: 16 },
                        visible: {
                          opacity: 1,
                          x: 0,
                          transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
                        },
                      }
                }
                whileTap={shouldReduce ? {} : { scale: 0.97 }}
                transition={{ duration: 0.15 }}
                className="snap-start shrink-0 w-[78%] sm:w-[45%] bg-bg border border-border rounded-2xl p-5 active:border-accent/40 transition-colors duration-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <motion.div
                    whileTap={shouldReduce ? {} : { rotate: -6 }}
                    transition={{ duration: 0.2 }}
                    className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center"
                  >
                    <span className="font-headings font-bold text-sm text-accent">{step.step}</span>
                  </motion.div>
                  <span className="text-[10px] font-semibold tracking-widest text-text-tertiary">
                    {String(i + 1).padStart(2, '0')} / {String(PROCESS.length).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="font-headings font-bold text-text-primary text-base leading-snug mb-1.5">
                  {step.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          <div className="flex items-center justify-center gap-1.5 mt-4">
            {PROCESS.map((step) => (
              <span key={step.step} className="w-1.5 h-1.5 rounded-full bg-border" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ClientLogos() {
  const shouldReduce = useReducedMotion();

  const half = Math.ceil(CLIENTS.length / 2);
  const row1 = CLIENTS.slice(0, half);
  const row2 = CLIENTS.slice(half);

  const MarqueeRow = ({ items, direction = 1 }) => {
    const doubled = [...items, ...items];

    return (
      <div className="relative overflow-hidden">
        {/* fade edges — on the row wrapper itself */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-24 z-10 bg-gradient-to-r from-bg to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-24 z-10 bg-gradient-to-l from-bg to-transparent" />

        <motion.div
          className="flex gap-2 sm:gap-3 w-max"
          animate={
            shouldReduce
              ? {}
              : {
                  x: direction === 1 ? ['0%', '-50%'] : ['-50%', '0%'],
                }
          }
          transition={{
            duration: items.length * 6,
            ease: 'linear',
            repeat: Infinity,
            repeatType: 'loop',
          }}
        >
          {doubled.map((client, i) => (
            <div
              key={`${client.id}-${i}`}
              className="flex items-center gap-2 sm:gap-2.5 px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg sm:rounded-xl border border-border bg-bg select-none shrink-0"
            >
              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded sm:rounded-md bg-accent/10 flex items-center justify-center shrink-0">
                <span className="text-[9px] sm:text-[10px] font-bold text-accent leading-none">
                  {client.abbr.slice(0, 1)}
                </span>
              </div>
              <span className="text-[11px] sm:text-xs font-medium text-text-secondary whitespace-nowrap">
                {client.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    );
  };

  return (
    <section className="relative section-padding-sm bg-bg border-t border-border overflow-hidden">
      <div className="container-xl">
        <div className="flex items-center gap-2.5 mb-6 sm:mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
          <p className="text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase text-text-secondary">
            Trusted by 25+ companies across India
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:gap-3">
          <MarqueeRow items={row1} direction={1} />
          <MarqueeRow items={row2} direction={-1} />
        </div>
      </div>
    </section>
  );

  return (
    <section className="relative section-padding-sm bg-bg border-t border-border overflow-hidden">
      <div className="container-xl">
        <div className="flex items-center gap-2.5 mb-6 sm:mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
          <p className="text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase text-text-secondary">
            Trusted by 200+ companies across India
          </p>
        </div>

        {/* on mobile show only 1 row, both rows on sm+ */}
        <div className="flex flex-col gap-2 sm:gap-3">
          <MarqueeRow items={row1} direction={1} />
          <div className="hidden sm:block">
            <MarqueeRow items={row2} direction={-1} />
          </div>
        </div>
      </div>

      {/* narrower fade on mobile, wider on desktop */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-24 bg-gradient-to-r from-bg to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-24 bg-gradient-to-l from-bg to-transparent" />
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <SEOHead {...SEO.home} />
      <Hero />
      <ServicesGrid />
      <WhyUs />
      <Industries />
      <TechExpertise />
      <ClientLogos />
      <CTABanner />
    </>
  );
}
