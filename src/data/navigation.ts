export interface NavItem {
  label: string;
  path: string;
  id: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Overview', path: '/', id: 'hero' },
  { label: 'About', path: '/about', id: 'about' },
  { label: 'Projects', path: '/projects', id: 'projects' },
  { label: 'Ecosystem', path: '/ecosystem', id: 'ecosystem' },
  { label: 'Engineering', path: '/engineering', id: 'engineering' },
  { label: 'Stack', path: '/stack', id: 'stack' },
  { label: 'Specializations', path: '/specializations', id: 'specializations' },
  { label: 'Timeline', path: '/timeline', id: 'timeline' },
  { label: 'Contact', path: '/contact', id: 'contact' },
];
