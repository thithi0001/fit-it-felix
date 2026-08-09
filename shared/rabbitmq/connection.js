import amqp from "amqplib";
import { env } from "../config/index.js";

let connection = null;
let channel = null;

export const connectRabbitMQ = async (
    timeoutMs = 5000,
    maxRetries = 30,
    retryDelayMs = 2000
) => {
    if (connection && channel) {
        return { connection, channel };
    }

    if (!env.RABBITMQ_URL) {
        throw new Error("RABBITMQ_URL is not defined");
    }

    for (let attempt = 1; attempt <= maxRetries; attempt += 1) {
        try {
            const connectPromise = amqp.connect(env.RABBITMQ_URL);
            const timeoutPromise = new Promise((_, reject) => {
                setTimeout(() => {
                    reject(new Error(`RabbitMQ connection timeout after ${timeoutMs}ms`));
                }, timeoutMs);
            });

            connection = await Promise.race([connectPromise, timeoutPromise]);
            channel = await connection.createChannel();

            console.log("RabbitMQ connected");
            return { connection, channel };
        } catch (error) {
            console.error(`RabbitMQ connection failed: ${error.message}`);
            connection = null;
            channel = null;

            if (attempt === maxRetries) {
                throw new Error(`RabbitMQ unavailable after ${maxRetries} retries`);
            }

            console.log(`RMQ retry ${attempt + 1}/${maxRetries} in ${retryDelayMs}ms`);
            await new Promise((resolve) => setTimeout(resolve, retryDelayMs));
        }
    }
};

export const getChannel = () => {
    if (!channel) {
        throw new Error("RabbitMQ is not connected");
    }

    return channel;
};