import { Link } from 'react-router-dom';
import { Cpu, Phone, Mail, MapPin, Linkedin, Twitter, Facebook, Youtube } from 'lucide-react';
import { SITE_CONFIG } from '../../constants/siteConfig';
import { FOOTER_LINKS } from '../../constants/navigation';

export default function Footer() {
  const year = new Date().getFullYear();

  const socialIcons = {
    LinkedIn: Linkedin,
    Twitter: Twitter,
    Facebook: Facebook,
    YouTube: Youtube,
  };

  return (
    <footer className="bg-bg-subtle border-t border-border text-text-secondary">
      {/* Main footer */}
      <div className="container-xl py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-5">
              <Cpu className="text-accent shrink-0" size={24} strokeWidth={1.5} />
              <span className="font-headings font-bold text-text-primary text-lg tracking-tight">
                Pratham Tech Care
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-6 text-text-secondary/80">
              Enterprise IT solutions trusted by 200+ businesses across India. Infrastructure, security, cloud, and managed services.
            </p>
            <div className="flex items-center gap-3">
              {[
                { name: 'LinkedIn', href: SITE_CONFIG.social.linkedin, icon: 'LinkedIn' },
                { name: 'Twitter', href: SITE_CONFIG.social.twitter, icon: 'Twitter' },
                { name: 'Facebook', href: SITE_CONFIG.social.facebook, icon: 'Facebook' },
                { name: 'YouTube', href: SITE_CONFIG.social.youtube, icon: 'YouTube' },
              ].map((s) => {
                const IconComponent = socialIcons[s.icon];
                return (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.name}
                    className="w-8 h-8 flex items-center justify-center rounded-lg border border-border bg-bg hover:border-accent hover:text-accent transition-all duration-200"
                  >
                    {IconComponent && <IconComponent size={16} strokeWidth={1.5} />}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-headings font-semibold text-text-primary text-sm mb-5">Services</h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.services.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-text-secondary hover:text-accent transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-headings font-semibold text-text-primary text-sm mb-5">Company</h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-text-secondary hover:text-accent transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-headings font-semibold text-text-primary text-sm mb-5">Contact</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href={`tel:${SITE_CONFIG.phone.replace(/\s/g, '')}`}
                  className="flex items-start gap-2.5 text-sm text-text-secondary hover:text-accent transition-colors duration-200"
                >
                  <Phone size={16} strokeWidth={1.5} className="mt-0.5 text-accent shrink-0" />
                  <span>{SITE_CONFIG.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="flex items-start gap-2.5 text-sm text-text-secondary hover:text-accent transition-colors duration-200"
                >
                  <Mail size={16} strokeWidth={1.5} className="mt-0.5 text-accent shrink-0" />
                  <span>{SITE_CONFIG.email}</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-2.5 text-sm text-text-secondary/80">
                  <MapPin size={16} strokeWidth={1.5} className="mt-0.5 text-accent shrink-0" />
                  <span>
                    {SITE_CONFIG.address.line1}
                    <br />
                    {SITE_CONFIG.address.line2}
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="container-xl py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-text-secondary/60">
            © {year} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {FOOTER_LINKS.legal.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-xs text-text-secondary/60 hover:text-accent transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
