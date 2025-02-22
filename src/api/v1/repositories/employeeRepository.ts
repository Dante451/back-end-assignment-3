import admin from "../config/firebase";
import { RepositoryError } from "../middleware/errorMiddleware";

const db = admin.firestore();
const employeesCollection = db.collection("employees");

class EmployeeRepository {
  // 🔹 Create Employee
  async createEmployee(employeeData: any) {
    try {
      const newEmployeeRef = await employeesCollection.add(employeeData);
      const newEmployeeDoc = await newEmployeeRef.get();
      return { id: newEmployeeDoc.id, ...newEmployeeDoc.data() };
    } catch (error) {
      throw new RepositoryError("Failed to create employee", error);
    }
  }

  // 🔹 Get All Employees
  async getAllEmployees() {
    try {
      const snapshot = await employeesCollection.get();
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      throw new RepositoryError("Failed to fetch employees", error);
    }
  }

  // 🔹 Get Employee By ID
  async getEmployeeById(id: string) {
    try {
      const doc = await employeesCollection.doc(id).get();
      if (!doc.exists) {
        return null;
      }
      return { id: doc.id, ...doc.data() };
    } catch (error) {
      throw new RepositoryError(`Failed to get employee with ID: ${id}`, error);
    }
  }

  // 🔹 Update Employee
  async updateEmployee(id: string, updateData: any) {
    try {
      const employeeRef = employeesCollection.doc(id);
      const doc = await employeeRef.get();
      if (!doc.exists) {
        return null;
      }
      await employeeRef.update(updateData);
      const updatedDoc = await employeeRef.get(); // Fetch updated employee
      return { id, ...updatedDoc.data() };
    } catch (error) {
      throw new RepositoryError(`Failed to update employee with ID: ${id}`, error);
    }
  }

  // 🔹 Delete Employee
  async deleteEmployee(id: string) {
    try {
      const employeeRef = employeesCollection.doc(id);
      const doc = await employeeRef.get();
      if (!doc.exists) {
        return null;
      }
      await employeeRef.delete();
      return true;
    } catch (error) {
      throw new RepositoryError(`Failed to delete employee with ID: ${id}`, error);
    }
  }

  // 🔹 Get Employees by Branch ✅ FIXED to prevent failures
  async getEmployeesByBranch(branchId: string) {
    try {
      if (!branchId) throw new RepositoryError("Branch ID is required", null);
      const snapshot = await employeesCollection.where("branchId", "==", branchId).get();
      if (snapshot.empty) return [];
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      throw new RepositoryError(`Failed to get employees for branch ${branchId}`, error);
    }
  }

  // 🔹 Get Employees by Department ✅ FIXED to prevent failures
  async getEmployeesByDepartment(department: string) {
    try {
      if (!department) throw new RepositoryError("Department is required", null);
      const snapshot = await employeesCollection.where("department", "==", department).get();
      if (snapshot.empty) return [];
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      throw new RepositoryError(`Failed to get employees for department ${department}`, error);
    }
  }
}

// Export an instance of the repository
export default new EmployeeRepository();
