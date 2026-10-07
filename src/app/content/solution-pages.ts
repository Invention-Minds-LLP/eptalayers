/**
 * The seven solution pages, worded from the client's content file (sections 6–12).
 * Data Center Services has no page of its own in the content; its page is built from the
 * Solutions overview paragraph and the offerings listed there.
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

const LAER: SolutionItem = {
  name: 'LAER Model',
  text: 'We utilize the LAER model (Land-Adopt-Expand-Renew) as a framework for customer success, enabling us to track KPIs for implementing, training, and maximizing the value of your investments.',
};
const OEM: SolutionItem = {
  name: 'Extended Arm of OEMs',
  text: 'Epta works as an extended arm of world-leading OEMs, specializing in implementing their unique solutions and offering long-term support.',
};

export const SOLUTION_PAGES: SolutionPage[] = [
  {
    slug: 'enterprise-network',
    name: 'Enterprise Network',
    title: 'Connected Enterprises Designed for Seamless Collaboration',
    subtitle: 'Future-ready networking solutions rooted in OSI fundamentals.',
    photo: 'photos/l2-switch.webp',
    visual: 'rack',
    intro: [
      'Epta specializes in providing future-ready networking solutions rooted in OSI fundamentals. Our approach is deeply informed by the 7 layers of the OSI model, which is central to Epta’s vision and service framework. By focusing on these foundational layers, we are able to understand your specific needs based on your line of business before designing a customized networking solution. Our goal is to address your problem areas without losing sight of your business KPIs.',
      'Epta assists in visualizing and communicating how IT Networks operate, with a keen focus on network architecture. We work as a single-point enterprise solutions provider with IT world leaders to deliver tailor-made solutions that ensure business continuity. Beyond design, we also assist in hardware supply, implementation, and post-implementation support.',
    ],
    offerings: {
      heading: 'Core Offerings for Your Enterprise Network',
      items: [
        { name: 'Routing & Switching', text: 'We optimize your data flow infrastructure to ensure efficient and reliable communication across your organization.' },
        { name: 'Wi-Fi & SD-WAN', text: 'Our solutions provide secure connectivity across distributed operations, enabling seamless collaboration whether your teams are in the office or remote.' },
        { name: 'Information Management', text: 'Achieve unified network visibility and control through robust information management system capabilities. This empowers you to monitor, manage, and optimize your entire network ecosystem.' },
      ],
    },
    osi: {
      heading: 'Our OSI-Aligned Approach',
      lede: 'We design enterprise network services that precisely align with your business layer requirements. Our detailed understanding of each layer ensures a comprehensive and effective solution:',
      layers: [
        { n: '1', name: 'Physical', text: 'We establish a robust infrastructure foundation.' },
        { n: '2', name: 'Data Link', text: 'We ensure secure device connectivity within your network.' },
        { n: '3', name: 'Network', text: 'Our designs facilitate intelligent traffic routing, ensuring data reaches its destination efficiently.' },
        { n: '4', name: 'Transport', text: 'We focus on reliable data delivery across your network.' },
        { n: '5–7', name: 'Application', text: 'We optimize performance for your critical business applications.' },
      ],
    },
    more: [
      {
        heading: 'Why Choose Epta for Your Enterprise Network?',
        lede: 'Epta’s unique strength lies in our LAER model (Land-Adopt-Expand-Renew), which serves as a framework for customer success. This framework ensures that we Land, Adopt, Expand, and Renew your network to continuously match your evolving business KPIs. As an extended arm of world-leading OEMs, we specialize in implementing their unique solutions and offering long-term support. Our dedication is to provide the best IT infrastructure solutions and help our customers improve their business continuity.',
        items: [],
      },
    ],
    closing: {
      heading: 'Build a connected future together',
      text: 'Contact Epta Experts today to discuss your enterprise network needs and build a connected future together.',
      cta: 'Contact Epta Experts',
      service: 'Enterprise Network',
    },
  },
  {
    slug: 'security-architecture',
    name: 'Security Architecture',
    title: 'Security Embedded in Every Layer',
    subtitle: 'Multi-dimensional protection for hybrid environments',
    photo: 'photos/l6-code.webp',
    visual: 'shield',
    intro: [
      'At Epta Layers, our core vision is to focus on the 7 layers of networking in the OSI model. This foundational understanding allows us to design and deliver tailor-made security solutions that are not merely add-ons but are embedded in every layer of your IT infrastructure.',
      'As a single-point enterprise solutions provider, Epta partners with IT world leaders to address your unique problem areas without losing sight of your business KPIs. We aim to provide the best IT infrastructure solutions and help our customers improve their business continuity.',
      'Our comprehensive approach to security architecture ensures robust, multi-dimensional protection for hybrid environments, covering everything from initial design to post-implementation support.',
    ],
    offerings: {
      heading: 'Deep Dive Solutions for Robust Protection',
      lede: 'Our deep dive solutions are crafted to provide holistic protection across your digital landscape:',
      items: [
        { name: 'Perimeter Defense', text: 'We secure your network’s boundaries through robust Network Security and cutting-edge SASE Implementation, safeguarding your connections and access points.' },
        { name: 'Data Protection', text: 'Critical information is safeguarded with our Email Security and Endpoint Security solutions, protecting against evolving threats at every touchpoint.' },
        { name: 'Infrastructure Guard', text: 'We secure your cloud assets with Public/Private Cloud Security, ensuring the integrity and availability of your infrastructure whether on-premises or in the cloud.' },
      ],
    },
    more: [
      {
        heading: 'Delivering Tangible Business Impact',
        lede: 'Epta Layer’s security architecture is designed to deliver clear business impact by enhancing your organization’s resilience and operational continuity.',
        items: [
          { name: '24/7 Threat Monitoring', text: 'Through our Network Operation Center (NOC), we provide constant vigilance, offering 24/7 threat monitoring and proactive incident resolution. The NOC’s capabilities include real-time monitoring, KPI tracking, threat response, and performance optimization, ensuring your network is always guarded.' },
          { name: 'Compliance-Aligned Architecture Design', text: 'Our experts design solutions that meet regulatory requirements, ensuring your architecture is compliance-aligned and adheres to industry best practices.' },
          { name: 'OEM-Certified Security Implementations', text: 'As an extended arm of world-leading OEMs, we specialize in implementing their unique solutions with OEM-certified security implementations, ensuring best practices and long-term support.' },
        ],
      },
    ],
    caseLink: {
      heading: 'Case in Point: Transforming Security for Enterprises',
      text: 'Discover how we’ve helped other enterprises strengthen their security posture. Read how Epta Layers helped revolutionize the IT infrastructure architecture of a global engineering company, enhancing project efficiency and scalability through tailored solutions in IT infrastructure.',
      slug: 'engineering',
      title: 'From Complexity to Clarity: Epta’s IT Transformation for Engineering Excellence',
    },
    closing: {
      heading: 'Secure Your Future with Epta Layers',
      text: 'Looking to fortify your defenses and ensure your IT infrastructure services are impenetrable? Request a Security Assessment with our experts today.',
      cta: 'Request a Security Assessment',
      service: 'Security',
    },
  },
  {
    slug: 'collaboration-architecture',
    name: 'Collaboration Architecture',
    title: 'Seamless and Connected Network Ecosystems',
    subtitle: 'Unified communication solutions for distributed teams',
    photo: 'photos/l5-call.webp',
    visual: 'meeting',
    intro: [
      'At Epta Layers, our core vision is to focus on the 7 layers of networking in the OSI model. This foundational understanding allows us to design and deliver tailor-made solutions that integrate deeply with your existing systems, ensuring a seamless and connected network ecosystem for your organization.',
      'As a single-point enterprise solutions provider, Epta works with IT world leaders to understand your specific needs based on your line of business, focusing on problem areas without losing sight of your business KPIs.',
      'Our collaboration architecture services are designed to provide unified communication solutions for distributed teams, enhancing productivity and connectivity. Beyond design, we also assist in hardware supply, implementation, and post-implementation support.',
    ],
    offerings: {
      heading: 'Comprehensive Collaboration Solution Stack',
      lede: 'Our solution stack is built to empower your teams with advanced communication and collaboration tools:',
      items: [
        { name: 'Meeting Solutions', text: 'We provide cloud-based video & audio meeting solutions, including various Cloud Meeting Solutions and Cloud Meeting and Calling Solutions.' },
        { name: 'Voice Infrastructure', text: 'This includes robust IP Phones & Conference Systems, encompassing IP Phones, Headsets, Speaker Phones, and Conference Phones.' },
        { name: 'Room Integration', text: 'We specialize in custom conference room tech, offering comprehensive Conference Room Solutions to create highly functional and interactive meeting spaces.' },
      ],
    },
    more: [
      {
        heading: 'The Epta Layers Advantage',
        lede: 'Choosing Epta Layers for your collaboration needs offers distinct benefits:',
        items: [
          { name: 'Vendor-Agnostic Architecture Design', text: 'Our approach ensures that your collaboration solution is designed based on your specific needs, not limited by a single vendor.' },
          { name: 'Business Continuity-Focused Deployment', text: 'We prioritize solutions that ensure your business continuity, meaning your operations remain uninterrupted even in challenging circumstances.' },
          { name: 'Post-Implementation Support Included', text: 'Our commitment extends beyond deployment, with comprehensive post-implementation support to ensure long-term success.' },
          OEM,
          { name: 'LAER Model', text: 'We utilize the LAER model (Land-Adopt-Expand-Renew) as a framework for customer success, ensuring that your collaboration solutions evolve with your business KPIs and maximize your investments.' },
        ],
      },
    ],
    closing: {
      heading: 'Build a connected future together',
      text: 'Explore Collaboration Solutions with Epta Layers today and build a connected future together.',
      cta: 'Explore Collaboration Solutions',
      service: 'Collaboration',
    },
  },
  {
    slug: 'data-center-architecture',
    name: 'Data Center Architecture',
    title: 'Next-Gen Data Center with Future-Proof Foundations',
    subtitle: 'Scalable, secure, and intelligent infrastructure',
    photo: 'photos/noc-racks.webp',
    visual: 'pillars',
    intro: [
      'At Epta Layers, our core vision is rooted in the 7 layers of networking in the OSI model, allowing us to deliver tailor-made solutions that seamlessly integrate into your existing IT networks. As a single-point enterprise solutions provider, Epta partners with IT world leaders to address your unique problem areas without losing sight of your business KPIs. Our approach to Data Center Architecture focuses on designing next-gen data centers with future-proof foundations, ensuring a scalable, secure, and intelligent infrastructure.',
      'Epta assists in visualizing and communicating how IT networks operate, with a keen focus on network architecture. We understand your technology requirements and design solutions that target your problem areas, business KPIs, and future scalability. We also assist in hardware supply, implementation, and post-implementation support.',
    ],
    offerings: {
      heading: 'Architecture Pillars for Robust Data Centers',
      lede: 'Our architecture pillars are designed to build a resilient and high-performing data center environment:',
      items: [
        { name: 'Software-Defined Network (SDN)', text: 'We implement SDN to provide agile and programmable network control, enhancing efficiency and flexibility.' },
        { name: 'Storage Area Network (SAN)', text: 'Our SAN solutions ensure high-speed, reliable, and scalable data storage capabilities.' },
        { name: 'Application Development Controllers (ADC)', text: 'We utilize ADCs to optimize application delivery, ensuring performance and availability.' },
        { name: 'Web Application Firewalls (WAF)', text: 'Our WAF implementations provide robust protection for your web applications against various threats.' },
      ],
    },
    more: [
      {
        heading: 'Delivering Enterprise Benefits',
        lede: 'Epta’s Data Center Architecture provides tangible enterprise benefits.',
        items: [
          { name: 'Fabric switch implementation', text: 'We facilitate advanced fabric switch implementation for high-performance and efficient data center networking.' },
          { name: 'Cloud and DR service integration', text: 'Our solutions include cloud and DR service integration, ensuring your data center environment is resilient and capable of seamless disaster recovery.' },
          { name: 'World-leading OEM partnerships', text: 'As an extended arm of world-leading OEMs, we specialize in implementing their unique solutions and offering long-term support for your data center infrastructure.' },
          { name: 'Data center services', text: 'Epta provides comprehensive data center services including colocation, CDN, and MPLS solutions.' },
        ],
      },
      {
        heading: 'The Epta Layers Advantage',
        lede: 'Choosing Epta Layers translates to leveraging our unique strengths.',
        items: [
          { name: 'Delivery Model of LAER', text: 'Epta uses the LAER model (Land-Adopt-Expand-Renew) as a framework for customer success, enabling us to track KPIs for implementing, training, and maximizing the value of your investments in your data center.' },
          { name: 'Business Continuity at Our Core', text: 'We ensure your business operations never see the stop sign, with solutions focused on business continuity.' },
        ],
      },
    ],
    closing: {
      heading: 'Build your future-proof data center',
      text: 'Discuss Data Center Needs with Epta Layers today to build your next-generation, future-proof data center.',
      cta: 'Discuss Data Center Needs',
      service: 'Data Center',
    },
  },
  {
    slug: 'data-center-services',
    name: 'Data Center Services',
    title: 'Comprehensive Data Center Services for Future-Ready Enterprises',
    subtitle: 'Your critical information, always available and protected',
    photo: 'photos/travel-fibre.webp',
    visual: 'cloud',
    intro: [
      'Epta provides comprehensive data center services, including colocation and remote services, Cloud and DR services, CDN, and MPLS solutions. We also offer network security services and data resiliency services to ensure your critical information is always available and protected.',
    ],
    offerings: {
      heading: 'Data Center Services',
      items: [
        { name: 'Colocation and Remote Services', text: 'Colocation and remote services for your data center infrastructure.' },
        { name: 'Cloud and DR Services', text: 'Cloud and disaster recovery services.' },
        { name: 'CDN and MPLS', text: 'CDN and MPLS solutions.' },
        { name: 'Network Security Services', text: 'Network security services for your data center.' },
        { name: 'Data Resiliency Services', text: 'Data resiliency services to ensure your critical information is always available and protected.' },
      ],
    },
    more: [
      {
        heading: 'The Epta Layers Advantage',
        items: [OEM, LAER, { name: 'Business Continuity is at Our Core', text: 'We ensure your business operations never see the stop sign.' }],
      },
    ],
    closing: {
      heading: 'Build a connected future together',
      text: 'Talk to Epta about colocation, Cloud and DR, CDN, MPLS and data resiliency for your enterprise.',
      cta: 'Discuss Data Center Needs',
      service: 'Data Center',
    },
  },
  {
    slug: 'enterprise-services',
    name: 'Enterprise Services',
    title: 'Connectivity Architecture for Sustained Excellence',
    subtitle: 'Your end-to-end technology lifecycle partner',
    photo: 'photos/l1-cable.webp',
    visual: 'lifecycle',
    intro: [
      'At Epta Layers, our vision is rooted in understanding and focusing on the 7 layers of networking in the OSI model. This foundational approach enables us to deliver tailor-made solutions that integrate seamlessly within your IT networks. As a single-point enterprise solutions provider, Epta partners with IT world leaders to address your unique problem areas while keeping your business KPIs in sharp focus. We are dedicated to being your end-to-end technology lifecycle partner.',
      'Epta assists in visualizing and communicating how IT networks operate, with a keen focus on network architecture. We understand your technology requirements and design solutions that target your problem areas, business KPIs, and future scalability. We also assist in hardware supply, implementation, and post-implementation support.',
    ],
    offerings: {
      heading: 'Comprehensive Service Portfolio',
      lede: 'Our service portfolio covers critical aspects of your enterprise technology, ensuring sustained excellence.',
      items: [
        { name: 'Hardware Renewal', text: 'We offer OEM-certified hardware solutions and manage refresh cycles to keep your infrastructure modern and efficient. These core hardware/software services ensure your systems are always up-to-date and performing optimally.' },
        { name: 'Software Licensing', text: 'Our services include efficient subscription management and license optimization, ensuring you get the most value from your software investments.' },
        { name: 'Professional Services', text: 'From architecture consulting to implementation support, our experts guide you through complex deployments and IT transformations. These professional IT services are designed to streamline your operations and enhance capabilities.' },
      ],
    },
    table: [
      { head: 'Hardware Renewal', rows: ['OEM-certified', 'Refresh cycles'] },
      { head: 'Software Licensing', rows: ['Subscription management', 'License optimization'] },
      { head: 'Professional Services', rows: ['Architecture consulting', 'Implementation support'] },
    ],
    more: [
      {
        heading: 'Additional Solutions for Complete Coverage',
        lede: 'Beyond our core portfolio, we provide specialized additional solutions to meet unique operational needs.',
        items: [
          { name: 'IT accessories', text: 'End-to-end IT accessories provisioning.' },
          { name: 'Data resiliency', text: 'Data resiliency services to protect your critical information, a key aspect often supported by advanced data center capabilities.' },
          { name: 'Custom SLA-driven support', text: 'Custom SLA-driven support to ensure your specific service level requirements are met.' },
        ],
      },
      {
        heading: 'The Epta Layers Advantage',
        items: [
          { name: 'Extended Arm of OEMs', text: 'As an extended arm of world-leading OEMs, Epta specializes in implementing their unique solutions and offering long-term support, ensuring you benefit from cutting-edge technology and expertise.' },
          { name: 'LAER Model', text: 'We utilize the LAER model (Land-Adopt-Expand-Renew) as a framework for customer success, enabling us to track KPIs for implementing, training, and maximizing the value of your investments. This approach ensures your services evolve with your business needs.' },
          { name: 'Business Continuity is at Our Core', text: 'Our commitment ensures your business operations never see the stop sign, with solutions designed for unwavering reliability across all aspects of your IT, including crucial data center services. We aim to become the most reliable technology partner for all our esteemed customers.' },
        ],
      },
    ],
    closing: {
      heading: 'Build a connected future together',
      text: 'Explore Service Agreements with Epta Layers today and let’s build a connected future together.',
      cta: 'Explore Service Agreements',
      service: 'General',
    },
  },
  {
    slug: 'network-operation-center',
    name: 'Network Operation Center',
    title: 'Your 24x7 Network Sentinel',
    subtitle: 'Proactive monitoring and incident resolution',
    photo: 'photos/noc-room.webp',
    visual: 'noc',
    intro: [
      'At Epta Layers, our Network Operation Center (NOC) serves as your vigilant guardian, ensuring the continuous health and performance of your IT environment. Rooted in our overarching vision to provide the best IT infrastructure solutions and enhance business continuity, our NOC offers a critical layer of oversight for your enterprise. We aim to become the most reliable technology partner for all our esteemed customers.',
    ],
    offerings: {
      heading: 'Comprehensive Network Operational Services',
      lede: 'Our NOC capabilities are designed to deliver comprehensive network operational services, ensuring your IT environment remains robust and responsive. We provide:',
      items: [
        { name: 'Real-time Monitoring', text: 'Continuous surveillance of your network infrastructure.' },
        { name: 'KPI Tracking', text: 'Monitoring key performance indicators to assess network health and efficiency.' },
        { name: 'Threat Response', text: 'Swift identification and mitigation of security threats.' },
        { name: 'Performance Optimization', text: 'Ongoing adjustments to maximize network output and reliability.' },
      ],
    },
    more: [
      {
        heading: 'Operational Excellence: Driving Network Infrastructure Management',
        lede: 'These capabilities are integral to proactive network infrastructure maintenance, allowing us to identify and address potential issues before they impact your operations. Our commitment to operational excellence in network infrastructure management is unwavering. This is achieved through:',
        items: [
          { name: 'LAER Model-Driven Service Delivery', text: 'We utilize our proprietary LAER model (Land-Adopt-Expand-Renew) as a framework for customer success. This approach enables us to track KPIs for implementing, training, and maximizing the value of your investments, ensuring a continuous cycle of improvement and adaptation for your network.' },
          { name: 'Business Continuity Assurance', text: 'Our core mission is to ensure your business operations never see the stop sign. The NOC plays a pivotal role in this, with solutions designed for unwavering reliability across all aspects of your IT.' },
          { name: 'Custom Reporting Dashboards', text: 'We provide tailored insights into your network’s performance and operational status, offering transparency and data-driven decision-making.' },
        ],
      },
    ],
    quote: { text: 'Epta’s NOC became our first line of defense against downtime.', by: 'IT/ITeS Client' },
    closing: {
      heading: 'Ready to Enhance Your Network Operations?',
      text: 'Send a NOC Service Inquiry today. Let Epta Layers provide the peace of mind that comes with expert, 24/7 network oversight.',
      cta: 'Send a NOC Service Inquiry',
      service: 'NOC',
    },
  },
];

/** Solutions overview (content section 6): each offering's line and its call to action. */
export const SOLUTION_OVERVIEW: Record<string, { line: string; text: string; cta: string }> = {
  'enterprise-network': {
    line: 'Connected Enterprises Designed for Seamless Collaboration.',
    text: 'Epta designs future-ready networking solutions rooted in OSI fundamentals to optimize data flow infrastructure, provide secure connectivity across distributed operations, and offer unified network visibility and control through core offerings like Routing & Switching, Wi-Fi & SD-WAN, and Information Management.',
    cta: 'Explore Enterprise Network Solutions',
  },
  'security-architecture': {
    line: 'Security Embedded in Every Layer.',
    text: 'We provide multi-dimensional protection for hybrid environments, offering deep dive solutions in perimeter defense, data protection (including Email Security and Endpoint Security), and infrastructure guard for Public/Private cloud services. Our offerings include robust network security services designed for 24/7 threat monitoring and compliance-aligned architecture.',
    cta: 'Discover Security Architecture',
  },
  'collaboration-architecture': {
    line: 'Seamless and Connected Network Ecosystems.',
    text: 'Epta delivers unified communication solutions for distributed teams, including cloud services for video and audio meeting solutions, IP Phones, Conference Systems, and custom conference room technology.',
    cta: 'Learn More About Collaboration',
  },
  'data-center-architecture': {
    line: 'Next-Gen Data Center with Future-Proof Foundations.',
    text: 'We build scalable, secure, and intelligent data center infrastructures, leveraging Architecture Pillars such as Software-Defined Networks (SDN), Storage Area Network (SAN) solutions, Application Development Controllers, and Web Application Firewalls (WAF).',
    cta: 'Explore Data Center Architecture',
  },
  'data-center-services': {
    line: 'Comprehensive data center services.',
    text: 'Epta provides comprehensive data center services, including colocation and remote services, Cloud and DR services, CDN, and MPLS solutions. We also offer network security services and data resiliency services to ensure your critical information is always available and protected.',
    cta: 'View Data Center Services',
  },
  'enterprise-services': {
    line: 'Connectivity Architecture for Sustained Excellence.',
    text: 'As your end-to-end technology lifecycle partner, we offer a service portfolio encompassing hardware renewal, software licensing and subscription management, and professional services like architecture consulting and implementation support. These solutions support robust enterprise cloud services and overall IT infrastructure needs.',
    cta: 'Discover Enterprise Services',
  },
  'network-operation-center': {
    line: 'Your 24x7 Network Sentinel.',
    text: 'We offer proactive monitoring and incident resolution through our NOC capabilities, which include Real-time Monitoring, KPI Tracking, Threat Response, and Performance Optimization. Our operational excellence is driven by the LAER model and focused on business continuity assurance, providing custom reporting dashboards.',
    cta: 'Send a NOC Service Inquiry',
  },
};
