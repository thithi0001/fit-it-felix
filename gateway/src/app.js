import express from "express";
import { errorMiddleware } from "../../shared/middlewares/error.middleware.js";
import { authenticateGateway } from "./middlewares/auth.middleware.js";

const app = express();
const publicRoutes = [
    "/auth/login", 
    "/auth/refresh",
    "/auth/health", 
    "/users/health",
    "/devices/health",
    "/inventory/health",
    "/maintenance/health",
    "/ai/health",
    "/audit/health",
    "/report/health",
    "/notification/health",
];

app.use((req, res, next) => {
    if (publicRoutes.includes(req.originalUrl.split("?")[0])) {
        return next();
    }
    
    return authenticateGateway(req, res, next);
});

import authRoute from "./routes/auth.route.js";
app.use(authRoute);

import userRoute from "./routes/user.route.js";
app.use(userRoute);

import deviceRoute from "./routes/device.route.js";
app.use(deviceRoute);

import inventoryRoute from "./routes/inventory.route.js";
app.use(inventoryRoute);

import maintenanceRoute from "./routes/maintenance.route.js";
app.use(maintenanceRoute);

import auditRoute from "./routes/audit.route.js";
app.use(auditRoute);

app.use(errorMiddleware);

export default app;
