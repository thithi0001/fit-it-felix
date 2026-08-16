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

import deviceRoutes from "./routes/device.route.js";
app.use("/devices", deviceRoutes);

app.use(errorMiddleware);

export default app;
