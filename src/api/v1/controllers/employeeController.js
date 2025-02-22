"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEmployeesByDepartment = exports.getEmployeesByBranch = exports.deleteEmployee = exports.updateEmployee = exports.createEmployee = exports.getEmployee = exports.getAllEmployees = void 0;
const employeeService = __importStar(require("../services/employeeService"));
// Get all employees
const getAllEmployees = (req, res) => {
    res.json(employeeService.getEmployees());
};
exports.getAllEmployees = getAllEmployees;
// Get employee by ID
const getEmployee = (req, res) => {
    const employee = employeeService.getEmployeeById(parseInt(req.params.id));
    if (!employee)
        return res.status(404).json({ message: "Employee not found" });
    res.json(employee);
};
exports.getEmployee = getEmployee;
// Create a new employee
const createEmployee = (req, res) => {
    const { name, position, department, email, phone, branchId } = req.body;
    if (!name || !position || !department || !email || !phone || !branchId) {
        return res.status(400).json({ message: "Missing required fields" });
    }
    const newEmployee = employeeService.createEmployee(req.body);
    res.status(201).json(newEmployee);
};
exports.createEmployee = createEmployee;
// Update an employee
const updateEmployee = (req, res) => {
    const updatedEmployee = employeeService.updateEmployee(parseInt(req.params.id), req.body);
    if (!updatedEmployee)
        return res.status(404).json({ message: "Employee not found" });
    res.json(updatedEmployee);
};
exports.updateEmployee = updateEmployee;
// Delete an employee
const deleteEmployee = (req, res) => {
    const isDeleted = employeeService.deleteEmployee(parseInt(req.params.id));
    if (!isDeleted)
        return res.status(404).json({ message: "Employee not found" });
    res.status(204).send();
};
exports.deleteEmployee = deleteEmployee;
// Get all employees for a given branch
const getEmployeesByBranch = (req, res) => {
    const branchId = parseInt(req.params.branchId, 10);
    if (isNaN(branchId)) {
        return res.status(400).json({ error: "Invalid branch ID" });
    }
    const employees = employeeService.getEmployeesByBranch(branchId);
    res.status(200).json(employees);
};
exports.getEmployeesByBranch = getEmployeesByBranch;
// Get all employees in a specific department
const getEmployeesByDepartment = (req, res) => {
    const { department } = req.params;
    if (!department) {
        return res.status(400).json({ error: "Department is required" });
    }
    const employees = employeeService.getEmployeesByDepartment(department);
    res.status(200).json(employees);
};
exports.getEmployeesByDepartment = getEmployeesByDepartment;
