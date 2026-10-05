import type { AppId } from '../types';
export function Icon({ name, size = 24 }: { name: AppId | 'arrange' | 'arrow' | 'external' | 'home'; size?: number }) {
 const paths: Record<string, React.ReactNode> = {
 welcome: <><path d="M5 7h14v12H5zM5 11h14M9 7V4m6 3V4"/><path d="m9 15 2 2 4-4"/></>,
 memory: <><path d="M3 12c3-13 6 13 9 0S18-1 21 12M3 17c3-13 6 13 9 0S18 4 21 17"/><circle cx="12" cy="12" r="2" fill="currentColor"/></>,
 prediction: <><path d="M4 19V5M4 19h17M8 15l4-5 4 2 4-7"/><circle cx="12" cy="10" r="1.5"/><circle cx="16" cy="12" r="1.5"/></>,
 chess: <><path d="m7 19 2-6-2-3 5-7 5 3-2 3 3 4-1 6H7Zm0 2h11M12 6h.01"/></>,
 agent: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m7 9 3 3-3 3m6 0h4"/></>,
 notebook: <><path d="M6 3h13v18H6zM3 6h5M3 10h5M3 14h5M3 18h5m3-11h5m-5 4h5m-5 4h3"/></>,
 archive: <><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18m-13 5h3m3 0h3m-9 3h3m3 0h3"/></>,
 about: <><circle cx="12" cy="8" r="4"/><path d="M4 21v-2a8 8 0 0 1 16 0v2"/></>,
 contact: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/></>,
 arrange: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
 arrow: <path d="M4 12h16m-6-6 6 6-6 6"/>,external: <><path d="M14 3h7v7m0-7-11 11M10 5H4v15h15v-6"/></>,home:<><path d="m3 11 9-8 9 8M5 10v11h14V10m-10 11v-7h6v7"/></>,
 };
 return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}
