import type { Request, Response } from "express";

import type { VersionType } from "../../../database/models/versionControl";

import {
  validateCreateVersionInput,
  validateUpdateVersionInput,
} from "./version.validation";

import {
  createVersion,
  getNextVersionNumber,
  toggleVersionStatus,
  updateVersion,
} from "./version-write.service";

const parsePositiveInteger = (
  value: unknown,
  fieldName: string
): number => {
  const parsedValue = Number(value);

  if (
    !Number.isInteger(parsedValue) ||
    parsedValue <= 0
  ) {
    throw new Error(
      `${fieldName} must be a positive integer`
    );
  }

  return parsedValue;
};

const isVersionType = (
  value: unknown
): value is VersionType => {
  return (
    value === "major" ||
    value === "minor" ||
    value === "bug-fix"
  );
};

/**
 * GET /api/versions/next-number
 *
 * Query parameters:
 * projectId=1
 * version=minor
 */
export const getNextVersionNumberController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const projectId = parsePositiveInteger(
      req.query.projectId,
      "projectId"
    );

    const version = req.query.version;

    if (!isVersionType(version)) {
      res.status(400).json({
        message:
          "version must be major, minor, or bug-fix",
      });
      return;
    }

    const nextVersionNumber =
      await getNextVersionNumber(
        projectId,
        version
      );

    res.status(200).json({
      message:
        "Next version number calculated successfully",
      data: {
        projectId,
        version,
        nextVersionNumber,
      },
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to calculate next version number";

    const statusCode =
      message === "Active project not found"
        ? 404
        : 400;

    res.status(statusCode).json({
      message,
    });
  }
};

/**
 * POST /api/versions
 */
export const createVersionController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const input =
      validateCreateVersionInput(req.body);

    const createdVersion =
      await createVersion(input);

    res.status(201).json({
      message: "Version created successfully",
      data: createdVersion,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to create version";

    const statusCode =
      message === "Active project not found"
        ? 404
        : 400;

    res.status(statusCode).json({
      message,
    });
  }
};

/**
 * PUT /api/versions/:id
 */
export const updateVersionController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const versionId = parsePositiveInteger(
      req.params.id,
      "version id"
    );

    const input =
      validateUpdateVersionInput(req.body);

    const updatedVersion =
      await updateVersion(versionId, input);

    res.status(200).json({
      message: "Version updated successfully",
      data: updatedVersion,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to update version";

    const statusCode =
      message === "Version not found"
        ? 404
        : 400;

    res.status(statusCode).json({
      message,
    });
  }
};

/**
 * PATCH /api/versions/:id/toggle-status
 */
export const toggleVersionStatusController =
  async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const versionId = parsePositiveInteger(
        req.params.id,
        "version id"
      );

      const updatedVersion =
        await toggleVersionStatus(versionId);

      res.status(200).json({
        message:
          "Version status updated successfully",
        data: updatedVersion,
      });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to update version status";

      const statusCode =
        message === "Version not found"
          ? 404
          : 400;

      res.status(statusCode).json({
        message,
      });
    }
  };