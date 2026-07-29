import { Router } from "express";

import {
  createVersionController,
  getNextVersionNumberController,
  toggleVersionStatusController,
  updateVersionController,
} from "./version-write.controller";

import { authenticateUser } from "../../../middleware/auth.middleware";
import {
  authorizeRoles,
} from "../../../middleware/role.middleware";

const version_Router = Router();

version_Router.get(
  "/next-number",
  authenticateUser,
  getNextVersionNumberController
);

version_Router.post(
  "/",
  authenticateUser,
  authorizeRoles("admin"),
  createVersionController
);

version_Router.put(
  "/:id",
  authenticateUser,
  authorizeRoles("admin"),
  updateVersionController
);

version_Router.patch(
  "/:id/toggle-status",
  authenticateUser,
  authorizeRoles("admin"),
  toggleVersionStatusController
);

export default version_Router;