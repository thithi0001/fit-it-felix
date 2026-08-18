import { env } from "../config/env.js";
import { createServiceProxyRouter } from "../../../shared/utils/index.js";

const aiRouter = createServiceProxyRouter({
    routePrefix: "/ai",
    target: env.AI_SERVICE_URL,
    log: true,
});

export default aiRouter;