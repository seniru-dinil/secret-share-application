import { ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  console.log(`PATH ${req.path}`, error);
  res.status(500).json({
    message: "Internal server error",
  });
  next();
};

export default errorHandler;
