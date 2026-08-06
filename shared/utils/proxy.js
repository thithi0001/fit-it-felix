import { Router } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import { AppError } from "./errors.js";
import { logger } from "./logger.js";

export const createServiceProxyRouter = ({ routePrefix, target, log = true }) => {
    const router = Router();

    const proxy = createProxyMiddleware({
        target,
        changeOrigin: true,

        onProxyReq(proxyReq, req) {
            if (log) {
                logger.info(`[proxy:${routePrefix}] ${req.method} ${req.originalUrl}`);
            }
        },

        onProxyRes(proxyRes) {
            if (log) {
                logger.info(`[proxy:${routePrefix}] -> ${proxyRes.statusCode}`);
            }
        },

        onError(err, req, res) {
            const gatewayError = new AppError("Bad gateway", 502);
            logger.error(`[proxy:${routePrefix}]`, gatewayError.message, err.message);

            if (!res.headersSent) {
                res.status(gatewayError.status).json({
                    success: false,
                    message: gatewayError.message,
                });
            }
        },
    });

    router.use(routePrefix, proxy);
    return router;
};
