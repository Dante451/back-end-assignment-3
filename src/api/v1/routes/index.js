"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// Employees Router
const employeesRouter = express_1.default.Router();
/**
 * @swagger
 * /api/v1/employees:
 *   get:
 *     summary: Retrieve all employees
 *     description: Fetches a list of all employees in the system.
 *     responses:
 *       200:
 *         description: A list of employees.
 */
employeesRouter.get("/", (req, res) => {
    res.send("Employee API");
});
// Branches Router
const branchesRouter = express_1.default.Router();
/**
 * @swagger
 * /api/v1/branches:
 *   get:
 *     summary: Retrieve all branches
 *     description: Fetches a list of all branch locations.
 *     responses:
 *       200:
 *         description: A list of branches.
 */
branchesRouter.get("/", (req, res) => {
    res.send("Branch API");
});
// Use the routers in the main router
router.use("/employees", employeesRouter);
router.use("/branches", branchesRouter);
exports.default = router;
