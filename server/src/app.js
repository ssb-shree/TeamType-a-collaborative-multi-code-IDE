import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

import dotenv from "dotenv";
dotenv.config();

// global middlewares
const corsOptions = {
  origin:
    process.env.STATUS === "DEV"
      ? "http://localhost:3000"
      : process.env.CLIENT_URL,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

//health check route
app.get("/ping", (req, res) => res.json({ message: "pong" }).status(200));

// route imports below
import AuthRouter from "./routes/auth.routes.js";

// route declaration belw
app.use("/api/v1/auth", AuthRouter);

export default app;
