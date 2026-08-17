import { NotificationService } from "../services/notification.service.js";
import { successResponse } from "../../../../shared/utils/response.js";


export const NotificationController = {
    health: async (req, res) => res.json({status: 'ok'}),

    create: async (req, res) => {
        try {
            const data = req.body;
            const notification = await NotificationService.create(data);
            return successResponse(res, 201, 'Notification created successfully', notification);
        } catch (error) {
            console.error('Error creating notification:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },

    list: async (req, res) => {
        try {
            const notifications = await NotificationService.list();
            return successResponse(res, 200, 'Notifications retrieved successfully', notifications);
        } catch (error) {
            console.error('Error fetching notifications:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },

    getById: async (req, res) => {
        try {
            const id = req.params.id;
            const notification = await NotificationService.getById(id);
            return successResponse(res, 200, 'Notification retrieved successfully', notification);
        } catch (error) {
            console.error('Error fetching notification:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },

    getByEmployeeId: async (req, res) => {
        try {
            const employeeId = req.params.employeeId;
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const notifications = await NotificationService.getByEmployeeId(employeeId, page, limit);
            return successResponse(res, 200, 'Notifications retrieved successfully', notifications);
        } catch (error) {
            console.error('Error fetching notifications:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },

    update: async (req, res) => {
        try {
            const id = req.params.id;
            const isRead = req.body.is_read;
            const updatedNotification = await NotificationService.update(id, isRead);
            return successResponse(res, 200, 'Notification updated successfully', updatedNotification);
        } catch (error) {
            console.error('Error updating notification:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
};