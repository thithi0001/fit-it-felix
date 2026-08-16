import { env } from "../config/env.js";
import { createServiceProxyRouter } from "../../../shared/utils/index.js";

const auditRouter = createServiceProxyRouter({
    routePrefix: "/audits",
    target: env.AUDIT_SERVICE_URL,
    log: true,
});

export default auditRouter;