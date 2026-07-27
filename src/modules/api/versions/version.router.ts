import { Router } from "express";

import {
  createVersionController,
  getNextVersionNumberController,
  toggleVersionStatusController,
  updateVersionController,
} from "./version-write.controller";

const versionRouter = Router();

/**
 * GET /api/versions/next-number
 *
 * Example:
 * /api/versions/next-number?projectId=1&version=minor
 */
versionRouter.get(
  "/next-number",
  getNextVersionNumberController
);

/**
 * POST /api/versions
 */
versionRouter.post(
  "/",
  createVersionController
);

/**
 * PUT /api/versions/:id
 */
versionRouter.put(
  "/:id",
  updateVersionController
);

/**
 * PATCH /api/versions/:id/toggle-status
 */
versionRouter.patch(
  "/:id/toggle-status",
  toggleVersionStatusController
);

export default versionRouter;