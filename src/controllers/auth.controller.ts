import { z } from "zod";
import { Request, Response, NextFunction } from "express";
import { createAccount, login } from "../services/auth.service";
import { configDotenv } from "dotenv";
const JWT_SECRET = process.env.JWT_SECRET;
configDotenv();

const signupSchema = z
  .object({
    email: z.string().email({ message: "invalid email" }),
    password: z.string().min(6, { message: "required at least 6 characters" }),
    confirmPassword: z
      .string()
      .min(6, { message: "required at least 6 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "password does not match with each other",
    path: ["confirmPassword"],
  });

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

interface SignupRequestBody {
  email: string;
  password: string;
  confirmPassword: string;
}

export const signupHandler = async (
  req: Request<{}, {}, SignupRequestBody>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const request = signupSchema.parse({
      ...req.body,
    });

    const bool = await createAccount(request);
    res.status(200).json({
      message: bool ? "user creation successfull" : "error",
    });
  } catch (error) {
    next(error);
  }
};

export const loginHandler = async (
  req: Request<{}, {}, { email: string; password: string }>,
  res: Response,
  next: NextFunction
) => {
  const token = await login(
    loginSchema.parse({
      ...req.body,
    })
  );
  console.log(token);
  if (token) {
    res.status(200).json({
      token: token,
    });
    return;
  } else {
    next("ivalid token");
  }
};
