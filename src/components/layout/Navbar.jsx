import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Cpu, Phone, Menu, X, ChevronDown } from 'lucide-react';
import { NAV_LINKS } from '../../constants/navigation';
import { SITE_CONFIG } from '../../constants/siteConfig';
import logo from '../../assets/l.png';

function Logo() {
  return (
    <Link to="/" className="flex items-center shrink-0 w-48" aria-label={SITE_CONFIG.name}>
      <img
        src={logo}
        alt="Pratham Tech Care"
        className="h-20 sm:h-28 w-auto object-contain mt-3 "
      />
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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

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
          <motion.button
            className="lg:hidden p-2 text-text-secondary hover:text-text-primary rounded-lg transition-colors duration-150"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            whileTap={shouldReduce ? {} : { scale: 0.9 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="block"
                >
                  <X size={20} strokeWidth={1.5} />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="block"
                >
                  <Menu size={20} strokeWidth={1.5} />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </nav>
      </div>

      {/* Mobile drawer with backdrop */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden fixed inset-0 top-16 bg-black/30 backdrop-blur-sm z-30"
              onClick={() => setMobileOpen(false)}
            />

            {/* Slide-down panel */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={
                shouldReduce
                  ? { duration: 0 }
                  : { type: 'spring', stiffness: 300, damping: 30, mass: 0.8 }
              }
              className="lg:hidden fixed left-0 right-0 top-16 z-40 overflow-y-auto max-h-[calc(100vh-4rem)] border-t border-border bg-bg shadow-2xl"
            >
              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: shouldReduce ? 0 : 0.06,
                      delayChildren: shouldReduce ? 0 : 0.1,
                    },
                  },
                }}
                className="container-xl py-6 px-4 space-y-1 flex flex-col min-h-[60vh] justify-between"
              >
                <div className="space-y-1">
                  {NAV_LINKS.map((link) => (
                    <motion.div
                      key={link.path}
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        visible: { opacity: 1, x: 0 },
                      }}
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                      className="space-y-1"
                    >
                      {link.children ? (
                        <>
                          <div className="text-xs font-sans font-medium tracking-widest uppercase text-text-secondary/50 pt-3 pb-1">
                            {link.label}
                          </div>
                          <div className="pl-4 space-y-0.5">
                            {link.children.map((child, childIdx) => (
                              <motion.div
                                key={child.path}
                                variants={{
                                  hidden: { opacity: 0, x: -12 },
                                  visible: { opacity: 1, x: 0 },
                                }}
                                transition={{
                                  type: 'spring',
                                  stiffness: 400,
                                  damping: 25,
                                  delay: shouldReduce ? 0 : childIdx * 0.03,
                                }}
                              >
                                <NavLink
                                  to={child.path}
                                  onClick={() => setMobileOpen(false)}
                                  className={({ isActive }) =>
                                    `block py-2.5 px-3 text-sm rounded-lg transition-all duration-200 ${
                                      isActive
                                        ? 'text-accent font-medium bg-accent/10'
                                        : 'text-text-secondary hover:text-accent hover:bg-accent/5'
                                    }`
                                  }
                                >
                                  {child.label}
                                </NavLink>
                              </motion.div>
                            ))}
                          </div>
                        </>
                      ) : (
                        <NavLink
                          to={link.path}
                          onClick={() => setMobileOpen(false)}
                          className={({ isActive }) =>
                            `block py-3 px-3 text-base font-medium rounded-lg transition-all duration-200 ${
                              isActive
                                ? 'text-accent font-semibold bg-accent/10'
                                : 'text-text-secondary hover:text-accent hover:bg-accent/5'
                            }`
                          }
                        >
                          {link.label}
                        </NavLink>
                      )}
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  className="pt-6 mt-4 border-t border-border flex flex-col gap-4"
                >
                  <a
                    href={`tel:${SITE_CONFIG.phone.replace(/\s/g, '')}`}
                    className="flex items-center justify-center gap-1.5 text-sm font-medium text-text-secondary hover:text-accent py-2 rounded-lg transition-colors duration-200 hover:bg-accent/5"
                  >
                    <Phone size={16} strokeWidth={1.5} />
                    <span>{SITE_CONFIG.phone}</span>
                  </a>
                  <motion.div
                    whileHover={shouldReduce ? {} : { scale: 1.02 }}
                    whileTap={shouldReduce ? {} : { scale: 0.97 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                  >
                    <Link
                      to="/contact"
                      onClick={() => setMobileOpen(false)}
                      className="btn-primary w-full justify-center py-3 rounded-lg font-sans font-semibold text-sm shadow-lg shadow-accent/20"
                    >
                      Get a Quote
                    </Link>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
