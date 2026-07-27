"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const version_write_controller_1 = require("./version-write.controller");
const versionRouter = (0, express_1.Router)();
/**
 * GET /api/versions/next-number
 *
 * Example:
 * /api/versions/next-number?projectId=1&version=minor
 */
versionRouter.get("/next-number", version_write_controller_1.getNextVersionNumberController);
/**
 * POST /api/versions
 */
versionRouter.post("/", version_write_controller_1.createVersionController);
/**
 * PUT /api/versions/:id
 */
versionRouter.put("/:id", version_write_controller_1.updateVersionController);
/**
 * PATCH /api/versions/:id/toggle-status
 */
versionRouter.patch("/:id/toggle-status", version_write_controller_1.toggleVersionStatusController);
exports.default = versionRouter;
//# sourceMappingURL=version.router.js.map