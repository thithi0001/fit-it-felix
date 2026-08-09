import { env } from "../config/env.js";
import { createServiceProxyRouter } from "../../../shared/utils/index.js";

const authRouter = createServiceProxyRouter({
    routePrefix: "/auth",
    target: env.AUTH_SERVICE_URL,
    log: true,
});

export default authRouter;
