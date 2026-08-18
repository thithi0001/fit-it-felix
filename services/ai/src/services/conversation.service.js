import { badRequest, notFound } from '../../../../shared/utils/errors.js';
import { ConversationRepository } from '../repositories/conversation.repository.js';

const buildConversationPayload = (conversation) => {
    return {
        id: String(conversation.id),
        employee_id: String(conversation.employee_id),
        title: conversation.title ?? "",
        created_at: conversation.created_at ?? null,
        updated_at: conversation.updated_at ?? null
    };
}

export const ConversationService = {
    createConversation: async (data) => {
        const { employee_id, title } = data;
        const conversation = await ConversationRepository.create({ employee_id, title });
        return buildConversationPayload(conversation);
    },

    getConversationById: async (id, employee_id) => {
        const conversation = await ConversationRepository.findById(Number(id), Number(employee_id));
        if (!conversation) {
            throw notFound("Conversation not found");
        }
        return buildConversationPayload(conversation);
    },

    getConversationsByEmployeeId: async (employeeId) => {
        const conversations = await ConversationRepository.findByEmployeeId(Number(employeeId));
        return conversations.map(buildConversationPayload);
    },

    deleteConversationById: async (id, employee_id) => {
        const conversation = await ConversationRepository.findById(Number(id), Number(employee_id));
        if (!conversation) {
            throw notFound("Conversation not found");
        }
        await ConversationRepository.deleteById(Number(id));
        return buildConversationPayload(conversation);
    }
};