"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = exports.VersionControl = exports.ProjectMaster = void 0;
const projectMaster_1 = require("./projectMaster");
Object.defineProperty(exports, "ProjectMaster", { enumerable: true, get: function () { return projectMaster_1.ProjectMaster; } });
const versionControl_1 = require("./versionControl");
Object.defineProperty(exports, "VersionControl", { enumerable: true, get: function () { return versionControl_1.VersionControl; } });
const sequelize_1 = __importDefault(require("../config/sequelize"));
exports.sequelize = sequelize_1.default;
projectMaster_1.ProjectMaster.hasMany(versionControl_1.VersionControl, {
    foreignKey: "projectId",
    as: "versions",
});
versionControl_1.VersionControl.belongsTo(projectMaster_1.ProjectMaster, {
    foreignKey: "projectId",
    as: "project",
});
//# sourceMappingURL=index.js.map