import { Router } from "express";

import versionRouter from "../modules/api/versions/version.router";

const router = Router();

router.use("/versions", versionRouter);

export default router;