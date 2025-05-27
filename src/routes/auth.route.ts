import { Router } from "express";
import { loginHandler, signupHandler } from "../controllers/auth.controller";
const authRoutes = Router();

authRoutes.post("/signup", signupHandler);
authRoutes.post("/login", loginHandler);

export default authRoutes;
