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
    title: 'Employer Advantages & Recruitment Flow',
    subtitle:
      'AI-assisted bulk screening, curated shortlists, and interview questions',
    image: '/4.png',
    tag: 'Hiring Solutions',
  },
  {
    id: 4,
    pageNum: 4,
    title: 'Enterprise Hiring Workflow',
    subtitle:
      'Scalable city-wide recruitment and single-dashboard applicant tracking',
    image: '/5.png',
    tag: 'Enterprise Scale',
  },
  {
    id: 5,
    pageNum: 5,
    title: 'AI Matcher Architecture',
    subtitle:
      'Deterministic fit score, structured facts extraction, and skills analysis',
    image: '/6.png',
    tag: 'AI Technology',
  },
];
