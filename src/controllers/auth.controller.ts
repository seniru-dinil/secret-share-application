import { z } from "zod";
import { Request, Response, NextFunction } from "express";
import { createAccount } from "../services/auth.service";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { connection } from "../config/db";

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

const JWT_SECRET =
  "6328bb22950d51415aa19caf65387d5d836e880364f935732566b8334740b608b517dc09ea5f960fc6fa5dd2f14df126c26fb2c3863d5102b97dfce50049339ef076012a395303be2564c760666ea7d25118e27cc1903ac411a94d5a543f14b745a00a95621b0665a2e906321f0c0b49a54e0dbf7889deb523ab7b125736d82027af7eba84f8633082bd57a4d1bff4b038a843ae5bf06089bd189bc21509aa18b65241930671c1b448acfda723d3f530b7d4f796e2ed713082a8aeb29c9ba00d61e9ec13966e7db8b1267b44d65084314cb6fadbffbcaf2993c40db8bb70d35a0e2a3bf2a7fe2f260e126b812ac22eed92b6f20e6d0fbc59958de16da6b9831f";

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
  const { email, password } = loginSchema.parse({
    ...req.body,
  });

  try {
    const [rows]: any = await connection.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    const user = rows[0];
    if (!user) {
      next("invalid email or password");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      next("invalid email or password");
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({
      token: { token },
    });
  } catch (error) {
    next("error");
    console.error("Login error:", error);
  }
};
