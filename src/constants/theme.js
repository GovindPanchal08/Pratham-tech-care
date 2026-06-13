export const THEME = {
  colors: {
    primary: '#4f46e5',
    primaryHover: '#4338ca',
    accent: '#0ea5e9',
    text: {
      primary: '#0f172a',
      secondary: '#475569',
      muted: '#94a3b8',
    },
    bg: {
      white: '#ffffff',
      subtle: '#f8fafc',
      muted: '#f1f5f9',
    },
    border: '#e2e8f0',
  },
  fonts: {
    display: '"Syne", sans-serif',
    body: '"DM Sans", sans-serif',
    mono: '"JetBrains Mono", monospace',
  },
  radius: {
    sm: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.5rem',
    '2xl': '2rem',
  },
  transition: {
    fast: '150ms ease',
    base: '200ms ease',
    slow: '300ms ease',
    slower: '500ms ease',
  },
};

export const WHY_CHOOSE_US = [
  {
    icon: 'Award',
    title: '10+ Years of Excellence',
    description:
      'Over a decade delivering enterprise IT solutions with a track record that speaks for itself — 25+ satisfied clients and 75+ successful projects.',
  },
  {
    icon: 'Clock',
    title: '4hr Avg. Response Time',
    description:
      'We prioritize rapid response and minimal downtime, ensuring your business stays operational. Our team identifies and resolves issues before they escalate.',
  },
  {
    icon: 'Users',
    title: 'Experienced Team',
    description:
      'Our team holds certifications from Cisco, Microsoft, VMware, AWS, and other industry leaders — ensuring best-practice implementations.',
  },
  {
    icon: 'Shield',
    title: 'Security-First Approach',
    description:
      "Every solution we deploy incorporates security by design. We don't treat security as an add-on — it's fundamental to our architecture.",
  },
  {
    icon: 'TrendingUp',
    title: 'Business-Aligned IT',
    description:
      'We take time to understand your business objectives and align technology investments to deliver measurable ROI, not just technical solutions.',
  },
  {
    icon: 'FileCheck',
    title: 'Transparent & Accountable',
    description:
      "Clear SLAs, regular reporting, and honest communication. You always know the status of your IT environment and what we're doing about it.",
  },
];

export const TECH_STACK = [
  { category: 'Networking', items: ['Cisco', 'Juniper', 'Fortinet', 'Aruba', 'Palo Alto'] },
  { category: 'Servers', items: ['Dell EMC', 'HPE', 'Lenovo', 'IBM', 'Supermicro'] },
  { category: 'Virtualization', items: ['VMware', 'Microsoft Hyper-V', 'Proxmox', 'Nutanix'] },
  { category: 'Cloud', items: ['AWS', 'Microsoft Azure', 'Google Cloud', 'Oracle Cloud'] },
  { category: 'Security', items: ['Sophos', 'CrowdStrike', 'Darktrace', 'Splunk', 'Qualys'] },
  {
    category: 'OS & Software',
    items: ['Windows Server', 'RHEL / CentOS', 'Ubuntu', 'Active Directory'],
  },
];

export const STATS = [
  { value: '75+', label: 'Projects Delivered' },
  { value: '25+', label: 'Enterprise Clients' },
  { value: '99.9%', label: 'Average Uptime SLA' },
  { value: '10+', label: 'Years of Experience' },
];
