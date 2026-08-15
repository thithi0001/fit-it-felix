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
        const employee = await UserRepository.findById(Number(id));
        return employee ? buildEmployeePayload(employee) : null;
    },

    listUsers: async () => {
        const employees = await UserRepository.list();
        return employees.map(buildEmployeePayload);
    },

    createUser: async (payload) => UserRepository.createAccount(payload),
    updateEmployee: async (id, payload) => UserRepository.updateEmployee(id, payload),
};
