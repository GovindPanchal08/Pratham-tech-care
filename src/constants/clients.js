// export const CLIENTS = [
//   { id: 1, name: 'Innovate Financial', industry: 'BFSI', abbr: 'IFS' },
//   { id: 2, name: 'MedCore Diagnostics', industry: 'Healthcare', abbr: 'MCD' },
//   { id: 3, name: 'LogiSwift Logistics', industry: 'Logistics', abbr: 'LSL' },
//   { id: 4, name: 'EduTech Global', industry: 'Education', abbr: 'ETG' },
//   { id: 5, name: 'Kristron Controls & Systems', industry: 'Manufacturing', abbr: 'KCS' },
//   { id: 6, name: 'RetailMax India', industry: 'Retail', abbr: 'RMI' },
//   { id: 7, name: 'Stellar Pharma', industry: 'Pharma', abbr: 'STP' },
//   { id: 8, name: 'NexGen Realty', industry: 'Real Estate', abbr: 'NGR' },
//   { id: 9, name: 'TrueBlue Hotels', industry: 'Hospitality', abbr: 'TBH' },
//   { id: 10, name: 'Accord Legal LLP', industry: 'Legal', abbr: 'ACL' },
//   { id: 11, name: 'SwiftPay Fintech', industry: 'Fintech', abbr: 'SPF' },
//   { id: 12, name: 'Wärtsilä Voyage', industry: 'Energy', abbr: 'WV' },
//   {
//     id: 13,
//     name: 'ActivePay Management Services',
//     industry: 'Technology & IT Services',
//     abbr: 'APM',
//   },
// ];

// export const INDUSTRIES = [
//   { name: 'Small & Medium Enterprises (SMEs)', icon: 'Building2', count: '07+ clients' },
//   { name: 'Healthcare Organizations', icon: 'Heart', count: '30+ clients' },
//   { name: 'Manufacturing Units', icon: 'Factory', count: '07+ clients' },
//   { name: 'Education', icon: 'GraduationCap', count: '20+ clients' },
//   { name: 'Retail Businesses', icon: 'ShoppingCart', count: '25+ clients' },
//   { name: 'Professional Service Firms', icon: 'Network', count: '20+ clients' },
//   { name: 'Hospitality', icon: 'Hotel', count: '15+ clients' },
//   { name: 'Startups & Growing Businesses', icon: 'TrendingUp', count: '15+ clients' },
//   { name: 'Corporate Offices ', icon: 'Building2', count: '15+ clients' },
// ];

export const CLIENTS = [
  // 01 — Manufacturing & Industrial
  {
    id: 1,
    name: 'Kristron Controls & Systems',
    industry: 'Manufacturing & Industrial',
    abbr: 'KCS',
  },
  { id: 2, name: 'M R Fabrications', industry: 'Manufacturing & Industrial', abbr: 'MRF' },
  { id: 3, name: 'Raina Industries', industry: 'Manufacturing & Industrial', abbr: 'RI' },
  { id: 4, name: 'Stacklift Equipment', industry: 'Manufacturing & Industrial', abbr: 'SE' },
  { id: 5, name: 'Total Tools & Equipment', industry: 'Manufacturing & Industrial', abbr: 'TTE' },

  // 02 — Technology & IT Services
  { id: 6, name: 'Sahyadri Tech India', industry: 'Technology & IT Services', abbr: 'STI' },
  { id: 7, name: 'Proteus Technologies', industry: 'Technology & IT Services', abbr: 'PT' },
  {
    id: 8,
    name: 'ActivePay Management Services',
    industry: 'Technology & IT Services',
    abbr: 'APM',
  },

  // 03 — Healthcare & Pharmaceuticals
  { id: 9, name: 'Otto Bock Healthcare', industry: 'Healthcare & Pharmaceuticals', abbr: 'OBH' },
  {
    id: 10,
    name: 'Orthosquare Multispeciality Dental',
    industry: 'Healthcare & Pharmaceuticals',
    abbr: 'OMD',
  },
  { id: 11, name: 'Naxpar Health Concepts', industry: 'Healthcare & Pharmaceuticals', abbr: 'NHC' },
  {
    id: 12,
    name: 'Aplus Blackberry Pharmaceutical',
    industry: 'Healthcare & Pharmaceuticals',
    abbr: 'ABP',
  },

  // 04 — Banking, Finance & Fintech
  {
    id: 13,
    name: 'Receivable Exchange of India',
    industry: 'Banking, Finance & Fintech',
    abbr: 'RXIL',
  },
  { id: 14, name: 'Spire Venture', industry: 'Banking, Finance & Fintech', abbr: 'SV' },

  // 05 — Engineering, Energy & Utilities
  { id: 15, name: 'Wärtsilä Voyage', industry: 'Engineering, Energy & Utilities', abbr: 'WV' },
  {
    id: 16,
    name: 'Marine Electricals India',
    industry: 'Engineering, Energy & Utilities',
    abbr: 'MEI',
  },

  // 06 — Logistics & Supply Chain
  {
    id: 17,
    name: 'Celcius Logistics Solutions',
    industry: 'Logistics & Supply Chain',
    abbr: 'CLS',
  },

  // 07 — Real Estate & Infrastructure
  { id: 18, name: 'Shivalik Ventures', industry: 'Real Estate & Infrastructure', abbr: 'SV2' },
  { id: 19, name: 'Lumos Cowork', industry: 'Real Estate & Infrastructure', abbr: 'LC' },

  // 08 — Business Services & Consulting
  {
    id: 20,
    name: 'SCOT Integrated Facilities',
    industry: 'Business Services & Consulting',
    abbr: 'SIF',
  },
  {
    id: 21,
    name: 'Global Talent Acquisition Partners',
    industry: 'Business Services & Consulting',
    abbr: 'GTAP',
  },
  { id: 22, name: 'CATKing', industry: 'Business Services & Consulting', abbr: 'CK' },
  { id: 23, name: 'CITOC Ventures', industry: 'Business Services & Consulting', abbr: 'CV' },

  // Additional clients (not grouped in client's category list)
  { id: 24, name: 'B.S. Electrical', industry: 'Engineering, Energy & Utilities', abbr: 'BSE' },
  { id: 25, name: 'Asif Engineering', industry: 'Manufacturing & Industrial', abbr: 'AE' },
];
export const INDUSTRIES = [
  { name: 'Manufacturing & Industrial', icon: 'Factory', count: '5+ clients' },
  { name: 'Technology & IT Services', icon: 'Network', count: '3+ clients' },
  { name: 'Healthcare & Pharmaceuticals', icon: 'Heart', count: '4+ clients' },

  // FIX: Swapped 'Landmark' for 'Wallet' to feel much more like modern Fintech
  { name: 'Banking, Finance & Fintech', icon: 'Wallet', count: '2+ clients' },

  // FIX: Swapped 'Zap' for 'Settings' (Gears) to represent both Engineering & Utilities structurally
  { name: 'Engineering, Energy & Utilities', icon: 'Settings', count: '3+ clients' },

  { name: 'Logistics & Supply Chain', icon: 'Truck', count: '1+ clients' },
  { name: 'Real Estate & Infrastructure', icon: 'Building2', count: '2+ clients' },
  { name: 'Business Services & Consulting', icon: 'Briefcase', count: '4+ clients' },
];
export const CASE_STUDIES = [
  {
    id: 1,
    client: 'Innovate Financial Services',
    industry: 'BFSI',
    challenge:
      'Legacy infrastructure causing 4+ hours of downtime monthly, failing audit requirements.',
    solution:
      'Complete data center modernization with VMware virtualization, redundant network fabric, and 24×7 managed monitoring.',
    results: [
      '85% reduction in downtime',
      '30% infrastructure cost savings',
      'ISO 27001 compliance achieved',
      'RTO reduced to 2 hours',
    ],
    duration: '90 days',
    color: 'brand',
  },
  {
    id: 2,
    client: 'MedCore Diagnostics',
    industry: 'Healthcare',
    challenge:
      'Siloed clinical systems, slow application performance, and no disaster recovery plan.',
    solution:
      'Hybrid cloud migration to Azure with HIPAA-compliant architecture, high-availability SQL clusters, and automated backup.',
    results: [
      '40% performance improvement',
      'Zero data loss migration',
      'DR RTO of 4 hours',
      '₹18L annual savings',
    ],
    duration: '120 days',
    color: 'blue',
  },
  {
    id: 3,
    client: 'LogiSwift Logistics',
    industry: 'Logistics',
    challenge:
      'Active ransomware attack encrypting business-critical systems across 8 branch locations.',
    solution:
      'Emergency incident response, threat containment, forensic analysis, and full environment rebuild with hardened security baseline.',
    results: [
      '48hr full recovery',
      'Zero data ransom paid',
      'EDR deployed across all endpoints',
      'Security policy overhaul',
    ],
    duration: '48 hours critical / 30 days full hardening',
    color: 'red',
  },
];
