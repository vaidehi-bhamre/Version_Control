import type { VersionType } from "../../../database/models/versionControl";

export const calculateNextVersionNumber = (
  latestVersionNumber: string | null,
  versionType: VersionType
): string => {
  if (!latestVersionNumber) {
    return "1.0.0";
  }

  const parts = latestVersionNumber.split(".").map(Number);

  if (
    parts.length !== 3 ||
    parts.some((part) => Number.isNaN(part))
  ) {
    throw new Error("Invalid existing version number");
  }

  let [major, minor, patch] = parts;

  switch (versionType) {
    case "major":
      major += 1;
      minor = 0;
      patch = 0;
      break;

    case "minor":
      minor += 1;
      patch = 0;
      break;

    case "bug-fix":
      patch += 1;
      break;

    default: {
      const exhaustiveCheck: never = versionType;
      throw new Error(
        `Unsupported version type: ${exhaustiveCheck}`
      );
    }
  }

  return `${major}.${minor}.${patch}`;
};