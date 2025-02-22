import { Employee } from "../interfaces/employee";

let employees: Employee[] = [
  { id: 1, name: "John Black", position: "Branch Manager", department: "Management", email: "john.black@pixell-river.com", phone: "204-555-0466", branchId: 6 },
  { id: 2, name: "Samantha Wright", position: "Customer Service Representative", department: "Customer Service", email: "samantha.wright@pixell-river.com", phone: "416-555-0380", branchId: 8 }
];

// Get all employees
export const getEmployees = (): Employee[] => employees;

// Get employee by ID
export const getEmployeeById = (id: number): Employee | undefined =>
  employees.find((emp) => emp.id === id);

// Create a new employee
export const createEmployee = (employee: Omit<Employee, "id">): Employee => {
  const newEmployee = { id: employees.length + 1, ...employee };
  employees.push(newEmployee);
  return newEmployee;
};

// Update an employee
export const updateEmployee = (id: number, updatedData: Partial<Employee>): Employee | null => {
  const index = employees.findIndex((emp) => emp.id === id);
  if (index === -1) return null;
  employees[index] = { ...employees[index], ...updatedData };
  return employees[index];
};

// Delete an employee
export const deleteEmployee = (id: number): boolean => {
  const index = employees.findIndex((emp) => emp.id === id);
  if (index === -1) return false;
  employees.splice(index, 1);
  return true;
};

// Get employees by branch ID
export const getEmployeesByBranch = (branchId: number): Employee[] =>
    employees.filter(emp => emp.branchId === branchId);

// Get employees by department
export const getEmployeesByDepartment = (department: string): Employee[] =>
    employees.filter(emp => emp.department.toLowerCase() === department.toLowerCase());