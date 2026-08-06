import { getChannel } from "./connection.js";

export const consume = async (
    queue,
    callback
) => {
    const channel = getChannel();

    await channel.assertQueue(queue, {
        durable: true,
    });

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