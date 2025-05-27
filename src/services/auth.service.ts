import { connection } from "../config/db";
import bcrypt from "bcrypt";
import { configDotenv } from "dotenv";
import jwt from "jsonwebtoken";
configDotenv();

const JWT_SECRET = process.env.JWT_SECRET || "";
interface RequestProps {
  email: string;
  password: string;
}

export const createAccount = async ({ email, password }: RequestProps) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await connection.query(
      "INSERT INTO users (email, password) VALUES (?, ?)",
      [email, hashedPassword]
    );
    return true;
  } catch (error) {
    throw new Error("error");
  }
};

export const checkUser = async (email: string) => {
  try {
    const [rows] = await connection.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    return rows;
  } catch (error) {
    console.error("Error checking user:", error);
    throw error;
  }
};

export const login = async ({ email, password }: RequestProps) => {
  try {
    const [rows]: any = await connection.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    const user = rows[0];

    if (!user) {
      return;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return;
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    return token;
  } catch (error) {
    return null;
  }
};
