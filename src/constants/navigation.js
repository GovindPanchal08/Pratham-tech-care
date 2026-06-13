export const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },

  {
    label: 'Services',
    path: '/services',
    children: [
      { label: 'IT Infrastructure', path: '/it-infrastructure' },
      { label: 'Networking Solutions', path: '/services#networking' },
      { label: 'IT Hardware Solutions & Support', path: '/it-infrastructure#servers' },
      { label: 'Surveillance & Access Control Solutions', path: '/services#security' },
      { label: 'Software Licensing', path: '/services#cloud' },
      { label: 'Technical Support & AMC Services', path: '/services#support' },
    ],
  },
  { label: 'Clients', path: '/clients' },
  { label: 'Contact', path: '/contact' },
];

export const FOOTER_LINKS = {
  services: [
    { label: 'IT Infrastructure', path: '/it-infrastructure' },
    { label: 'Networking Solutions', path: '/services#networking' },
    { label: 'IT Hardware Solutions & Support', path: '/it-infrastructure#servers' },
    { label: 'Surveillance & Access Control Solutions', path: '/services#security' },
    { label: 'Software Licensing', path: '/services#cloud' },
    { label: 'Technical Support & AMC Services', path: '/services#support' },
  ],
  company: [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Our Clients', path: '/clients' },
    { label: 'Contact Us', path: '/contact' },
  ],
  legal: [
    { label: 'Privacy Policy', path: '/privacy' },
    { label: 'Terms of Service', path: '/terms' },
  ],
};
