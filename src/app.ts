import cors from "cors";
import express from "express";

import apiRouter from "./routes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.status(200).json({
    message: "Server is running",
  });
});

app.use("/api", apiRouter);

export default app;