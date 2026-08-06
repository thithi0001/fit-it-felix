import app from "./app.js";
import { env } from "./config/env.js";
import { connectRabbitMQ } from "../../../shared/rabbitmq/index.js";

const start = async () => {
  await connectRabbitMQ().catch(err => console.error("RMQ err", err));
  app.listen(env.PORT, () => console.log(`Auth service listening ${env.PORT}`));
};

start();