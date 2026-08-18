import prisma from "../config/prisma.js";
import { parseDateInput } from "../../../../shared/utils/date.js";
import { toBigInt } from "../../../../shared/utils/response.js";

export const DeviceRepository = {
    listDevices: async () => {
        return prisma.devices.findMany({
            include: { categories: true }
        });
    },

    updateDevice: async (id, data) => {
        const {
            category_id,
            device_code,
            device_name,
            serial_number,
            model,
            manufacturer_name,
            supplier_name,
            manufacture_date,
            purchase_date,
            purchase_price,
            original_cost,
            warranty_start_date,
            warranty_end_date,
        } = data;

        const updateData = {};

        if (category_id !== undefined) updateData.category_id = toBigInt(category_id);
        if (device_code !== undefined) updateData.device_code = device_code;
        if (device_name !== undefined) updateData.device_name = device_name;
        if (serial_number !== undefined) updateData.serial_number = serial_number;
        if (model !== undefined) updateData.model = model;
        if (manufacturer_name !== undefined) updateData.manufacturer_name = manufacturer_name;
        if (supplier_name !== undefined) updateData.supplier_name = supplier_name;
        if (manufacture_date !== undefined) updateData.manufacture_date = parseDateInput(manufacture_date);
        if (purchase_date !== undefined) updateData.purchase_date = parseDateInput(purchase_date);
        if (purchase_price !== undefined) updateData.purchase_price = Number(purchase_price);
        if (original_cost !== undefined) updateData.original_cost = Number(original_cost);
        if (warranty_start_date !== undefined) updateData.warranty_start_date = parseDateInput(warranty_start_date);
        if (warranty_end_date !== undefined) updateData.warranty_end_date = parseDateInput(warranty_end_date);

        if (Object.keys(updateData).length === 0) {
            throw new Error("No update fields provided");
        }

        return prisma.devices.update({
            where: { id: toBigInt(id) },
            data: updateData,
            include: {
                categories: true,
                employee_devices: true
            }
        });
    },

    // not route
    updateDeviceState: async (id, newState) => {
        return prisma.devices.update({
            where: { id: toBigInt(id) },
            data: {
                state: newState
            }
        });
    },

    // not route
    createEmployeeDevice: async (data) => {
        const {
            device_id,
            employee_id,
            assigned_at
        } = data;

        const existed = await prisma.employee_devices.findFirst({
            where: {
                device_id: toBigInt(device_id),
                returned_at: null
            }
        });

        if (existed) {
            throw Error("Cannot assign device for more than one employee");
        }

        return prisma.employee_devices.create({
            data: {
                device_id: toBigInt(device_id),
                employee_id: toBigInt(employee_id),
                assigned_at: parseDateInput(assigned_at)
            },
            include: { devices: true }
        });
    },
    
    // not route
    updateEmployeeDevice: async (deviceId, returned_at) => {
        return prisma.employee_devices.update({
            where: { 
                device_id: toBigInt(deviceId),
                returned_at: null
            },
            data: {
                returned_at: parseDateInput(returned_at)
            }
        });
    },

    getDeviceById: async (id) => {
        return prisma.devices.findUnique({
            where: { id: toBigInt(id) },
            include: { 
                categories: true,
                employee_devices: true
            }
        });
    },

    getDevicesByEmployeeId: async (employeeId) => {
        return prisma.devices.findMany({
            where: {
                employee_devices: {
                    some: { employee_id: toBigInt(employeeId) }
                }
            },
            include: { categories: true }
        });
    },

    getDevicesByCategoryId: async (categoryId) => {
        return prisma.devices.findMany({
            where: {
                category_id: toBigInt(categoryId)
            },
        });
    },

    getDeviceStateHistories: async (deviceId) => {
        return prisma.device_state_histories.findMany({
            where: {
                device_id: toBigInt(deviceId)
            },
            orderBy: { created_at: 'desc' }
        });
    },


    createAssignRequest: async (data) => {
        const {
            created_by,
            reason = "",
            category_list
        } = data;

        return prisma.assign_requests.create({
            data: {
                created_by_employee_id: toBigInt(created_by),
                reason,
                assign_request_details: {
                    createMany: {
                        data: category_list.map(category => ({
                            category_id: toBigInt(category.id),
                            requested_quantiy: category.requested_quantiy,
                        }))
                    }
                }
            },
            include: {
                assign_request_details: {
                    include: {
                        categories: true
                    }
                }
            }
        });
    },

    approveAssignRequestDetail: async (id, data) => {
        const {
            approved_by,
            status,
            employee_device_data
        } = data;

        return prisma.$transaction(async (tx) => {
            const assign_request_detail = await tx.assign_request_details.update({
                where: { id: toBigInt(id) },
                data: {
                    approved_by_employee_id: toBigInt(approved_by),
                    status
                }
            });

            let employee_device = {};
            let device = {};
            
            if (status === "success" ) {
                employee_device = await DeviceRepository
                    .createEmployeeDevice(
                        employee_device_data
                    );
                device = await DeviceRepository
                    .updateDeviceState(
                        employee_device.device_id,
                        "in_use"
                    );
             
                if (!employee_device.id || !device.id) {
                    throw Error("Approve assign request detail fail");
                }
            }

            return assign_request_detail;
        });
    },

    listAssignRequest: async () => {
        return prisma.assign_requests.findMany({
            orderBy: { created_at: 'desc' }
        });
    },

    getAssignRequestById: async (id) => {
        return prisma.assign_requests.findUnique({
            where: { id: toBigInt(id) },
            include: {
                assign_request_details: {
                    categories: true
                }
            }
        });
    },

    getAssignRequestByEmployeeId: async (employeeId) => {
        return prisma.assign_requests.findMany({
            where: {
                created_by_employee_id: toBigInt(employeeId)
            }
        });
    },


    createDeviceRequest: async (data) => {
        const {
            created_by,
            request_type,
            reason = "",
            device_list
        } = data;

        return prisma.device_requests.create({
            data: {
                created_by_employee_id: toBigInt(created_by),
                request_type,
                reason,
                device_request_details: {
                    createMany: {
                        data: device_list.map(device => ({
                            device_id: toBigInt(device.id),
                            handover_requested_at: parseDateInput(device.handover_requested_at)
                        }))
                    }
                }
            },
            include: {
                device_request_details: {
                    include: {
                        devices: true
                    }
                }
            }
        });
    },

    handOverDevice: async (id, data) => {
        return prisma.$transaction(async (tx) => {
            const device_request_detail = 
                await tx.device_request_details.update({
                    where: { id: toBigInt(id) },
                    data: {
                        handed_over_at: parseDateInput(data.handed_over_at)
                    },
                    include: { devices: true }
                });

                
            const employee_device = await DeviceRepository
                .updateEmployeeDevice(
                    device_request_detail.device_id, 
                    data.returned_at
                );

            if (!employee_device) {
                throw Error("Hand over device fail");
            }
            
            return device_request_detail;
        });

        return prisma.device_request_details.update({
            where: { id: toBigInt(id) },
            data: {
                handed_over_at: parseDateInput(data.handed_over_at),
            }
        });
    },

    approveDeviceRequestDetail: async (id, data) => {
        const {
            approved_by,
            status
        } = data;

        return prisma.$transaction(async (tx) => {
            const device_request_detail = await tx.device_request_details.update({
                where: { id: toBigInt(id) },
                data: {
                    approved_at: Date.now(),
                    approved_by_employee_id: toBigInt(approved_by),
                    status
                },
                include: { devices: true }
            });

            let device = {};

            if (status === "success") {
                device = await DeviceRepository
                    .updateDeviceState(
                        device_request_detail.device_id, 
                        "available"
                    );
    
                if (!device.id) {
                    throw Error("Approve device request fail");
                }
            }

            return device_request_detail;
        });
    },

    listDeviceRequest: async () => {
        return prisma.device_requests.findMany({
            orderBy: { created_at: 'desc' }
        });
    },

    getDeviceRequestById: async (id) => {
        return prisma.device_requests.findUnique({
            where: { id: toBigInt(id) },
            include: {
                device_request_details: {
                    include: { devices: true }
                }
            }
        });
    },

    getDeviceRequestByEmployeeId: async (employeeId) => {
        return prisma.device_requests.findMany({
            where: {
                created_by_employee_id: toBigInt(employeeId)
            },
            orderBy: { created_at: 'desc' }
        });
    },


    listCategories: async () => {
        return prisma.categories.findMany();
    },

    getCategoryById: async (id) => {
        return prisma.categories.findUnique({
            where: { id: toBigInt(id) }
        });
    },

};