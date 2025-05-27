import express from "express";
import cookieParser from "cookie-parser";
import errorHandler from "./middleware/errorHandler";
import authRoutes from "./routes/auth.route";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "healthy",
  });
});

app.use(errorHandler);
app.listen(5000, () => {
  console.log("server is running on port 5000");
});
