import { useEffect, useState } from 'react';

/**
 * Realtime theme detector.
 * Returns 'dark' or 'light' and updates whenever the <html> class changes.
 */
export default function useTheme() {
  const read = () =>
    document.documentElement.classList.contains('dark') ? 'dark' : 'light';

  const [theme, setTheme] = useState(read());

  useEffect(() => {
    const obs = new MutationObserver(() => setTheme(read()));
    obs.observe(document.documentElement, { attributes: true });
    return () => obs.disconnect();
  }, []);

  return theme;
}