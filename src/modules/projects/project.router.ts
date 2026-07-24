import { Router } from "express";
import { getProjects } from "./project.controller";

const projectRouter = Router();

projectRouter.get("/", getProjects);

export default projectRouter;