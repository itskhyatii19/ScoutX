import { NextFunction, Request, Response } from "express";

type AsyncRoute = (req: Request, res: Response, next: NextFunction) => Promise<unknown>;

export const asyncHandler = (route: AsyncRoute) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(route(req, res, next)).catch(next);
  };
};
