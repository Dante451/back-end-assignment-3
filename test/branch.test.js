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
    server = app_1.default.listen(3002);
});
afterAll(() => {
    if (server) {
        server.close();
    }
});
describe("Branch API Endpoints", () => {
    it("should create a new branch", () => __awaiter(void 0, void 0, void 0, function* () {
        const newBranch = {
            name: "Toronto Branch",
            address: "65 Benbow St E, Toronto, ON, M5V 267",
            phone: "987-987-8765",
        };
        const response = yield (0, supertest_1.default)(app_1.default).post("/api/v1/branches").send(newBranch);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
    }));
    it("should return all branches", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).get("/api/v1/branches");
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
    }));
    it("should return a branch by ID", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).get("/api/v1/branches/1");
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("name", "Vancouver Branch");
    }));
    it("should update a branch", () => __awaiter(void 0, void 0, void 0, function* () {
        const updatedData = { phone: "204-999-9999" };
        const response = yield (0, supertest_1.default)(app_1.default).put("/api/v1/branches/1").send(updatedData);
        expect(response.status).toBe(200);
        expect(response.body.phone).toBe("204-999-9999");
    }));
    it("should delete a branch", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).delete("/api/v1/branches/2");
        expect(response.status).toBe(204);
    }));
});
