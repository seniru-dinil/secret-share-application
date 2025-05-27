import { Router } from "express";
import { signupHandler } from "../controllers/auth.controller";
const authRoutes = Router();

authRoutes.post("/signup", signupHandler);

export default authRoutes;
