/** One order, seven stops: the story both the illustrated (/) and photographic (/home-c) homepages tell. */

export type StopId = 'l7' | 'l6' | 'l5' | 'l4' | 'l3' | 'l2' | 'l1' | 'travel' | 'arrive';

export interface Stop {
  id: StopId;
  /** spine label; travel and arrival use drawn icons instead */
  mark: string;
  icon?: 'arrow' | 'check';
  layer: string;
  line: string;
  body: string;
  keeper: string;
  slug: string;
}

export const STOPS: Stop[] = [
  {
    id: 'l7',
    mark: 'L7',
    layer: 'Application',
    line: 'It starts with a click.',
    body: 'Your sales manager sends a purchase order from the ERP to the Mumbai branch. This is layer seven: the application your people actually see and use.',
    keeper: 'Application delivery controllers and web application firewalls keep critical applications fast and protected.',
    slug: 'data-center-architecture',
  },
  {
    id: 'l6',
    mark: 'L6',
    layer: 'Presentation',
    line: 'Sealed before it leaves.',
    body: 'The order is formatted and protected so that only the branch can read it. Email and endpoint security guard it at every touchpoint.',
    keeper: 'Security Architecture: security embedded in every layer, not bolted on.',
    slug: 'security-architecture',
  },
  {
    id: 'l5',
    mark: 'L5',
    layer: 'Session',
    line: 'The line stays open.',
    body: 'A session between Bangalore and Mumbai is opened and held until the order is through: the same layer that keeps your video calls from dropping.',
    keeper: 'Collaboration Architecture: cloud meetings, IP phones and conference rooms designed as one.',
    slug: 'collaboration-architecture',
  },
  {
    id: 'l4',
    mark: 'L4',
    layer: 'Transport',
    line: 'Delivery is guaranteed.',
    body: 'The order travels as numbered packets. Every one is checked off on arrival, and anything missing is sent again.',
    keeper: 'Enterprise Network: reliable data delivery across your sites, with SD-WAN.',
    slug: 'enterprise-network',
  },
  {
    id: 'l3',
    mark: 'L3',
    layer: 'Network',
    line: 'The best route is chosen.',
    body: 'Routers pick an efficient path between the offices and steer around congestion.',
    keeper: 'Enterprise Network: intelligent routing and switching.',
    slug: 'enterprise-network',
  },
  {
    id: 'l2',
    mark: 'L2',
    layer: 'Data Link',
    line: 'Handed on, point to point.',
    body: 'Inside each building, switches and Wi-Fi pass the order hop by hop, connecting every device securely.',
    keeper: 'Enterprise Network: switching and enterprise Wi-Fi, planned from floor-plan analysis.',
    slug: 'enterprise-network',
  },
  {
    id: 'l1',
    mark: 'L1',
    layer: 'Physical',
    line: 'Down to the cable.',
    body: 'At the bottom it is light and signal on cable. Epta’s engineers Fluke-test the cabling, so the foundation is proven, not assumed.',
    keeper: 'Structured cabling: a robust infrastructure foundation.',
    slug: 'enterprise-network',
  },
  {
    id: 'travel',
    mark: '',
    icon: 'arrow',
    layer: 'Between cities',
    line: 'Bangalore to Mumbai, as light.',
    body: 'Carrier links and MPLS carry the order from Bangalore to Mumbai.',
    keeper: 'Data Center Services: MPLS, CDN, cloud and DR.',
    slug: 'data-center-services',
  },
  {
    id: 'arrive',
    mark: '',
    icon: 'check',
    layer: 'Mumbai',
    line: 'Received in Mumbai.',
    body: 'Back up the same seven layers, and the branch manager sees the order. Every stop worked, so nobody noticed any of them. That is the job.',
    keeper: 'Network Operation Center: every stop watched 24x7.',
    slug: 'network-operation-center',
  },
];

/** Case-study outcomes, worded only from the client's own material. */
export const RESULTS = [
  {
    art: 'campus',
    title: 'From network chaos to IT harmony',
    sector: 'IT/ITeS · three-office Bangalore campus',
    lead: 'Wi-Fi connectivity accuracy reached',
    figure: '90–95%',
    tail: 'after implementation, for 1,500+ users. Epta’s services were then extended to other locations.',
    slug: 'it-ites',
  },
  {
    art: 'turbine',
    title: 'From complexity to clarity',
    sector: 'Engineering · operating in 40+ countries',
    lead: 'Delivered in',
    figure: 'three phases',
    tail: '(network, workstations and servers), then adopted by the client’s teams on other projects.',
    slug: 'engineering',
  },
  {
    art: 'factory',
    title: 'From latency to efficiency',
    sector: 'Manufacturing · Bangalore, Hosur, Anekal, Mumbai',
    lead: 'After Phase 1, the client greenlit',
    figure: 'Phases 2 and 3',
    tail: 'of the rebuild across security, data center and network services.',
    slug: 'manufacturing',
  },
];
