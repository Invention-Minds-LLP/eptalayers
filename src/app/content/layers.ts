import { StopId } from './journey';

/**
 * The seven OSI layers in plain language, foundation first (L1 → L7): what each layer is, what it means
 * for a business, and which Epta Layers solutions look after it. Drives the home page's layer-by-layer
 * scroll section and the hero's layer ticker.
 */
export interface LayerDetail {
  n: number;
  name: string;
  /** what this layer is, in one plain line */
  is: string;
  /** what it means for the business when it works (or doesn't) */
  means: string;
  /** what Epta Layers does at this layer */
  we: string;
  /** the technology involved, as short chips */
  tech: string[];
  /** where to read more */
  slug: string;
  /** the matching animated console */
  console: StopId;
}

export const LAYERS: LayerDetail[] = [
  {
    n: 1,
    name: 'Physical',
    is: 'The cables, connectors and hardware that everything else runs on.',
    means: 'One faulty cable can slow down a whole floor. A solid foundation means fewer outages.',
    we: 'We install structured cabling and Fluke-test every link, so the foundation is proven, not assumed.',
    tech: ['Structured cabling', 'Fluke testing', 'Fibre & copper'],
    slug: 'enterprise-network',
    console: 'l1',
  },
  {
    n: 2,
    name: 'Data Link',
    is: 'How each laptop, phone and printer connects to your local network.',
    means: 'Every device connects quickly and securely, wired or wireless.',
    we: 'We design switching and enterprise Wi-Fi from your floor plans, so there are no dead spots.',
    tech: ['Switching', 'Enterprise Wi-Fi', 'Floor-plan analysis'],
    slug: 'enterprise-network',
    console: 'l2',
  },
  {
    n: 3,
    name: 'Network',
    is: 'How data finds the best route between your offices and the internet.',
    means: 'Traffic avoids congestion, so applications stay fast across every site.',
    we: 'We design routing that picks the best path automatically and steers around problems.',
    tech: ['Routing', 'SD-WAN', 'MPLS'],
    slug: 'enterprise-network',
    console: 'l3',
  },
  {
    n: 4,
    name: 'Transport',
    is: 'The layer that makes sure data arrives complete and in the right order.',
    means: 'Nothing gets lost on the way. If a piece goes missing, it is sent again automatically.',
    we: 'We build reliable delivery across all your sites, including branches linked over the internet.',
    tech: ['SD-WAN', 'Reliable delivery', 'Multi-site links'],
    slug: 'enterprise-network',
    console: 'l4',
  },
  {
    n: 5,
    name: 'Session',
    is: 'The layer that opens and holds a connection while two systems talk.',
    means: 'Video calls do not drop and long transfers finish, even across cities.',
    we: 'We set up collaboration systems that keep meetings and calls stable for distributed teams.',
    tech: ['Cloud meetings', 'Cloud calling', 'Conference rooms'],
    slug: 'collaboration-architecture',
    console: 'l5',
  },
  {
    n: 6,
    name: 'Presentation',
    is: 'Where data is formatted and encrypted so only the right people can read it.',
    means: 'Your emails, files and customer data stay private, wherever they travel.',
    we: 'We embed email security, endpoint security and encryption into your setup.',
    tech: ['Email security', 'Endpoint security', 'Encryption'],
    slug: 'security-architecture',
    console: 'l6',
  },
  {
    n: 7,
    name: 'Application',
    is: 'The apps your people actually use: ERP, email, websites and business software.',
    means: 'Applications open fast, stay available and are protected from attacks.',
    we: 'We deploy application delivery controllers and web application firewalls to keep them fast and safe.',
    tech: ['ADC', 'WAF', 'Data center'],
    slug: 'data-center-architecture',
    console: 'l7',
  },
];
