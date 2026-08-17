import { z } from 'zod';

export const createNofificationSchema = z.object({
    created_by_employee_id: z.union([z.string().min(1), z.number().int().positive()]),
    notification_type: z.string().min(1),
    title: z.string().min(1),
    content: z.string().min(1),
    reference_type: z.string().nullable().optional(),
    reference_id: z.union([z.string().min(1), z.number().int().positive()]).nullable().optional(),
    employee_ids: z.array(z.union([z.string().min(1), z.number().int().positive()])).min(1),
});