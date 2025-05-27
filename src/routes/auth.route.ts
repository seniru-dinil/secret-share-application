import { Router } from "express";
import { signupHanlder } from "../controllers/auth.controller";
const authRoutes = Router();

authRoutes.post("/signup", signupHandler);

export default authRoutes;
