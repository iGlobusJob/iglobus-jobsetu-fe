export interface NavItem {
  label: string;
  href?: string;
  items?: { label: string; href: string }[];
}

export const navItems: NavItem[] = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'About Us',
    href: '/aboutus',
  },
  {
    label: 'Company',
    href: '/aboutus',
    items: [
      { label: 'Services', href: '/services' },
      { label: 'Contact Us', href: '#contact' },
    ],
  },
  {
    label: 'Candidates',
    href: '#browse-jobs',
    items: [
      { label: 'Browse Jobs', href: '#browse-jobs' },
      { label: 'Job Categories', href: '#categories' },
    ],
  },
  {
    label: 'Employers',
    href: '/client/register',
    items: [
      { label: 'Post a Job', href: '/client/login' },
      { label: 'Employer Sign Up', href: '/client/register' },
    ],
  },
  {
    label: 'Contact',
    href: '#contact',
  },
];
