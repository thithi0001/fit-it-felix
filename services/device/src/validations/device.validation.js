import { z } from "zod";
import { dateStringSchema } from "../../../../shared/validations/dateString.validation.js";

export const createAssignRequestSchema = z.object({
    created_by: z.union([z.string().min(1), z.number().int().positive()]),
    reason: z.string().trim().max(500).optional().default(""),
    category_list: z
        .array(
            z.object({
                id: z.union([z.string().min(1), z.number().int().positive()]),
                requested_quantiy: z.number().int().positive(),
            })
        )
        .min(1),
});

export const approveAssignRequestDetailSchema = z
    .object({
        approved_by: z.union([z.string().min(1), z.number().int().positive()]),
        status: z.enum(["success", "fail"]),
        employee_device_data: z
            .object({
                employee_id: z.union([z.string().min(1), z.number().int().positive()]),
                device_id: z.union([z.string().min(1), z.number().int().positive()]),
            })
            .optional(),
    })
    .superRefine((data, ctx) => {
        if (data.status === "success" && !data.employee_device_data) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["employee_device_data"],
                message: "employee_device_data là bắt buộc khi status = success",
            });
        }
    });

export const updateDeviceSchema = z
    .object({
        category_id: z.union([z.string().min(1), z.number().int().positive()]).optional(),
        device_code: z.string().trim().min(1).max(50).optional(),
        device_name: z.string().trim().min(1).max(150).optional(),
        serial_number: z.string().trim().min(1).max(100).optional(),
        model: z.string().trim().min(1).max(100).optional(),
        manufacturer_name: z.string().trim().min(1).max(150).optional(),
        supplier_name: z.string().trim().min(1).max(150).optional(),
        manufacture_date: dateStringSchema.optional(),
        purchase_date: dateStringSchema.optional(),
        purchase_price: z.union([z.string().trim().min(1), z.number().min(0)]).optional(),
        original_cost: z.union([z.string().trim().min(1), z.number().min(0)]).optional(),
        warranty_start_date: dateStringSchema.optional(),
        warranty_end_date: dateStringSchema.optional(),
    })
    .refine((data) => Object.keys(data).length > 0, {
        message: "At least one field is required",
        path: [],
    });