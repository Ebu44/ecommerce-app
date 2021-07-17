const request = require("supertest");
const server = require("../server");

describe("POST /users", () => {
  describe("User register", () => {
    test("must return 201 status code", async () => {
      const response = await request(server).post("/register").send({
        email: "a@a.com",
        first_name: "a",
        last_name: "a",
        password: "12345678",
      });
      expect(response.statusCode).toBe(201);
    });
  });
});
