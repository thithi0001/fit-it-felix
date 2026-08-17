import { z } from "zod";
import { dateStringSchema } from "../../../../shared/validations/dateString.validation.js";

export const updateEmployeeSchema = z
    .object({
        full_name: z.string().trim().min(2).max(150).optional(),
        employee_code: z.string().trim().min(3).max(30).optional(),
        department_id: z.union([z.string().min(1), z.number().int().positive()]).optional(),
        position: z.string().trim().min(1).max(100).optional(),
        phone: z.string().trim().min(1).max(20).optional(),
        date_of_birth: dateStringSchema.optional(),
        hire_date: dateStringSchema.optional(),
        termination_date: dateStringSchema.nullable().optional(),
    })
    .refine((data) => Object.keys(data).length > 0, {
        message: "At least one field is required",
        path: [],
    });

export const createEmployeeSchema = z.object({
    full_name: z.string().trim().min(2).max(150),
    employee_code: z.string().trim().min(3).max(30),
    department_id: z.union([z.string().min(1), z.number().int().positive()]).optional(),
    position: z.string().trim().min(1).max(100).optional(),
    phone: z.string().trim().min(1).max(20).optional(),
    date_of_birth: dateStringSchema.optional(),
    hire_date: dateStringSchema.optional(),
    termination_date: dateStringSchema.nullable().optional(),
    email: z.string().trim().email(),
    role_id: z.union([z.string().min(1), z.number().int().positive()]),
});