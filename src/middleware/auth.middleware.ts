import {
    Request,
    Response,
    NextFunction,
  } from "express";
  
  import jwt, {
    JwtPayload,
  } from "jsonwebtoken";
  
  export type UserRole =
    | "admin"
    | "developer";
  
  interface AuthTokenPayload
    extends JwtPayload {
    userId: number;
    email: string;
    role: UserRole;
  }
  
  export interface AuthRequest
    extends Request {
    user?: {
      userId: number;
      email: string;
      role: UserRole;
    };
  }
  
  export const authenticateUser = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): void => {
    try {
      const authHeader =
        req.headers.authorization;
  
      if (!authHeader) {
        res.status(401).json({
          message:
            "Authorization token is required.",
        });
        return;
      }
  
      const [scheme, token] =
        authHeader.split(" ");
  
      if (
        scheme !== "Bearer" ||
        !token
      ) {
        res.status(401).json({
          message:
            "Authorization must use Bearer token format.",
        });
        return;
      }
  
      const jwtSecret =
        process.env.JWT_SECRET;
  
      if (!jwtSecret) {
        res.status(500).json({
          message:
            "JWT_SECRET is not configured.",
        });
        return;
      }
  
      const decoded = jwt.verify(
        token,
        jwtSecret
      ) as AuthTokenPayload;
  
      req.user = {
        userId: decoded.userId,
        email: decoded.email,
        role: decoded.role,
      };
  
      next();
    } catch {
      res.status(401).json({
        message:
          "Invalid or expired token.",
      });
    }
  };