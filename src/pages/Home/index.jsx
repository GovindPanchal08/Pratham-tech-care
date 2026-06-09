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

import SEOHead from '../../components/common/SEOHead';
import SectionHeader from '../../components/common/SectionHeader';
import CTABanner from '../../components/sections/CTABanner';
import heroImg from '../../assets/hero.png';
import { SEO } from '../../constants/seo';
import { SERVICES } from '../../constants/services';
import { TESTIMONIALS } from '../../constants/testimonials';
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
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-text-primary tracking-tight leading-[1.1] mb-6"
            >
              Enterprise IT Solutions Built for Reliability.
            </motion.h1>

            {/* Subtext */}
            <motion.p
              variants={itemVariants}
              className="text-sm sm:text-base text-text-secondary leading-relaxed max-w-xl mb-8 font-sans"
            >
              Pratham Tech Care delivers enterprise IT infrastructure, managed services,
              cybersecurity, and cloud solutions engineered for uptime and scale.
            </motion.p>

            {/* Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 mb-10">
              <Link
                to="/contact"
                className="px-6 py-3 bg-accent hover:bg-accent/80 text-white dark:bg-accent dark:hover:bg-accent/80 dark:text-white font-sans font-bold text-sm rounded-full transition-all duration-150 shadow-md active:scale-[0.98]"
              >
                Get a Free Consultation
              </Link>
              <Link
                to="/services"
                className="px-6 py-3  text-slate-900 border border-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-white dark:border-slate-700 font-sans font-bold text-sm rounded-full transition-all duration-150 active:scale-[0.98]"
              >
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
                  540+
                </div>
                <div className="text-[10px] sm:text-xs font-semibold text-text-secondary mt-1">
                  Projects
                </div>
              </div>
              <div>
                <div className="font-display text-2xl sm:text-3xl font-semibold text-text-primary">
                  12+
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
                  200+
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

// ─── Services Grid ────────────────────────────────────────────────────────────
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
          title="Complete IT Services for Enterprise"
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

// ─── Why Choose Us ────────────────────────────────────────────────────────────
function WhyUs() {
  const shouldReduce = useReducedMotion();
  const highlights = WHY_CHOOSE_US.slice(0, 3);

  const proofPoints = [
    { value: '200+', label: 'Businesses Served' },
    { value: '4hr', label: 'Avg. Response Time' },
    { value: '8+', label: 'Years of Experience' },
  ];

  return (
    <section className="section-padding bg-bg-subtle border-y border-border">
      <div className="container-xl">
        <SectionHeader
          tag="Why Pratham Tech Care"
          title="The IT Partner You Can Rely On"
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

// ─── Industries ────────────────────────────────────────────────────────────────
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

// ─── Tech Stack ────────────────────────────────────────────────────────────────
function TechExpertise() {
  const shouldReduce = useReducedMotion();

  return (
    <section className="section-padding bg-bg border-y border-border">
      <div className="container-xl">
        {/* header — Stripe/Linear style left-aligned with right side descriptor */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <SectionHeader
            tag={'Technology Expertise'}
            title={'We Work With the Best '}
            subtitle={
              'Our certified engineers are proficient with leading technology platforms across networking, servers, cloud, and security.'
            }
          />
        </div>

        {/* masonry — asymmetric 2 col on left, 1 tall on right */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: shouldReduce ? 0 : 0.07 } },
          }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-4"
        >
          {/* left col — 2 stacked */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {TECH_STACK.slice(0, 4).map((category, i) => (
              <motion.div
                key={category.category}
                variants={
                  shouldReduce
                    ? {}
                    : {
                        hidden: { opacity: 0, y: 14 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: { duration: 0.35, ease: 'easeOut' },
                        },
                      }
                }
                whileHover={shouldReduce ? {} : { y: -3, transition: { duration: 0.18 } }}
                className="group relative bg-bg-subtle border border-border rounded-2xl p-6 overflow-hidden hover:border-accent/25 transition-colors duration-200"
              >
                <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-accent/35 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-headings font-semibold text-text-primary text-sm leading-snug">
                    {category.category}
                  </h3>
                  <span className="text-[10px] font-semibold tracking-widest text-text-tertiary">
                    0{i + 1}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {category.items.map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-medium bg-bg border border-border text-text-secondary group-hover:text-text-primary transition-colors duration-150"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* right col — 1 tall feature card */}
          {TECH_STACK[4] && (
            <motion.div
              variants={
                shouldReduce
                  ? {}
                  : {
                      hidden: { opacity: 0, y: 14 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
                    }
              }
              whileHover={shouldReduce ? {} : { y: -3, transition: { duration: 0.18 } }}
              className="group relative bg-accent rounded-2xl p-7 overflow-hidden flex flex-col lg:row-span-2"
            >
              {/* background texture */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    'radial-gradient(circle at 20% 20%, white 1px, transparent 1px), radial-gradient(circle at 80% 80%, white 1px, transparent 1px)',
                  backgroundSize: '32px 32px',
                }}
              />
              <div className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full bg-white/5" />
              <div className="absolute -top-8 -left-8 w-32 h-32 rounded-full bg-white/5" />

              <div className="relative flex flex-col flex-1">
                <div className="flex items-start justify-between mb-8">
                  <span className="text-[10px] font-semibold tracking-widest uppercase text-white/60">
                    0{TECH_STACK.indexOf(TECH_STACK[4]) + 1}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center">
                    <DynamicIcon
                      name={TECH_STACK[4].icon ?? 'Shield'}
                      size={15}
                      className="text-white"
                    />
                  </div>
                </div>

                <h3 className="font-headings font-bold text-white text-xl leading-snug mb-3">
                  {TECH_STACK[4].category}
                </h3>
                <p className="text-sm text-white/70 leading-relaxed mb-8">
                  Enterprise-grade solutions built on industry-leading platforms.
                </p>

                <div className="flex flex-wrap gap-2 flex-1">
                  {TECH_STACK[4].items.map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium bg-white/10 border border-white/15 text-white/90"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <div className="mt-8 pt-5 border-t border-white/15 flex items-center justify-between">
                  <p className="text-xs text-white/60">{TECH_STACK[4].items.length} platforms</p>
                  <div className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center">
                    <DynamicIcon name="ArrowUpRight" size={13} className="text-white" />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* bottom wide card — if 6th category exists */}
          {TECH_STACK[5] && (
            <motion.div
              variants={
                shouldReduce
                  ? {}
                  : {
                      hidden: { opacity: 0, y: 14 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
                    }
              }
              whileHover={shouldReduce ? {} : { y: -3, transition: { duration: 0.18 } }}
              className="group relative lg:col-span-2 bg-bg-subtle border border-border rounded-2xl p-6 overflow-hidden hover:border-accent/25 transition-colors duration-200"
            >
              <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-accent/35 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-5">
                <div>
                  <span className="text-[10px] font-semibold tracking-widest text-text-tertiary block mb-1.5">
                    0{TECH_STACK.length}
                  </span>
                  <h3 className="font-headings font-semibold text-text-primary text-sm">
                    {TECH_STACK[5].category}
                  </h3>
                </div>
                <span className="text-xs text-text-tertiary shrink-0">
                  {TECH_STACK[5].items.length} technologies
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {TECH_STACK[5].items.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-medium bg-bg border border-border text-text-secondary group-hover:text-text-primary transition-colors duration-150"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
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
          tag="Client Stories"
          title="Trusted by Enterprise Teams"
          subtitle="Don't take our word for it. Here's what business leaders say about working with Pratham Tech Care."
        />
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-5"
        >
          {featured.map((t) => (
            <motion.div
              key={t.id}
              variants={itemVariants}
              className="card p-6 flex flex-col justify-between"
            >
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
                  <div className="text-xs text-text-secondary">
                    {t.title}, {t.company}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        <div className="mt-10 text-left sm:text-center">
          <Link to="/testimonials" className="btn-secondary rounded-full">
            View All Testimonials
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Clients Logos ────────────────────────────────────────────────────────────
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
            Trusted by 200+ companies across India
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
