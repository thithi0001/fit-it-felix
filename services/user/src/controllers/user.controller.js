import { UserService } from "../services/user.service.js";
import { successResponse } from "../../../../shared/utils/response.js";

export const UserController = {
  health: (req, res) => res.json({ status: "OK" }),

  getById: async (req, res, next) => {
    try {
      const user = await UserService.getUserById(req.params.id);
      return res.json(successResponse({ data: user, message: "User found" }));
    } catch (error) {
      next(error);
    }
  },

  getByEmployeeCode: async (req, res, next) => {
    try {
      const user = await UserService.getUserByEmployeeCode(
        req.params.employee_code,
      );
      return res.json(successResponse({ data: user, message: "User found" }));
    } catch (error) {
      next(error);
    }
  },

  list: async (req, res, next) => {
    try {
      const users = await UserService.listUsers();
      return res.json(successResponse({ data: users, message: "List users" }));
    } catch (error) {
      next(error);
    }
  },

  listByRole: async (req, res, next) => {
    try {
      const users = await UserService.listEmployeeByRole(req.params.role);
      return res.json(
        successResponse({ data: users, message: "List employees by role" }),
      );
    } catch (error) {
      next(error);
    }
  },

  create: async (req, res, next) => {
    try {
      const user = await UserService.createUser(req.body);
      return res.json(successResponse({ data: user, message: "User created" }));
    } catch (error) {
      next(error);
    }
  },

  updateEmployee: async (req, res, next) => {
    try {
      const updatedEmployee = await UserService.updateEmployee(
        req.params.id,
        req.body,
      );
      return res.json(
        successResponse({ data: updatedEmployee, message: "Employee updated" }),
      );
    } catch (error) {
      next(error);
    }
  },
};
