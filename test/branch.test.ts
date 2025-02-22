import request from "supertest";
import app from "../src/app";

let server: any;

beforeAll(() => {
    server = app.listen(3002); 
});

afterAll(() => {
    if (server) {
        server.close();
    }
});

describe("Branch API Endpoints", () => {
  it("should create a new branch", async () => {
    const newBranch = {
      name: "Toronto Branch",
      address: "65 Benbow St E, Toronto, ON, M5V 267",
      phone: "987-987-8765",
    };

    const response = await request(app).post("/api/v1/branches").send(newBranch);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
  });

  it("should return all branches", async () => {
    const response = await request(app).get("/api/v1/branches");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  it("should return a branch by ID", async () => {
    const response = await request(app).get("/api/v1/branches/1");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("name", "Vancouver Branch");
  });

  it("should update a branch", async () => {
    const updatedData = { phone: "204-999-9999" };
    const response = await request(app).put("/api/v1/branches/1").send(updatedData);
    expect(response.status).toBe(200);
    expect(response.body.phone).toBe("204-999-9999");
  });

  it("should delete a branch", async () => {
    const response = await request(app).delete("/api/v1/branches/2");
    expect(response.status).toBe(204);
  });
});
