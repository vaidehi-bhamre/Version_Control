import { Request, Response } from "express";
import { authService } from "./auth.service";

export class AuthController {
  public async register(req: Request, res: Response): Promise<void> {
    try {
      const result = await authService.register(req.body);

      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      });
    }
  }

  public async login(req: Request, res: Response): Promise<void> {
    try {
      const result = await authService.login(req.body);

      res.status(200).json(result);
    } catch (error: any) {
      res.status(401).json({
        message: error.message,
      });
    }
  }
}
