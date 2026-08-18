import app from "./app.js";
import { env } from "./config/env.js";
import { connectRabbitMQ } from "../../../shared/rabbitmq/index.js";

const start = async () => {
  let connected = false;

  for (let attempt = 1; attempt <= 30; attempt++) {
    try {
      await connectRabbitMQ();
      connected = true;
      break;
    } catch (err) {
      console.error(`RMQ retry ${attempt}/30: ${err.message}`);
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }

  if (!connected) {
    throw new Error("RabbitMQ is not available after multiple attempts");
  }

  app.listen(env.PORT, () => console.log(`AI service listening ${env.PORT}`));
};

start().catch(err => {
  console.error("Failed to start AI service:", err);
  process.exit(1);
});