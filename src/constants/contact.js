import { SITE_CONFIG } from './siteConfig';
import { SERVICES } from './services';

export const CONTACT_INFO = [
  {
    icon: 'Phone',
    label: 'Call Us',
    value: SITE_CONFIG.phone,
    value2: SITE_CONFIG.phone2,
    href: `tel:${SITE_CONFIG.phone.replace(/\s/g, '')}`,
  },
  {
    icon: 'Mail',
    label: 'Email Us',
    value: SITE_CONFIG.email,
    href: `mailto:${SITE_CONFIG.email}`,
  },
  {
    icon: 'MapPin',
    label: 'Visit Us',
    value: SITE_CONFIG.address.line1,
    value2: SITE_CONFIG.address.line2,
    href: 'https://maps.google.com/?q=Andheri+East+Mumbai',
  },
  {
    icon: 'Clock',
    label: 'Business Hours',
    value: 'Mon–Sat: 9:00 AM – 7:00 PM',
    value2: 'Emergency Support: 24×7',
  },
];

export const SERVICE_OPTIONS = SERVICES.map((s) => ({
  value: s.id,
  label: s.title,
}));

export const FORM_FIELDS = {
  name: { placeholder: 'Your full name', label: 'Full Name' },
  company: { placeholder: 'Your company name', label: 'Company Name' },
  email: { placeholder: 'your@company.com', label: 'Work Email' },
  phone: { placeholder: '+91 98765 43210', label: 'Phone Number' },
  service: { placeholder: 'Select a service', label: 'Service Required' },
  message: { placeholder: 'Tell us about your requirements...', label: 'Message', rows: 5 },
};
