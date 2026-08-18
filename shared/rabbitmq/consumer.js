import { connectRabbitMQ, getChannel } from "./connection.js";
import { EXCHANGE_TYPES } from "../constants/exchanges.js";

export const consume = async (queue, callback, { exchange, routingKey } = {}) => {
    await connectRabbitMQ();

    const channel = getChannel();

    if (exchange) {
        await channel.assertExchange(exchange, EXCHANGE_TYPES.TOPIC, {
            durable: true,
        });
    }

    await channel.assertQueue(queue, {
        durable: true,
    });

    if (exchange && routingKey) {
        await channel.bindQueue(queue, exchange, routingKey);
    }

    channel.consume(queue, async (msg) => {
        if (!msg) return;

        try {
            const data = JSON.parse(msg.content.toString());

            await callback(data);

            channel.ack(msg);
        } catch (error) {
            channel.nack(msg, false, false);
        }
    });
};