import express from "express";
import cors from "cors";
import { router } from "./routes";
import path from "path";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "../public")));

// Routes
app.use("/api", router);

export default app;
