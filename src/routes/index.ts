import {Router} from "express";


import projectRouter from "../modules/projects/project.router";
import versionRouter from "../modules/versions/version.router";
import version_Router from "../modules/api/versions/version.router"

const router = Router();

router.use("/projects", projectRouter);
router.use("/versions", versionRouter);
router.use("/versions", version_Router);


export default router;