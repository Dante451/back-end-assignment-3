import request from "supertest";
import app from "../src/app";

describe("Global Error Handling Middleware", () => {
  it("should return a 404 error for a non-existent route", async () => {
    const res = await request(app).get("/api/v1/unknown-route");
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("error", "Route not found");
  });

  it("should return a 400 error for invalid data", async () => {
    const res = await request(app).post("/api/v1/employees").send({});
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message");
    expect(res.body.message).toMatch(/required/);
  });

  it("should return a 500 error for internal server errors", async () => {
    const res = await request(app).get("/api/v1/test-error");

    console.log("DEBUG - Received Response:", {
        status: res.status,
        body: res.body,
        headers: res.headers,
      });
      
    expect(res.status).toBe(500);
    expect(res.body).toHaveProperty("message", "Internal Server Error");
  });
});
