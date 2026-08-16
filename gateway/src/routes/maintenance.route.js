import { env } from "../config/env.js";
import { createServiceProxyRouter } from "../../../shared/utils/index.js";

const maintenanceRouter = createServiceProxyRouter({
    routePrefix: "/maintenances",
    target: env.MAINTENANCE_SERVICE_URL,
    log: true,
});

export default maintenanceRouter;