import { env } from "../config/env.js";
import { createServiceProxyRouter } from "../../../shared/utils/index.js";

const Router = createServiceProxyRouter({
    routePrefix: "/notifications",
    target: env.NOTIFICATION_SERVICE_URL,
    log: true,
});

export default Router;