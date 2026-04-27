import { ErrorRequestHandler, RequestHandler } from "express";

export const notFound: RequestHandler = (req, res) => {
  res.status(404).json({ message: `Route not found: ${req.originalUrl}` });
};

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  const status = res.statusCode >= 400 ? res.statusCode : 500;
  res.status(status).json({
    message: error.message || "Server Error",
  });
};
