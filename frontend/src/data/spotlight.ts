// ============================================================
//  SPOTLIGHT — the floating card on the Home page.
//  Edit these to change what is featured. Slides rotate in this order.
//  `visual` picks the animated illustration: 'auth' | 'pipeline' | 'broker'
// ============================================================

export type SpotlightSlide = {
  id: string;
  visual: 'auth' | 'pipeline' | 'broker';
  title: string;
  status: 'Shipped' | 'Ongoing' | 'Starting';
  domains: string[];
  blurb: string;
  stack: string[];
  links: { label: string; url: string; primary?: boolean }[];
};

export const spotlight: SpotlightSlide[] = [
  {
    id: 'rbz',
    visual: 'auth',
    title: 'Passkey auth & e-signatures — Reserve Bank of Zimbabwe',
    status: 'Shipped',
    domains: ['Security', 'Backend'],
    blurb:
      'Re-architected a banking app’s login around passkeys (FIDO2/WebAuthn) for 50,000+ accounts, added digitally signed transactions, and encrypted data in transit and at rest.',
    stack: ['WebAuthn', 'ECDSA/RSA', 'TLS 1.2+', 'AES-256-GCM'],
    links: [{ label: 'Read the role', url: '#/experience', primary: true }],
  },
  {
    id: 'clearvote',
    visual: 'pipeline',
    title: 'ClearVote — misinformation-checking AI agent',
    status: 'Ongoing',
    domains: ['AI Agents', 'Backend'],
    blurb:
      'An agent that compares user-surfaced claims against trusted sources and returns credibility assessments with links. I led the LangGraph orchestration layer.',
    stack: ['LangGraph', 'LLM APIs', 'React', 'Python'],
    links: [{ label: 'GitHub', url: 'https://github.com/OratorMurambiwa/ClearVote', primary: true }],
  },
  {
    id: 'orb',
    visual: 'broker',
    title: 'Open Resource Broker — open-source contribution',
    status: 'Starting',
    domains: ['Cloud', 'Security', 'Backend'],
    blurb:
      'Starting a contribution to FINOS’s Open Resource Broker, an open-source API for provisioning cloud compute across AWS, Azure, Google Cloud and Kubernetes.',
    stack: ['Python', 'AWS', 'Docker', 'REST API'],
    links: [
      { label: 'Project docs', url: 'https://finos.github.io/open-resource-broker/', primary: true },
      { label: 'GitHub', url: 'https://github.com/finos/open-resource-broker' },
    ],
  },
];
