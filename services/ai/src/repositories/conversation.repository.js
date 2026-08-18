import prisma from '../config/prisma.js';
import { parseDateInput } from "../../../../shared/utils/date.js";
import { toBigInt } from "../../../../shared/utils/response.js";

export const ConversationRepository = {
    create: async (data) => {
        const {
            employee_id,
            title = ""
        } = data;

        return prisma.conversations.create({
            data: {
                employee_id: toBigInt(employee_id),
                title
            }
        });
    },

    findById: async (id, employee_id) => {
        return prisma.conversations.findUnique({
            where: { 
                id: toBigInt(id),
                // employee_id: toBigInt(employee_id)
            }
        });
    },

    findByEmployeeId: async (employeeId) => {
        return prisma.conversations.findMany({
            where: { employee_id: toBigInt(employeeId) }
        });
    },

    deleteById: async (id) => {
        return prisma.conversations.delete({
            where: { id: toBigInt(id) }
        });
    },

};