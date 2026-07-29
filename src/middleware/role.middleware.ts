import { Response, NextFunction } from "express";
import {
  AuthRequest,
  UserRole,
} from "./auth.middleware";

export const authorizeRoles =
  (...allowedRoles: UserRole[]) =>
  (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): void => {
    console.log("ROLE CHECK:", {
      currentRole: req.user?.role,
      allowedRoles,
    });

    if (!req.user) {
      res.status(401).json({
        message: "Authentication is required.",
      });
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      res.status(403).json({
        message:
          "You do not have permission to perform this action.",
      });
      return;
    }

    next();
  };