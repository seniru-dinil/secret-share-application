import express from "express";
const app = express();

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "healthy",
  });
});

app.listen(5000, () => {
  console.log("server is running on port 5000");
});
