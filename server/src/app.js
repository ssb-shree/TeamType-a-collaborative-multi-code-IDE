import express from "express";
import cookieParser from "cookie-parser";

const app = express();

// global middlewares
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
