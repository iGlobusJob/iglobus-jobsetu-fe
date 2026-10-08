export interface BrochurePageItem {
  id: number;
  pageNum: number;
  title: string;
  subtitle: string;
  image: string;
  tag: string;
}

export const brochurePages: BrochurePageItem[] = [
  {
    id: 1,
    pageNum: 1,
    title: 'Mission & Vision',
    subtitle:
      'Creating 20,000 employment opportunities in Telangana in 2 years',
    image: '/2.png',
    tag: 'Strategic Vision',
  },
  {
    id: 2,
    pageNum: 2,
    title: 'What We Do & Candidate Advantages',
    subtitle: 'AI resume builder, role match analysis, and skill gap insights',
    image: '/3.png',
    tag: 'Candidate Platform',
  },
  {
    id: 3,
    pageNum: 3,
    title: 'Employer Advantages',
    subtitle:
      'AI-assisted screening, bulk resume comparison, curated shortlists, and single dashboard tracking',
    image: '/5.png',
    tag: 'Employer Solutions',
  },
  {
    id: 4,
    pageNum: 4,
    title: 'Process Flow & AI Matcher',
    subtitle:
      'Structured facts extraction, skills and domain analysis, and deterministic fit calculation',
    image: '/6.png',
    tag: 'Process Flow',
  },
  {
    id: 5,
    pageNum: 5,
    title: 'Connecting Udyog Sethu with Businesses',
    subtitle:
      'Business network expansion with MSMEs, SMEs, growing organizations, and local employers',
    image: '/7.png',
    tag: 'Business Network',
  },
  {
    id: 6,
    pageNum: 6,
    title: 'TASK Partnership (Telangana Academy for Skill and Knowledge)',
    subtitle:
      'Connecting skilled candidates, IT industry requirements, and employment drives across Telangana',
    image: '/8.png',
    tag: 'Skill & Employment',
  },
];
