import { env } from "../config/env.js";
import { createServiceProxyRouter } from "../../../shared/utils/index.js";

const inventoryRouter = createServiceProxyRouter({
    routePrefix: "/inventory",
    target: env.INVENTORY_SERVICE_URL,
    log: true,
});

export default inventoryRouter;