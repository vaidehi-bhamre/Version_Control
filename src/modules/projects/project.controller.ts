import { Request, Response } from "express";
import { HTTP_CODE } from "../../constants/httpCode";
import { HTTP_ERROR_MESSAGE } from "../../constants/httpErrorMessage";
import { HTTP_SUCCESS_MESSAGE } from "../../constants/httpSuccessMessage";
import { getActiveProjectsService } from "./project.service";

export const getProjects = async (_req: Request, res: Response) => {
  try {
    const projects = await getActiveProjectsService();

    return res.status(HTTP_CODE.OK).json({
      message: HTTP_SUCCESS_MESSAGE.PROJECTS_FETCHED,
      data: projects,
    });
  } catch (error) {
    console.error("Get projects error:", error);

    return res.status(HTTP_CODE.INTERNAL_SERVER_ERROR).json({
      message: HTTP_ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
    });
  }
};