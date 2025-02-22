"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBranch = exports.updateBranch = exports.createBranch = exports.getBranchById = exports.getBranches = void 0;
let branches = [
    { id: 1, name: "Vancouver Branch", address: "1300 Burrard St, Vancouver, BC, V6Z 2C7", phone: "604-456-0022" },
    { id: 2, name: "Winnipeg Branch", address: "1 Portage Ave, Winnipeg, MB, R3B 2B9", phone: "204-988-2402" }
];
// Get all branches
const getBranches = () => branches;
exports.getBranches = getBranches;
// Get branch by ID
const getBranchById = (id) => branches.find((branch) => branch.id === id);
exports.getBranchById = getBranchById;
// Create a new branch
const createBranch = (branch) => {
    const newBranch = Object.assign({ id: branches.length + 1 }, branch);
    branches.push(newBranch);
    return newBranch;
};
exports.createBranch = createBranch;
// Update a branch
const updateBranch = (id, updatedData) => {
    const index = branches.findIndex((branch) => branch.id === id);
    if (index === -1)
        return null;
    branches[index] = Object.assign(Object.assign({}, branches[index]), updatedData);
    return branches[index];
};
exports.updateBranch = updateBranch;
// Delete a branch
const deleteBranch = (id) => {
    const index = branches.findIndex((branch) => branch.id === id);
    if (index === -1)
        return false;
    branches.splice(index, 1);
    return true;
};
exports.deleteBranch = deleteBranch;
