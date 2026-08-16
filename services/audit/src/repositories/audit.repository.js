import prisma from '../config/prisma.js';
import { parseDateInput } from "../../../../shared/utils/date.js";
import { toBigInt } from "../../../../shared/utils/response.js";

export const AuditRepository = {
    createAudit: async (auditData) => {
        // i will implement this function later
    },

    getById: async (id) => {
        // i will implement this function later
        return prisma.audit_logs.findUnique({
            where: { id: toBigInt(id) },
        });
    },

    list: async () => {
        // i will implement this function later
        return prisma.audit_logs.findMany({
            orderBy: { created_at: 'desc' },
        });
    },

    getByDateRange: async (startDate, endDate) => {
        // i will implement this function later
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
        // i will implement this function later
        return prisma.audit_logs.findMany({
            orderBy: { created_at: 'desc' },
            where: { employee_id: toBigInt(employeeId) }
        });
    },

    getByAction: async (action) => {
        // i will implement this function later
        return prisma.audit_logs.findMany({
            orderBy: { created_at: 'desc' },
            where: { action }
        });
    },

    getByService: async (service) => {
        // i will implement this function later
        return prisma.audit_logs.findMany({
            orderBy: { created_at: 'desc' },
            where: { service_name: service }
        });
    }
};