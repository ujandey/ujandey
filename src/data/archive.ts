export interface ArchiveProject {
  id: string;
  title: string;
  category: string;
  description: string;
  source: string;
  live?: string;
  screenshot?: string;
  screenshotAlt?: string;
  accent: 'blue' | 'moss' | 'amber';
  mark: string;
  technology: string;
}

export const archiveProjects: ArchiveProject[] = [
  {
    id: 'noted', title: 'Noted', category: 'Notes & sketches',
    description: 'A React notes and drawing application with browser-local persistence. A small web project for keeping thoughts and sketches together.',
    source: 'https://github.com/ujandey/Noted', live: 'https://noted-one-sandy.vercel.app/',
    screenshot: '/archive/noted.png', screenshotAlt: 'Original Noted screenshot: three colored note cards and an add-note control.', accent: 'moss', mark: 'N.', technology: 'React · Browser storage',
  },
];
