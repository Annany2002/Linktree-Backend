import express from "express";
import cors from "cors";
import { router } from "./routes";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api", router);

export default app;
