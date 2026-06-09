import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Cpu, Phone, Menu, X, ChevronDown } from 'lucide-react';
import { NAV_LINKS } from '../../constants/navigation';
import { SITE_CONFIG } from '../../constants/siteConfig';

// function Logo() {
//   return (
//     <Link to="/" className="flex items-center gap-2.5 group" aria-label={SITE_CONFIG.name}>
//       {/* icon mark */}
//       <div className="relative w-8 h-8 shrink-0">
//         {/* outer ring */}
//         <div className="absolute inset-0 rounded-xl bg-accent/10 group-hover:bg-accent/15 transition-colors duration-200" />
//         {/* inner dot grid — 2x2 */}
//         <div className="absolute inset-0 flex items-center justify-center">
//           <div className="grid grid-cols-2 gap-[3px]">
//             <div className="w-[7px] h-[7px] rounded-[2px] bg-accent" />
//             <div className="w-[7px] h-[7px] rounded-[2px] bg-accent/40" />
//             <div className="w-[7px] h-[7px] rounded-[2px] bg-accent/40" />
//             <div className="w-[7px] h-[7px] rounded-[2px] bg-accent" />
//           </div>
//         </div>
//       </div>

//       {/* wordmark */}
//       <div className="flex flex-col leading-none gap-[3px]">
//         <span className="font-headings font-extrabold text-text-primary text-[15px] tracking-tight">
//           Pratham
//         </span>
//         <span className="font-sans font-medium text-text-tertiary text-[10px] tracking-[0.15em] uppercase">
//           Tech Care
//         </span>
//       </div>
//     </Link>
//   );
// }
function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5 group" aria-label={SITE_CONFIG.name}>
      {/* mark — two overlapping squares, offset */}
      <div className="relative shrink-0 w-[22px] h-[22px]">
        <div className="absolute top-0 left-0 w-[14px] h-[14px] rounded-[3px] bg-accent" />
        <div className="absolute bottom-0 right-0 w-[14px] h-[14px] rounded-[3px] border-2 border-accent bg-transparent group-hover:bg-accent/10 transition-colors duration-200" />
      </div>

      {/* wordmark */}
      <span className="font-headings font-bold text-[15px] text-text-primary tracking-[-0.03em]">
        Pratham Tech Care
      </span>
    </Link>
  );
}

function DropdownMenu({ items }) {
  const shouldReduce = useReducedMotion();
  const dropdownVariants = {
    hidden: { opacity: 0, y: 6 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 6 },
  };
  const transition = shouldReduce ? { duration: 0 } : { duration: 0.16, ease: 'easeOut' };

  return (
    <motion.div
      variants={dropdownVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={transition}
      className="absolute top-full left-0 mt-2 w-56 bg-bg border border-border rounded-lg shadow-lg py-1.5 z-50"
    >
      {items.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className="flex items-center px-4 py-2 text-sm text-text-secondary hover:text-accent transition-colors duration-150"
        >
          {item.label}
        </NavLink>
      ))}
    </motion.div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();
  const dropdownRef = useRef(null);
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'bg-bg/95 backdrop-blur-sm border-b border-border' : 'bg-transparent'
      }`}
    >
      <div className="container-xl">
        <nav
          className="flex items-center justify-between h-16 lg:h-18"
          aria-label="Main navigation"
        >
          <Logo />

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-6 h-full" ref={dropdownRef}>
            {NAV_LINKS.map((link) => (
              <div key={link.path} className="relative flex items-center h-full">
                {link.children ? (
                  <div className="relative">
                    <button
                      className={`nav-link flex items-center gap-1 py-1 font-sans font-medium text-sm transition-colors duration-150 ${
                        activeDropdown === link.path ? 'text-accent' : 'text-text-secondary'
                      }`}
                      onClick={() =>
                        setActiveDropdown(activeDropdown === link.path ? null : link.path)
                      }
                      aria-expanded={activeDropdown === link.path}
                      aria-haspopup="true"
                    >
                      {link.label}
                      <ChevronDown
                        size={14}
                        strokeWidth={1.5}
                        className={`transition-transform duration-200 ${
                          activeDropdown === link.path ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {activeDropdown === link.path && <DropdownMenu items={link.children} />}
                    </AnimatePresence>
                  </div>
                ) : (
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `nav-link font-sans font-medium text-sm transition-colors duration-150 relative py-1 flex items-center h-full ${
                        isActive
                          ? 'text-accent border-b-2 border-accent'
                          : 'text-text-secondary hover:text-accent'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                )}
              </div>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-6">
            <a
              href={`tel:${SITE_CONFIG.phone.replace(/\s/g, '')}`}
              className="flex items-center gap-1.5 text-sm font-medium text-text-secondary hover:text-accent transition-colors duration-150"
            >
              <Phone size={16} strokeWidth={1.5} />
              <span>{SITE_CONFIG.phone}</span>
            </a>
            <motion.div
              whileHover={shouldReduce ? {} : { scale: 1.02 }}
              whileTap={shouldReduce ? {} : { scale: 0.98 }}
              transition={{ duration: 0.15 }}
            >
              <Link
                to="/contact"
                className="btn-primary py-2 px-4 rounded-full font-sans font-semibold text-sm"
              >
                Get a Quote
              </Link>
            </motion.div>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 text-text-secondary hover:text-text-primary rounded-lg transition-colors duration-150"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
          </button>
        </nav>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={shouldReduce ? { duration: 0 } : { duration: 0.2, ease: 'easeInOut' }}
            className="lg:hidden overflow-hidden border-t border-border bg-bg"
          >
            <div className="container-xl py-6 px-4 space-y-4 flex flex-col min-h-[calc(100vh-4rem)] justify-between">
              <div className="space-y-4">
                {NAV_LINKS.map((link) => (
                  <div key={link.path} className="space-y-2">
                    {link.children ? (
                      <>
                        <div className="text-xs font-sans font-medium tracking-widest uppercase text-text-secondary/50">
                          {link.label}
                        </div>
                        <div className="pl-4 space-y-2">
                          {link.children.map((child) => (
                            <NavLink
                              key={child.path}
                              to={child.path}
                              onClick={() => setMobileOpen(false)}
                              className={({ isActive }) =>
                                `block py-2 text-sm transition-colors ${
                                  isActive
                                    ? 'text-accent font-medium'
                                    : 'text-text-secondary hover:text-accent'
                                }`
                              }
                            >
                              {child.label}
                            </NavLink>
                          ))}
                        </div>
                      </>
                    ) : (
                      <NavLink
                        to={link.path}
                        onClick={() => setMobileOpen(false)}
                        className={({ isActive }) =>
                          `block py-2 text-base font-medium transition-colors ${
                            isActive
                              ? 'text-accent font-semibold'
                              : 'text-text-secondary hover:text-accent'
                          }`
                        }
                      >
                        {link.label}
                      </NavLink>
                    )}
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-border flex flex-col gap-4">
                <a
                  href={`tel:${SITE_CONFIG.phone.replace(/\s/g, '')}`}
                  className="flex items-center justify-center gap-1.5 text-sm font-medium text-text-secondary hover:text-accent py-2"
                >
                  <Phone size={16} strokeWidth={1.5} />
                  <span>{SITE_CONFIG.phone}</span>
                </a>
                <motion.div
                  whileHover={shouldReduce ? {} : { scale: 1.02 }}
                  whileTap={shouldReduce ? {} : { scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                >
                  <Link
                    to="/contact"
                    onClick={() => setMobileOpen(false)}
                    className="btn-primary w-full justify-center py-3 rounded-lg font-sans font-semibold text-sm"
                  >
                    Get a Quote
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
