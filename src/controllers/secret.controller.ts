import { z } from "zod";
import { Request, Response, NextFunction } from "express";
import { createSecret, viewSecret } from "../services/secret.service";

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

export const viewSecretHandler = async (
  req: Request<{ token: string }>,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.params;

  try {
    const secret = await viewSecret(token);

    if (!secret) {
      res.status(404).json({ message: "Secret unavailable or already viewed" });
    }

    res.status(200).json({ message: secret.message });
  } catch (error) {
    next(error);
  }
};
