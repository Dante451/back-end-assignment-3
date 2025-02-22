import { Request, Response } from "express";
import * as employeeService from "../services/employeeService";

// Get all employees
export const getAllEmployees = (req: Request, res: Response) => {
  res.json(employeeService.getEmployees());
};

// Get employee by ID
export const getEmployee = (req: Request, res: Response) => {
  const employee = employeeService.getEmployeeById(parseInt(req.params.id));
  if (!employee) return res.status(404).json({ message: "Employee not found" });
  res.json(employee);
};

// Create a new employee
export const createEmployee = (req: Request, res: Response) => {
  const { name, position, department, email, phone, branchId } = req.body;
  if (!name || !position || !department || !email || !phone || !branchId) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  const newEmployee = employeeService.createEmployee(req.body);
  res.status(201).json(newEmployee);
};

// Update an employee
export const updateEmployee = (req: Request, res: Response) => {
  const updatedEmployee = employeeService.updateEmployee(parseInt(req.params.id), req.body);
  if (!updatedEmployee) return res.status(404).json({ message: "Employee not found" });
  res.json(updatedEmployee);
};

// Delete an employee
export const deleteEmployee = (req: Request, res: Response) => {
  const isDeleted = employeeService.deleteEmployee(parseInt(req.params.id));
  if (!isDeleted) return res.status(404).json({ message: "Employee not found" });
  res.status(204).send();
};

// Get all employees for a given branch
export const getEmployeesByBranch = (req: Request, res: Response) => {
  const branchId = parseInt(req.params.branchId, 10);
  if (isNaN(branchId)) {
    return res.status(400).json({ error: "Invalid branch ID" });
  }
  const employees = employeeService.getEmployeesByBranch(branchId);
  res.status(200).json(employees);
};

// Get all employees in a specific department
export const getEmployeesByDepartment = (req: Request, res: Response) => {
  const { department } = req.params;
  if (!department) {
    return res.status(400).json({ error: "Department is required" });
  }
  const employees = employeeService.getEmployeesByDepartment(department);
  res.status(200).json(employees);
};
