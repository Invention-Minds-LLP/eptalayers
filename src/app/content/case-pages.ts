/**
 * The three case studies. Facts from the client's content file (sections 5 and 15), rewritten in plain
 * language at the client's request (2026-10-13). Clients stay anonymous; every figure is as stated.
 */

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
  alt: string;
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
    title: 'From Network Chaos to IT Harmony',
    teaser:
      'A leading American IT/ITeS company was losing productivity to an unstable network across its Bangalore campus. Here is how Epta Layers fixed it.',
    photo: 'photos/case-campus.webp',
    alt: 'Open-plan IT office floor with employees at their desks',
    figures: [
      { value: '90–95%', label: 'Wi-Fi connection accuracy after the project' },
      { value: '1500+', label: 'Employees now on the network' },
      { value: '3', label: 'Offices on the Bangalore campus' },
    ],
    overview:
      'A leading American IT/ITeS company had network problems across its Bangalore campus, and employee productivity was suffering. Epta Layers stepped in with its ‘Know Your Infra’ approach: first understand the existing setup in detail, then fix it properly.',
    highlights: [
      'Fluke testing to check the quality of the data and voice cabling.',
      'A detailed network audit before rebuilding the wired connections.',
      'Floor plan analysis to solve Wi-Fi and mobility problems.',
    ],
    challenge: {
      text: [
        'The campus had three offices running on an old, inefficient network. Data was frequently lost on the way, connections were unstable, and employees could not work at full speed. The company needed a structured, reliable network to stay a leader in its industry.',
      ],
    },
    solution: {
      text: [
        'Epta Layers designed a solution around the specific problems on this campus, rather than a one-size-fits-all fix.',
        'The network was completely transformed, and more than 1500 employees became more productive. The results in Bangalore led the company to bring Epta Layers to its other locations too.',
      ],
      phases: [],
    },
    outcomes: {
      items: [
        { name: '90–95% Wi-Fi accuracy', text: 'Reliable wireless connections after implementation.' },
        { name: 'Scaled to 1500+ employees', text: 'The new network handles the whole user base.' },
        { name: 'More locations', text: 'The company extended Epta Layers’ services to other sites, a clear sign of trust.' },
      ],
      after: [],
    },
  },
  {
    slug: 'engineering',
    sector: 'Engineering',
    title: 'From Complexity to Clarity',
    teaser:
      'A global engineering company needed one partner to rebuild its IT for major green-energy projects. Epta Layers delivered it in three phases.',
    photo: 'photos/case-turbine.webp',
    alt: 'Offshore wind turbines at sea',
    figures: [
      { value: '40+', label: 'Countries the company operates in' },
      { value: '3', label: 'Phases: network, workstations, servers' },
      { value: '1', label: 'Partner for the whole requirement' },
    ],
    overview:
      'This engineering company works in more than 40 countries. It wanted to upgrade its IT to support renewable energy projects, replace diesel generators with electric mobility, and run SCADA control systems for natural gas pipelines. It needed a single partner to do all of it.',
    highlights: [
      'Fluke-tested structured cabling for reliable data transfer.',
      'Wired and wireless networks rebuilt across all facilities.',
      'Endpoint and perimeter security to protect sensitive data.',
      'Voice systems and high-resolution displays for the engineering teams.',
      'Servers sized to each software’s needs for best performance.',
      'A scalable network designed for zero downtime.',
    ],
    challenge: {
      heading: 'A Complex Mix of Systems',
      text: [
        'The company’s existing IT was a complex mix of systems, and it was slowing down its green projects. Any new solution had to work with everything already in place.',
        'Their key requirements:',
      ],
      list: [
        'Works with existing systems',
        'Can grow with the business',
        'Keeps sensitive data secure',
        'Meets international standards',
        'Easy to support, with minimal downtime',
      ],
      after: 'In short, they needed one partner who could deliver the whole solution, everywhere they operate.',
    },
    solution: {
      heading: 'A Rebuild in Three Phases',
      text: [
        'Epta Layers planned the work in phases, so each part was done properly without disrupting the business.',
      ],
      phases: [
        {
          title: 'A Strong Network Foundation',
          lede: 'We started with the network:',
          items: [
            { name: 'Structured cabling and Fluke testing', text: 'Reliable data transfer from the ground up.' },
            { name: 'Wired network upgrade', text: 'Faster, more reliable connections.' },
            { name: 'Better Wi-Fi', text: 'Seamless wireless access across every facility.' },
            { name: 'Perimeter and endpoint security', text: 'Strong protection for sensitive data.' },
            { name: 'Voice systems', text: 'Clearer, better-connected communication.' },
          ],
          after: 'This made daily work more efficient and prepared the company for future growth.',
        },
        {
          title: 'Powerful Engineering Workstations',
          lede: 'Engineering design work needs strong graphics. We provided:',
          items: [
            { name: 'High-resolution setups', text: 'Workstations driving multiple Full HD displays.' },
            { name: 'Long-distance display connections', text: 'KVM transmitters and receivers that keep full quality over distance.' },
          ],
          after: 'Engineers could handle complex design work with ease, and productivity rose.',
        },
        {
          title: 'Scalable Servers',
          lede: 'To match the company’s changing software needs, we introduced:',
          items: [
            { name: 'Servers sized to each application', text: 'Configured for the software they run, for best performance.' },
            { name: 'Converged infrastructure', text: 'Easy to scale, with zero downtime.' },
          ],
          after: 'The company could now run large projects without interruption.',
        },
      ],
    },
    outcomes: {
      heading: 'Faster Projects, Ready for the Future',
      items: [
        { name: 'Smoother project workflows', text: 'Closer links with R&D helped projects deliver on time.' },
        { name: 'Better teamwork', text: 'IT and non-IT teams worked together more efficiently.' },
        { name: 'Shorter project timelines', text: 'Projects finished and delivered faster.' },
      ],
      after: ['The company was so pleased that it now uses the Epta Layers approach on its other client projects.'],
    },
  },
  {
    slug: 'manufacturing',
    sector: 'Manufacturing',
    title: 'From Latency to Efficiency',
    teaser:
      'A leading Indian manufacturer’s IT could not keep up with its growth. Epta Layers rebuilt it in phases, starting with security, data and network.',
    photo: 'photos/case-factory.webp',
    alt: 'Industrial manufacturing plant with machinery and pipework',
    figures: [
      { value: '1000+', label: 'Projects completed by the customer' },
      { value: '4', label: 'Sites: Bangalore, Hosur, Anekal, Mumbai' },
      { value: '2 & 3', label: 'Phases approved after Phase 1' },
    ],
    overview:
      'This Bangalore-based company leads India’s manufacturing of doors, windows and advanced facades, with sites in Hosur, Anekal and Mumbai. It has completed over 1000 projects, from office complexes to luxury homes to airports. But IT problems were holding back its growth, and it needed a reliable partner to fix them.',
    highlights: [
      'Infrastructure audits covering security, data management and network reliability.',
      'Stronger gateway, email and endpoint security, plus a SOC to manage risk early.',
      'A three-tier data center design with better asset and patch management.',
      'Standardised network services that removed vendor inefficiencies.',
      'Smoother operations that support global expansion.',
    ],
    challenge: {
      heading: 'IT That Could Not Keep Up',
      text: ['The company’s IT only reacted to problems after they happened. That led to:'],
      list: ['Lost data on the network', 'Security gaps', 'Too many separate vendors and systems'],
      after:
        'After the company acquired a German conglomerate, it was clear its IT could not support its expansion. It needed a simpler, faster and more secure setup.',
    },
    solution: {
      heading: 'A Step-by-Step Upgrade',
      text: [
        'The Epta Layers team audited the IT at the company’s offices, then planned improvements in three areas: security, data management and network reliability.',
      ],
      phases: [
        {
          title: 'Stronger Security',
          items: [
            { text: 'Security came first. We strengthened gateway, email and endpoint protection, and a third-party partner set up a Security Operation Center (SOC) to spot and manage risks early.' },
          ],
        },
        {
          title: 'Better Data Management',
          items: [
            { text: 'A three-tier data center design reduced downtime and improved reliability. Better asset and patch management made the service desk more efficient, with priority-based tickets and clear reports.' },
          ],
        },
        {
          title: 'Standardised Network Services',
          items: [
            { text: 'We standardised network services across the company and consolidated systems. That removed the inefficiency of juggling multiple vendors and made production more efficient.' },
          ],
        },
      ],
    },
    outcomes: {
      heading: 'Ready for Long-Term Growth',
      items: [],
      after: [
        'The phased approach solved the immediate problems and built a scalable foundation for growth. Happy with the results at their Bangalore head office, the company approved Phases 2 and 3 for the next financial year.',
        'Phase 1 also helped Epta Layers build know-how that will benefit future projects.',
      ],
    },
  },
];
