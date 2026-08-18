import { z } from "zod";
import { dateStringSchema } from "../../../../shared/validations/dateString.validation.js";

// Repair Request
export const createRepairRequestSchema = z.object({
    created_by: z.union([z.string().min(1), z.number().int().positive()]),
    device_id: z.union([z.string().min(1), z.number().int().positive()]),
    priority: z.enum(["low", "medium", "high", "critical"]).default("medium"),
    description: z.string().trim().max(1000).optional(),
});

export const approveRepairRequestSchema = z.object({
    approved_by: z.union([z.string().min(1), z.number().int().positive()]),
    status: z.enum(["success", "fail"]),
});

// Plan
export const createPlanSchema = z.object({
    created_by: z.union([z.string().min(1), z.number().int().positive()]),
    device_id: z.union([z.string().min(1), z.number().int().positive()]),
    plan_type: z.enum(["maintenance", "repair"]).default("maintenance"),
    description: z.string().trim().max(1000).optional(),
    estimated_cost: z.union([z.string().trim().min(1), z.number().min(0)]).optional(),
    planned_start_at: dateStringSchema,
    planned_end_at: dateStringSchema,
    employee_ids: z.array(z.union([z.string().min(1), z.number().int().positive()]))
        .min(1),
});

export const updatePlanSchema = z
    .object({
        description: z.string().trim().max(1000).optional(),
        planned_start_at: dateStringSchema.optional(),
        planned_end_at: dateStringSchema.optional(),
        employeesList: z
            .array(
                z.object({
                    employee_id: z.union([z.string().min(1), z.number().int().positive()]),
                    availability_status: z.enum(["available", "unavailable"]).optional(),
                })
            )
            .optional(),
    })
    .refine((data) => Object.keys(data).length > 0, {
        message: "At least one field is required",
        path: [],
    });

// Adjust Plan Request
export const createAdjustPlanRequestSchema = z.object({
    created_by: z.union([z.string().min(1), z.number().int().positive()]),
    plan_id: z.union([z.string().min(1), z.number().int().positive()]),
    reason: z.string().trim().max(1000).optional(),
    suggestion: z.string().trim().max(1000).optional(),
});

export const approveAdjustPlanRequestSchema = z.object({
    approved_by: z.union([z.string().min(1), z.number().int().positive()]),
    status: z.enum(["success", "fail"]),
});

// Damage Report
export const createDamageReportSchema = z.object({
    created_by: z.union([z.string().min(1), z.number().int().positive()]),
    plan_id: z.union([z.string().min(1), z.number().int().positive()]),
    description: z.string().trim().max(1000).optional(),
    solution: z.string().trim().max(1000).optional(),
    repair_action: z.enum(["normal_repair", "send_warranty", "request_parts", "dispose"]).default("normal_repair"),
});

// Maintenance Request
export const createMaintenanceRequestSchema = z.object({
    created_by: z.union([z.string().min(1), z.number().int().positive()]),
    plan_id: z.union([z.string().min(1), z.number().int().positive()]),
    request_type: z.enum(["send_warranty", "dispose"]),
    reason: z.string().trim().max(1000).optional(),
});

export const approveMaintenanceRequestSchema = z.object({
    approved_by: z.union([z.string().min(1), z.number().int().positive()]),
    status: z.enum(["success", "fail"]),
});

// Acceptance Report
export const createAcceptanceReportSchema = z.object({
    created_by: z.union([z.string().min(1), z.number().int().positive()]),
    plan_id: z.union([z.string().min(1), z.number().int().positive()]),
    description: z.string().trim().max(1000).optional(),
});

export const approveAcceptanceReportSchema = z.object({
    approved_by: z.union([z.string().min(1), z.number().int().positive()]),
    status: z.enum(["success", "fail"]),
    review: z.string().trim().max(1000).optional(),
});


