// The site counts as live (indexable, tracking on) when either:
//  - SITE_LIVE=true is set in Netlify, or
//  - this is Netlify's production deploy and joiroofing.com is the site's primary domain
//    (Netlify sets URL to the primary domain and CONTEXT=production on production deploys).
// Branch deploys, deploy previews and local builds stay hidden from Google with tracking off.
const live =
  process.env.SITE_LIVE === 'true' ||
  (process.env.CONTEXT === 'production' && /^https:\/\/(www\.)?joiroofing\.com\/?$/.test(process.env.URL || ''));

module.exports = {
  live,
  // the address this build is served from
  origin: live ? 'https://joiroofing.com' : (process.env.DEPLOY_PRIME_URL || process.env.URL || 'https://joiroofing.com'),
  year: new Date().getFullYear(),
};
