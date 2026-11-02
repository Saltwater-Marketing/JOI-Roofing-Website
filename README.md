# joiroofing.com (Juneau Odenwald Roofing)

The website for Juneau Odenwald Roofing, rebuilt off WordPress as a fast static site.
Built with [Eleventy](https://www.11ty.dev/), stored here on GitHub, hosted on Netlify.
Every change pushed to the live branch rebuilds the site automatically in about a minute.

## Where things live

| What | File |
|---|---|
| Phone, email, offices, menu, tracking IDs | `src/_data/site.json` |
| Testimonials shown on most pages | `src/_data/testimonials.json` |
| Services page groups and cards | `src/_data/services.json` |
| Gallery projects and their photos | `src/_data/projects.json` |
| Home page | `src/index.njk` |
| Service and info pages (one file each, named after the address) | `src/pages/*.html` |
| Blog posts (one file each) | `src/posts/*.html` |
| Contact, free estimate, services, gallery, blog listing | `src/*.njk` |
| Header, footer, estimate form, page layouts | `src/_includes/` |
| Styles | `src/assets/css/site.css` |
| Photos (WebP) | `src/images/` |
| Redirects for old addresses, security headers | `netlify.toml` |

Each page file starts with a short block between `---` lines: the page title for Google (`title`),
the Google description (`description`), the big heading (`h1`), the line under it (`lede`), the header photo (`hero`)
and the address (`permalink`). Change the text below that block to change the page.

## Adding a blog post

Copy any file in `src/posts/`, give it a new name, and update the block at the top
(title, description, date as `YYYY-MM-DD`, `permalink: "/your-post-address/"`, optional `image`).

## Forms

The estimate form (Contact, Free Estimate and the metal roofing ad page) uses **Netlify Forms**.
Submissions appear in Netlify under **Forms > estimate**. Set up the email alert there:
Site configuration > Notifications > Form submission notifications > add an email address.

## Launch switch: `SITE_LIVE`

Until the domain points at Netlify, the preview stays hidden from Google and tracking is off,
so test visits don't pollute analytics. At launch, add the environment variable
`SITE_LIVE` = `true` in Netlify (Site configuration > Environment variables) and redeploy. That:

- lets Google index the site (robots.txt and page tags),
- turns on Google Tag Manager (GTM-WWGJP8W), GA4 (G-CPQPCS2CJ0), Google Ads (AW-925812091) and the Meta Pixel (590504558002209),
- makes canonical links use https://joiroofing.com.

## Working on it locally (developers only)

```bash
npm install
npm start      # preview at http://localhost:8080
npm run build  # outputs the site to _site/
```
