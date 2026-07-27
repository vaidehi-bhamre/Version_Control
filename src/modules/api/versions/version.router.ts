import { Router } from "express";

import {
  createVersionController,
  getNextVersionNumberController,
  toggleVersionStatusController,
  updateVersionController,
} from "./version-write.controller";

const version_Router = Router();

/**
 * GET /api/versions/next-number
 *
 * Example:
 * /api/versions/next-number?projectId=1&version=minor
 */
version_Router.get(
  "/next-number",
  getNextVersionNumberController
);

/**
 * POST /api/versions
 */
version_Router.post(
  "/",
  createVersionController
);

/**
 * PUT /api/versions/:id
 */
version_Router.put(
  "/:id",
  updateVersionController
);

/**
 * PATCH /api/versions/:id/toggle-status
 */
version_Router.patch(
  "/:id/toggle-status",
  toggleVersionStatusController
);

export default version_Router;