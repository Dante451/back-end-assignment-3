"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../src/app"));
let server;
beforeAll(() => {
    server = app_1.default.listen(3003);
});
afterAll(() => {
    if (server) {
        server.close();
    }
});
describe("Employee API Endpoints", () => {
    let createdEmployeeId;
    it("should create a new employee", () => __awaiter(void 0, void 0, void 0, function* () {
        const newEmployee = {
            name: "Raju",
            position: "Software Engineer",
            department: "IT",
            email: "raju@example.com",
            phone: "675-567-7564",
            branchId: 1,
        };
        const response = yield (0, supertest_1.default)(app_1.default).post("/api/v1/employees").send(newEmployee);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
        createdEmployeeId = response.body.id;
    }));
    it("should return all employees", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).get("/api/v1/employees");
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
    }));
    it("should return the created employee by ID", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).get(`/api/v1/employees/${createdEmployeeId}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("name", "Raju");
    }));
    it("should update an employee", () => __awaiter(void 0, void 0, void 0, function* () {
        const updatedData = { position: "Senior Engineer" };
        const response = yield (0, supertest_1.default)(app_1.default).put(`/api/v1/employees/${createdEmployeeId}`).send(updatedData);
        expect(response.status).toBe(200);
        expect(response.body.position).toBe("Senior Engineer");
    }));
    it("should delete an employee", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).delete(`/api/v1/employees/${createdEmployeeId}`);
        expect(response.status).toBe(204);
    }));
});
describe("Employee API Endpoints", () => {
    it("should get employees by branch ID", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).get("/api/v1/employees/branch/6");
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
    }));
    it("should get employees by department", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).get("/api/v1/employees/department/IT");
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
    }));
});
