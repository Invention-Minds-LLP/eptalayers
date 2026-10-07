/** The three case studies in full, worded from the client's content file (sections 5 and 15). Clients stay anonymous. */

export interface CasePhase {
  title: string;
  lede?: string;
  items: { name?: string; text: string }[];
  after?: string;
}

export interface CasePage {
  slug: string;
  sector: string;
  title: string;
  teaser: string;
  photo: string;
  /** outcome figures, exactly as stated */
  figures: { value: string; label: string }[];
  overview: string;
  highlights: string[];
  challenge: { heading?: string; text: string[]; list?: string[]; after?: string };
  solution: { heading?: string; text: string[]; phases: CasePhase[] };
  outcomes: { heading?: string; items: { name?: string; text: string }[]; after: string[] };
}

export const CASE_PAGES: CasePage[] = [
  {
    slug: 'it-ites',
    sector: 'IT/ITeS',
    title: 'From Network Chaos to IT Harmony: Epta’s Winning Strategy for an IT/ITeS Giant',
    teaser:
      'Read how Epta Layers helped deliver remarkable outcomes to a leading American IT/ITeS corporation that was grappling with network instability and employee productivity issues.',
    photo: 'photos/case-campus.webp',
    figures: [
      { value: '90–95%', label: 'Accuracy in WiFi connectivity post-implementation' },
      { value: '1500+', label: 'Employees on the user base' },
      { value: '3', label: 'Offices on the Bangalore campus' },
    ],
    overview:
      'When a leading American IT/ITeS corporation was grappling with network instability and employee productivity issues in their Bangalore office campus, Epta stepped in with its ‘Know Your Infra’ approach to deliver a robust and efficient IT solution. This case study explores the challenges the customer faced, the solutions Epta provided, and the remarkable outcomes that followed.',
    highlights: [
      'Fluke Testing to assess the data and voice cabling infrastructure.',
      'Meticulous network audit for overhauling wired connectivity.',
      'Floor plan analysis to tackle mobility and WiFi connectivity challenges.',
    ],
    challenge: {
      text: [
        'The customer’s Bangalore campus, consisting of three offices, was plagued by an old and inefficient network infrastructure leading to frequent packet loss, network instability, and a consequential drop in employee productivity. The need for a structured and reliable network solution was evident to maintain their position as a leader in the IT/ITeS industry.',
      ],
    },
    solution: {
      text: [
        'In the words of Malcolm Forbes, “It’s so much easier to suggest solutions when you don’t know too much about the problem.” So, Epta designed a multifaceted solution that was tailored to address the specific challenges of the customer’s IT infrastructure.',
        'The customer experienced a complete transformation in their network infrastructure, resulting in enhanced employee productivity for over 1500 users. The success of Epta’s solutioning in Bangalore led to future opportunities, with the customer extending Epta’s services to other locations.',
      ],
      phases: [],
    },
    outcomes: {
      items: [
        { name: '90-95% Accuracy', text: 'in WiFi connectivity post-implementation.' },
        { name: 'Successful Scaling', text: 'to a user base of 1500+ employees.' },
        { name: 'Expansion to Additional Locations', text: 'was indicative of customer satisfaction and trust.' },
      ],
      after: [],
    },
  },
  {
    slug: 'engineering',
    sector: 'Engineering',
    title: 'From Complexity to Clarity: Epta’s IT Transformation for Engineering Excellence',
    teaser:
      'Discover how Epta Layers revolutionized the IT infrastructure architecture of a global engineering company, enhancing project efficiency and scalability through tailored solutions in IT infrastructure.',
    photo: 'photos/case-turbine.webp',
    figures: [
      { value: '40+', label: 'Countries the company operates in' },
      { value: '3', label: 'Phases: network, workstations, servers' },
      { value: '1', label: 'Single partner for the requirement' },
    ],
    overview:
      'In the constantly evolving field of engineering, the need for cutting-edge technological solutions is paramount. One Engineering Company, operating in over 40 countries, had a vision to revolutionize their IT infrastructure to support their renewable energy project into the grid, replacing diesel generators with electric mobility solutions, and implementing SCADA systems for natural gas pipelines. However, they were looking for a single partner to fulfill the requirement.',
    highlights: [
      'Fluke testing to ensure reliable and efficient data transmission via structured cabling.',
      'Wired and wireless connectivity infrastructure overhaul across facilities.',
      'Endpoint and perimeter security to protect sensitive data.',
      'Voice and high resolution display solutions to upgrade the client team’s engineering infrastructure.',
      'Dynamically sized server solutions to ensure optimal software performance.',
      'Scalable network infrastructure to improve system reliability allowing for zero downtime.',
    ],
    challenge: {
      heading: 'Navigating the Complex IT Infrastructure',
      text: [
        'The customer’s ambition to lead in green projects was stymied by the complexity of their existing IT infrastructure. Their primary challenge was finding or building an engineering solution that seamlessly integrated with their multi-IT infrastructure architecture.',
        'Key requirements included:',
      ],
      list: [
        'Compatibility with existing systems',
        'Scalability to accommodate future growth',
        'Security to protect sensitive data',
        'Compliance with international standards',
        'Ease of support to minimize downtime',
      ],
      after:
        'In essence, they needed a partner who could provide a single-point enterprise solution that aligned with their global approach to create value throughout the industrial project lifecycle.',
    },
    solution: {
      heading: 'Designing an IT Overhaul in Phases',
      text: [
        'Epta Layers stepped in with a comprehensive, phased approach that addressed the company’s unique needs. By leveraging our expertise as a single-point enterprise solutions provider, we delivered a multifaceted engineering solution that transformed the customer’s IT landscape.',
      ],
      phases: [
        {
          title: 'Designing a Robust Network Infrastructure',
          lede: 'Epta Layers began by overhauling the company’s network infrastructure, focusing on:',
          items: [
            { name: 'Structured Cabling and Fluke Testing', text: 'Ensuring reliable and efficient data transmission.' },
            { name: 'Wired Connectivity Overhaul', text: 'Enhancing network speed and reliability.' },
            { name: 'Enhanced Wi-Fi Connectivity', text: 'Providing seamless wireless access across facilities.' },
            { name: 'Perimeter & Endpoint Security', text: 'Implementing robust security measures to protect sensitive data.' },
            { name: 'Voice Solutions', text: 'Integrating advanced communication systems for better connectivity.' },
          ],
          after:
            'These network enhancements not only improved operational efficiency but also ensured the company was well-prepared for future expansions.',
        },
        {
          title: 'Upgrading Workstations for High-Performance Demands',
          lede: 'The engineering projects required workstations with exceptional graphic capabilities. We provided:',
          items: [
            { name: 'High-Resolution Systems', text: 'Configured to support multiple Full HD resolution displays.' },
            { name: 'Long-Distance Signal Transmission', text: 'Using Transmitter and Receiver KVM to maintain performance integrity.' },
          ],
          after:
            'This upgrade allowed the engineering team to handle complex design tasks with ease, significantly enhancing productivity.',
        },
        {
          title: 'Implementing Scalable Server Solutions',
          lede: 'To support the company’s dynamic software needs, Epta Layers introduced:',
          items: [
            { name: 'Dynamically Sized Servers', text: 'Customizable based on software prerequisites to ensure optimal performance.' },
            { name: 'Converged Infrastructure', text: 'Allowing for easy scalability and zero downtime.' },
          ],
          after:
            'These server solutions provided the company with the reliability and flexibility needed to tackle large-scale projects without interruption.',
        },
      ],
    },
    outcomes: {
      heading: 'Enhanced Efficiency and Future-Ready Solutions',
      items: [
        { name: 'Streamlined Project Workflows', text: 'Integration with R&D processes facilitated timely project delivery.' },
        { name: 'Increased Efficiencies', text: 'Optimized collaboration between IT and non-IT teams.' },
        { name: 'Reduced Project Lifecycle', text: 'Helped in accelerating project completion and delivery.' },
      ],
      after: [
        'The success of this project led the engineering company to adopt Epta Layers’ approach across other client projects, underscoring the effectiveness of our tailored IT infrastructure services.',
      ],
    },
  },
  {
    slug: 'manufacturing',
    sector: 'Manufacturing',
    title: 'From Latency to Efficiency: How Epta Revamped the IT Infrastructure for Improved Manufacturing Operations',
    teaser:
      'Read how Epta Layers transformed the IT infrastructure of a leading Indian manufacturing company in a phased manner, enhancing security, data management, and network services to boost business performance.',
    photo: 'photos/case-factory.webp',
    figures: [
      { value: '1000+', label: 'Projects completed by the customer' },
      { value: '4', label: 'Sites: Bangalore, Hosur, Anekal, Mumbai' },
      { value: '2 & 3', label: 'Phases greenlit after Phase 1' },
    ],
    overview:
      'Based in Bangalore with sites in Hosur, Anekal, and Mumbai, our customer leads India’s manufacturing sector with expertise in doors, windows, and advanced facade solutions. Despite their unmatched expertise in executing complex projects—from office complexes to luxury condos to airports—technical hurdles were hampering their growth. With an expanding global presence and over 1000 completed projects, they needed a reliable partner to streamline their IT infrastructure.',
    highlights: [
      'Epta Layers conducted infrastructure audits to enhance security, data management, and network reliability.',
      'Security was bolstered with improved gateway, email, and endpoint protection, plus a SOC for proactive risk management.',
      'A three-tier data center design minimized downtime and improved reliability through better asset and patch management.',
      'Standardized network services eliminated vendor inefficiencies and increased production efficiency.',
      'These improvements streamlined operations and supported global expansion.',
    ],
    challenge: {
      heading: 'Overcoming IT Infrastructure Hurdles',
      text: ['The customer’s reactive IT setup resulted in inefficiencies, marked by:'],
      list: ['Data packet losses', 'Security vulnerabilities', 'Fragmented vendor systems (multiple OEMs)'],
      after:
        'After acquiring a German conglomerate, it became evident their IT could not support expansion ambitions, highlighting the need for a streamlined, efficient, and secure IT infrastructure.',
    },
    solution: {
      heading: 'A Multi-Phased Approach to IT Excellence',
      text: [
        'The Epta Layers team conducted thorough infrastructure audits across the customer’s office locations, laying the groundwork for a strategic overhaul in three critical areas: security, data management, and network reliability.',
      ],
      phases: [
        {
          title: 'Strengthening Security Protocols',
          items: [
            { text: 'Security was a top priority. Enhanced security measures covered gateway, email, and endpoint protection. A third-party partnership established a Security Operation Center (SOC) for proactive risk management, safeguarding data and operations.' },
          ],
        },
        {
          title: 'Optimizing Data Management',
          items: [
            { text: 'We implemented a three-tier data center design to minimize downtime and boost reliability. Improved asset and patch management elevated service desk efficiency, while priority-based service tickets and detailed reports streamlined operations.' },
          ],
        },
        {
          title: 'Upgrading Network Services',
          items: [
            { text: 'To address issues of disparate systems, the Epta team standardized network services across the board. By consolidating their systems, we eliminated inefficiencies from multiple vendors, improving production efficiency and setting the stage for global growth.' },
          ],
        },
      ],
    },
    outcomes: {
      heading: 'A Path to Continued Success',
      items: [],
      after: [
        'Our phased approach not only solved immediate pain points but also laid the foundation for a sustainable, scalable IT infrastructure that supports the customer’s long-term business expansion. Delighted with the improvements at their Bangalore head office, the customer has greenlit the project plan for Phases 2 and 3, slated for the next financial year.',
        'Moreover, the success of Phase 1 has been a learning experience, allowing Epta Layers to create intellectual property that will benefit future projects.',
      ],
    },
  },
];
