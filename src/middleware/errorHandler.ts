import { ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  console.log(`PATH ${req.path}`, error);
  res.status(500).json({
    message: error?.message || "Internal server error",
    stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
  });
  next();
};

export default errorHandler;
