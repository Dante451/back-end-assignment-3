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
exports.deleteBranch = exports.updateBranch = exports.createBranch = exports.getBranch = exports.getAllBranches = void 0;
const branchService = __importStar(require("../services/branchService"));
// Get all branches
const getAllBranches = (req, res) => {
    const branches = branchService.getBranches();
    res.status(200).json(branches);
};
exports.getAllBranches = getAllBranches;
// Get a branch by ID
const getBranch = (req, res) => {
    const branchId = parseInt(req.params.id);
    const branch = branchService.getBranchById(branchId);
    if (!branch) {
        res.status(404).json({ message: "Branch not found" });
    }
    else {
        res.status(200).json(branch);
    }
};
exports.getBranch = getBranch;
// Create a new branch
const createBranch = (req, res) => {
    const { name, address, phone } = req.body;
    if (!name || !address || !phone) {
        res.status(400).json({ message: "All fields are required" });
        return;
    }
    const newBranch = branchService.createBranch({ name, address, phone });
    res.status(201).json(newBranch);
};
exports.createBranch = createBranch;
// Update an existing branch
const updateBranch = (req, res) => {
    const branchId = parseInt(req.params.id);
    const updatedBranch = branchService.updateBranch(branchId, req.body);
    if (!updatedBranch) {
        res.status(404).json({ message: "Branch not found" });
    }
    else {
        res.status(200).json(updatedBranch);
    }
};
exports.updateBranch = updateBranch;
// Delete a branch
const deleteBranch = (req, res) => {
    const branchId = parseInt(req.params.id);
    const isDeleted = branchService.deleteBranch(branchId);
    if (!isDeleted) {
        res.status(404).json({ message: "Branch not found" });
    }
    else {
        res.status(204).send();
    }
};
exports.deleteBranch = deleteBranch;
