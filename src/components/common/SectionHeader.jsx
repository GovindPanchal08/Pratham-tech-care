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
      inline-flex items-center gap-2 mb-2
      px-3.5 py-1
      text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase
      rounded-full border
      ${center ? 'mx-auto flex' : 'inline-flex'}
      ${
        light
          ? 'text-white/90 bg-white/10 border-white/15'
          : 'text-secondary bg-secondary/10 border-secondary/15'
      }
    `}
        >
          {tag}
        </div>
      )}

      <h2
        className={`font-headings text-3xl lg:text-4xl font-bold tracking-tight text-balance ${
          light ? 'text-white' : 'text-text-primary'
        }`}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className={`mt-4 text-sm sm:text-base leading-relaxed ${
            light ? 'text-white/75' : 'text-text-secondary'
          }`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
