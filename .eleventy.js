const { DateTime } = require("luxon");
const slugify = require("slugify");

module.exports = function(eleventyConfig) {
  // Pass the `assets` folder through to the final build
  eleventyConfig.addPassthroughCopy("assets");

  // A readable date filter (e.g., "Aug 15, 2025")
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    if (dateObj instanceof Date) {
      return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat("LLL dd, yyyy");
    }
    return dateObj;
  });

  // Custom slugify filter for URLs
  eleventyConfig.addFilter("slugify", (str) => {
    return slugify(str, {
      lower: true,
      strict: true,
      remove: /[*+~.()'"!:@]/g
    });
  });

  // Get all articles, sorted by date (newest first)
  eleventyConfig.addCollection("articles", function(collectionApi) {
    return collectionApi.getFilteredByGlob("articles/*.md").sort(function(a, b) {
      return b.date - a.date;
    });
  });

  return {
    dir: {
      input: ".",
      includes: "_includes",
      output: "_site",
    },
    templateFormats: ["md", "njk"],
    markdownTemplateEngine: "njk",
  };
};
