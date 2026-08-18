import { ConversationRepository } from "../repositories/conversation.repository.js";
import { MessageRepository } from "../repositories/message.repository.js";
import { generateResponse } from "./gemini.service.js";
import { toBigInt } from "../../../../shared/utils/response.js";

export const sendMessage = async (conversationId, employeeId, content) => {
    const normalizedEmployeeId = toBigInt(employeeId);
    const conversation =
        await ConversationRepository.findById(conversationId, employeeId);

    if (!conversation) {
        const error = new Error("Conversation not found");
        error.status = 404;
        throw error;
    }

    if (conversation.employee_id !== normalizedEmployeeId) {
        const error = new Error("You do not have access to this conversation");
        error.status = 403;
        throw error;
    }

    // Lưu message của user
    const userMessage = await MessageRepository.create({
        conversation_id: conversationId,
        role: "user",
        content,
    });

    // Lấy lịch sử conversation
    const messages =
        await MessageRepository.findByConversationId(conversationId);

    const history = messages.map((message) => ({
        role: message.role === "assistant" ? "model" : message.role,
        parts: [
            {
                text: message.content,
            },
        ],
    }));

    const startTime = Date.now();

    try {
        const result = await generateResponse(history);

        const responseTime = Date.now() - startTime;

        // Lưu response của Gemini
        const assistantMessage = await MessageRepository.create({
            conversation_id: conversationId,
            role: "assistant",
            content: result.content,
        });

        return {
            userMessage,
            assistantMessage,
            usage: result.usage,
            responseTime,
        };
    } catch (error) {
        throw error;
    }
};

export const getMessages = async (conversationId, employeeId) => {
    const normalizedEmployeeId = toBigInt(employeeId);
    const conversation =
        await ConversationRepository.findById(conversationId, employeeId);

    if (!conversation) {
        const error = new Error("Conversation not found");
        error.status = 404;
        throw error;
    }

    if (conversation.employee_id !== normalizedEmployeeId) {
        const error = new Error("You do not have access to this conversation");
        error.status = 403;
        throw error;
    }

    return await MessageRepository.findByConversationId(conversationId);
};
