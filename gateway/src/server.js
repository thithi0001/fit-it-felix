import app from "./app.js";
import { env } from "./config/env.js";

const start = async () => {
    app.listen(env.PORT, () => {
        console.log(`Gateway listening on port ${env.PORT}`);
    });
};

start();
