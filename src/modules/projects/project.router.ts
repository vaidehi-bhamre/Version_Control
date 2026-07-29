import { Router } from "express";
import { getProjects } from "./project.controller";
import { authenticateUser } from "../../middleware/auth.middleware";

const projectRouter = Router();

projectRouter.get("/", authenticateUser, getProjects);

export default projectRouter;
