import request from "supertest";
import app from "../src/app";

let server: any;

beforeAll(() => {
    server = app.listen(3003); 
});

afterAll(() => {
    if (server) {
        server.close();
    }
});

describe("Employee API Endpoints", () => {
    let createdEmployeeId: number;
  
    it("should create a new employee", async () => {
      const newEmployee = {
        name: "Daniel",
        position: "Software Engineer",
        department: "IT",
        email: "daniel@example.com",
        phone: "675-567-7564",
        branchId: 1,
      };
  
      const response = await request(app).post("/api/v1/employees").send(newEmployee);
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("id");
  
      createdEmployeeId = response.body.id; 
    });
  
    it("should return all employees", async () => {
      const response = await request(app).get("/api/v1/employees");
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
    });
  
    it("should return the created employee by ID", async () => {
      const response = await request(app).get(`/api/v1/employees/${createdEmployeeId}`);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("name", "Daniel");
    });
  
    it("should update an employee", async () => {
      const updatedData = { position: "Senior Engineer" };
      const response = await request(app).put(`/api/v1/employees/${createdEmployeeId}`).send(updatedData);
      expect(response.status).toBe(200);
      expect(response.body.position).toBe("Senior Engineer");
    });
  
    it("should delete an employee", async () => {
      const response = await request(app).delete(`/api/v1/employees/${createdEmployeeId}`);
      expect(response.status).toBe(204);
    });
  });

  describe("Employee API Endpoints", () => {
    it("should get employees by branch ID", async () => {
        const response = await request(app).get("/api/v1/employees/branch/6");
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
    });

    it("should get employees by department", async () => {
        const response = await request(app).get("/api/v1/employees/department/IT");
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
    });
});