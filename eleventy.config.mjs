export default function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy('src/data');
  eleventyConfig.ignores.add('src/index.html');

  return {
    dir: {
      input: 'src',
      output: '_site',
      includes: '_includes',
      layouts: '_layouts'
    }
  };
}