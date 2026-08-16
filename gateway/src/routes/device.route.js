import { env } from "../config/env.js";
import { createServiceProxyRouter } from "../../../shared/utils/index.js";

const deviceRouter = createServiceProxyRouter({
    routePrefix: "/devices",
    target: env.DEVICE_SERVICE_URL,
    log: true,
});

export default deviceRouter;