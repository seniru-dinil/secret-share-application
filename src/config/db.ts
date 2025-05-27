import mysql from "mysql2";

export const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "secret_db",
});

connection.connect((err) => {
  if (err) {
    console.error("error connection to mysql server", err);
    return;
  }
  console.log("connected to the mysql server");
});
