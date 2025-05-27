import { connection } from "../config/db";
import bcrypt from "bcrypt";

interface CreateAccountProps {
  email: string;
  password: string;
}

export const createAccount = async ({
  email,
  password,
}: CreateAccountProps) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10); // 10 salt rounds
    const [result] = await connection.query(
      "INSERT INTO users (email, password) VALUES (?, ?)",
      [email, hashedPassword]
    );
    return result > 0;
  } catch (error) {
    console.error("Error creating account:", error);
    throw error;
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
