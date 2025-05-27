import { Router } from "express";
import { createSecrteHandler } from "../controllers/secret.controller";

export const secretRoutes = Router();

secretRoutes.post("/", createSecrteHandler);
