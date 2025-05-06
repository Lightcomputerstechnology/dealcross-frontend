// hooks/useTheme.js
import { useEffect, useState } from 'react';

export default function useTheme() {
  const get = () =>
    document.documentElement.classList.contains('dark') ? 'dark' : 'light';

  const [theme, setTheme] = useState(get());

  useEffect(() => {
    const observer = new MutationObserver(() => setTheme(get()));
    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  return theme;          // 'dark' | 'light'
}