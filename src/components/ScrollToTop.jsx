import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function scrollToHashTarget(hash) {
  const id = hash.replace(/^#/, '');
  if (!id) return false;

  const element = document.getElementById(id);
  if (!element) return false;

  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  return true;
}

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      if (scrollToHashTarget(hash)) return undefined;

      const timers = [0, 50, 150, 300].map((delay) =>
        window.setTimeout(() => scrollToHashTarget(hash), delay),
      );

      return () => {
        timers.forEach((timer) => window.clearTimeout(timer));
      };
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    return undefined;
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
