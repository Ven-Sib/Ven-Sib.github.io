import { useEffect, useState } from 'react';

function read() {
  const h = window.location.hash.replace(/^#\/?/, '');
  const [page = 'home', sub = ''] = h.split('/');
  return { page: page || 'home', sub };
}

/* ---- remembers the path you took, so "Back" returns to where you came from ---- */
const stack: string[] = [window.location.hash];

function track(hash: string) {
  if (stack.length > 1 && stack[stack.length - 2] === hash) stack.pop(); // went back
  else if (stack[stack.length - 1] !== hash) stack.push(hash);             // went forward
}

const LABELS: Record<string, string> = {
  home: 'Home', about: 'About', experience: 'Experience', projects: 'Projects',
  leadership: 'Leadership', postings: 'Postings', admin: 'Admin',
};

/** Name of the page you came from (for the "Back to …" label). */
export function backLabel(): string {
  if (stack.length < 2) return 'Home';
  const prev = stack[stack.length - 2].replace(/^#\/?/, '').split('/')[0] || 'home';
  return LABELS[prev] ?? 'Home';
}

/** Go to the previous page of your path; if you landed here directly, go Home. */
export function goBack() {
  if (stack.length > 1) window.history.back();
  else window.location.hash = '#/';
}

export function useRoute() {
  const [route, setRoute] = useState(read);
  useEffect(() => {
    const on = () => { track(window.location.hash); setRoute(read()); window.scrollTo({ top: 0 }); };
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  return route;
}
