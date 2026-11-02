module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ 'src/assets': 'assets', 'src/images': 'images', 'src/files': 'files' });
  eleventyConfig.addPassthroughCopy('src/favicon.png');
  eleventyConfig.addPassthroughCopy('src/apple-touch-icon.png');
  eleventyConfig.addWatchTarget('src/assets/');

  eleventyConfig.addFilter('dateLong', d => new Date(d).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' }));
  eleventyConfig.addFilter('isoDate', d => new Date(d).toISOString().slice(0, 10));
  eleventyConfig.addFilter('json', v => JSON.stringify(v).replace(/</g, '\\u003c'));
  eleventyConfig.addFilter('plain', s => String(s || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
  eleventyConfig.addFilter('truncate', (s, n) => { s = String(s || ''); return s.length > n ? s.slice(0, s.lastIndexOf(' ', n)) + '…' : s; });
  eleventyConfig.addFilter('byUrl', (list, url) => (list || []).find(x => x.url === url));
  eleventyConfig.addFilter('isActive', (item, url) => !!url && (url === item.url || (item.children || []).some(c => c.url === url) || (item.url !== '/' && url.startsWith(item.url))));
  eleventyConfig.addCollection('posts', api => api.getFilteredByGlob('src/posts/*.html').sort((a, b) => b.date - a.date));
  eleventyConfig.addCollection('pages', api => api.getFilteredByGlob('src/pages/*.html'));

  return {
    dir: { input: 'src', includes: '_includes', data: '_data', output: '_site' },
    htmlTemplateEngine: 'njk', markdownTemplateEngine: 'njk', templateFormats: ['njk', 'html', 'md', '11ty.js'],
  };
};
