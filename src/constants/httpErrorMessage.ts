export const HTTP_ERROR_MESSAGE = {
  INTERNAL_SERVER_ERROR: "Internal server error",

  VERSION_NOT_FOUND: "Version record not found",

  INVALID_VERSION_ID: "Invalid version id",
  INVALID_PROJECT_ID: "Invalid projectId",

  INVALID_PAGE: "Invalid page value",
  INVALID_LIMIT: "Invalid limit value",

  INVALID_VERSION_TYPE:
    "Invalid versionType. Allowed values are major, minor, bug-fix",

  INVALID_START_DATE: "Invalid startDate",
  INVALID_END_DATE: "Invalid endDate",
  INVALID_DATE_RANGE: "startDate cannot be greater than endDate",
} as const;