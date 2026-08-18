import prisma from '../config/prisma.js';
import { parseDateInput } from "../../../../shared/utils/date.js";
import { toBigInt } from "../../../../shared/utils/response.js";

export const AuditRepository = {
    createAudit: async (auditData) => {
        const {
            actor_id,
            action,
            service_name,
            old_value,
            new_value,
            ip_address,
            user_agent
        } = auditData;

        return prisma.audit_logs.create({
            data: {
                actor_employee_id: toBigInt(actor_id),
                action,
                service_name,
                old_value,
                new_value,
                ip_address,
                user_agent
            }
        });
    },

    getById: async (id) => {
        return prisma.audit_logs.findUnique({
            where: { id: toBigInt(id) },
        });
    },

    list: async () => {
        return prisma.audit_logs.findMany({
            orderBy: { created_at: 'desc' },
        });
    },

    getByDateRange: async (startDate, endDate) => {
        return prisma.audit_logs.findMany({
            orderBy: { created_at: 'desc' },
            where: {
                created_at: {
                    gte: parseDateInput(startDate),
                    lte: parseDateInput(endDate)
                }
            }
        });
    },

    getByEmployeeId: async (employeeId) => {
        return prisma.audit_logs.findMany({
            orderBy: { created_at: 'desc' },
            where: { employee_id: toBigInt(employeeId) }
        });
    },

    getByAction: async (action) => {
        return prisma.audit_logs.findMany({
            orderBy: { created_at: 'desc' },
            where: { action }
        });
    },

    getByService: async (service) => {
        return prisma.audit_logs.findMany({
            orderBy: { created_at: 'desc' },
            where: { service_name: service }
        });
    }
};