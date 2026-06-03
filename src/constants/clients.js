export const CLIENTS = [
  { id: 1, name: 'Innovate Financial', industry: 'BFSI', abbr: 'IFS' },
  { id: 2, name: 'MedCore Diagnostics', industry: 'Healthcare', abbr: 'MCD' },
  { id: 3, name: 'LogiSwift Logistics', industry: 'Logistics', abbr: 'LSL' },
  { id: 4, name: 'EduTech Global', industry: 'Education', abbr: 'ETG' },
  { id: 5, name: 'Apex Manufacturing', industry: 'Manufacturing', abbr: 'APX' },
  { id: 6, name: 'RetailMax India', industry: 'Retail', abbr: 'RMI' },
  { id: 7, name: 'Stellar Pharma', industry: 'Pharma', abbr: 'STP' },
  { id: 8, name: 'NexGen Realty', industry: 'Real Estate', abbr: 'NGR' },
  { id: 9, name: 'TrueBlue Hotels', industry: 'Hospitality', abbr: 'TBH' },
  { id: 10, name: 'Accord Legal LLP', industry: 'Legal', abbr: 'ACL' },
  { id: 11, name: 'SwiftPay Fintech', industry: 'Fintech', abbr: 'SPF' },
  { id: 12, name: 'Greenfield Energy', industry: 'Energy', abbr: 'GFE' },
];

export const INDUSTRIES = [
  { name: 'Banking & Finance', icon: 'Building2', count: '40+ clients' },
  { name: 'Healthcare', icon: 'Heart', count: '30+ clients' },
  { name: 'Manufacturing', icon: 'Factory', count: '35+ clients' },
  { name: 'Education', icon: 'GraduationCap', count: '20+ clients' },
  { name: 'Retail & E-commerce', icon: 'ShoppingCart', count: '25+ clients' },
  { name: 'Logistics & Supply Chain', icon: 'Truck', count: '20+ clients' },
  { name: 'Hospitality', icon: 'Hotel', count: '15+ clients' },
  { name: 'Real Estate', icon: 'Home', count: '15+ clients' },
];

export const CASE_STUDIES = [
  {
    id: 1,
    client: 'Innovate Financial Services',
    industry: 'BFSI',
    challenge: 'Legacy infrastructure causing 4+ hours of downtime monthly, failing audit requirements.',
    solution: 'Complete data center modernization with VMware virtualization, redundant network fabric, and 24×7 managed monitoring.',
    results: ['85% reduction in downtime', '30% infrastructure cost savings', 'ISO 27001 compliance achieved', 'RTO reduced to 2 hours'],
    duration: '90 days',
    color: 'brand',
  },
  {
    id: 2,
    client: 'MedCore Diagnostics',
    industry: 'Healthcare',
    challenge: 'Siloed clinical systems, slow application performance, and no disaster recovery plan.',
    solution: 'Hybrid cloud migration to Azure with HIPAA-compliant architecture, high-availability SQL clusters, and automated backup.',
    results: ['40% performance improvement', 'Zero data loss migration', 'DR RTO of 4 hours', '₹18L annual savings'],
    duration: '120 days',
    color: 'blue',
  },
  {
    id: 3,
    client: 'LogiSwift Logistics',
    industry: 'Logistics',
    challenge: 'Active ransomware attack encrypting business-critical systems across 8 branch locations.',
    solution: 'Emergency incident response, threat containment, forensic analysis, and full environment rebuild with hardened security baseline.',
    results: ['48hr full recovery', 'Zero data ransom paid', 'EDR deployed across all endpoints', 'Security policy overhaul'],
    duration: '48 hours critical / 30 days full hardening',
    color: 'red',
  },
];
