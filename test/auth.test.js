const request = require("supertest");
const db = require("../database/DatabaseConnect");
const server = require("../server");

describe("User Tests", () => {
  beforeAll(async () => await db.connect());
  afterEach(async () => await db.clearDatabase());
  afterAll(async () => await db.closeDatabase());

  describe("User register", () => {
    test("When user wants to register", async () => {
      const response = await request(server).post("/register").send({
        email: "a@a.com",
        first_name: "a",
        last_name: "a",
        password: "12345678",
      });
      expect(response.statusCode).toBe(200);
    });
  });

  describe("User Login", () => {
    test("When user wants to login", async () => {
      const response = await request(server).post("/login").send({
        email: "a@a.com",
        password: "12345678",
      });
      expect(response.statusCode).toBe(200);
    });
  });

  describe("Get User", () => {
    test("When user wants to join her/him profile page", async () => {
      const response = await request(server).get("/api/user/:slug");
      expect(response.statusCode).toBe(200);
    });
  });
});
