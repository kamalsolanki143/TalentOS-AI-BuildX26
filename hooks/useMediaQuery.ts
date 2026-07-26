'use client';

import { useState, useEffect } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
}

export function useBreakpoints() {
  const isMobileXs = useMediaQuery('(min-width: 320px)');
  const isMobileSm = useMediaQuery('(min-width: 375px)');
  const isMobileLg = useMediaQuery('(min-width: 425px)');
  const isTablet = useMediaQuery('(min-width: 768px)');
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const isWidescreen = useMediaQuery('(min-width: 1280px)');
  const is2Xl = useMediaQuery('(min-width: 1536px)');

  return {
    isMobileXs,
    isMobileSm,
    isMobileLg,
    isTablet,
    isDesktop,
    isWidescreen,
    is2Xl,
  };
}
