import prisma from '../config/prisma.js';
import { parseDateInput } from "../../../../shared/utils/date.js";
import { toBigInt } from "../../../../shared/utils/response.js";

export const AuditRepository = {
    createAudit: async (auditData) => {
        // i will implement this function later
    },

    findById: async (id) => {
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

    // find records between 2 timestamps
    findByDateRange: async (startDate, endDate) => {
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

    // find by employee id
    findByEmployeeId: async (employeeId) => {
        // i will implement this function later
        return prisma.audit_logs.findMany({
            orderBy: { created_at: 'desc' },
            where: { employee_id: toBigInt(employeeId) }
        });
    },

    // find by action
    findByAction: async (action) => {
        // i will implement this function later
        return prisma.audit_logs.findMany({
            orderBy: { created_at: 'desc' },
            where: { action }
        });
    },

    // find by service 
    findByService: async (service) => {
        // i will implement this function later
        return prisma.audit_logs.findMany({
            orderBy: { created_at: 'desc' },
            where: { service_name: service }
        });
    }
};