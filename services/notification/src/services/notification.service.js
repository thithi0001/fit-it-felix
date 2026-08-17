import { badRequest, notFound } from '../../../../shared/utils/errors.js';
import { NotificationRepository } from '../repositories/notification.repository.js';

const buildNotificationPayload = (notification) => {
    const noti_users = notification?.noti_users ?? [];
    
    return {
        id: String(notification.id),
        title: notification.title,
        notification_type: notification.notification_type,
        content: notification.content,
        created_at: notification.created_at,
        reference_type: notification.reference_type ?? null,
        reference_id: notification.reference_id ?? null,
        receiver_info: noti_users.map(user => ({
            id: String(user.id),
            employee_id: String(user.employee_id),
            is_read: user.is_read,
            read_at: user.read_at
        })),
    };
}

export const NotificationService = {
    async create(data) {
        const notification = await NotificationRepository.create(data);
        if (!notification) {
            throw badRequest("Cannot create notification");
        }

        return buildNotificationPayload(notification);
    },

    async getById(id) {
        const notification = await NotificationRepository.getById(Number(id));
        if (!notification) {
            throw notFound("Notification not found");
        }

        return buildNotificationPayload(notification);
    },

    async list() {
        const notifications = await NotificationRepository.list();
        return notifications.map(buildNotificationPayload);
    },

    async getByEmployeeId(employeeId, page = 1, limit = 10) {
        const notifications = await NotificationRepository.getByEmployeeId(Number(employeeId), page, limit);
        return notifications.map(buildNotificationPayload);
    },
    
    async update(id, isRead) {
        const noti_users = await NotificationRepository.update(Number(id), Boolean(isRead));
        const notification = await NotificationRepository.getById(noti_users.notification_id);
        if (!notification) {
            throw badRequest("Cannot update notification");
        }

        return buildNotificationPayload(notification);
    }
};