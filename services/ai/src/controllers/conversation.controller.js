import { ConversationService } from "../services/conversation.service.js";
import { successResponse } from "../../../../shared/utils/response.js";

export const ConversationController = {
    create: async (req, res, next) => {
        try {
            const data = {
                employee_id: req.user.employee_id,
                title: req.body.title
            };

            const conversation = await ConversationService.createConversation(data);
            return res.json(successResponse({ data: conversation, message: "Conversation created"}));
        } catch (error) {
            next(error);
        }
    },

    getConversations: async (req, res, next) => {
        try {
            const employeeId = req.user.employee_id;
            const conversations = await ConversationService.getConversations(employeeId);
            return res.json(successResponse({ data: conversations, message: "Conversations list"}));
        } catch (error) {
            next(error);
        }
    },

    getConversationById: async (req, res, next) => {
        try {
            
            const id = req.params.id;
            const employeeId = req.user.employee_id;

            const conversation = await ConversationService.getConversationById(id, employeeId);
            return res.json(successResponse({ data: conversation, message: "Conversation retrieved"}));
        } catch (error) {
            next(error);
        }
    },

    deleteConversationById: async (req, res, next) => {
        try {
            const id = req.params.id;
            const employeeId = req.user.employee_id;
            const conversation = await ConversationService.deleteConversationById(id, employeeId);
            return res.json(successResponse({ data: conversation, message: "Conversation deleted"}));
        } catch (error) {
            next(error);
        }
    }
};