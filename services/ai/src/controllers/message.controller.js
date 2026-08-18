import { successResponse } from "../../../../shared/utils/response.js";
import { sendMessage, getMessages } from "../services/chat.service.js";
import { MessageRepository } from "../repositories/message.repository.js";

export const MessageController = {
    sendMessage: async (req, res, next) => {
        try {
            const employeeId = req.user.employee_id;
            const { conversationId } = req.params;
            const { content } = req.body;

            const result = await sendMessage(
                conversationId,
                employeeId,
                content
            );

            return res.json(successResponse({ data: result, message: "Send message successfully"} ));
        } catch (error) {
            next(error);
        }
    },

    getMessages: async (req, res, next) => {
        try {
            const employeeId = req.user.employee_id;
            const { conversationId } = req.params;

            const messages = await getMessages(conversationId, employeeId);

            return res.json(successResponse({ data: messages, message: "Messages retrieved" }));
        } catch (error) {
            next(error);
        }
    },

};