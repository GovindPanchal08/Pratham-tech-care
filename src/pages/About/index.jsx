import { motion, useReducedMotion } from 'framer-motion';
import { Shield, Award, Users, TrendingUp, Clock, FileCheck } from 'lucide-react';
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
    desc: 'We stay ahead of the technology curve so our clients don\'t have to. We continuously evaluate new solutions that deliver real business value.',
  },
];

const TEAM = [
  { name: 'Amit Pratham', title: 'Founder & CEO', initials: 'AP', exp: '20+ years in enterprise IT' },
  { name: 'Kavita Rajani', title: 'CTO', initials: 'KR', exp: 'Cisco & VMware Certified Architect' },
  { name: 'Rohit Salvi', title: 'Head of Security', initials: 'RS', exp: 'CISSP, CEH, ISO 27001 Lead' },
  { name: 'Deepa Nair', title: 'Director of Operations', initials: 'DN', exp: 'ITIL Expert, PMP Certified' },
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
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={shouldReduce ? { duration: 0 } : { duration: 0.4 }}
            >
              <div className="label-tag mb-5">Our Story</div>
              <h2 className="font-headings text-3xl lg:text-4xl font-bold text-text-primary mb-5">
                12 Years of Enterprise IT Excellence
              </h2>
              <div className="space-y-4 text-text-secondary leading-relaxed">
                <p>
                  Pratham Tech Care was founded in {SITE_CONFIG.founded} by Amit Pratham, with a simple belief: that businesses of all sizes deserve enterprise-grade IT support — not just the largest corporations.
                </p>
                <p>
                  What began as a hardware support and networking firm has evolved into a comprehensive technology partner offering the full spectrum of IT services — from infrastructure design and managed support to cybersecurity and cloud transformation.
                </p>
                <p>
                  Today, with a team of {SITE_CONFIG.employees} certified engineers and consultants, we serve clients across BFSI, healthcare, manufacturing, retail, and dozens of other verticals — managing their technology so they can focus on growth.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="grid grid-cols-2 gap-4"
            >
              {STATS.map((stat) => (
                <motion.div key={stat.label} variants={itemVariants} className="card p-6">
                  <div className="font-headings text-4xl font-bold text-accent mb-1">{stat.value}</div>
                  <div className="text-sm text-text-secondary">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision Mission */}
      <section className="section-padding bg-bg-subtle border-y border-border">
        <div className="container-xl">
          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={shouldReduce ? { duration: 0 } : { duration: 0.4 }}
              className="card p-8 lg:p-10 border-l-4 border-accent"
            >
              <div className="label-tag mb-4">Our Vision</div>
              <h3 className="font-headings text-xl font-bold text-text-primary mb-3">
                India's Most Trusted Enterprise IT Partner
              </h3>
              <p className="text-text-secondary leading-relaxed">
                To be the technology partner that businesses across India rely on — not just for technical support, but for strategic guidance in navigating an increasingly complex digital landscape.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={shouldReduce ? { duration: 0 } : { duration: 0.4, delay: 0.1 }}
              className="card p-8 lg:p-10 border-l-4 border-accent"
            >
              <div className="label-tag mb-4">Our Mission</div>
              <h3 className="font-headings text-xl font-bold text-text-primary mb-3">
                Enabling Business Through Technology
              </h3>
              <p className="text-text-secondary leading-relaxed">
                To deliver reliable, secure, and scalable IT infrastructure and services that reduce operational friction, protect business assets, and enable our clients to compete and grow with confidence.
              </p>
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
                <h3 className="font-headings font-semibold text-text-primary text-sm mb-2">{v.title}</h3>
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
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {TEAM.map((member) => (
              <motion.div
                key={member.name}
                variants={itemVariants}
                className="bg-bg border border-border rounded-lg p-6 text-center hover:border-accent transition-colors duration-150"
              >
                <div className="w-16 h-16 rounded bg-accent-subtle flex items-center justify-center font-headings font-bold text-accent text-lg mx-auto mb-4">
                  {member.initials}
                </div>
                <h3 className="font-headings font-semibold text-text-primary text-sm">{member.name}</h3>
                <div className="text-xs text-accent mt-1 mb-2">{member.title}</div>
                <div className="text-xs text-text-secondary">{member.exp}</div>
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_CHOOSE_US.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={shouldReduce ? { duration: 0 } : { duration: 0.4, delay: i * 0.08 }}
                className="flex gap-4"
              >
                <div className="w-9 h-9 rounded bg-accent-subtle text-accent flex items-center justify-center shrink-0 mt-0.5">
                  <DynamicIcon name={item.icon} size={16} />
                </div>
                <div>
                  <h3 className="font-headings font-semibold text-text-primary text-sm mb-1">{item.title}</h3>
                  <p className="text-xs text-text-secondary leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
