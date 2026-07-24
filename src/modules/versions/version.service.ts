import { cast, col, Op, where as sequelizeWhere, WhereOptions } from "sequelize";
import { HTTP_ERROR_MESSAGE } from "../../constants/httpErrorMessage";
import {
  DEFAULT_LIMIT,
  DEFAULT_PAGE,
  MAX_LIMIT,
  VERSION_TYPES,
} from "../../constants/version.constant";
import { ProjectMaster, VersionControl } from "../../database/models";
import { VersionListQuery } from "../../types/version";

export class BadRequestError extends Error {
  public statusCode: number;

  constructor(message: string) {
    super(message);
    this.name = "BadRequestError";
    this.statusCode = 400;
  }
}

const parsePositiveInteger = (
  value: string | undefined,
  defaultValue: number,
  errorMessage: string
): number => {
  if (!value) {
    return defaultValue;
  }

  const parsedValue = Number(value);

  if (!Number.isInteger(parsedValue) || parsedValue <= 0) {
    throw new BadRequestError(errorMessage);
  }

  return parsedValue;
};

const parseDate = (
  value: string | undefined,
  errorMessage: string,
  isEndDate = false
): Date | undefined => {
  if (!value) {
    return undefined;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    throw new BadRequestError(errorMessage);
  }

  const isDateOnly = /^\d{4}-\d{2}-\d{2}$/.test(value);

  if (isDateOnly) {
    if (isEndDate) {
      date.setHours(23, 59, 59, 999);
    } else {
      date.setHours(0, 0, 0, 0);
    }
  }

  return date;
};

export const getVersionsService = async (query: VersionListQuery) => {
  const page = parsePositiveInteger(
    query.page,
    DEFAULT_PAGE,
    HTTP_ERROR_MESSAGE.INVALID_PAGE
  );

  const requestedLimit = parsePositiveInteger(
    query.limit,
    DEFAULT_LIMIT,
    HTTP_ERROR_MESSAGE.INVALID_LIMIT
  );

  const limit = Math.min(requestedLimit, MAX_LIMIT);
  const offset = (page - 1) * limit;

  const whereClause: WhereOptions = {};

  const showDeleted = String(query.showDeleted).toLowerCase() === "true";

  if (!showDeleted) {
    (whereClause as any).is_active = true;
  }

  if (query.projectId) {
    const projectId = Number(query.projectId);

    if (!Number.isInteger(projectId) || projectId <= 0) {
      throw new BadRequestError(HTTP_ERROR_MESSAGE.INVALID_PROJECT_ID);
    }

    (whereClause as any).project_id = projectId;
  }

  if (query.versionType) {
    if (!VERSION_TYPES.includes(query.versionType as any)) {
      throw new BadRequestError(HTTP_ERROR_MESSAGE.INVALID_VERSION_TYPE);
    }

    // query param is versionType, but DB column is version
    (whereClause as any).version = query.versionType;
  }

  const startDate = parseDate(
    query.startDate,
    HTTP_ERROR_MESSAGE.INVALID_START_DATE
  );

  const endDate = parseDate(
    query.endDate,
    HTTP_ERROR_MESSAGE.INVALID_END_DATE,
    true
  );

  if (startDate && endDate && startDate > endDate) {
    throw new BadRequestError(HTTP_ERROR_MESSAGE.INVALID_DATE_RANGE);
  }

  if (startDate || endDate) {
    const createdAtFilter: any = {};

    if (startDate) {
      createdAtFilter[Op.gte] = startDate;
    }

    if (endDate) {
      createdAtFilter[Op.lte] = endDate;
    }

    (whereClause as any).created_at = createdAtFilter;
  }

  const search = query.search?.trim();

  if (search) {
    (whereClause as any)[Op.or] = [
      {
        version_title: {
          [Op.like]: `%${search}%`,
        },
      },
      sequelizeWhere(cast(col("version_info"), "CHAR"), {
        [Op.like]: `%${search}%`,
      }),
    ];
  }

  const { rows, count } = await VersionControl.findAndCountAll({
    where: whereClause,
    attributes: [
      "id",
      "project_id",
      "version",
      "version_number",
      "version_title",
      "version_info",
      "is_active",
      "created_at",
      "updated_at",
    ],
    include: [
      {
        model: ProjectMaster,
        as: "project",
        attributes: ["id", "project_name"],
      },
    ],
    order: [["created_at", "DESC"]],
    limit,
    offset,
    distinct: true,
  });

  const totalRecords = Number(count);
  const totalPages = Math.ceil(totalRecords / limit);

  return {
    data: rows,
    pagination: {
      page,
      limit,
      totalRecords,
      totalPages,
    },
  };
};

export const getVersionByIdService = async (id: number) => {
  return VersionControl.findOne({
    where: { id },
    include: [
      {
        model: ProjectMaster,
        as: "project",
        attributes: ["id", "project_name"],
      },
    ],
  });
};