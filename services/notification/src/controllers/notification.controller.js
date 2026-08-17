import { NotificationService } from "../services/notification.service.js";
import { successResponse } from "../../../../shared/utils/response.js";


export const NotificationController = {
    health: async (req, res) => res.json({status: 'ok'}),

    create: async (req, res) => {
        try {
            const data = req.body;
            const notification = await NotificationService.create(data);
            return res.json(successResponse({ data: notification, message: "Notification created successfully" }));
        } catch (error) {
            next(error);
        }
    },

    list: async (req, res) => {
        try {
            const notifications = await NotificationService.list();
            return res.json(successResponse({ data: notifications, message: "Notifications retrieved successfully" }));
        } catch (error) {
            next(error);
        }
    },

    getById: async (req, res) => {
        try {
            const id = req.params.id;
            const notification = await NotificationService.getById(id);
            return res.json(successResponse({ data: notification, message: "Notification retrieved successfully" }));
        } catch (error) {
            next(error);
        }
    },

    getByEmployeeId: async (req, res) => {
        try {
            const employeeId = req.params.employeeId;
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const notifications = await NotificationService.getByEmployeeId(employeeId, page, limit);
            return res.json(successResponse({ data: notifications, message: "Notifications retrieved successfully" }));
        } catch (error) {
            next(error);
        }
    },

    update: async (req, res) => {
        try {
            const id = req.params.id;
            const isRead = req.body.is_read;
            const updatedNotification = await NotificationService.update(id, isRead);
            return res.json(successResponse({ data: updatedNotification, message: "Notification updated successfully" }));
        } catch (error) {
            next(error);
        }
    }
};