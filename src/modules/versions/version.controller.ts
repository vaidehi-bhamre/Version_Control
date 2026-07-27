import { Request, Response } from "express";
import { HTTP_CODE } from "../../constants/httpCode";
import { HTTP_ERROR_MESSAGE } from "../../constants/httpErrorMessage";
import { HTTP_SUCCESS_MESSAGE } from "../../constants/httpSuccessMessage";
import { VersionListQuery } from "../../types/version";
import {
  BadRequestError,
  getVersionByIdService,
  getVersionsService,
} from "./version.service";

export const getVersions = async (req: Request, res: Response) => {
  try {
    const result = await getVersionsService(req.query as VersionListQuery);

    return res.status(HTTP_CODE.OK).json({
      message: HTTP_SUCCESS_MESSAGE.VERSIONS_FETCHED,
      ...result,
    });
  } catch (error) {
    if (error instanceof BadRequestError) {
      return res.status(HTTP_CODE.BAD_REQUEST).json({
        message: error.message,
      });
    }

    console.error("Get versions error:", error);

    return res.status(HTTP_CODE.INTERNAL_SERVER_ERROR).json({
      message: HTTP_ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
    });
  }
};

export const getVersionById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(HTTP_CODE.BAD_REQUEST).json({
        message: HTTP_ERROR_MESSAGE.INVALID_VERSION_ID,
      });
    }

    const version = await getVersionByIdService(id);

    if (!version) {
      return res.status(HTTP_CODE.NOT_FOUND).json({
        message: HTTP_ERROR_MESSAGE.VERSION_NOT_FOUND,
      });
    }

    return res.status(HTTP_CODE.OK).json({
      message: HTTP_SUCCESS_MESSAGE.VERSION_FETCHED,
      data: version,
    });
  } catch (error) {
    console.error("Get version by id error:", error);

    return res.status(HTTP_CODE.INTERNAL_SERVER_ERROR).json({
      message: HTTP_ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
    });
  }
};