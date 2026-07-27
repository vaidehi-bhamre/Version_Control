"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleVersionStatusController = exports.updateVersionController = exports.createVersionController = exports.getNextVersionNumberController = void 0;
const version_validation_1 = require("./version.validation");
const version_write_service_1 = require("./version-write.service");
const parsePositiveInteger = (value, fieldName) => {
    const parsedValue = Number(value);
    if (!Number.isInteger(parsedValue) ||
        parsedValue <= 0) {
        throw new Error(`${fieldName} must be a positive integer`);
    }
    return parsedValue;
};
const isVersionType = (value) => {
    return (value === "major" ||
        value === "minor" ||
        value === "bug-fix");
};
/**
 * GET /api/versions/next-number
 *
 * Query parameters:
 * projectId=1
 * version=minor
 */
const getNextVersionNumberController = async (req, res) => {
    try {
        const projectId = parsePositiveInteger(req.query.projectId, "projectId");
        const version = req.query.version;
        if (!isVersionType(version)) {
            res.status(400).json({
                message: "version must be major, minor, or bug-fix",
            });
            return;
        }
        const nextVersionNumber = await (0, version_write_service_1.getNextVersionNumber)(projectId, version);
        res.status(200).json({
            message: "Next version number calculated successfully",
            data: {
                projectId,
                version,
                nextVersionNumber,
            },
        });
    }
    catch (error) {
        const message = error instanceof Error
            ? error.message
            : "Failed to calculate next version number";
        const statusCode = message === "Active project not found"
            ? 404
            : 400;
        res.status(statusCode).json({
            message,
        });
    }
};
exports.getNextVersionNumberController = getNextVersionNumberController;
/**
 * POST /api/versions
 */
const createVersionController = async (req, res) => {
    try {
        const input = (0, version_validation_1.validateCreateVersionInput)(req.body);
        const createdVersion = await (0, version_write_service_1.createVersion)(input);
        res.status(201).json({
            message: "Version created successfully",
            data: createdVersion,
        });
    }
    catch (error) {
        const message = error instanceof Error
            ? error.message
            : "Failed to create version";
        const statusCode = message === "Active project not found"
            ? 404
            : 400;
        res.status(statusCode).json({
            message,
        });
    }
};
exports.createVersionController = createVersionController;
/**
 * PUT /api/versions/:id
 */
const updateVersionController = async (req, res) => {
    try {
        const versionId = parsePositiveInteger(req.params.id, "version id");
        const input = (0, version_validation_1.validateUpdateVersionInput)(req.body);
        const updatedVersion = await (0, version_write_service_1.updateVersion)(versionId, input);
        res.status(200).json({
            message: "Version updated successfully",
            data: updatedVersion,
        });
    }
    catch (error) {
        const message = error instanceof Error
            ? error.message
            : "Failed to update version";
        const statusCode = message === "Version not found"
            ? 404
            : 400;
        res.status(statusCode).json({
            message,
        });
    }
};
exports.updateVersionController = updateVersionController;
/**
 * PATCH /api/versions/:id/toggle-status
 */
const toggleVersionStatusController = async (req, res) => {
    try {
        const versionId = parsePositiveInteger(req.params.id, "version id");
        const updatedVersion = await (0, version_write_service_1.toggleVersionStatus)(versionId);
        res.status(200).json({
            message: "Version status updated successfully",
            data: updatedVersion,
        });
    }
    catch (error) {
        const message = error instanceof Error
            ? error.message
            : "Failed to update version status";
        const statusCode = message === "Version not found"
            ? 404
            : 400;
        res.status(statusCode).json({
            message,
        });
    }
};
exports.toggleVersionStatusController = toggleVersionStatusController;
//# sourceMappingURL=version-write.controller.js.map