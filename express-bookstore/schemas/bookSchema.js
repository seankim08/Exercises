// schemas/bookSchema.js

const bookSchema = {
  type: "object",
  required: ["isbn", "amazon_url", "author", "language", "pages", "publisher", "title", "year"],
  properties: {
    isbn: { type: "string" },
    amazon_url: { type: "string", format: "uri" },
    author: { type: "string" },
    language: { type: "string" },
    pages: { type: "integer", minimum: 1 },
    publisher: { type: "string" },
    title: { type: "string" },
    year: { type: "integer", minimum: 1000, maximum: new Date().getFullYear() }
  }
};

module.exports = bookSchema;