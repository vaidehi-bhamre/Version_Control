import {Router} from "express";


import projectRouter from "../modules/projects/project.router";
import versionRouter from "../modules/versions/version.router";

const router = Router();

router.use("/projects", projectRouter);
router.use("/versions", versionRouter);


export default router;