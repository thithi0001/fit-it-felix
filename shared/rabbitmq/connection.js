import amqp from "amqplib";
import { env } from "../config/index.js";

let connection = null;
let channel = null;

export const connectRabbitMQ = async () => {
    if (connection && channel) {
        return { connection, channel };
    }

    connection = await amqp.connect(env.RABBITMQ_URL);

    channel = await connection.createChannel();

    console.log("RabbitMQ connected");

    return {
        connection,
        channel,
    };
};

export const getChannel = () => {
    if (!channel) {
        throw new Error("RabbitMQ is not connected");
    }

    return channel;
};