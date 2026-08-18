import { z } from 'zod';

export const approveItemRequestSchema = z.object({
    approved_by_employee_id: z.union([z.string().min(1), z.number().int().positive()]),
    status: z.enum(["success", "fail"]),
});

export const createItemRequestSchema = z.object({
    created_by_employee_id: z.union([z.string().min(1), z.number().int().positive()]),
    plan_id: z.union([z.string().min(1), z.number().int().positive()]).optional(),
    request_type: z.enum(["issue", "return"]),
    reason: z.string().trim().max(500).optional().default(""),
    item_list: z
        .array(
            z.object({
                inventory_id: z.union([z.string().min(1), z.number().int().positive()]),
                quantity: z.number().int().positive(),
            })
        )
        .min(1),
});