import prisma from "../config/prisma.js";
import bcrypt from "bcryptjs";
import { toBigInt } from "../../../../shared/utils/response.js";

export const AuthRepository = {
    getByUsername: async (username) =>
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

    getById: async (id) =>
        prisma.accounts.findUnique({
            where: { id: toBigInt(id) },
            include: {
                roles: true,
                employees: {
                    include: {
                        departments: true,
                    },
                },
            },
        }),

    comparePassword: async (password, passwordHash) =>
        bcrypt.compare(password, passwordHash),
};