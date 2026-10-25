// ============================================================
//  EDIT THIS FILE to change what the site says.
//  (Leadership lives in leadership.ts, Spotlight in spotlight.ts.)
// ============================================================

export const profile = {
  name: 'Vensen Sibanda',
  fullName: 'Vensen Siamaindi Sibanda',
  role: 'Backend · Cloud · Security — Grambling State University',
  headline: 'I design and build secure, production-grade backend and cloud systems.',
  intro:
    'Customer-first engineering across the whole lifecycle — design, build, test, deploy and monitor — with security built in from the start.',
  email: 'sibandavensen@gmail.com',
  github: 'https://github.com/Ven-Sib',
  linkedin: 'https://www.linkedin.com/in/vensen-sibanda-b2997b2a6',
  resume: '/resume.pdf',
};

// Your priority order. ML is last on purpose.
export const categories = ['Cloud', 'Backend', 'Security', 'System Design', 'AI Agents', 'ML'] as const;
export type Category = (typeof categories)[number];

export const focus: { title: Category; blurb: string; topics: string[] }[] = [
  {
    title: 'Cloud',
    blurb: 'Production deployments that scale and stay up.',
    topics: ['EC2 & load balancing', 'Autoscaling', 'Azure', 'Docker & Kubernetes', 'CI/CD', 'Monitoring'],
  },
  {
    title: 'Backend',
    blurb: 'APIs and data layers built for real traffic.',
    topics: ['FastAPI · Django · Flask', 'PostgreSQL · MySQL', 'DynamoDB · Cassandra', 'Redis', 'Kafka · WebSockets', 'REST'],
  },
  {
    title: 'Security',
    blurb: 'Secure by design, using current standards.',
    topics: ['Passkeys (FIDO2/WebAuthn)', 'TLS 1.2+', 'AES-256-GCM', 'Argon2id · bcrypt', 'RBAC · CSRF', 'OWASP practices'],
  },
  {
    title: 'System Design',
    blurb: 'Designing for latency, availability and scale.',
    topics: ['Load balancing', 'Replication & failover', 'Async workers & queues', 'Caching', 'Parallel processing', 'Failure modes'],
  },
  {
    title: 'AI Agents',
    blurb: 'LLM agents that call tools and verify claims.',
    topics: ['LangGraph', 'LangChain', 'Tool calling', 'Amazon Nova', 'Claude', 'Voice agents'],
  },
  {
    title: 'ML',
    blurb: 'Classical ML pipelines with honest evaluation.',
    topics: ['Scikit-learn', 'PyTorch · TensorFlow', 'Pandas · NumPy', 'Cross-validation', 'Feature engineering', 'Responsible AI'],
  },
];

// ------------------------------------------------------------
//  Projects — listed in YOUR priority order (top = most important).
//  links starting with '#' stay on this site; others open in a new tab.
// ------------------------------------------------------------
export type Project = {
  slug: string;
  title: string;
  org: string;
  period: string;
  status: 'Shipped' | 'Ongoing' | 'Starting';
  featured?: boolean;
  summary: string;
  bullets: string[];
  stack: string[];
  categories: Category[];
  links: { label: string; url: string; primary?: boolean }[];
};

export const projects: Project[] = [
  {
    slug: 'rbz',
    title: 'Passkey Authentication & E-Signatures',
    org: 'Reserve Bank of Zimbabwe',
    period: 'May 2026 — Aug 2026',
    status: 'Shipped',
    featured: true,
    summary: 'Re-architected a banking app’s authentication and transaction signing around modern, phishing-resistant standards.',
    bullets: [
      'Migrated 50,000+ customer accounts from password login to passkeys (FIDO2/WebAuthn) to eliminate phishing and credential-stuffing risk.',
      'Added electronic signatures for loan and transfer transactions with integrity, non-repudiation and tamper-evident audit records.',
      'Secured data in transit and at rest: TLS 1.2+, AES-256-GCM, and salted Argon2id/bcrypt hashing per OWASP guidance.',
    ],
    stack: ['WebAuthn', 'ECDSA/RSA', 'TLS 1.2+', 'AES-256-GCM', 'Argon2id'],
    categories: ['Security', 'Backend'],
    links: [{ label: 'Read the role', url: '#/experience', primary: true }],
  },
  {
    slug: 'erisa-claims',
    title: 'Claims Management Dashboard',
    org: 'ERISA Discovery',
    period: 'Oct 2025 — Nov 2025',
    status: 'Shipped',
    featured: true,
    summary: 'A claims-auditing web app for tracking claims, notes, flags and reports — with a public live demo.',
    bullets: [
      'Django 4.2 with HTMX, Alpine.js and Bootstrap; static files served with WhiteNoise.',
      'Deployed on Render with automatic deploys from GitHub.',
      'The production-scale architecture behind this work (load balancing, replication, caching) is described under Experience.',
    ],
    stack: ['Django', 'HTMX', 'Alpine.js', 'Render'],
    categories: ['Backend', 'Cloud', 'System Design'],
    links: [
      { label: 'Live demo', url: 'https://claims-management-mhb2.onrender.com', primary: true },
      { label: 'GitHub', url: 'https://github.com/Ven-Sib/Claims_management' },
      { label: 'Experience', url: '#/experience' },
    ],
  },
  {
    slug: 'open-resource-broker',
    title: 'Open Resource Broker — open-source contribution',
    org: 'FINOS',
    period: '2026 — Starting',
    status: 'Starting',
    featured: true,
    summary: 'Contributing to FINOS’s Open Resource Broker, an open-source unified API for provisioning cloud compute capacity across AWS, Azure, Google Cloud and Kubernetes.',
    bullets: [
      'Python project with a CLI, REST API, MCP server and SDKs, built on Clean Architecture and CQRS.',
      'My focus: security and cloud engineering contributions (details to come as work lands).',
    ],
    stack: ['Python', 'AWS', 'Docker', 'REST API', 'CI/CD'],
    categories: ['Cloud', 'Security', 'Backend'],
    links: [
      { label: 'Project docs', url: 'https://finos.github.io/open-resource-broker/', primary: true },
      { label: 'GitHub', url: 'https://github.com/finos/open-resource-broker' },
    ],
  },
  {
    slug: 'portfolio',
    title: 'This Portfolio — full-stack, deployed',
    org: 'Personal project',
    period: 'Oct 2026',
    status: 'Shipped',
    summary: 'A React site with a FastAPI backend that syncs my LeetCode and learning posts automatically.',
    bullets: [
      'FastAPI + Neon Postgres backend on Render; React + Tailwind frontend on GitHub Pages.',
      'GitHub Actions builds and deploys the site and runs a scheduled sync job.',
      'Admin-token protected write endpoints and CORS limited to the site’s origin.',
    ],
    stack: ['FastAPI', 'PostgreSQL', 'React', 'GitHub Actions', 'Render'],
    categories: ['Cloud', 'Backend', 'Security'],
    links: [
      { label: 'GitHub', url: 'https://github.com/Ven-Sib/Ven-Sib.github.io', primary: true },
    ],
  },
  {
    slug: 'amazon-music-voice-agent',
    title: 'Amazon Music Voice Agent',
    org: 'Amazon Nova Hackathon',
    period: 'Mar 2026 — Apr 2026',
    status: 'Shipped',
    summary: 'A Chrome extension that controls Amazon Music through natural speech.',
    bullets: [
      'Real-time audio pipeline: Media Recorder API → Kafka and WebSockets → FastAPI backend for low-latency voice interaction.',
      'Amazon Nova Sonic for speech, Nova Lite for command reasoning, Nova Act for UI workflow automation.',
    ],
    stack: ['FastAPI', 'Kafka', 'WebSockets', 'React + TypeScript', 'Amazon Nova'],
    categories: ['Backend', 'System Design', 'AI Agents'],
    links: [], // add a link here when the repo is ready, e.g. { label: 'GitHub', url: '...' }
  },
  {
    slug: 'clearvote',
    title: 'ClearVote',
    org: 'Carnegie Student Leadership Program',
    period: 'Jun 2026 — Present',
    status: 'Ongoing',
    featured: true,
    summary: 'An AI agent that flags potentially misleading voter information and links to verified sources.',
    bullets: [
      'Detects misleading claims with 80%+ coverage in testing across 1,000+ sample claims.',
      'Verification pipeline ingests trusted sources, compares them with user-surfaced claims, and produces credibility assessments with source links.',
      'Led the LangGraph orchestration layer: agent nodes, tool calls and verification workflows across backend and React frontend.',
    ],
    stack: ['LangGraph', 'LLM APIs', 'React', 'Python'],
    categories: ['AI Agents', 'Backend'],
    links: [{ label: 'GitHub', url: 'https://github.com/OratorMurambiwa/ClearVote', primary: true }],
  },
  {
    slug: 'ticketing-app',
    title: 'Event Ticketing App',
    org: 'Personal project',
    period: '2025',
    status: 'Shipped',
    summary: 'Full-stack ticketing with a live request queue, PDF receipts with QR codes, and an admin dashboard.',
    bullets: [
      'Django REST Framework backend; React + Vite + Tailwind frontend.',
      'Users request and cancel tickets; admins see activity logs and live sold/cancelled/available counts.',
    ],
    stack: ['Django REST', 'React', 'Vite', 'Tailwind'],
    categories: ['Backend', 'System Design'],
    links: [{ label: 'GitHub', url: 'https://github.com/Ven-Sib/Ticketing-app', primary: true }],
  },
  {
    slug: 'registration-system',
    title: 'University Registration System',
    org: 'Personal project',
    period: '2025',
    status: 'Shipped',
    summary: 'A registration portal where students sign up, browse courses and enroll or drop them.',
    bullets: [
      'Django app with authentication, a student dashboard, enrollment history and an admin panel across semesters.',
    ],
    stack: ['Django', 'Bootstrap', 'SQLite'],
    categories: ['Backend'],
    links: [{ label: 'GitHub', url: 'https://github.com/Ven-Sib/Registration_system', primary: true }],
  },
  {
    slug: 'clip-search',
    title: 'CLIP Image Search Engine',
    org: 'Personal project',
    period: '2025',
    status: 'Shipped',
    summary: 'Upload a picture and get the three most visually similar images from a dataset.',
    bullets: [
      'OpenAI CLIP encodes images and FAISS finds the nearest matches; the search index reloads without restarting the server.',
      'React + Tailwind frontend with a Django + PyTorch backend.',
    ],
    stack: ['PyTorch', 'FAISS', 'Django', 'React'],
    categories: ['ML', 'Backend'],
    links: [{ label: 'GitHub', url: 'https://github.com/Ven-Sib/clip-search-engine', primary: true }],
  },
  {
    slug: 'ai4all-co-pipeline',
    title: 'Atmospheric CO Prediction Pipeline',
    org: 'AI4ALL Ignite Fellowship',
    period: 'May 2026 — Present',
    status: 'Ongoing',
    summary: 'An end-to-end supervised ML pipeline predicting carbon monoxide levels from environmental sensor data.',
    bullets: [
      'EDA, feature engineering, preprocessing and missing-value imputation with Pandas, NumPy and Matplotlib.',
      'Compared Linear Regression and Random Forest using cross-validation and feature-importance analysis.',
      'Built reproducible workflows with a team, with attention to bias, interpretability and responsible AI.',
    ],
    stack: ['Python', 'Pandas', 'Scikit-learn', 'Matplotlib'],
    categories: ['ML'],
    links: [],
  },
];

// ------------------------------------------------------------
//  About / Skills / Experience
// ------------------------------------------------------------
export const about = {
  intro:
    'I’m an engineer who owns the whole lifecycle of a system: understanding what the customer needs, prototyping and designing, building, testing, deploying on the cloud, and monitoring it in production.',
  paragraphs: [
    'I start with the customer, not the code. Who uses this, what do they need, and what must never fail? Those answers shape the architecture — which paths stay synchronous for fast feedback, which move to asynchronous workers and queues, and where caching and replication buy availability.',
    'Security is part of the design from day one, not a layer added at the end. I follow current standards and OWASP guidance — passkeys over passwords, modern password hashing, TLS 1.2+ and encryption at rest — and I keep learning as best practices change.',
  ],
};

export const lifecycle = [
  { step: 'Understand the customer', text: 'Start from real needs and constraints before choosing any technology.' },
  { step: 'Prototype & design', text: 'Sketch the system: data model, load estimates, failure modes, cloud infrastructure.' },
  { step: 'Build', text: 'Keep user-facing paths fast and synchronous; push heavy work to async workers.' },
  { step: 'Test', text: 'Check behavior, security and failure cases before anything ships.' },
  { step: 'Deploy on the cloud', text: 'Stateless instances behind load balancers, health checks, CI/CD.' },
  { step: 'Monitor & improve', text: 'Watch latency and errors in production and feed what I learn back in.' },
];

export const priorities = [
  { name: 'Latency', text: 'Fast responses where users feel it.' },
  { name: 'Availability', text: 'Failover, replication and graceful degradation.' },
  { name: 'Scalability', text: 'Horizontal scaling with stateless services.' },
  { name: 'Security', text: 'Protected end to end, by default.' },
];

export const skills: { group: Category; items: string[] }[] = [
  { group: 'Cloud', items: ['Amazon EC2', 'Azure', 'Docker', 'Kubernetes', 'Linux', 'CI/CD', 'Git & GitHub'] },
  { group: 'Backend', items: ['Python', 'FastAPI', 'Django', 'Flask', 'PostgreSQL', 'MySQL', 'DynamoDB', 'Cassandra', 'Redis', 'Kafka', 'WebSockets', 'REST APIs', 'SQL'] },
  { group: 'Security', items: ['Passkeys (FIDO2/WebAuthn)', 'Digital signatures (ECDSA/RSA)', 'TLS 1.2+', 'AES-256-GCM', 'Argon2id / bcrypt', 'RBAC', 'CSRF protection', 'Env-var secrets', 'OWASP practices'] },
  { group: 'System Design', items: ['Load balancing', 'Replication & failover', 'Async architectures', 'Parallel processing', 'Caching', 'Agile'] },
  { group: 'AI Agents', items: ['LangGraph', 'LangChain', 'Amazon Nova', 'Claude', 'Tool calling'] },
  { group: 'ML', items: ['Scikit-learn', 'TensorFlow', 'PyTorch', 'Pandas', 'NumPy', 'Matplotlib'] },
];

export const otherSkills = ['TypeScript', 'JavaScript', 'React', 'Tailwind CSS', 'HTML/CSS'];

export const education = {
  school: 'Grambling State University',
  degree: 'B.S. Computer Science',
  detail: 'GPA 3.7 · President’s List · Honors Scholar',
  expected: 'Expected Dec 2027',
  coursework: [
    'Cyber Security',
    'Secure Cloud Architecture',
    'Big Data & Cloud Security',
    'Intro to Microsoft Azure',
    'System Design',
    'Database Management',
    'Parallel Processing',
    'Computer Networks',
    'Operating Systems',
    'Data Structures & Algorithms',
    'Artificial Intelligence',
    'Machine Learning',
    'Statistics',
  ],
};

export type ExperienceItem = {
  role: string;
  org: string;
  period: string;
  location: string;
  bullets: string[];
  stack: string[];
  categories: Category[];
};

export const experience: ExperienceItem[] = [
  {
    role: 'Security Engineering Intern',
    org: 'Reserve Bank of Zimbabwe',
    period: 'May 2026 — Aug 2026',
    location: 'Remote',
    bullets: [
      'Re-architected the banking app’s authentication and authorization flow, migrating 50,000+ customer accounts from password-based login to passkeys (FIDO2/WebAuthn) to eliminate phishing and credential-stuffing risk.',
      'Implemented electronic signatures for loan and transfer transactions, providing integrity and non-repudiation through digital signatures (ECDSA/RSA) and tamper-evident audit records.',
      'Secured data in transit and at rest by configuring TLS 1.2+, encrypting stored data with AES-256-GCM, and hashing credentials with per-user salts (Argon2id/bcrypt) per OWASP cryptographic best practices.',
    ],
    stack: ['WebAuthn', 'ECDSA/RSA', 'TLS 1.2+', 'AES-256-GCM', 'Argon2id / bcrypt'],
    categories: ['Security', 'Backend'],
  },
  {
    role: 'Backend Software Engineering Intern',
    org: 'ERISA Discovery',
    period: 'Oct 2025 — Nov 2025',
    location: '',
    bullets: [
      'Designed the system architecture (data model, load estimates, failure modes, cloud infrastructure) for a real-time claims-auditing dashboard serving 20,000+ users, using Django, PostgreSQL, HTMX and Alpine.js.',
      'Scaled the dashboard horizontally with stateless app instances behind a load balancer with health-check endpoints, cutting read latency with Redis caching and query optimization on Azure DB for PostgreSQL with replication for failover.',
      'Reduced bulk CSV processing time to under 30 seconds with batched bulk_create/bulk_update and async workers, secured with RBAC, HTTPS, CSRF protection and env-var secrets, and shipped through CI/CD on Render.',
    ],
    stack: ['Django', 'PostgreSQL', 'Redis', 'Azure', 'Load balancing', 'CI/CD'],
    categories: ['Cloud', 'Backend', 'System Design', 'Security'],
  },
];
