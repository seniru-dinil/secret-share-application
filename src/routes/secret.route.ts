import { Router } from "express";
import {
  createSecrteHandler,
  viewSecretHandler,
} from "../controllers/secret.controller";

export const secretRoutes = Router();

secretRoutes.post("/", createSecrteHandler);
secretRoutes.get("/:token", viewSecretHandler);
