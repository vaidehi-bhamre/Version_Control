"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleVersionStatus = exports.updateVersion = exports.createVersion = exports.getNextVersionNumber = void 0;
const models_1 = require("../../../database/models");
const development_constant_1 = require("../../../constants/development.constant");
const version_utils_1 = require("./version.utils");
/**
 * Checks whether the project exists and is active.
 */
const getActiveProject = async (projectId) => {
    const project = await models_1.ProjectMaster.findOne({
        where: {
            id: projectId,
            isActive: true,
        },
    });
    if (!project) {
        throw new Error("Active project not found");
    }
    return project;
};
/**
 * Finds the latest version created for a project.
 */
const getLatestVersion = async (projectId) => {
    return models_1.VersionControl.findOne({
        where: {
            projectId,
        },
        order: [
            ["createdAt", "DESC"],
            ["id", "DESC"],
        ],
    });
};
/**
 * Calculates the next version number for a project.
 *
 * Example:
 * latest: 1.2.0
 * type: bug-fix
 * result: 1.2.1
 */
const getNextVersionNumber = async (projectId, versionType) => {
    await getActiveProject(projectId);
    const latestVersion = await getLatestVersion(projectId);
    return (0, version_utils_1.calculateNextVersionNumber)(latestVersion?.versionNumber ?? null, versionType);
};
exports.getNextVersionNumber = getNextVersionNumber;
/**
 * Creates a new version record.
 */
const createVersion = async (input) => {
    await getActiveProject(input.projectId);
    const versionNumber = await (0, exports.getNextVersionNumber)(input.projectId, input.version);
    const now = new Date();
    const createdVersion = await models_1.VersionControl.create({
        projectId: input.projectId,
        version: input.version,
        versionNumber: versionNumber,
        versionTitle: input.versionTitle,
        versionInfo: input.versionInfo,
        isActive: true,
        createdBy: development_constant_1.DEVELOPMENT_USER_ID,
        createdAt: now,
        updatedBy: development_constant_1.DEVELOPMENT_USER_ID,
        updatedAt: now,
    });
    return createdVersion;
};
exports.createVersion = createVersion;
/**
 * Updates an existing version.
 *
 * Only versionTitle and versionInfo can be changed.
 * The version type and version number remain unchanged.
 */
const updateVersion = async (versionId, input) => {
    const existingVersion = await models_1.VersionControl.findByPk(versionId);
    if (!existingVersion) {
        throw new Error("Version not found");
    }
    const updateData = {
        updatedBy: development_constant_1.DEVELOPMENT_USER_ID,
    };
    if (input.versionTitle !== undefined) {
        updateData.versionTitle =
            input.versionTitle;
    }
    if (input.versionInfo !== undefined) {
        updateData.versionInfo =
            input.versionInfo;
    }
    await existingVersion.update({
        versionTitle: input.versionTitle,
        versionInfo: input.versionInfo,
        updatedBy: development_constant_1.DEVELOPMENT_USER_ID,
    });
    return existingVersion;
};
exports.updateVersion = updateVersion;
/**
 * Toggles the isActive status.
 *
 * true  → false
 * false → true
 *
 * This performs soft delete/restore instead of
 * permanently removing the database record.
 */
const toggleVersionStatus = async (versionId) => {
    const existingVersion = await models_1.VersionControl.findByPk(versionId);
    if (!existingVersion) {
        throw new Error("Version not found");
    }
    await existingVersion.update({
        isActive: !existingVersion.isActive,
        updatedBy: development_constant_1.DEVELOPMENT_USER_ID,
    });
    return existingVersion;
};
exports.toggleVersionStatus = toggleVersionStatus;
//# sourceMappingURL=version-write.service.js.map