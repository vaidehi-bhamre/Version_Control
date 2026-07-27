import type { VersionType } from "../../../database/models/versionControl";

export interface CreateVersionInput {
  projectId: number;
  version: VersionType;
  versionTitle: string;
  versionInfo: Record<string, unknown>;
}

export interface UpdateVersionInput {
  versionTitle?: string;
  versionInfo?: Record<string, unknown>;
}

const VALID_VERSION_TYPES: VersionType[] = [
  "major",
  "minor",
  "bug-fix",
];

export const validateCreateVersionInput = (
  data: unknown
): CreateVersionInput => {
  if (
    typeof data !== "object" ||
    data === null ||
    Array.isArray(data)
  ) {
    throw new Error("Request body must be a valid object");
  }

  const input = data as Record<string, unknown>;

  const projectId = input.projectId;
  const version = input.version;
  const versionTitle = input.versionTitle;
  const versionInfo = input.versionInfo;

  if (
    typeof projectId !== "number" ||
    !Number.isInteger(projectId) ||
    projectId <= 0
  ) {
    throw new Error(
      "projectId must be a positive integer"
    );
  }

  if (
    typeof version !== "string" ||
    !VALID_VERSION_TYPES.includes(
      version as VersionType
    )
  ) {
    throw new Error(
      "version must be major, minor, or bug-fix"
    );
  }

  if (
    typeof versionTitle !== "string" ||
    versionTitle.trim().length === 0
  ) {
    throw new Error(
      "versionTitle is required"
    );
  }

  if (versionTitle.trim().length > 100) {
    throw new Error(
      "versionTitle cannot exceed 100 characters"
    );
  }

  if (
    typeof versionInfo !== "object" ||
    versionInfo === null ||
    Array.isArray(versionInfo)
  ) {
    throw new Error(
      "versionInfo must be a valid object"
    );
  }

  return {
    projectId,
    version: version as VersionType,
    versionTitle: versionTitle.trim(),
    versionInfo: versionInfo as Record<
      string,
      unknown
    >,
  };
};

export const validateUpdateVersionInput = (
  data: unknown
): UpdateVersionInput => {
  if (
    typeof data !== "object" ||
    data === null ||
    Array.isArray(data)
  ) {
    throw new Error("Request body must be a valid object");
  }

  const input = data as Record<string, unknown>;

  const validatedData: UpdateVersionInput = {};

  if (input.versionTitle !== undefined) {
    if (
      typeof input.versionTitle !== "string" ||
      input.versionTitle.trim().length === 0
    ) {
      throw new Error(
        "versionTitle must be a non-empty string"
      );
    }

    if (input.versionTitle.trim().length > 100) {
      throw new Error(
        "versionTitle cannot exceed 100 characters"
      );
    }

    validatedData.versionTitle =
      input.versionTitle.trim();
  }

  if (input.versionInfo !== undefined) {
    if (
      typeof input.versionInfo !== "object" ||
      input.versionInfo === null ||
      Array.isArray(input.versionInfo)
    ) {
      throw new Error(
        "versionInfo must be a valid object"
      );
    }

    validatedData.versionInfo =
      input.versionInfo as Record<string, unknown>;
  }

  if (
    validatedData.versionTitle === undefined &&
    validatedData.versionInfo === undefined
  ) {
    throw new Error(
      "At least versionTitle or versionInfo must be provided"
    );
  }

  return validatedData;
};