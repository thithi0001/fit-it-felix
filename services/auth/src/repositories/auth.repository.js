import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";

const users = [];

export const AuthRepository = {
    findByEmail: async (email) => users.find((user) => user.email === email),

    createUser: async ({ name, email, password }) => {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = {
            id: randomUUID(),
            name,
            email,
            password: hashedPassword,
        };
        users.push(user);
        return user;
    },

    comparePassword: async (password, hashedPassword) => bcrypt.compare(password, hashedPassword),
};