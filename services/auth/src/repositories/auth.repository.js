import prisma from "../config/prisma.js";
import bcrypt from "bcryptjs";

export const AuthRepository = {
    findByUsername: async (username) =>
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

    findById: async (id) =>
        prisma.accounts.findUnique({
            where: { id },
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