import { UserRepository } from "../repositories/user.repository.js";

export const UserService = {
    getUserById: async (id) => UserRepository.findById(Number(id)),
    listUsers: async () => UserRepository.list(),
    createUser: async (payload) => UserRepository.createAccount(payload),
    updateEmployee: async (id, payload) => UserRepository.updateEmployee(id, payload),
};
