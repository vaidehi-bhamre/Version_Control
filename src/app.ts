import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import { HTTP_CODE } from "./constants/httpCode";
import { HTTP_ERROR_MESSAGE } from "./constants/httpErrorMessage";
import { HTTP_SUCCESS_MESSAGE } from "./constants/httpSuccessMessage";
import routes from "./routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health", (_req: Request, res: Response) => {
  return res.status(HTTP_CODE.OK).json({
    message: HTTP_SUCCESS_MESSAGE.HEALTH_CHECK,
  });
});

app.use("/api", routes);

app.use((_req: Request, res: Response) => {
  return res.status(HTTP_CODE.NOT_FOUND).json({
    message: HTTP_ERROR_MESSAGE.ROUTE_NOT_FOUND,
  });
});

app.use(
  (error: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error("Unhandled error:", error);

    return res.status(HTTP_CODE.INTERNAL_SERVER_ERROR).json({
      message: HTTP_ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
    });
  }
);

export default app;