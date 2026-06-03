import { motion } from 'framer-motion';

export default function SectionHeader({ tag, title, subtitle, center = false, light = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`max-w-2xl ${center ? 'mx-auto text-center' : ''} mb-14 lg:mb-16`}
    >
      {tag && (
        <div className={`label-tag mb-4 ${center ? 'mx-auto' : ''} ${light ? 'text-brand-300 bg-white/10 border-white/20' : ''}`}>
          {tag}
        </div>
      )}
      <h2
        className={`font-display text-3xl lg:text-4xl font-bold tracking-tight text-balance ${
          light ? 'text-white' : 'text-slate-900'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-base lg:text-lg leading-relaxed ${
            light ? 'text-slate-300' : 'text-slate-500'
          }`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
