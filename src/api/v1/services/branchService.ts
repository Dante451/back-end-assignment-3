import { Branch } from "../interfaces/branch";

let branches: Branch[] = [
  { id: 1, name: "Vancouver Branch", address: "1300 Burrard St, Vancouver, BC, V6Z 2C7", phone: "604-456-0022" },
  { id: 2, name: "Winnipeg Branch", address: "1 Portage Ave, Winnipeg, MB, R3B 2B9", phone: "204-988-2402" }
];

// Get all branches
export const getBranches = (): Branch[] => branches;

// Get branch by ID
export const getBranchById = (id: number): Branch | undefined =>
  branches.find((branch) => branch.id === id);

// Create a new branch
export const createBranch = (branch: Omit<Branch, "id">): Branch => {
  const newBranch = { id: branches.length + 1, ...branch };
  branches.push(newBranch);
  return newBranch;
};

// Update a branch
export const updateBranch = (id: number, updatedData: Partial<Branch>): Branch | null => {
  const index = branches.findIndex((branch) => branch.id === id);
  if (index === -1) return null;
  branches[index] = { ...branches[index], ...updatedData };
  return branches[index];
};

// Delete a branch
export const deleteBranch = (id: number): boolean => {
  const index = branches.findIndex((branch) => branch.id === id);
  if (index === -1) return false;
  branches.splice(index, 1);
  return true;
};
