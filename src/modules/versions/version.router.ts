import { Router } from "express";
import { getVersionById, getVersions } from "./version.controller";

const versionRouter = Router();

versionRouter.get("/", getVersions);
versionRouter.get("/:id", getVersionById);

export default versionRouter;