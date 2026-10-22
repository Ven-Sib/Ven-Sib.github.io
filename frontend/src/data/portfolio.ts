// ============================================================
//  EDIT THIS FILE to change what the site says.
//  Everything on the page (except Postings) comes from here.
// ============================================================

export const profile = {
  name: 'Vensen Sibanda',
  fullName: 'Vensen Siamaindi Sibanda',
  role: 'Computer Science @ Grambling State University',
  headline: 'I build backend systems and AI agents that run in the cloud.',
  intro:
    'Cloud infrastructure, backend services, distributed system design, AI agents and machine learning — and I post what I learn along the way.',
  email: 'sibandavensen@gmail.com',
  github: 'https://github.com/Ven-Sib',
  linkedin: '', // paste your LinkedIn URL here, e.g. 'https://www.linkedin.com/in/yourname'
  resume: '/resume.pdf',
};

// The five areas you want to be known for, in the order you gave.
export const categories = ['Cloud', 'Backend', 'System Design', 'AI Agents', 'ML'] as const;
export type Category = (typeof categories)[number];

export const focus: { title: Category; blurb: string; topics: string[] }[] = [
  {
    title: 'Cloud',
    blurb: 'Running software on infrastructure that scales and stays secure.',
    topics: ['EC2 & load balancing', 'Autoscaling', 'Securing data', 'Docker & Kubernetes', 'Azure', 'CI/CD'],
  },
  {
    title: 'Backend',
    blurb: 'APIs and data layers built for real traffic.',
    topics: ['FastAPI · Django · Flask', 'PostgreSQL · MySQL', 'DynamoDB · Cassandra', 'Redis', 'Kafka · WebSockets', 'Auth & REST'],
  },
  {
    title: 'System Design',
    blurb: 'Making trade-offs explicit before writing code.',
    topics: ['Replication', 'Async architectures', 'Parallel processing', 'Caching', 'Queues & streams', 'Consistency vs. availability'],
  },
  {
    title: 'AI Agents',
    blurb: 'LLM agents that call tools, verify claims and take actions.',
    topics: ['LangGraph', 'LangChain', 'Tool calling', 'Amazon Nova', 'Claude', 'Voice & real-time agents'],
  },
  {
    title: 'ML',
    blurb: 'Classical ML pipelines with honest evaluation.',
    topics: ['Scikit-learn', 'PyTorch · TensorFlow', 'Pandas · NumPy', 'Cross-validation', 'Feature engineering', 'Responsible AI'],
  },
];

export type Project = {
  title: string;
  org: string;
  period: string;
  summary: string;
  bullets: string[];
  stack: string[];
  categories: Category[]; // <- we will regroup these together later
  link?: string;
};

export const projects: Project[] = [
  {
    title: 'ClearVote',
    org: 'Carnegie Student Leadership Program',
    period: 'Jun 2026 — Present',
    summary:
      'An AI agent that flags potentially misleading voter information and links to verified sources.',
    bullets: [
      'Verification pipeline ingests trusted sources, compares them with claims users surface on the web, and produces credibility assessments — 80%+ detection coverage in testing.',
      'Led the LangGraph orchestration layer: agent nodes, tool calls and verification workflows across a backend and React frontend.',
    ],
    stack: ['LangGraph', 'LLM APIs', 'React', 'Python'],
    categories: ['AI Agents', 'Backend'],
  },
  {
    title: 'Amazon Music Voice Agent',
    org: 'Amazon Nova Hackathon',
    period: 'Mar 2026 — Apr 2026',
    summary: 'A Chrome extension that controls Amazon Music with natural speech.',
    bullets: [
      'Real-time audio pipeline: Media Recorder API → Kafka and WebSockets → FastAPI backend for low-latency voice interaction.',
      'Nova Sonic for speech understanding, Nova Lite for command reasoning, Nova Act for UI automation.',
    ],
    stack: ['FastAPI', 'Kafka', 'WebSockets', 'React + TypeScript', 'Amazon Nova'],
    categories: ['AI Agents', 'Backend', 'System Design'],
  },
];

export const education = {
  school: 'Grambling State University',
  degree: 'B.S. Computer Science',
  detail: 'GPA 3.7 · President’s List · Honors Scholar',
  expected: 'Expected Dec 2027',
  coursework: [
    'Data Structures & Algorithms',
    'Operating Systems',
    'Computer Networks',
    'System Design',
    'Database Management',
    'Parallel Processing',
    'Big Data & Cloud Security',
    'Secure Cloud Architecture',
    'Machine Learning',
    'Artificial Intelligence',
    'Agentic AI',
  ],
};

export const programs = [
  { name: 'AI4ALL Ignite Fellow', when: 'May 2026 — Present' },
  { name: 'Eaton emPOWERU Leadership Summit', when: 'Jun 2026' },
  { name: 'EY Expedition Global Learning Program', when: 'Mar 2026 — Present' },
  { name: 'Spectrum Sizzle Workshop — FCC recommendations on sidelink spectrum', when: 'Jun 2026' },
];

// ------------------------------------------------------------
//  New in v2: About / Experience / Leadership / Skills
// ------------------------------------------------------------

export const about = {
  paragraphs: [
    'I’m a Computer Science student at Grambling State University (GPA 3.7, Honors Scholar, President’s List) graduating in December 2027. I’m focused on backend engineering and cloud systems — how services are built, deployed, scaled and kept secure.',
    'My work spans a Django claims-audit platform built for 2,000+ users, a real-time voice agent streaming audio through Kafka and WebSockets, and an LLM agent that verifies voter information. Alongside that I’m learning system design in depth: load balancing, replication, asynchronous architectures and parallel processing.',
    'I post what I learn — videos, LeetCode problems and notes — on the Postings page.',
  ],
};

export const skills: { group: Category; items: string[] }[] = [
  { group: 'Cloud', items: ['Amazon EC2', 'Azure', 'Docker', 'Kubernetes', 'Linux', 'CI/CD', 'Git & GitHub'] },
  { group: 'Backend', items: ['Python', 'FastAPI', 'Django', 'Flask', 'PostgreSQL', 'MySQL', 'DynamoDB', 'Cassandra', 'Redis', 'Kafka', 'WebSockets', 'REST APIs', 'SQL'] },
  { group: 'System Design', items: ['Load balancing', 'Replication', 'Async architectures', 'Parallel processing', 'Caching', 'Agile'] },
  { group: 'AI Agents', items: ['LangGraph', 'LangChain', 'Amazon Nova', 'Claude', 'Tool calling'] },
  { group: 'ML', items: ['Scikit-learn', 'TensorFlow', 'PyTorch', 'Pandas', 'NumPy', 'Matplotlib'] },
];

export const otherSkills = ['TypeScript', 'JavaScript', 'React', 'Tailwind CSS', 'HTML/CSS'];

export type ExperienceItem = {
  role: string;
  org: string;
  period: string;
  bullets: string[];
  stack: string[];
  categories: Category[];
};

export const experience: ExperienceItem[] = [
  {
    role: 'AI4ALL Ignite Fellow',
    org: 'AI4ALL',
    period: 'May 2026 — Present',
    bullets: [
      'Designing an end-to-end supervised ML pipeline to predict atmospheric carbon monoxide concentrations from multivariate environmental sensor data.',
      'EDA, feature engineering, visualization, preprocessing and missing-value imputation with Python, Pandas, NumPy and Matplotlib.',
      'Evaluating Linear Regression and Random Forest models with cross-validation and feature-importance analysis.',
      'Building reproducible ML workflows with a multidisciplinary team, with attention to bias, interpretability and responsible AI.',
    ],
    stack: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'Matplotlib'],
    categories: ['ML'],
  },
  {
    role: 'Insurance Claims Audit System',
    org: 'ERISA Discovery',
    period: 'Oct 2025 — Nov 2025',
    bullets: [
      'Built a dashboard for managing insurance claims with real-time collaboration for 2,000+ users, using Django, PostgreSQL, HTMX, Alpine.js, Bootstrap and JavaScript.',
      'Optimized bulk CSV processing to under 30 seconds with bulk create/update, and implemented role-based authentication.',
      'Deployed on Render with CI/CD and production security: HTTPS, CSRF protection and environment-variable secrets.',
    ],
    stack: ['Django', 'PostgreSQL', 'HTMX', 'Alpine.js', 'Render'],
    categories: ['Backend', 'Cloud'],
  },
];

export const leadership = [
  {
    name: 'Eaton emPOWERU Leadership Summit',
    place: 'Grambling, LA',
    when: 'Jun 2026 — Present',
    detail:
      'Selected participant. Executive-led workshops on leadership, collaboration and engineering problem-solving.',
  },
  {
    name: 'Expedition EY — EY Global Learning Program',
    place: 'Virtual',
    when: 'Mar 2026 — Present',
    detail:
      'Selected participant. Workshops and mentorship with EY professionals on business strategy, consulting problem-solving and career readiness.',
  },
  {
    name: 'Spectrum Sizzle Advanced Undergraduate Workshop',
    place: '',
    when: 'Jun 2026',
    detail:
      'Evaluated Qualcomm sidelink spectrum proposals and submitted engineering recommendations to the FCC, while studying adaptive spectrum sharing and AI-enabled wireless systems.',
  },
  {
    name: 'Carnegie Student Leadership Program',
    place: '',
    when: 'Jun 2026 — Present',
    detail: 'Co-developing ClearVote, an AI agent that flags misleading voter information; led its LangGraph orchestration layer.',
  },
];
