import express from "express";
import { json } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { errorMiddleware } from "../../../shared/middlewares/error.middleware.js";

const app = express();
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(json());

// routes
import authRoute from "./routes/auth.route.js";
app.use("/auth", authRoute);

// error handler
app.use(errorMiddleware);

export default app;