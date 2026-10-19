export interface NavItem {
  label: string;
  path: string;
  id: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', path: '/', id: 'hero' },
  { label: 'Projects', path: '/projects', id: 'projects' },
  { label: 'Certifications', path: '/certifications', id: 'certifications' },
  { label: 'About', path: '/about', id: 'about' },
  { label: 'Contact', path: '/contact', id: 'contact' },
];
