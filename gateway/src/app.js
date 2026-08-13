import express from "express";
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
import { errorMiddleware } from "../../shared/middlewares/error.middleware.js";
import { authenticateGateway } from "./middlewares/auth.middleware.js";

const app = express();
const publicRoutes = [
    "/users/health",
    "/auth/health", 
    "/auth/login", 
    "/auth/refresh"
];

app.use((req, res, next) => {
    if (publicRoutes.includes(req.originalUrl.split("?")[0])) {
        return next();
    }

    return authenticateGateway(req, res, next);
});
app.use(authRoute);
app.use(userRoute);
app.use(errorMiddleware);

export default app;
