import { getChannel } from "./connection.js";
import { EXCHANGE_TYPES } from "../constants/exchanges.js";

export const publish = async (
    exchange,
    routingKey,
    message
) => {
    const channel = getChannel();

    await channel.assertExchange(
        exchange,
        EXCHANGE_TYPES.TOPIC,
        {
            durable: true,
        }
    );

    channel.publish(
        exchange,
        routingKey,
        Buffer.from(JSON.stringify(message))
    );
};