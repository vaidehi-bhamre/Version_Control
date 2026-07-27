"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const project_router_1 = __importDefault(require("../modules/projects/project.router"));
const version_router_1 = __importDefault(require("../modules/versions/version.router"));
const version_router_2 = __importDefault(require("../modules/api/versions/version.router"));
const router = (0, express_1.Router)();
router.use("/projects", project_router_1.default);
router.use("/versions", version_router_2.default);
router.use("/versions", version_router_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map