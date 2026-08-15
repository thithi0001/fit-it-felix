import prisma from "../config/prisma.js";
import bcrypt from "bcryptjs";
import { parseDateInput } from "../../../../shared/utils/date.js";
import { toBigInt } from "../../../../shared/utils/response.js";

const normalizeName = (value = "") =>
    value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, " ")
        .trim();

const generateUsername = (fullName, employeeCode) => {
    const namePart = normalizeName(fullName)
        .split(" ")
        .filter(Boolean)
        .at(-1)
        ?.toLowerCase();

    return `${namePart || "user"}_${String(employeeCode).toLowerCase()}`;
};

const generatePassword = (fullName, dateOfBirth) => {
    const initials = normalizeName(fullName)
        .split(" ")
        .filter(Boolean)
        .map((word) => word[0])
        .join("")
        .toUpperCase();

    const dobValue = String(dateOfBirth || "")
        .replace(/\D/g, "")
        .slice(-8);

    return `${initials || "USER"}@${dobValue}`;
};

export const UserRepository = {
    findById: async (id) =>
        prisma.employees.findUnique({
            where: { id: toBigInt(id) },
            include: {
                departments: true,
                accounts: {
                    include: {
                        roles: true,
                    },
                },
            },
        }),

    list: async () =>
        prisma.employees.findMany({
            include: {
                departments: true,
                accounts: {
                    include: {
                        roles: true,
                    },
                },
            },
        }),

    findbyUsername: async (username) =>
        prisma.accounts.findUnique({
            where: { username },
            include: {
                roles: true,
                employees: {
                    include: {
                        departments: true,
                    },
                },
            },
        }),

    finbyEmail: async (email) =>
        prisma.accounts.findUnique({
            where: { email },
            include: {
                roles: true,
                employees: {
                    include: {
                        departments: true,
                    },
                },
            },
        }),

    createAccount: async (payload) => {
        const {
            full_name,
            employee_code,
            date_of_birth,
            department_id,
            position,
            phone,
            email,
            role_id,
            username,
            status = "active",
            hire_date,
            termination_date,
        } = payload;

        if (!full_name || !employee_code || !email || !role_id || !date_of_birth) {
            throw new Error("Missing required fields: full_name, employee_code, email, role_id, date_of_birth");
        }

        const generatedUsername = username || generateUsername(full_name, employee_code);
        const rawPassword = generatePassword(full_name, date_of_birth);
        const passwordHash = await bcrypt.hash(rawPassword, 10);

        return prisma.$transaction(async (tx) => {
            const employee = await tx.employees.create({
                data: {
                    department_id: department_id ? toBigInt(department_id) : null,
                    employee_code,
                    full_name,
                    position: position ?? null,
                    phone: phone ?? null,
                    date_of_birth: parseDateInput(date_of_birth),
                    hire_date: parseDateInput(hire_date),
                    termination_date: parseDateInput(termination_date),
                },
            });

            return tx.accounts.create({
                data: {
                    employee_id: toBigInt(employee.id),
                    role_id: toBigInt(role_id),
                    username: generatedUsername,
                    email,
                    password_hash: passwordHash,
                    status,
                },
                include: {
                    roles: true,
                    employees: {
                        include: {
                            departments: true,
                        },
                    },
                },
            });
        });
    },

    // nhân viên tự cập nhật thông tin cá nhân
    updateEmployee: async (id, payload) => {
        const {
            full_name,
            // employee_code,
            // date_of_birth,
            // department_id,
            // position,
            phone,
            // hire_date,
            // termination_date,
        } = payload;

        const updateData = {};

        if (full_name !== undefined) updateData.full_name = full_name;
        // if (employee_code !== undefined) updateData.employee_code = employee_code;
        // if (department_id !== undefined) updateData.department_id = toBigInt(department_id);
        // if (position !== undefined) updateData.position = position;
        if (phone !== undefined) updateData.phone = phone;
        // if (date_of_birth !== undefined) updateData.date_of_birth = parseDateInput(date_of_birth);
        // if (hire_date !== undefined) updateData.hire_date = parseDateInput(hire_date);
        // if (termination_date !== undefined) {
        //     updateData.termination_date = termination_date === null ? null : parseDateInput(termination_date);
        // }

        if (Object.keys(updateData).length === 0) {
            throw new Error("No update fields provided");
        }

        return prisma.employees.update({
            where: { id: toBigInt(id) },
            data: updateData,
        });
    },
};
