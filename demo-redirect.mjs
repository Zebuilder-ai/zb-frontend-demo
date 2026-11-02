const DEMO_BASE = '/zb-frontend-demo/';
// Mirrors PRODUCT_EDITIONS (vite.edition.ts) on purpose: this file runs as is
// in the browser, from the demo's 404.html, and cannot import TypeScript.
const EDITIONS = ['v1', 'v2'];
const DEFAULT_TARGET = `${DEMO_BASE}v1/`;

/**
 * Where the demo's root 404.html sends a visitor. GitHub Pages serves only the
 * site's root 404.html, so a deep link into an edition is handed to that
 * edition's index.html, which restores it before its router starts
 * (src/app/deep-link.ts). Anything else lands on the v1 root, never off origin.
 *
 * @param {{ pathname: string, search: string, hash: string }} location
 * @returns {string}
 */
export function fallbackTarget(location) {
  if (!location.pathname.startsWith(DEMO_BASE)) return DEFAULT_TARGET;
  const [edition, ...segments] = location.pathname.slice(DEMO_BASE.length).split('/');
  if (!EDITIONS.includes(edition)) return DEFAULT_TARGET;
  const deepLink = `/${segments.join('/')}${location.search}${location.hash}`;
  return `${DEMO_BASE}${edition}/?deepLink=${encodeURIComponent(deepLink)}`;
}
