import { badRequest, notFound } from "../../../../shared/utils/errors.js";
import { UserRepository } from "../repositories/user.repository.js";

const buildEmployeePayload = (employee) => {
  const account = employee?.accounts ?? null;
  const department = employee?.departments ?? null;
  const role = account?.roles ?? null;

  return {
    employee_id: String(employee?.id ?? ""),
    status: account?.status ?? null,
    role: role?.code ?? null,
    email: account?.email ?? null,
    employee: employee
      ? {
          employee_code: employee.employee_code,
          full_name: employee.full_name,
          position: employee.position,
          phone: employee.phone,
          date_of_birth: employee.date_of_birth,
          hire_date: employee.hire_date,
          termination_date: employee.termination_date,
          department: department
            ? {
                id: String(department.id),
                name: department.name,
              }
            : null,
        }
      : null,
  };
};

export const UserService = {
  getUserById: async (id) => {
    const employee = await UserRepository.getById(Number(id));
    if (!employee) {
      throw notFound("User not found");
    }

    return buildEmployeePayload(employee);
  },

  getUserByEmployeeCode: async (employeeCode) => {
    const employee = await UserRepository.getByEmployeeCode(employeeCode);
    if (!employee) {
      throw notFound("User not found");
    }

    return buildEmployeePayload(employee);
  },

  listUsers: async () => {
    const employees = await UserRepository.list();
    return employees.map(buildEmployeePayload);
  },

  listEmployeeByRole: async (roleCode) => {
    const employees = await UserRepository.listByRole(roleCode);
    return employees.map(buildEmployeePayload);
  },

  createUser: async (payload) => {
    const employee = await UserRepository.createAccount(payload);
    if (!employee) {
      throw badRequest("Cannot create user");
    }

    return buildEmployeePayload(employee);
  },

  updateEmployee: async (id, payload) => {
    const employee = await UserRepository.updateEmployee(id, payload);
    if (!employee) {
      throw badRequest("Cannot update user");
    }

    return buildEmployeePayload(employee);
  },
};
