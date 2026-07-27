import { Router } from "express";

import {
  createVersionController,
  getNextVersionNumberController,
  toggleVersionStatusController,
  updateVersionController,
} from "./version-write.controller";

const version_Router = Router();

version_Router.get(
  "/next-number",
  getNextVersionNumberController
);

version_Router.post(
  "/",
  createVersionController
);

version_Router.put(
  "/:id",
  updateVersionController
);

version_Router.patch(
  "/:id/toggle-status",
  toggleVersionStatusController
);

export default version_Router;