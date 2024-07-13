// __tests__/books.test.js

process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("../app");
const db = require("../db");

beforeEach(async () => {
  await db.query("DELETE FROM books");
});

afterAll(async () => {
  await db.end();
});

describe("Book Routes", () => {
  const testBook = {
    isbn: "0691161518",
    amazon_url: "http://a.co/eobPtX2",
    author: "Matthew Lane",
    language: "english",
    pages: 264,
    publisher: "Princeton University Press",
    title: "Power-Up: Unlocking the Hidden Mathematics in Video Games",
    year: 2017
  };

  test("GET /books", async () => {
    const res = await request(app).get("/books");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ books: [] });
  });

  test("POST /books", async () => {
    const res = await request(app).post("/books").send(testBook);
    expect(res.statusCode).toBe(201);
    expect(res.body.book).toEqual(testBook);
  });

  test("POST /books with invalid data", async () => {
    const invalidBook = { ...testBook, pages: "not a number" };
    const res = await request(app).post("/books").send(invalidBook);
    expect(res.statusCode).toBe(400);
  });

  test("GET /books/:isbn", async () => {
    await request(app).post("/books").send(testBook);
    const res = await request(app).get(`/books/${testBook.isbn}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.book).toEqual(testBook);
  });

  test("PUT /books/:isbn", async () => {
    await request(app).post("/books").send(testBook);
    const updatedBook = { ...testBook, title: "Updated Title" };
    const res = await request(app).put(`/books/${testBook.isbn}`).send(updatedBook);
    expect(res.statusCode).toBe(200);
    expect(res.body.book).toEqual(updatedBook);
  });

  test("DELETE /books/:isbn", async () => {
    await request(app).post("/books").send(testBook);
    const res = await request(app).delete(`/books/${testBook.isbn}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: "Book deleted" });
  });
});