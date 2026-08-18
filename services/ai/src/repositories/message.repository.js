import prisma from '../config/prisma.js';
import { parseDateInput } from "../../../../shared/utils/date.js";
import { toBigInt } from "../../../../shared/utils/response.js";

export const MessageRepository = {
    create: async (data) => {
        const {
            conversation_id,
            role,
            content
        } = data;

        return prisma.messages.create({
            data: {
                conversation_id: toBigInt(conversation_id),
                role,
                content
            }
        });
    },

    findByConversationId: async (conversationId) => {
        return prisma.messages.findMany({
            where: { conversation_id: toBigInt(conversationId) },
            orderBy: {
                created_at: 'asc'
            }
        });
    },

    getRecentMessagesByConversationId: async (conversationId, limit = 10) => {
        return prisma.messages.findMany({
            where: { conversation_id: toBigInt(conversationId) },
            orderBy: {
                created_at: 'desc'
            },
            take: limit
        });
    }
};