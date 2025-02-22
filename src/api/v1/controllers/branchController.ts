import { Request, Response } from "express";
import * as branchService from "../services/branchService";

// Get all branches
export const getAllBranches = (req: Request, res: Response): void => {
    const branches = branchService.getBranches();
    res.status(200).json(branches);
};

// Get a branch by ID
export const getBranch = (req: Request, res: Response): void => {
    const branchId = parseInt(req.params.id);
    const branch = branchService.getBranchById(branchId);
    if (!branch) {
        res.status(404).json({ message: "Branch not found" });
    } else {
        res.status(200).json(branch);
    }
};

// Create a new branch
export const createBranch = (req: Request, res: Response): void => {
    const { name, address, phone } = req.body;
    if (!name || !address || !phone) {
        res.status(400).json({ message: "All fields are required" });
        return;
    }

    const newBranch = branchService.createBranch({ name, address, phone });
    res.status(201).json(newBranch);
};

// Update an existing branch
export const updateBranch = (req: Request, res: Response): void => {
    const branchId = parseInt(req.params.id);
    const updatedBranch = branchService.updateBranch(branchId, req.body);
    if (!updatedBranch) {
        res.status(404).json({ message: "Branch not found" });
    } else {
        res.status(200).json(updatedBranch);
    }
};

// Delete a branch
export const deleteBranch = (req: Request, res: Response): void => {
    const branchId = parseInt(req.params.id);
    const isDeleted = branchService.deleteBranch(branchId);
    if (!isDeleted) {
        res.status(404).json({ message: "Branch not found" });
    } else {
        res.status(204).send();
    }
};
