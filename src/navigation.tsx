import { useEffect, useState, type ComponentProps } from 'react';
import type { AppId } from './types';

export const navigationEvent = 'ujanos:navigate';
export function navigateTo(href: string, replace = false) {
  if (location.pathname + location.search + location.hash !== href) {
    history[replace ? 'replaceState' : 'pushState']({}, '', href);
  }
  window.dispatchEvent(new Event(navigationEvent));
}
export function AppLink({ href, onClick, ...props }: ComponentProps<'a'> & { href: string }) {
  return <a {...props} href={href} onClick={event => {
    onClick?.(event);
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || props.target === '_blank') return;
    event.preventDefault();
    navigateTo(href);
  }}/>;
}
export function choiceHref(id: AppId, key: string, value: string) {
  const query = location.pathname === `/${id}` ? new URLSearchParams(location.search) : new URLSearchParams();
  query.set(key, value);
  return `/${id}?${query}`;
}
export function useRouteChoice<T extends string>(id: AppId, key: string, values: readonly T[], fallback: T) {
  const read = (): T | null => {
    if (location.pathname !== `/${id}`) return null;
    const value = new URLSearchParams(location.search).get(key);
    return values.find(item => item === value) ?? fallback;
  };
  const [value, setValue] = useState<T>(() => read() ?? fallback);
  useEffect(() => {
    const update = () => { const next = read(); if (next !== null) setValue(next); };
    window.addEventListener('popstate', update);
    window.addEventListener(navigationEvent, update);
    return () => { window.removeEventListener('popstate', update); window.removeEventListener(navigationEvent, update); };
  });
  const change = (next: T) => { setValue(next); navigateTo(choiceHref(id, key, next)); };
  return [value, change] as const;
}
