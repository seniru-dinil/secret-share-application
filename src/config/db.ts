import { configDotenv } from "dotenv";
import mysql from "mysql2/promise";
configDotenv();
export let connection: any;

const HOST = process.env.DB_HOST;
const USER = process.env.DB_USER;
const PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

(async () => {
  connection = await mysql.createConnection({
    host: HOST,
    user: USER,
    password: PASSWORD,
    database: DB_NAME,
  });

  connection.connect((err: any) => {
    if (err) {
      console.error("error connection to mysql server", err);
      return;
    }
    console.log("connected to the mysql server");
  });
})();
