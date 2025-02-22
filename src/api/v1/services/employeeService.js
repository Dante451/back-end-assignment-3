"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEmployeesByDepartment = exports.getEmployeesByBranch = exports.deleteEmployee = exports.updateEmployee = exports.createEmployee = exports.getEmployeeById = exports.getEmployees = void 0;
let employees = [
    { id: 1, name: "John Black", position: "Branch Manager", department: "Management", email: "john.black@pixell-river.com", phone: "204-555-0466", branchId: 6 },
    { id: 2, name: "Samantha Wright", position: "Customer Service Representative", department: "Customer Service", email: "samantha.wright@pixell-river.com", phone: "416-555-0380", branchId: 8 }
];
// Get all employees
const getEmployees = () => employees;
exports.getEmployees = getEmployees;
// Get employee by ID
const getEmployeeById = (id) => employees.find((emp) => emp.id === id);
exports.getEmployeeById = getEmployeeById;
// Create a new employee
const createEmployee = (employee) => {
    const newEmployee = Object.assign({ id: employees.length + 1 }, employee);
    employees.push(newEmployee);
    return newEmployee;
};
exports.createEmployee = createEmployee;
// Update an employee
const updateEmployee = (id, updatedData) => {
    const index = employees.findIndex((emp) => emp.id === id);
    if (index === -1)
        return null;
    employees[index] = Object.assign(Object.assign({}, employees[index]), updatedData);
    return employees[index];
};
exports.updateEmployee = updateEmployee;
// Delete an employee
const deleteEmployee = (id) => {
    const index = employees.findIndex((emp) => emp.id === id);
    if (index === -1)
        return false;
    employees.splice(index, 1);
    return true;
};
exports.deleteEmployee = deleteEmployee;
// Get employees by branch ID
const getEmployeesByBranch = (branchId) => employees.filter(emp => emp.branchId === branchId);
exports.getEmployeesByBranch = getEmployeesByBranch;
// Get employees by department
const getEmployeesByDepartment = (department) => employees.filter(emp => emp.department.toLowerCase() === department.toLowerCase());
exports.getEmployeesByDepartment = getEmployeesByDepartment;
