"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const employeeRoutes_1 = __importDefault(require("./api/v1/routes/employeeRoutes"));
const branchRoutes_1 = __importDefault(require("./api/v1/routes/branchRoutes"));
const swagger_1 = require("./swagger");
const app = (0, express_1.default)();
app.use((0, morgan_1.default)("combined"));
app.use(express_1.default.json());
// Register routes
app.use("/api/v1/employees", employeeRoutes_1.default);
app.use("/api/v1/branches", branchRoutes_1.default);
// Set up Swagger UI
(0, swagger_1.setupSwagger)(app);
// Health check endpoint
app.get("/health", (req, res) => {
    res.send("Server is healthy");
});
// Start the server only when not in a test environment
if (process.env.NODE_ENV !== "test") {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}
exports.default = app;
