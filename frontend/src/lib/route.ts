import { useEffect, useState } from 'react';

function read() {
  const h = window.location.hash.replace(/^#\/?/, '');
  const [page = 'home', sub = ''] = h.split('/');
  return { page: page || 'home', sub };
}

export function useRoute() {
  const [route, setRoute] = useState(read);
  useEffect(() => {
    const on = () => { setRoute(read()); window.scrollTo({ top: 0 }); };
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  return route;
}
