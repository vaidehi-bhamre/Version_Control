import type { VersionType } from "../constants/version.constant";

export interface VersionListQuery {
  page?: string;
  limit?: string;
  projectId?: string;
  versionType?: VersionType | string;
  startDate?: string;
  endDate?: string;
  search?: string;
  showDeleted?: string;
}

export interface PaginationResponse {
  page: number;
  limit: number;
  totalRecords: number;
  totalPages: number;
}

export interface VersionListResponse<T = unknown> {
  data: T[];
  pagination: PaginationResponse;
}