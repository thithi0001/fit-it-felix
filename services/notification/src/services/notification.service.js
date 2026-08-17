import { NotificationRepository } from '../repositories/notification.repository.js';

const buildNotificationPayload = (notification) => {
    const noti_users = notification?.noti_users ?? null;
    
    return {
        id: String(notification.id),
        title: notification.title,
        notification_type: notification.notification_type,
        content: notification.content,
        created_at: notification.created_at,
        reference_type: notification.reference_type ?? null,
        reference_id: notification.reference_id ?? null,
        receiver_info: noti_users
            ? {
                id: String(noti_users.id),
                employee_id: String(noti_users.employee_id),
                is_read: noti_users.is_read,
                read_at: noti_users.read_at
            }
            : null,
    };
}

export const NotificationService = {
    async create(data) {
        const notification = await NotificationRepository.create(data);
        return buildNotificationPayload(notification);
    },

    async getById(id) {
        const notification = await NotificationRepository.getById(id);
        return buildNotificationPayload(notification);
    },

    async list() {
        const notifications = await NotificationRepository.list();
        return notifications.map(buildNotificationPayload);
    },

    async getByEmployeeId(employeeId, page = 1, limit = 10) {
        const notifications = await NotificationRepository.getByEmployeeId(employeeId, page, limit);
        return notifications.map(buildNotificationPayload);
    },
    
    async update(id, isRead) {
        const noti_users = await NotificationRepository.update(id, isRead);
        const notification = await NotificationRepository.getById(noti_users.notification_id);
        return buildNotificationPayload(notification);
    }
};