import { motion, useReducedMotion } from 'framer-motion';
import { Shield, Award, Users, TrendingUp, Clock, FileCheck, ArrowUpRight } from 'lucide-react';
import SEOHead from '../../components/common/SEOHead';
import PageHero from '../../components/common/PageHero';
import SectionHeader from '../../components/common/SectionHeader';
import CTABanner from '../../components/sections/CTABanner';
import { SEO } from '../../constants/seo';
import { SITE_CONFIG } from '../../constants/siteConfig';
import { STATS } from '../../constants/testimonials';
import { WHY_CHOOSE_US } from '../../constants/theme';

const VALUES = [
  {
    icon: 'Shield',
    title: 'Integrity',
    desc: 'We are transparent in our pricing, honest in our assessments, and accountable for our commitments. No hidden costs, no overengineered solutions.',
  },
  {
    icon: 'Award',
    title: 'Excellence',
    desc: 'We hold ourselves to the highest technical and service standards. Our engineers are certified, our processes are documented, and our results are measurable.',
  },
  {
    icon: 'Users',
    title: 'Partnership',
    desc: 'We invest in long-term relationships. We understand your business, proactively identify risks, and grow as your technology partner.',
  },
  {
    icon: 'TrendingUp',
    title: 'Innovation',
    desc: "We stay ahead of the technology curve so our clients don't have to. We continuously evaluate new solutions that deliver real business value.",
  },
];

const TEAM = [
  {
    name: 'Amit Pratham',
    title: 'Founder & CEO',
    initials: 'AP',
    exp: '20+ years in enterprise IT',
  },
  {
    name: 'Kavita Rajani',
    title: 'CTO',
    initials: 'KR',
    exp: 'Cisco & VMware Certified Architect',
  },
  {
    name: 'Rohit Salvi',
    title: 'Head of Security',
    initials: 'RS',
    exp: 'CISSP, CEH, ISO 27001 Lead',
  },
  {
    name: 'Deepa Nair',
    title: 'Director of Operations',
    initials: 'DN',
    exp: 'ITIL Expert, PMP Certified',
  },
];

const iconMap = {
  Shield,
  Award,
  Users,
  TrendingUp,
  Clock,
  FileCheck,
};

function DynamicIcon({ name, size = 20, strokeWidth = 1.5, className }) {
  const IconComponent = iconMap[name];
  if (!IconComponent) return null;
  return <IconComponent size={size} strokeWidth={strokeWidth} className={className} />;
}

export default function AboutPage() {
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
    <>
      <SEOHead {...SEO.about} />
      <PageHero
        tag="About Us"
        title="Built on Trust, Driven by Technology"
        subtitle={`Founded in ${SITE_CONFIG.founded}, Pratham Tech Care has grown from a Mumbai-based IT support firm into a full-scale enterprise technology partner serving 200+ clients across India.`}
        breadcrumbs={[{ label: 'About Us' }]}
      />

      {/* Story */}
      <section className="section-padding bg-bg">
        <div className="container-xl">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* left — story */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={
                shouldReduce ? { duration: 0 } : { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
              }
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-bg-subtle mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                <span className="text-[11px] font-semibold tracking-widest uppercase text-text-secondary">
                  Our Story
                </span>
              </div>

              <h2 className="font-headings text-3xl lg:text-4xl font-bold text-text-primary leading-tight mb-6">
                12 Years of Enterprise <br className="hidden lg:block" />
                <span className="text-accent">IT Excellence.</span>
              </h2>

              <div className="space-y-4">
                <p className="text-sm text-text-secondary leading-relaxed">
                  Pratham Tech Care was founded in {SITE_CONFIG.founded} by Amit Pratham, with a
                  simple belief: that businesses of all sizes deserve enterprise-grade IT support —
                  not just the largest corporations.
                </p>
                <p className="text-sm text-text-secondary leading-relaxed">
                  What began as a hardware support and networking firm has evolved into a
                  comprehensive technology partner offering the full spectrum of IT services — from
                  infrastructure design and managed support to cybersecurity and cloud
                  transformation.
                </p>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Today, with a team of {SITE_CONFIG.employees} certified engineers and consultants,
                  we serve clients across BFSI, healthcare, manufacturing, retail, and dozens of
                  other verticals.
                </p>
              </div>
            </motion.div>

            {/* right — stats */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: shouldReduce ? 0 : 0.08 } },
              }}
              className="grid grid-cols-2 gap-3"
            >
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  variants={
                    shouldReduce
                      ? {}
                      : {
                          hidden: { opacity: 0, y: 16 },
                          visible: {
                            opacity: 1,
                            y: 0,
                            transition: { duration: 0.4, ease: 'easeOut' },
                          },
                        }
                  }
                  whileHover={{ y: -3, transition: { duration: 0.18 } }}
                  className="group relative bg-bg-subtle border border-border rounded-2xl p-6 overflow-hidden hover:border-accent/30 transition-colors duration-200 flex flex-col"
                >
                  {/* top glow */}
                  <div className="absolute top-0 left-5 right-5 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* index */}
                  <span className="text-[10px] font-semibold tracking-widest text-text-tertiary mb-4">
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  {/* value */}
                  <p className="font-headings text-3xl font-bold text-text-primary leading-none mb-2">
                    {stat.value}
                  </p>

                  {/* label */}
                  <p className="text-xs text-text-secondary leading-snug mt-auto">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision Mission */}
      <section className="section-padding bg-bg-subtle border-y border-border">
        <div className="container-xl">
          <div className="grid lg:grid-cols-2 gap-4">
            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={
                shouldReduce ? { duration: 0 } : { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
              }
              whileHover={{ y: -3, transition: { duration: 0.18 } }}
              className="group relative bg-bg border border-border rounded-2xl p-8 lg:p-10 overflow-hidden hover:border-accent/30 transition-colors duration-200 flex flex-col"
            >
              {/* top glow */}
              <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* large faint bg number */}
              <span className="absolute bottom-4 right-6 text-8xl font-headings font-bold text-text-primary/[0.03] select-none pointer-events-none leading-none">
                01
              </span>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-bg-subtle mb-6 self-start">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                <span className="text-[10px] font-semibold tracking-widest uppercase text-text-secondary">
                  Our Vision
                </span>
              </div>

              <h3 className="font-headings text-xl lg:text-2xl font-bold text-text-primary leading-snug mb-4">
                India's Most Trusted <br className="hidden lg:block" />
                <span className="text-accent">Enterprise IT Partner.</span>
              </h3>

              <p className="text-sm text-text-secondary leading-relaxed flex-1">
                To be the technology partner that businesses across India rely on — not just for
                technical support, but for strategic guidance in navigating an increasingly complex
                digital landscape.
              </p>

              <div className="mt-8 pt-5 border-t border-border flex items-center justify-between">
                <span className="text-[10px] font-semibold tracking-widest uppercase text-text-tertiary">
                  Where we're headed
                </span>
                <div className="w-7 h-7 rounded-full border border-border flex items-center justify-center group-hover:border-accent/40 group-hover:bg-accent/5 transition-colors duration-200">
                  <ArrowUpRight
                    size={13}
                    className="text-text-tertiary group-hover:text-accent transition-colors duration-200"
                  />
                </div>
              </div>
            </motion.div>

            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={
                shouldReduce
                  ? { duration: 0 }
                  : { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }
              }
              whileHover={{ y: -3, transition: { duration: 0.18 } }}
              className="group relative bg-accent rounded-2xl p-8 lg:p-10 overflow-hidden flex flex-col"
            >
              {/* background texture */}
              <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                  backgroundSize: '28px 28px',
                }}
              />
              <div className="absolute -bottom-12 -right-12 w-48 h-48 rounded-full bg-white/5 pointer-events-none" />
              <div className="absolute -top-8 -left-8 w-32 h-32 rounded-full bg-white/5 pointer-events-none" />

              {/* large faint bg number */}
              <span className="absolute bottom-4 right-6 text-8xl font-headings font-bold text-white/5 select-none pointer-events-none leading-none">
                02
              </span>

              <div className="relative inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 bg-white/10 mb-6 self-start">
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
                <span className="text-[10px] font-semibold tracking-widest uppercase text-white/80">
                  Our Mission
                </span>
              </div>

              <h3 className="relative font-headings text-xl lg:text-2xl font-bold text-white leading-snug mb-4">
                Enabling Business <br className="hidden lg:block" />
                Through Technology.
              </h3>

              <p className="relative text-sm text-white/75 leading-relaxed flex-1">
                To deliver reliable, secure, and scalable IT infrastructure and services that reduce
                operational friction, protect business assets, and enable our clients to compete and
                grow with confidence.
              </p>

              <div className="relative mt-8 pt-5 border-t border-white/15 flex items-center justify-between">
                <span className="text-[10px] font-semibold tracking-widest uppercase text-white/50">
                  How we operate
                </span>
                <div className="w-7 h-7 rounded-full border border-white/20 bg-white/10 flex items-center justify-center">
                  <ArrowUpRight size={13} className="text-white/70" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-bg">
        <div className="container-xl">
          <SectionHeader
            tag="Our Values"
            title="What We Stand For"
            subtitle="These aren't just words on a wall — they're the principles that guide every client engagement and every decision we make."
          />
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {VALUES.map((v) => (
              <motion.div key={v.title} variants={itemVariants} className="card p-6">
                <div className="w-10 h-10 rounded-md bg-accent-subtle text-accent flex items-center justify-center mb-4">
                  <DynamicIcon name={v.icon} />
                </div>
                <h3 className="font-headings font-semibold text-text-primary text-sm mb-2">
                  {v.title}
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Leadership */}
      <section className="section-padding bg-bg-subtle border-t border-border">
        <div className="container-xl">
          <SectionHeader
            tag="Leadership"
            title="The Team Behind Our Success"
            subtitle="Our leadership team brings decades of combined experience from enterprise IT across India and globally."
          />
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {TEAM.map((member, i) => (
              <motion.div
                key={member.name}
                variants={itemVariants}
                whileHover={{ y: -3, transition: { duration: 0.18 } }}
                className="group relative bg-bg border border-border rounded-2xl p-6 overflow-hidden hover:border-accent/30 transition-colors duration-200 flex flex-col items-center text-center"
              >
                {/* top glow */}
                <div className="absolute top-0 left-5 right-5 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* index */}
                <span className="absolute top-4 right-4 text-[10px] font-semibold tracking-widest text-text-tertiary">
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* avatar */}
                <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/15 transition-colors duration-200">
                  <span className="font-headings font-bold text-accent text-base">
                    {member.initials}
                  </span>
                </div>

                {/* name + title */}
                <h3 className="font-headings font-semibold text-text-primary text-sm leading-snug mb-1">
                  {member.name}
                </h3>
                <p className="text-[11px] text-accent font-medium mb-4">{member.title}</p>

                {/* exp strip */}
                <div className="mt-auto w-full pt-4 border-t border-border">
                  <p className="text-[10px] text-text-tertiary">{member.exp}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Trust */}
      <section className="section-padding bg-bg border-t border-border">
        <div className="container-xl">
          <SectionHeader
            tag="Why Clients Trust Us"
            title="More Than an IT Vendor"
            subtitle="Our clients don't think of us as just a vendor. They see us as an extension of their own team."
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: shouldReduce ? 0 : 0.07 } },
            }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {WHY_CHOOSE_US.map((item, i) => (
              <motion.div
                key={item.title}
                variants={
                  shouldReduce
                    ? {}
                    : {
                        hidden: { opacity: 0, y: 16 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: { duration: 0.4, ease: 'easeOut' },
                        },
                      }
                }
                whileHover={{ y: -3, transition: { duration: 0.18 } }}
                className="group relative bg-bg-subtle border border-border rounded-2xl p-6 overflow-hidden hover:border-accent/30 transition-colors duration-200 flex flex-col"
              >
                {/* top glow */}
                <div className="absolute top-0 left-5 right-5 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* icon + index row */}
                <div className="flex items-start justify-between mb-5">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/15 transition-colors duration-200 shrink-0">
                    <DynamicIcon name={item.icon} size={17} className="text-accent" />
                  </div>
                  <span className="text-[10px] font-semibold tracking-widest text-text-tertiary">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* text */}
                <h3 className="font-headings font-semibold text-text-primary text-sm leading-snug mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed flex-1">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
