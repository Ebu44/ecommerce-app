const request = require("supertest");
const server = require("../server");

describe("Product Tests", () => {
  describe("Get Products", () => {
    test("When user wants to see all products", async () => {
      const response = await request(server).get("/product");
      expect(response.statusCode).toBe(200);
    });
  });
});
