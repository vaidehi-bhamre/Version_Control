"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const version_write_controller_1 = require("./version-write.controller");
const version_Router = (0, express_1.Router)();
version_Router.get("/next-number", version_write_controller_1.getNextVersionNumberController);
version_Router.post("/", version_write_controller_1.createVersionController);
version_Router.put("/:id", version_write_controller_1.updateVersionController);
version_Router.patch("/:id/toggle-status", version_write_controller_1.toggleVersionStatusController);
exports.default = version_Router;
//# sourceMappingURL=version.router.js.map