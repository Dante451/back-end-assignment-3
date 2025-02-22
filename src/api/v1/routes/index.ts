import express, { Request, Response } from "express";

const router = express.Router();

// Employees Router
const employeesRouter = express.Router();

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
employeesRouter.get("/", (req: Request, res: Response) => {
    res.send("Employee API");
});

// Branches Router
const branchesRouter = express.Router();

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
branchesRouter.get("/", (req: Request, res: Response) => {
    res.send("Branch API");
});

// Use the routers in the main router
router.use("/employees", employeesRouter);
router.use("/branches", branchesRouter);

export default router;
