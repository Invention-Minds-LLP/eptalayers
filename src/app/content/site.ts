export type Layer = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface OsiLayer {
  n: Layer;
  name: string;
  verify: string;
  covered: string;
  slug: string;
}

export interface Solution {
  code: string;
  slug: string;
  name: string;
  line: string;
  offerings: string[];
  layers: Layer[];
  cta: string;
}

export interface CaseStudy {
  id: string;
  slug: string;
  sector: string;
  title: string;
  client: string;
  challenge: string;
  results: { measure: string; value: string }[];
}

export const CONTACT = {
  phoneDisplay: '+91 98867 13131',
  phoneHref: 'tel:+919886713131',
  info: 'info@eptalayers.com',
  hr: 'hr@eptalayers.com',
  caseStudies: 'santhosh.baragur@eptalayers.com',
  offices: [
    {
      name: 'Bangalore HQ',
      note: 'Registered office',
      lines: ['#47, 9th Cross, 5th Main', 'Srinidhi Layout', 'Bangalore 560062'],
    },
    {
      name: 'Jayanagar Branch',
      note: 'Next to Adishwar Electro World',
      lines: ['1st Floor, No 427/14-1, 9th Main Road', '5th Block, Jayanagar', 'Bangalore 560041'],
    },
  ],
};

/** Ordered top of stack to bottom, as the model is drawn. */
export const OSI: OsiLayer[] = [
  {
    n: 7,
    name: 'Application',
    verify: 'Your critical business applications stay fast and available',
    covered: 'ADC · WAF',
    slug: 'data-center-architecture',
  },
  {
    n: 6,
    name: 'Presentation',
    verify: 'Data is protected wherever it is handled',
    covered: 'Email & endpoint security',
    slug: 'security-architecture',
  },
  {
    n: 5,
    name: 'Session',
    verify: 'Calls and meetings hold for distributed teams',
    covered: 'Cloud meeting & calling',
    slug: 'collaboration-architecture',
  },
  {
    n: 4,
    name: 'Transport',
    verify: 'Data is delivered reliably across your network',
    covered: 'SD-WAN',
    slug: 'enterprise-network',
  },
  {
    n: 3,
    name: 'Network',
    verify: 'Traffic is routed intelligently to its destination',
    covered: 'Routing',
    slug: 'enterprise-network',
  },
  {
    n: 2,
    name: 'Data Link',
    verify: 'Every device connects securely within your network',
    covered: 'Switching · Wi-Fi',
    slug: 'enterprise-network',
  },
  {
    n: 1,
    name: 'Physical',
    verify: 'The infrastructure foundation is robust',
    covered: 'Cabling · Fluke testing',
    slug: 'enterprise-network',
  },
];

export const SOLUTIONS: Solution[] = [
  {
    code: 'EN',
    slug: 'enterprise-network',
    name: 'Enterprise Network',
    line: 'Connected enterprises designed for seamless collaboration',
    offerings: ['Routing & Switching', 'Wi-Fi & SD-WAN', 'Information Management'],
    layers: [1, 2, 3, 4],
    cta: 'Explore Enterprise Network',
  },
  {
    code: 'SA',
    slug: 'security-architecture',
    name: 'Security Architecture',
    line: 'Security embedded in every layer, for hybrid environments',
    offerings: ['Network Security & SASE', 'Email & Endpoint Security', 'Public/Private Cloud Security'],
    layers: [1, 2, 3, 4, 5, 6, 7],
    cta: 'Discover Security Architecture',
  },
  {
    code: 'CA',
    slug: 'collaboration-architecture',
    name: 'Collaboration Architecture',
    line: 'Unified communication for distributed teams',
    offerings: ['Cloud meeting & calling', 'IP phones & conference systems', 'Conference room solutions'],
    layers: [5, 6, 7],
    cta: 'Learn more about Collaboration',
  },
  {
    code: 'DA',
    slug: 'data-center-architecture',
    name: 'Data Center Architecture',
    line: 'Scalable, secure and intelligent data center foundations',
    offerings: ['SDN', 'SAN', 'ADC', 'WAF'],
    layers: [2, 3, 4, 7],
    cta: 'Explore Data Center Architecture',
  },
  {
    code: 'DS',
    slug: 'data-center-services',
    name: 'Data Center Services',
    line: 'Comprehensive services for future-ready enterprises',
    offerings: ['Colocation & remote services', 'Cloud & DR', 'CDN & MPLS', 'Data resiliency'],
    layers: [1, 3, 7],
    cta: 'View Data Center Services',
  },
  {
    code: 'ES',
    slug: 'enterprise-services',
    name: 'Enterprise Services',
    line: 'Your end-to-end technology lifecycle partner',
    offerings: ['Hardware renewal', 'Software licensing', 'Professional services'],
    layers: [1, 7],
    cta: 'Discover Enterprise Services',
  },
  {
    code: 'NOC',
    slug: 'network-operation-center',
    name: 'Network Operation Center',
    line: 'Proactive monitoring and 24x7 incident resolution',
    offerings: ['Real-time monitoring', 'KPI tracking', 'Threat response', 'Performance optimisation'],
    layers: [1, 2, 3, 4, 5, 6, 7],
    cta: 'Send a NOC service inquiry',
  },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'CS-01',
    slug: 'it-ites',
    sector: 'IT / ITeS',
    title: 'From network chaos to IT harmony',
    client: 'A leading American IT/ITeS corporation — Bangalore campus',
    challenge:
      'Three offices on an old, inefficient network: frequent packet loss, instability and a drop in employee productivity.',
    results: [
      { measure: 'Wi-Fi connectivity accuracy after implementation', value: '90–95%' },
      { measure: 'Employees on the rebuilt network', value: '1,500+' },
      { measure: 'Method', value: 'Fluke testing · network audit · floor-plan analysis' },
      { measure: 'Outcome', value: 'Epta extended to more locations' },
    ],
  },
  {
    id: 'CS-02',
    slug: 'engineering',
    sector: 'Engineering',
    title: 'From complexity to clarity',
    client: 'A global engineering company operating in 40+ countries',
    challenge:
      'A multi-IT architecture holding back green projects — renewables, e-mobility and SCADA for gas pipelines — and no single partner to fix it.',
    results: [
      { measure: 'Phases delivered', value: 'Network · workstations · servers' },
      { measure: 'Infrastructure', value: 'Converged, scalable, built for zero downtime' },
      { measure: 'Workstations', value: 'Multi Full-HD displays over KVM' },
      { measure: 'Outcome', value: "Epta's approach adopted on other client projects" },
    ],
  },
  {
    id: 'CS-03',
    slug: 'manufacturing',
    sector: 'Manufacturing',
    title: 'From latency to efficiency',
    client: 'A leading Indian doors, windows & facade manufacturer — Bangalore, Hosur, Anekal, Mumbai',
    challenge:
      'A reactive IT setup with packet loss, security gaps and multiple fragmented OEMs, unable to support a new German acquisition.',
    results: [
      { measure: 'Security', value: 'Gateway, email & endpoint protection plus SOC' },
      { measure: 'Data center', value: 'Three-tier design, asset & patch management' },
      { measure: 'Network', value: 'Standardised across sites, vendors consolidated' },
      { measure: 'Outcome', value: 'Phases 2 and 3 greenlit' },
    ],
  },
];

export const NAV = [
  { label: 'Solutions', path: '/solutions' },
  { label: 'Case studies', path: '/case-studies' },
  { label: 'Epta story', path: '/story' },
  { label: 'Careers', path: '/careers' },
  { label: 'Insights', path: '/blog' },
];
