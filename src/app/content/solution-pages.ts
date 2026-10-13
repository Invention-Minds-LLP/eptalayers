/**
 * The seven solution pages. Facts from the client's content file (sections 6–12), rewritten in plain
 * language at the client's request (2026-10-13): one idea per sentence, jargon explained, no repeated
 * boilerplate between pages. "24/7*" carries the footnote in TWENTY_FOUR_SEVEN_NOTE.
 */

export type Visual = 'rack' | 'shield' | 'meeting' | 'pillars' | 'cloud' | 'lifecycle' | 'noc';

export interface SolutionItem {
  name: string;
  text: string;
}

export interface SolutionGroup {
  heading: string;
  lede?: string;
  items: SolutionItem[];
}

export interface SolutionPage {
  slug: string;
  name: string;
  title: string;
  subtitle: string;
  photo: string;
  /** describes the hero photograph for screen readers and image search */
  alt: string;
  visual: Visual;
  intro: string[];
  offerings: SolutionGroup;
  /** Enterprise Network only: the OSI-aligned approach */
  osi?: { heading: string; lede: string; layers: { n: string; name: string; text: string }[] };
  /** Enterprise Services only: the portfolio at a glance */
  table?: { head: string; rows: string[] }[];
  more: SolutionGroup[];
  quote?: { text: string; by: string };
  caseLink?: { heading: string; text: string; slug: string; title: string };
  closing: { heading: string; text: string; cta: string; service: string };
}

/** Shown wherever 24/7 appears with an asterisk. */
export const TWENTY_FOUR_SEVEN_NOTE =
  '*24/7 coverage is provided based on your requirement and the service agreement (SLA) we sign with you.';

const OEM: SolutionItem = {
  name: 'Backed by world-leading OEMs',
  text: 'We work as an extended arm of the brands we implement. You get certified installation and long-term support from one team.',
};
const LAER: SolutionItem = {
  name: 'The LAER model',
  text: 'Land, Adopt, Expand, Renew. We track clear goals at each step, so your investment keeps paying off long after go-live.',
};

export const SOLUTION_PAGES: SolutionPage[] = [
  {
    slug: 'enterprise-network',
    name: 'Enterprise Network',
    title: 'Enterprise Networks That Keep Every Team Connected',
    subtitle: 'Fast, reliable wired and wireless networks for offices, campuses and branches.',
    photo: 'photos/l2-switch.webp',
    alt: 'Network switch with patch cables in an enterprise server rack',
    visual: 'rack',
    intro: [
      'Your network carries every call, file and application your business uses. When it slows down or drops, work stops.',
      'Epta Layers designs, supplies, installs and supports enterprise networks built around how your business actually works. We start with the cabling and build up layer by layer, so every part is tested and nothing is left to chance.',
    ],
    offerings: {
      heading: 'What We Deliver',
      items: [
        { name: 'Routing & Switching', text: 'The core equipment that moves data around your organisation quickly and reliably.' },
        { name: 'Wi-Fi & SD-WAN', text: 'Secure wireless inside the office, and SD-WAN to link branches and remote teams over the internet as one network.' },
        { name: 'Network Management', text: 'One clear view of your whole network, so you can see, control and fix issues from a single place.' },
      ],
    },
    osi: {
      heading: 'How We Build It, Layer by Layer',
      lede: 'Networks are built in layers, a model called OSI. We make sure each layer is right before moving to the next:',
      layers: [
        { n: '1', name: 'Physical', text: 'Cabling that is installed properly and tested, the foundation for everything else.' },
        { n: '2', name: 'Data Link', text: 'Every device connects to the network securely.' },
        { n: '3', name: 'Network', text: 'Traffic takes the best route to where it needs to go.' },
        { n: '4', name: 'Transport', text: 'Data arrives complete and in order, every time.' },
        { n: '5–7', name: 'Application', text: 'Your business applications run fast for every user.' },
      ],
    },
    more: [
      {
        heading: 'Why Businesses Choose Epta Layers',
        items: [
          { name: 'One partner from design to support', text: 'We plan the network, supply the hardware, install it and support it afterwards. You deal with one team, not five vendors.' },
          LAER,
          OEM,
        ],
      },
    ],
    closing: {
      heading: 'Let’s plan your network',
      text: 'Tell us about your sites and users. An Epta Layers engineer will suggest the right next step.',
      cta: 'Talk to a Network Expert',
      service: 'Enterprise Network',
    },
  },
  {
    slug: 'security-architecture',
    name: 'Security Architecture',
    title: 'Security Built Into Every Layer of Your Network',
    subtitle: 'Protection for your network, email, devices and cloud, designed in from the start.',
    photo: 'photos/l6-code.webp',
    alt: 'Security engineer reviewing code and network activity on screens',
    visual: 'shield',
    intro: [
      'Most security problems start where protection was added as an afterthought. We design security into every layer of your IT setup instead, from the network edge to the cloud.',
      'Whether your teams work in the office, at home or in the cloud, Epta Layers keeps your data and systems protected, and helps you stay compliant.',
    ],
    offerings: {
      heading: 'Three Lines of Protection',
      items: [
        { name: 'Perimeter Defense', text: 'Firewalls, network security and SASE (secure access for users anywhere) guard the edges of your network.' },
        { name: 'Data Protection', text: 'Email security and endpoint security protect your information on every laptop, phone and inbox.' },
        { name: 'Infrastructure Guard', text: 'Public and private cloud security keeps your systems safe, whether they run on-site or in the cloud.' },
      ],
    },
    more: [
      {
        heading: 'What It Means for Your Business',
        items: [
          { name: '24/7* threat monitoring', text: 'Our Network Operation Center watches for threats around the clock and acts quickly when something looks wrong.' },
          { name: 'Designed for compliance', text: 'We design to regulatory requirements and industry best practice, so audits are easier.' },
          { name: 'OEM-certified implementation', text: 'Security products are installed to the manufacturer’s standards, with long-term support from us.' },
        ],
      },
    ],
    caseLink: {
      heading: 'See It in Action',
      text: 'A global engineering company needed one partner to secure and rebuild its IT. See how Epta Layers did it, phase by phase.',
      slug: 'engineering',
      title: 'From Complexity to Clarity',
    },
    closing: {
      heading: 'How secure is your network today?',
      text: 'Request a security assessment and our experts will show you where you stand and what to fix first.',
      cta: 'Request a Security Assessment',
      service: 'Security',
    },
  },
  {
    slug: 'collaboration-architecture',
    name: 'Collaboration Architecture',
    title: 'Meetings and Calls That Just Work',
    subtitle: 'Video meetings, calling and conference rooms for teams in any location.',
    photo: 'photos/l5-call.webp',
    alt: 'Team on a video call in a conference room',
    visual: 'meeting',
    intro: [
      'When teams are spread across offices and homes, a dropped call or a meeting room that will not connect costs time every day.',
      'Epta Layers sets up the meeting tools, phones and rooms your people need, and makes sure they work smoothly with the systems you already have.',
    ],
    offerings: {
      heading: 'What We Set Up',
      items: [
        { name: 'Meeting Solutions', text: 'Cloud video and audio meetings, plus cloud calling, so anyone can join from anywhere.' },
        { name: 'Voice Equipment', text: 'IP phones, headsets, speakerphones and conference phones that sound clear and are easy to use.' },
        { name: 'Meeting Rooms', text: 'Conference rooms fitted with the right cameras, screens and audio, ready at the press of a button.' },
      ],
    },
    more: [
      {
        heading: 'Why Epta Layers',
        items: [
          { name: 'Not tied to one brand', text: 'We recommend what fits your needs, not what one vendor sells.' },
          { name: 'Built for continuity', text: 'Your meetings and calls keep working, even when things go wrong elsewhere.' },
          { name: 'Support included', text: 'We stay with you after setup, so your teams are never left on their own.' },
          OEM,
          LAER,
        ],
      },
    ],
    closing: {
      heading: 'Make every meeting easier',
      text: 'Tell us how your teams meet today, and we will show you a simpler setup.',
      cta: 'Explore Collaboration Solutions',
      service: 'Collaboration',
    },
  },
  {
    slug: 'data-center-architecture',
    name: 'Data Center Architecture',
    title: 'Data Centers Built to Grow With You',
    subtitle: 'Scalable, secure data center design for today’s load and tomorrow’s growth.',
    photo: 'photos/noc-racks.webp',
    alt: 'Rows of server racks in a data center',
    visual: 'pillars',
    intro: [
      'Your data center runs the applications and stores the data your business depends on. It has to be fast, secure and ready to grow.',
      'Epta Layers designs data centers around your current needs and your plans for the future. We also supply the hardware, install it and support it.',
    ],
    offerings: {
      heading: 'The Four Building Blocks',
      items: [
        { name: 'Software-Defined Networking (SDN)', text: 'Network control through software, so changes are quick and flexible.' },
        { name: 'Storage Area Network (SAN)', text: 'Fast, reliable storage that grows as your data grows.' },
        { name: 'Application Delivery Controllers (ADC)', text: 'Spread traffic across servers, so applications stay fast and available.' },
        { name: 'Web Application Firewalls (WAF)', text: 'Protect your websites and web applications from attacks.' },
      ],
    },
    more: [
      {
        heading: 'What You Gain',
        items: [
          { name: 'High-speed fabric switching', text: 'Fast, efficient connections between every server in the data center.' },
          { name: 'Cloud and disaster recovery', text: 'Your data center links to the cloud and can recover quickly if something fails.' },
          { name: 'Leading OEM partners', text: 'Equipment from world-leading brands, installed and supported by us.' },
          { name: 'Related services', text: 'We also offer colocation, CDN and MPLS. See Data Center Services.' },
        ],
      },
      {
        heading: 'Why Epta Layers',
        items: [
          LAER,
          { name: 'Business continuity first', text: 'Everything we design aims for one result: your operations never stop.' },
        ],
      },
    ],
    closing: {
      heading: 'Planning a new or upgraded data center?',
      text: 'Share your plans and an Epta Layers engineer will help you shape the right design.',
      cta: 'Discuss Data Center Needs',
      service: 'Data Center',
    },
  },
  {
    slug: 'data-center-services',
    name: 'Data Center Services',
    title: 'Keep Your Data Safe, Available and Connected',
    subtitle: 'Colocation, cloud, disaster recovery and connectivity services in one place.',
    photo: 'photos/travel-fibre.webp',
    alt: 'Fibre optic cables carrying light between data centers',
    visual: 'cloud',
    intro: [
      'Your critical data must always be available, even if a site fails. Epta Layers provides the services that keep it hosted, backed up, connected and protected.',
    ],
    offerings: {
      heading: 'Our Data Center Services',
      items: [
        { name: 'Colocation & Remote Services', text: 'Host your servers in a secure facility, managed remotely when you need it.' },
        { name: 'Cloud & Disaster Recovery', text: 'Cloud hosting plus a recovery plan, so your systems come back quickly after an outage.' },
        { name: 'CDN & MPLS', text: 'Faster content delivery to users, and private, reliable links between your sites.' },
        { name: 'Network Security Services', text: 'Protection for the traffic moving in and out of your data center.' },
        { name: 'Data Resiliency', text: 'Backup and replication that keep your critical information safe and available.' },
      ],
    },
    more: [
      {
        heading: 'Why Epta Layers',
        items: [
          OEM,
          LAER,
          { name: 'Business continuity first', text: 'We plan for failure, so your business does not feel it.' },
        ],
      },
    ],
    closing: {
      heading: 'Is your data ready for a bad day?',
      text: 'Talk to us about colocation, cloud and disaster recovery that fits your business.',
      cta: 'Discuss Data Center Needs',
      service: 'Data Center',
    },
  },
  {
    slug: 'enterprise-services',
    name: 'Enterprise Services',
    title: 'Your Technology Lifecycle, Handled',
    subtitle: 'Hardware renewal, software licensing and expert support, all from one partner.',
    photo: 'photos/l1-cable.webp',
    alt: 'Structured network cabling in a patch panel',
    visual: 'lifecycle',
    intro: [
      'Hardware ages, licences expire and projects need extra hands. Epta Layers looks after the full life of your technology, so your IT stays current without the admin.',
    ],
    offerings: {
      heading: 'What We Take Care Of',
      items: [
        { name: 'Hardware Renewal', text: 'OEM-certified hardware and planned refresh cycles, so your equipment never falls behind.' },
        { name: 'Software Licensing', text: 'We manage subscriptions and licences, so you only pay for what you use.' },
        { name: 'Professional Services', text: 'Architecture advice and hands-on implementation support for complex projects.' },
      ],
    },
    table: [
      { head: 'Hardware Renewal', rows: ['OEM-certified', 'Refresh cycles'] },
      { head: 'Software Licensing', rows: ['Subscription management', 'License optimization'] },
      { head: 'Professional Services', rows: ['Architecture consulting', 'Implementation support'] },
    ],
    more: [
      {
        heading: 'Also Available',
        items: [
          { name: 'IT accessories', text: 'Everything from cables to peripherals, supplied end to end.' },
          { name: 'Data resiliency', text: 'Services that keep your critical information protected and recoverable.' },
          { name: 'Custom SLA support', text: 'Support levels agreed with you and written into your service agreement.' },
        ],
      },
      {
        heading: 'Why Epta Layers',
        items: [
          OEM,
          LAER,
          { name: 'Business continuity first', text: 'Every service is planned so your operations keep running. We aim to be your most reliable technology partner.' },
        ],
      },
    ],
    closing: {
      heading: 'Simplify your IT lifecycle',
      text: 'Ask us about a service agreement that covers your hardware, licences and support.',
      cta: 'Explore Service Agreements',
      service: 'General',
    },
  },
  {
    slug: 'network-operation-center',
    name: 'Network Operation Center',
    title: 'Your 24/7* Network Watch',
    subtitle: 'We monitor your network around the clock and fix issues before they reach your users.',
    photo: 'photos/noc-room.webp',
    alt: 'Network Operation Center with monitoring screens',
    visual: 'noc',
    intro: [
      'Problems rarely wait for office hours. The Epta Layers Network Operation Center (NOC) keeps watch over your IT environment day and night.',
      'We spot issues early, act on them fast and keep you informed, so your business keeps running.',
    ],
    offerings: {
      heading: 'What the NOC Does for You',
      items: [
        { name: 'Real-time Monitoring', text: 'We watch your network continuously.' },
        { name: 'KPI Tracking', text: 'We measure the health and performance of your network against clear goals.' },
        { name: 'Threat Response', text: 'We find security threats quickly and stop them.' },
        { name: 'Performance Optimization', text: 'We keep fine-tuning, so your network stays fast and reliable.' },
      ],
    },
    more: [
      {
        heading: 'How We Keep You Running',
        lede: 'Catching problems early means most of them never affect your operations.',
        items: [
          { name: 'Driven by the LAER model', text: 'Land, Adopt, Expand, Renew: a cycle of tracking and improving your network over time.' },
          { name: 'Business continuity assurance', text: 'Our goal is simple: your business operations never see a stop sign.' },
          { name: 'Custom reporting dashboards', text: 'Clear reports on how your network is performing, so you can make decisions with real data.' },
        ],
      },
    ],
    quote: { text: 'Epta’s NOC became our first line of defense against downtime.', by: 'IT/ITeS Client' },
    closing: {
      heading: 'Want expert eyes on your network?',
      text: 'Send a NOC service inquiry and we will explain how monitoring would work for your setup.',
      cta: 'Send a NOC Service Inquiry',
      service: 'NOC',
    },
  },
];

/** Solutions overview: each offering's line and its call to action. */
export const SOLUTION_OVERVIEW: Record<string, { line: string; text: string; cta: string }> = {
  'enterprise-network': {
    line: 'Fast, reliable networks for every office and branch.',
    text: 'Routing and switching, Wi-Fi, SD-WAN and network management, designed around how your business works.',
    cta: 'Explore Enterprise Network',
  },
  'security-architecture': {
    line: 'Security built into every layer.',
    text: 'Protection for your network edge, email, devices and cloud, with 24/7* threat monitoring and compliance-ready design.',
    cta: 'Discover Security Architecture',
  },
  'collaboration-architecture': {
    line: 'Meetings and calls that just work.',
    text: 'Cloud meetings and calling, IP phones, conference systems and fully fitted meeting rooms.',
    cta: 'Learn More About Collaboration',
  },
  'data-center-architecture': {
    line: 'Data centers built to grow with you.',
    text: 'Scalable, secure designs using SDN, SAN storage, application delivery controllers and web application firewalls.',
    cta: 'Explore Data Center Architecture',
  },
  'data-center-services': {
    line: 'Your data, always available.',
    text: 'Colocation, cloud and disaster recovery, CDN, MPLS, network security and data resiliency services.',
    cta: 'View Data Center Services',
  },
  'enterprise-services': {
    line: 'Your technology lifecycle, handled.',
    text: 'Hardware renewal, software licensing and professional services from one partner.',
    cta: 'Discover Enterprise Services',
  },
  'network-operation-center': {
    line: 'Your network, watched 24/7*.',
    text: 'Real-time monitoring, KPI tracking, threat response and performance tuning, with clear reports.',
    cta: 'Send a NOC Service Inquiry',
  },
};
