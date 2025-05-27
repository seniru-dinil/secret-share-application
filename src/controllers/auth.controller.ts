import { z } from "zod";
import { Request, Response, NextFunction } from "express";

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

export const signupHanlder = async (
  req: Request<{}, {}, SignupRequestBody>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const request = signupSchema.parse({
      ...req.body,
    });
    res.status(200).json({
      message: "user registration success",
    });
    console.log(request);
  } catch (error) {
    next(error);
  }
};
