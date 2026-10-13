/**
 * On-page SEO for every route. Keywords from Google Ads Keyword Planner (India, English, 2026-10-13);
 * monthly volumes noted beside the primary terms. Local "Bangalore" phrases show little volume in
 * Planner but carry the strongest buying intent, so titles pair a national head term with the city.
 */

export const SITE_URL = 'https://www.eptalayers.com';
export const SITE_NAME = 'Epta Layers';
export const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;

export interface PageSeo {
  title: string;
  description: string;
  keywords: string[];
  /** keyword phrase shown as the small line inside each page's H1 */
  kicker?: string;
  /** breadcrumb trail label */
  crumb?: string;
  noindex?: boolean;
}

export const SEO: Record<string, PageSeo> = {
  '/': {
    // enterprise network solutions 210 · secure network solutions 320 · system integrator companies in bangalore 40
    title: 'IT Infrastructure & Network Solutions in Bangalore | Epta Layers',
    description:
      'Epta Layers is a single-point IT infrastructure partner in Bangalore: enterprise networks, security, collaboration, data centers and 24/7* NOC support.',
    keywords: [
      'IT infrastructure solutions Bangalore',
      'enterprise network solutions',
      'network solutions provider Bangalore',
      'system integrator companies in Bangalore',
      'managed IT services Bangalore',
    ],
  },
  '/solutions': {
    // enterprise networking 590 · data center solutions 2900
    title: 'Enterprise IT & Network Solutions | Epta Layers',
    description:
      'Seven solution areas from one partner: enterprise networking, security, collaboration, data center architecture and services, enterprise services and NOC.',
    keywords: ['enterprise IT solutions', 'enterprise networking', 'IT infrastructure services', 'network and security solutions'],
    kicker: 'Enterprise IT & Network Solutions',
    crumb: 'Solutions',
  },
  '/solutions/enterprise-network': {
    // sd wan 8100 · enterprise networking 590 · enterprise network solutions 210 · data center cabling 320
    title: 'Enterprise Network Solutions: SD-WAN, Wi-Fi | Epta Layers',
    description:
      'Routing and switching, enterprise Wi-Fi, SD-WAN, structured cabling and network management, designed, installed and supported by Epta Layers, Bangalore.',
    keywords: ['enterprise network solutions', 'SD-WAN solutions', 'enterprise Wi-Fi solutions', 'structured cabling Bangalore', 'routing and switching'],
    kicker: 'Enterprise Network Solutions',
    crumb: 'Enterprise Network',
  },
  '/solutions/security-architecture': {
    // managed network security 8100 · network security solutions 3600 · cloud security solutions 2900 · next generation firewall 2900 · sase solutions 320
    title: 'Network Security Solutions & Managed Security | Epta Layers',
    description:
      'Firewall, SASE, email, endpoint and cloud security from Epta Layers in Bangalore, designed as one architecture with 24/7* threat monitoring.',
    keywords: ['network security solutions', 'managed network security', 'cloud security solutions', 'next generation firewall', 'SASE solutions', 'email security', 'endpoint security'],
    kicker: 'Network Security Solutions',
    crumb: 'Security Architecture',
  },
  '/solutions/collaboration-architecture': {
    // ip phone system 2900 · video conferencing solutions 1300 · video conferencing system for conference room 480 · conference room solutions 390
    title: 'Video Conferencing & Conference Room Solutions | Epta Layers',
    description:
      'Cloud video meetings and calling, IP phone systems and fully fitted conference rooms for distributed teams, set up and supported by Epta Layers, Bangalore.',
    keywords: ['video conferencing solutions', 'conference room solutions', 'IP phone system', 'video conferencing system for conference room', 'cloud calling'],
    kicker: 'Video Conferencing & Collaboration Solutions',
    crumb: 'Collaboration Architecture',
  },
  '/solutions/data-center-architecture': {
    // web application firewall 12100 · data center solutions 2900 · data center infrastructure 1600 · storage area network solutions 110
    title: 'Data Center Solutions: SAN, SDN, ADC & WAF | Epta Layers',
    description:
      'Scalable, secure data center design by Epta Layers, Bangalore: SDN and fabric switching, SAN storage, load balancers (ADC) and web application firewalls.',
    keywords: ['data center solutions', 'data center infrastructure', 'web application firewall', 'storage area network solutions', 'load balancer', 'software defined networking'],
    kicker: 'Data Center Solutions',
    crumb: 'Data Center Architecture',
  },
  '/solutions/data-center-services': {
    // colocation data center 2400 · mpls network 2400 · datacenter backup 1900 · cloud disaster recovery 720
    title: 'Colocation, Cloud DR & MPLS Services | Epta Layers',
    description:
      'Colocation, cloud and disaster recovery, CDN, MPLS network and data resiliency services that keep your data available, from Epta Layers, Bangalore.',
    keywords: ['colocation data center', 'cloud disaster recovery', 'MPLS network', 'data center backup', 'CDN services', 'data resiliency'],
    kicker: 'Colocation, Cloud & Disaster Recovery Services',
    crumb: 'Data Center Services',
  },
  '/solutions/enterprise-services': {
    // software licensing 1600 · it amc services 110 · hardware refresh 20
    title: 'IT Hardware Refresh, Software Licensing & AMC | Epta Layers',
    description:
      'Hardware renewal and refresh cycles, software licensing, professional services, IT accessories and SLA-based support for enterprises, from Epta Layers.',
    keywords: ['software licensing', 'IT AMC services', 'hardware refresh', 'professional IT services', 'SLA based IT support'],
    kicker: 'IT Lifecycle & Enterprise Services',
    crumb: 'Enterprise Services',
  },
  '/solutions/network-operation-center': {
    // network monitoring 1600 · network operations center 1300 · noc services 260 · network monitoring services 210
    title: '24/7* NOC Services & Network Monitoring | Epta Layers',
    description:
      'Managed NOC services from Epta Layers: real-time network monitoring, KPI tracking, threat response and performance tuning, with clear reports.',
    keywords: ['NOC services', 'network operations center', 'network monitoring services', 'managed network monitoring', '24x7 network monitoring'],
    kicker: 'NOC Services & Network Monitoring',
    crumb: 'Network Operation Center',
  },
  '/case-studies': {
    title: 'IT Infrastructure Case Studies | Epta Layers',
    description:
      'How Epta Layers rebuilt networks, security and data centers for an IT/ITeS campus, a global engineering firm and a leading Indian manufacturer.',
    keywords: ['IT infrastructure case study', 'network transformation case study', 'enterprise network case study'],
    kicker: 'IT Infrastructure Case Studies',
    crumb: 'Case studies',
  },
  '/case-studies/it-ites': {
    title: 'Case Study: Network Rebuild for an IT/ITeS Campus | Epta Layers',
    description:
      'How Epta Layers fixed an unstable three-office network in Bangalore: 90–95% Wi-Fi accuracy for 1500+ employees, then expanded to more locations.',
    keywords: ['enterprise Wi-Fi case study', 'network audit', 'Fluke testing', 'campus network'],
    crumb: 'IT/ITeS',
  },
  '/case-studies/engineering': {
    title: 'Case Study: IT Overhaul for a Global Engineering Firm | Epta Layers',
    description:
      'A global engineering company in 40+ countries needed one IT partner. Epta Layers rebuilt its network, workstations and servers in three phases.',
    keywords: ['IT infrastructure overhaul', 'converged infrastructure', 'network security case study'],
    crumb: 'Engineering',
  },
  '/case-studies/manufacturing': {
    title: 'Case Study: Manufacturing IT Transformation | Epta Layers',
    description:
      'How Epta Layers strengthened security, data management and network services for a leading Indian manufacturer, leading to Phases 2 and 3.',
    keywords: ['manufacturing IT infrastructure', 'three-tier data center', 'SOC'],
    crumb: 'Manufacturing',
  },
  '/story': {
    // osi model 60500 · 7 layer of osi 8100
    title: 'About Epta Layers: Built on the 7 Layers of the OSI Model',
    description:
      'Epta means seven in Greek. Meet Epta Layers, a Bangalore IT infrastructure company that builds every solution around the 7 layers of the OSI model.',
    keywords: ['about Epta Layers', 'IT infrastructure company Bangalore', '7 layers of OSI model', 'OSI model'],
    kicker: 'About Epta Layers',
    crumb: 'Epta Layers story',
  },
  '/vision-mission': {
    title: 'Vision & Mission | Epta Layers',
    description:
      'Business continuity is at the core of Epta Layers. Our vision and mission as a single-point IT infrastructure partner for enterprises in India.',
    keywords: ['Epta Layers vision', 'business continuity', 'IT infrastructure partner'],
    kicker: 'Vision & Mission',
    crumb: 'Vision & mission',
  },
  '/careers': {
    // network engineer jobs bangalore 1000 · network engineer openings in bangalore 1000 · noc engineer jobs 480
    title: 'Network Engineer Jobs in Bangalore | Careers at Epta Layers',
    description:
      'Join Epta Layers in Bangalore. See current openings for network, security, NOC and data center engineers and apply online with your resume.',
    keywords: ['network engineer jobs Bangalore', 'network engineer openings in Bangalore', 'NOC engineer jobs', 'networking jobs Bangalore'],
    kicker: 'Careers at Epta Layers',
    crumb: 'Careers',
  },
  '/blog': {
    title: 'IT Infrastructure Blog: Networks & Security | Epta Layers',
    description:
      'Practical articles on enterprise networking, SD-WAN, security, collaboration and data centers from the Epta Layers team in Bangalore.',
    keywords: ['IT infrastructure blog', 'enterprise networking blog', 'SD-WAN vs MPLS', 'network security'],
    kicker: 'Epta Layers Insights',
    crumb: 'Insights',
  },
  '/contact': {
    title: 'Contact Epta Layers | IT Infrastructure Company, Bangalore',
    description:
      'Talk to Epta Layers in Bangalore about your network, security, collaboration or data center needs. Call +91 98867 13131 or send us a message.',
    keywords: ['contact Epta Layers', 'IT infrastructure company Bangalore', 'network solutions enquiry'],
    kicker: 'Contact Epta Layers',
    crumb: 'Contact',
  },
  '/privacy': {
    title: 'Privacy Policy | Epta Layers',
    description: 'How Epta Layers collects, uses and protects personal information when you use www.eptalayers.com.',
    keywords: [],
    crumb: 'Privacy policy',
  },
  '/terms': {
    title: 'Terms & Conditions | Epta Layers',
    description: 'The terms and conditions for using the Epta Layers website, www.eptalayers.com.',
    keywords: [],
    crumb: 'Terms & conditions',
  },
};

/** Paths kept for internal review only. */
export const NOINDEX_PATHS = ['/home-a', '/home-b', '/home-c'];

export const NOT_FOUND_SEO: PageSeo = {
  title: 'Page Not Found | Epta Layers',
  description: 'This page does not exist. Explore Epta Layers solutions, case studies or contact our team in Bangalore.',
  keywords: [],
  noindex: true,
};
