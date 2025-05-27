import { connection as pool } from "../config/db";
import crypto from "crypto";
import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";

interface CreateSecretBody {
  message: string;
  password: string;
  userId: number;
}

export const createSecret = async ({
  message,
  password,
  userId,
}: CreateSecretBody) => {
  const token = crypto.randomBytes(32).toString("hex");
  const hashedPassword = await bcrypt.hash(password, 10);
  const createdAt = new Date();

  await pool.query(
    `INSERT INTO secrets (message, password, token, userId, createdAt, isViewed)
     VALUES (?, ?, ?, ?, ?, false)`,
    [message, hashedPassword, token, userId, createdAt]
  );

  return { url: `/secret/${token}` };
};

export const viewSecret = async (token: string) => {
  try {
    const [rows]: any = await pool.query(
      `SELECT * FROM secrets WHERE token = ? AND isViewed = false`,
      [token]
    );
    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  } catch (error) {
    console.error("Error retrieving secret:", error);
    return null;
  }
};
