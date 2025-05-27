import { z } from "zod";
import { Request, Response, NextFunction } from "express";
import { createSecret } from "../services/secret.service";
import { checkUser } from "../services/auth.service";

const secretSchema = z.object({
  message: z.string(),
  password: z.string(),
});

interface CreateSecrteHandlerBody {
  message: string;
  password: string;
}
export const createSecrteHandler = async (
  req: Request<{}, {}, CreateSecrteHandlerBody>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const request = secretSchema.parse({
      ...req.body,
    });
    await createSecret({
      message: request.message,
      password: request.password,
      userId: 1,
    });
    res.status(200).json({ message: "secret created" });
  } catch (error) {
    next(error);
  }
};
