/**
 * Resolve the API origin once for every portal service.
 *
 * Vite replaces an unset VITE_SERVER_URL with `undefined` at build time. Axios
 * treats that as a relative URL and accidentally posts API requests to the
 * static portal host. The explicit production fallback prevents that failure
 * mode while retaining VITE_SERVER_URL as the deployment override.
 */
export const API_BASE_URL = (
  import.meta.env.VITE_SERVER_URL ||
  (import.meta.env.PROD ? 'https://iglobus-jobsetu-be.vercel.app' : '')
).replace(/\/+$/, '');
