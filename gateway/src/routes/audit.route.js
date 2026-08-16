import { env } from "../config/env.js";
import { createServiceProxyRouter } from "../../../shared/utils/index.js";

const auditRouter = createServiceProxyRouter({
    routePrefix: "/audit",
    target: env.AUDIT_SERVICE_URL,
    log: true,
});

export default auditRouter;