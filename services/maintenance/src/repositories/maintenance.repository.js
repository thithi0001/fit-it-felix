import prisma from '../config/prisma.js';
import { parseDateInput } from "../../../../shared/utils/date.js";
import { toBigInt } from "../../../../shared/utils/response.js";

export const MaintenanceRepository = {
    // gửi sự kiện cập nhật trạng thái thiết bị => broken
    createRepairRequest: async (data) => {
        const {
            created_by,
            device_id,
            priority,
            description,
        } = data;

        return prisma.repairs.create({
            data: {
                created_by_employee_id: toBigInt(created_by),
                device_id: toBigInt(device_id),
                priority,
                description
            }
        });
    },
    
    approveRepairRequest: async (id, data) => {
        const {
            approved_by,
            status
        } = data;

        return prisma.repairs.update({
            where: { id: toBigInt(id) },
            data: {
                approved_by_employee_id: toBigInt(approved_by),
                status
            }
        });
    },
    
    getRepairRequestById: async (id) => {
        return prisma.repairs.findUnique({
            where: { id: toBigInt(id) }
        });
    },

    listRepairRequests: async () => {
        return prisma.repairs.findMany({
            orderBy: { created_at: 'desc' }
        });
    },
    
    
    createPlan: async (data) => {
        const {
            created_by,
            device_id,
            plan_type,
            description,
            estimated_cost,
            planned_start_at,
            planned_end_at,
            employee_ids
        } = data;

        return prisma.plans.create({
            data: {
                created_by_employee_id: toBigInt(created_by),
                device_id: toBigInt(device_id),
                plan_type,
                description,
                estimated_cost: estimated_cost !== undefined ? Number(estimated_cost) : undefined,
                planned_start_at: parseDateInput(planned_start_at),
                planned_end_at: parseDateInput(planned_end_at),

                plan_assignments: {
                    createMany: {
                        data: employee_ids.map(id => ({
                            employee_id: toBigInt(id)
                        }))
                    }
                }
            },
            include: {
                plan_assignments: true
            }
        });
    },
    
    // manager ownership
    updatePlan: async (id, data) => {
        const {
            description,
            planned_start_at,
            planned_end_at,
            employeesList = []
        } = data;

        // employeesList = [{availability_status, employee_id}, ...]
        const updateData = {};

        if (description !== undefined) updateData.description = description;
        if (planned_start_at !== undefined) updateData.planned_start_at = parseDateInput(planned_start_at);
        if (planned_end_at !== undefined) updateData.planned_end_at = parseDateInput(planned_end_at);
        
        return prisma.plans.update({
            where: { id: toBigInt(id) },
            data: {
                ...updateData,

                plan_assignments: {
                    deleteMany: {},
                    createMany: {
                        data: employeesList.map(emp => ({
                            employee_id: toBigInt(emp.employee_id),
                            availability_status: emp.availability_status
                        }))
                    }
                }
            },
            include: {
                plan_assignments: true
            }
        });
    },

    // gửi sự kiện cập nhật trạng thái thiết bị => under_maintenance
    startPlan: async (id) => {
        return prisma.plans.update({
            where: { id: toBigInt(id) },
            data: {
                status: "ongoing",
                actual_start_at: new Date()
            },
        });
    },

    cancelPlan: async (id) => {
        return prisma.plans.update({
            where: { id: toBigInt(id) },
            data: {
                status: "cancelled"
            }
        });
    },

    completePlan: async (id) => {
        return prisma.plans.update({
            where: { id: toBigInt(id) },
            data: {
                status: "completed",
                actual_end_at: new Date()
            }
        });
    },

    getPlanById: async (id) => {
        return prisma.plans.findUnique({
            where: { id: toBigInt(id) },
            include: {
                plan_assignments: true
            }
        });
    },
    
    getPlansByAssignment: async (employeeId) => {
        return prisma.plans.findMany({
            where: {
                plan_assignments: {
                    some: {
                        employee_id: toBigInt(employeeId)
                    }
                }
            },
            orderBy: { planned_start_at: 'desc' }
        });
    },
    
    listPlans: async () => {
        return prisma.plans.findMany({
            orderBy: { planned_start_at: 'desc' }
        });
    },
    
    listPlansByStatus: async (status) => {
        return prisma.plans.findMany({
            where: { status: status },
            orderBy: { planned_start_at: 'desc' }
        });
    },

    listAllPlanDocuments: async (planId) => {
        const plan_id = toBigInt(planId);
        // repair request
        const repairs = await prisma.repairs.findMany({
            where: {
                plans: {
                    some: { plan_id }
                }
            },
            orderBy: { created_at: 'desc' }
        });
        // adjust request
        const adjusts = await prisma.adjust_plans.findMany({
            where: { plan_id },
            orderBy: { created_at: 'desc' }
        });
        // damage report
        const damages = await prisma.damage_reports.findMany({
            where: { plan_id },
            orderBy: { created_at: 'desc' }
        });
        // maintenance request
        const maintenances = await prisma.maintenance_requests.findMany({
            where: { plan_id },
            orderBy: { created_at: 'desc' }
        });
        // acceptance report
        const acceptances = await prisma.acceptance_reports.findMany({
            where: { plan_id },
            orderBy: { created_at: 'desc' }
        });
        return {
            repairs,
            adjusts,
            damages,
            maintenances,
            acceptances
        };
    },
    

    createAdjustPlanRequest: async (data) => {
        const {
            created_by,
            plan_id,
            reason,
            suggestion
        } = data;

        return prisma.adjust_plans.create({
            data: {
                created_by_employee_id: toBigInt(created_by),
                plan_id: toBigInt(plan_id),
                reason,
                suggestion
            }
        });
    },
    
    approveAdjustPlanRequest: async (id, data) => {
        const {
            approved_by,
            status
        } = data;

        return prisma.adjust_plans.update({
            where: { id: toBigInt(id) },
            data: {
                approved_by_employee_id: toBigInt(approved_by),
                status
            }
        });
    },
    
    getAdjustPlanRequestById: async (id) => {
        return prisma.adjust_plans.findUnique({
            where: { id: toBigInt(id) }
        });
    },

    listAdjustPlanRequest: async () => {
        return prisma.adjust_plans.findMany({
            orderBy: { created_at: 'desc' }
        });
    },
    
    
    createDamageReport: async (data) => {
        const {
            created_by,
            plan_id,
            description,
            solution,
            repair_action
        } = data;

        return prisma.damage_reports.create({
            data: {
                created_by_employee_id: toBigInt(created_by),
                plan_id: toBigInt(plan_id),
                description,
                solution,
                repair_action
            }
        });
    },
    
    getDamageReportById: async (id) => {
        return prisma.damage_reports.findUnique({
            where: { id: toBigInt(id) }
        });
    },
    
    
    createMaintenanceRequest: async (data) => {
        const {
            created_by,
            plan_id,
            request_type,
            reason
        } = data;

        return prisma.maintenance_requests.create({
            data: {
                created_by_employee_id: toBigInt(created_by),
                plan_id: toBigInt(plan_id),
                request_type,
                reason
            }
        });
    },
    
    // gửi sự kiện cập nhật trạng thái thiết bị
    approveMaintenanceRequest: async (id, data) => {
        const {
            approved_by,
            status
        } = data;

        return prisma.maintenance_requests.update({
            where: { id: toBigInt(id) },
            data: {
                approved_by_employee_id: toBigInt(approved_by),
                status
            }
        });
    },
    
    getMaintenanceRequestById: async (id) => {
        return prisma.maintenance_requests.findUnique({
            where: { id: toBigInt(id) }
        });
    },
    
    
    createAcceptanceReport: async (data) => {
        const {
            created_by,
            plan_id,
            description
        } = data;

        return prisma.acceptance_reports.create({
            data: {
                created_by_employee_id: toBigInt(created_by),
                plan_id: toBigInt(plan_id),
                description
            }
        });
    },
    
    // gửi sự kiện cập nhật trạng thái thiết bị
    approveAcceptanceReport: async (id, data) => {
        const {
            approved_by,
            status,
            review
        } = data;

        return prisma.acceptance_reports.update({
            where: { id: toBigInt(id) },
            data: {
                approved_by_employee_id: toBigInt(approved_by),
                status,
                review
            }
        });
    },
    
    getAcceptanceReportById: async (id) => {
        return prisma.acceptance_reports.findUnique({
            where: { id: toBigInt(id) }
        });
    },

    listAcceptanceReports: async () => {
        return prisma.acceptance_reports.findMany({
            orderBy: { created_at: 'desc' }
        });
    }
    
};