import { Router } from "express";
import { getVersionById, getVersions } from "./version.controller";
import { authenticateUser } from "../../middleware/auth.middleware";

const versionRouter = Router();

versionRouter.get("/", authenticateUser, getVersions);
versionRouter.get("/:id", authenticateUser, getVersionById);

export default versionRouter;
