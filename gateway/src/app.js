import express from "express";
import authRoute from "./routes/auth.route.js";
import { errorMiddleware } from "../../shared/middlewares/error.middleware.js";

const app = express();

app.use(authRoute);
// app.use(express.json());
app.use(errorMiddleware);

export default app;
