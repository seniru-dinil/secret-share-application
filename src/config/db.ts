import mysql from "mysql2/promise";

export let connection: any;

(async () => {
  connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "secret_db",
  });

  connection.connect((err: any) => {
    if (err) {
      console.error("error connection to mysql server", err);
      return;
    }
    console.log("connected to the mysql server");
  });
})();
