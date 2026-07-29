import {Router} from "express";


import projectRouter from "../modules/projects/project.router";
import versionRouter from "../modules/versions/version.router";
import version_Router from "../modules/api/versions/version.router"

import authRouter from "../modules/auth/auth.router";

const router = Router();

router.use("/projects", projectRouter);
router.use("/versions", version_Router);
router.use("/versions", versionRouter);
router.use("/auth", authRouter);


export default router;