export const SERVICES = [
  {
    id: 'infrastructure',
    icon: 'Server',
    title: 'IT Infrastructure',
    shortDesc: 'End-to-end design, deployment, and management of enterprise IT infrastructure.',
    description:
      'We architect and deploy robust IT infrastructure tailored to your business scale — from on-premise servers to hybrid environments. Our team handles everything from hardware procurement to ongoing infrastructure management.',
    features: [
      'Server design & deployment',
      'Storage area networks (SAN/NAS)',
      'Virtualization (VMware, Hyper-V)',
      'Hardware procurement & lifecycle',
      'Data center planning',
      'Infrastructure monitoring',
    ],
    color: 'brand',
    path: '/it-infrastructure',
  },
  {
    id: 'managed',
    icon: 'Settings',
    title: 'Managed IT Services',
    shortDesc: 'Proactive 24×7 IT management so your team can focus on core business.',
    description:
      'Our managed services model delivers predictable IT costs, proactive monitoring, and rapid incident response. We act as your extended IT team, handling day-to-day operations and strategic planning.',
    features: [
      '24×7 NOC monitoring',
      'Helpdesk & end-user support',
      'Patch management',
      'Incident & problem management',
      'IT asset management',
      'SLA-backed response times',
    ],
    color: 'blue',
    path: '/services#managed',
  },
  {
    id: 'networking',
    icon: 'Network',
    title: 'Networking Solutions',
    shortDesc: 'High-performance enterprise networking from LAN to WAN and SD-WAN.',
    description:
      'We design and implement secure, high-throughput networking solutions for enterprises of all sizes. From branch connectivity to campus networks, we deliver reliability and performance.',
    features: [
      'LAN/WAN architecture',
      'SD-WAN deployment',
      'Network segmentation & VLANs',
      'Wi-Fi enterprise solutions',
      'Firewall & UTM configuration',
      'Network performance optimization',
    ],
    color: 'cyan',
    path: '/services#networking',
  },
  {
    id: 'security',
    icon: 'Shield',
    title: 'Cybersecurity',
    shortDesc: 'Comprehensive security posture management and threat protection.',
    description:
      'Protect your business from evolving cyber threats with our layered security approach. We implement, manage, and continuously improve your security posture across endpoints, networks, and data.',
    features: [
      'Security assessments & audits',
      'Endpoint detection & response (EDR)',
      'SIEM implementation',
      'Zero Trust architecture',
      'Compliance (ISO 27001, SOC 2)',
      'Incident response planning',
    ],
    color: 'red',
    path: '/services#security',
  },
  {
    id: 'cloud',
    icon: 'Cloud',
    title: 'Cloud Support',
    shortDesc: 'Cloud migration, optimization, and managed cloud operations.',
    description:
      'Navigate your cloud journey with confidence. We help businesses migrate to, optimize, and govern cloud environments across AWS, Azure, and GCP — ensuring cost efficiency and operational excellence.',
    features: [
      'Cloud migration strategy',
      'AWS / Azure / GCP management',
      'Cost optimization',
      'Cloud security & compliance',
      'Disaster recovery & backup',
      'Multi-cloud governance',
    ],
    color: 'sky',
    path: '/services#cloud',
  },
  {
    id: 'consulting',
    icon: 'Briefcase',
    title: 'IT Consulting',
    shortDesc: 'Strategic technology advisory to align IT with business objectives.',
    description:
      'Our senior consultants work closely with leadership teams to develop technology roadmaps, evaluate vendor solutions, and drive digital transformation initiatives that deliver measurable ROI.',
    features: [
      'IT strategy & roadmapping',
      'Digital transformation advisory',
      'Vendor evaluation & selection',
      'Technology due diligence',
      'IT budget planning',
      'CTO-as-a-Service',
    ],
    color: 'violet',
    path: '/services#consulting',
  },
];

export const INFRASTRUCTURE_SERVICES = [
  {
    id: 'network-setup',
    icon: 'Network',
    title: 'Network Setup & Design',
    description:
      'Structured cabling, switching, routing, and wireless infrastructure designed for performance and redundancy.',
    specs: ['Cat6A / Fiber cabling', 'Cisco / Juniper switching', 'BGP/OSPF routing', 'Enterprise Wi-Fi 6'],
  },
  {
    id: 'servers',
    icon: 'Server',
    title: 'Server Deployment',
    description:
      'Physical and virtual server deployment, configuration, and ongoing management for any workload type.',
    specs: ['Dell / HPE / Lenovo servers', 'Windows Server / Linux', 'VMware ESXi / Hyper-V', 'Clustering & HA'],
  },
  {
    id: 'security-infra',
    icon: 'ShieldCheck',
    title: 'Security Infrastructure',
    description:
      'Firewall deployment, IDS/IPS, VPN gateways, and security monitoring infrastructure to protect your perimeter.',
    specs: ['FortiGate / Palo Alto', 'IDS/IPS deployment', 'SSL/TLS inspection', 'VPN & zero-trust'],
  },
  {
    id: 'hardware',
    icon: 'HardDrive',
    title: 'Hardware Procurement',
    description:
      'Authorized hardware sourcing from leading OEMs with full warranty support and lifecycle management.',
    specs: ['Authorized reseller', 'Best-price procurement', 'Asset tagging & inventory', 'Warranty management'],
  },
  {
    id: 'infra-mgmt',
    icon: 'Activity',
    title: 'Infrastructure Management',
    description:
      'Continuous monitoring, patch management, and performance optimization for your entire infrastructure estate.',
    specs: ['24×7 monitoring (PRTG/Zabbix)', 'Automated patching', 'Capacity planning', 'Performance reporting'],
  },
  {
    id: 'support',
    icon: 'Headphones',
    title: 'Support Plans',
    description:
      'Flexible support tiers from basic remote support to on-site dedicated engineers — scaled to your needs.',
    specs: ['Bronze / Silver / Gold / Platinum', '4hr to NBD response SLA', 'Dedicated engineer options', 'Monthly reporting'],
  },
];

export const SUPPORT_PLANS = [
  {
    name: 'Bronze',
    price: '₹15,000',
    period: '/month',
    description: 'Remote support for small businesses.',
    features: [
      'Remote support (business hours)',
      'Email & phone support',
      'Monthly health check',
      'Up to 10 devices',
      '24hr response SLA',
    ],
    highlight: false,
  },
  {
    name: 'Silver',
    price: '₹35,000',
    period: '/month',
    description: 'Proactive managed support for growing teams.',
    features: [
      'Remote + 2 on-site visits/month',
      'Business hours + evening support',
      'Weekly health check',
      'Up to 30 devices',
      '8hr response SLA',
      'Patch management',
    ],
    highlight: false,
  },
  {
    name: 'Gold',
    price: '₹75,000',
    period: '/month',
    description: 'Full managed services for enterprises.',
    features: [
      '24×7 remote support',
      'Unlimited on-site visits',
      'Daily monitoring',
      'Up to 100 devices',
      '4hr response SLA',
      'Patch & change management',
      'Quarterly IT review',
    ],
    highlight: true,
  },
  {
    name: 'Platinum',
    price: 'Custom',
    period: '',
    description: 'Dedicated team for large enterprises.',
    features: [
      'Dedicated on-site engineer',
      '24×7 NOC monitoring',
      'Real-time alerting',
      'Unlimited devices',
      '1hr response SLA',
      'Full ITSM integration',
      'Monthly executive reporting',
    ],
    highlight: false,
  },
];
