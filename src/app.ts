import express from "express";
import cors from "cors";
import { router } from "./routes";
import bodyParser from "body-parser";

const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use("/api", router);

export default app;
