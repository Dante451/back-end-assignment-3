import request from "supertest";
import app from "../src/app";

let server: any;

beforeAll(() => {
    server = app.listen(3001); 
});

afterAll(() => {
    if (server) {
        server.close(); 
    }
});

describe("GET /health", () => {
    it("should return 200 OK", async () => {
        const response = await request(app).get("/health");
        expect(response.status).toBe(200);
        expect(response.text).toBe("Server is healthy");
    });
});
