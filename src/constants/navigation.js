export const NAV_LINKS = [
  // { label: 'Home', path: '/' },
  {
    label: 'Services',
    path: '/services',
    children: [
      { label: 'IT Infrastructure', path: '/it-infrastructure' },
      { label: 'Managed IT Services', path: '/services#managed' },
      { label: 'Cybersecurity', path: '/services#security' },
      { label: 'Cloud Support', path: '/services#cloud' },
      { label: 'Networking Solutions', path: '/services#networking' },
    ],
  },
  { label: 'About', path: '/about' },
  { label: 'Clients', path: '/clients' },
  { label: 'Testimonials', path: '/testimonials' },
  { label: 'Contact', path: '/contact' },
];

export const FOOTER_LINKS = {
  services: [
    { label: 'IT Infrastructure', path: '/it-infrastructure' },
    { label: 'Managed IT Services', path: '/services#managed' },
    { label: 'Networking Solutions', path: '/services#networking' },
    { label: 'Server Deployment', path: '/it-infrastructure#servers' },
    { label: 'Cybersecurity', path: '/services#security' },
    { label: 'Cloud Support', path: '/services#cloud' },
  ],
  company: [
    { label: 'About Us', path: '/about' },
    { label: 'Our Clients', path: '/clients' },
    { label: 'Testimonials', path: '/testimonials' },
    { label: 'Contact Us', path: '/contact' },
  ],
  legal: [
    { label: 'Privacy Policy', path: '/privacy' },
    { label: 'Terms of Service', path: '/terms' },
  ],
};
