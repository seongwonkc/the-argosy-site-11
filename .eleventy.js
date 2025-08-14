const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {
  // Pass the `assets` folder through to the final build
  eleventyConfig.addPassthroughCopy("assets");

  // A readable date filter (e.g., "Aug 15, 2025")
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    // Ensure dateObj is a valid Date object before formatting
    if (dateObj instanceof Date) {
      return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat("LLL dd, yyyy");
    }
    return dateObj; // Return original value if not a date
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
