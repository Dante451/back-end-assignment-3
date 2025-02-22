import express from "express";
import morgan from "morgan";
import employeeRoutes from "./api/v1/routes/employeeRoutes";
import branchRoutes from "./api/v1/routes/branchRoutes";
import { setupSwagger } from "./swagger"; 

const app = express();

app.use(morgan("combined"));
app.use(express.json());

// Register routes
app.use("/api/v1/employees", employeeRoutes);
app.use("/api/v1/branches", branchRoutes);

// Set up Swagger UI
setupSwagger(app);  

// Health check endpoint
app.get("/health", (req, res) => {
    res.send("Server is healthy");
});

// Start the server only when not in a test environment
if (process.env.NODE_ENV !== "test") {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

export default app;
