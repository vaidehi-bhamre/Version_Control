export const DEFAULT_PAGE = 1;
export const DEFAULT_LIMIT = 10;
export const MAX_LIMIT = 100;

export const VERSION_TYPES = ["major", "minor", "bug-fix"] as const;

export type VersionType = (typeof VERSION_TYPES)[number];