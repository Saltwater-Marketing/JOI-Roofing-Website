// SITE_LIVE=true is set in Netlify only when joiroofing.com points at Netlify.
// Until then the preview is hidden from Google and tracking stays off, so test visits don't count.
module.exports = {
  live: process.env.SITE_LIVE === 'true',
  // the address this build is served from (Netlify sets URL on every deploy)
  origin: process.env.SITE_LIVE === 'true' ? 'https://joiroofing.com' : (process.env.DEPLOY_PRIME_URL || process.env.URL || 'https://joiroofing.com'),
  year: new Date().getFullYear(),
};
