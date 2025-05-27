import { z } from "zod";
import { Request, Response, NextFunction } from "express";
import { createAccount } from "../services/auth.service";

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
    console.log(request);
  } catch (error) {
    next(error);
  }
};

export const loginHandler = async (
  req: Request<{}, {}, SignupRequestBody>,
  res: Response,
  next: NextFunction
) => {
  try {
  } catch (error) {
    next(error);
  }
};
