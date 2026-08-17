import prisma from '../config/prisma.js';
import { parseDateInput } from "../../../../shared/utils/date.js";
import { toBigInt } from "../../../../shared/utils/response.js";

export const NotificationRepository = {
    async create(data) {
        const {
            created_by_employee_id,
            notification_type,
            title,
            content,
            reference_type,
            reference_id,
            employee_ids
        } = data;

        return prisma.notifications.create({
            data: {
                created_by_employee_id: toBigInt(created_by_employee_id),
                notification_type,
                title,
                content,
                reference_type: reference_type ?? null,
                reference_id: reference_id ? toBigInt(reference_id) : null,
                noti_users: {
                    createMany: {
                        data: employee_ids.map(employee_id => ({
                            employee_id: toBigInt(employee_id),
                        })),
                    },
                },
            },
            include: { noti_users: true },
        });
    },

    async getById(id) {
        return prisma.notifications.findUnique({
            where: { id: toBigInt(id) },
            include: { noti_users: true }
        });
    },

    async list() {
        return prisma.notifications.findMany({
            include: { noti_users: true },
            orderBy: { created_at: 'desc' },
        });
    },

    async getByEmployeeId(employeeId, page = 1, limit = 10) {
        const offset = (page - 1) * limit;
        return prisma.notifications.findMany({
            where: {
                noti_users: {
                    some: {
                        employee_id: toBigInt(employeeId),
                    }
                }
            },
            include: { noti_users: true },
            orderBy: { created_at: 'desc' },
            skip: offset,
            take: limit,
        });
    },

    async update(id, isRead) {
        return prisma.noti_users.update({
            where: { id: toBigInt(id) },
            data: { is_read: isRead }
        });
    }
};