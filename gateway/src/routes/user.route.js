import { env } from "../config/env.js";
import { createServiceProxyRouter } from "../../../shared/utils/index.js";

const userRouter = createServiceProxyRouter({
    routePrefix: "/users",
    target: env.USER_SERVICE_URL,
    log: true,
});

export default userRouter;