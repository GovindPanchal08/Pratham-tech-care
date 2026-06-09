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
        <div
          className={`
      inline-flex items-center gap-2 mb-1
      px-4 py-1.5
      text-xs font-medium tracking-widest uppercase
      rounded-full border
      ${center ? 'mx-auto flex' : 'inline-flex'}
      ${
        light
          ? 'text-white/90 bg-white/8 border-white/15'
          : 'text-accent bg-accent/8 border-accent/15'
      }
    `}
        >
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
          className={`mt-4 text-base lg:text-base leading-relaxed ${
            light ? 'text-slate-300' : 'text-slate-500'
          }`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
