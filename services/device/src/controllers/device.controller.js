import { DeviceService } from "../services/device.service.js";
import { successResponse } from "../../../../shared/utils/response.js";

export const DeviceController = {
    health: (req, res) => res.json({ status: "OK" }),

    createAssignRequest: async (req, res, next) => {
        try {
            const data = req.body;
            const assignRequest = await DeviceService.createAssignRequest(data);
            return res.json(successResponse({ data: assignRequest, message: "Assign device request created" }));
        } catch (error) {
            next(error);
        }
    },

    approveAssignRequest: async (req, res, next) => {
        try {
            const id = req.params.id;
            const data = req.body;
            const assignRequestDetail = await DeviceService.approveAssignRequest(id, data);
            return res.json(successResponse({ data: assignRequestDetail, message: "Assign device request approved" }));
        } catch (error) {
            next(error);
        }
    },
    
    getAssignRequestById: async (req, res, next) => {
        try {
            const id = req.params.id;
            const assignRequest = await DeviceService.getAssignRequestById(id);
            return res.json(successResponse({ data: assignRequest, message: "Assign device request found" }));
        } catch (error) {
            next(error);
        }
    },
    
    listAssignRequests: async (req, res, next) => {
        try {
            const assignRequests = await DeviceService.listAssignRequests();
            return res.json(successResponse({ data: assignRequests, message: "Assign device requests found" }));
        } catch (error) {
            next(error);
        }
    },
    
    listAssignRequestsByEmployeeId: async (req, res, next) => {
        try {
            const employeeId = req.params.employeeId;
            const assignRequests = await DeviceService.listAssignRequestsByEmployeeId(employeeId);
            return res.json(successResponse({ data: assignRequests, message: "Assign device requests found" }));
        } catch (error) {
            next(error);
        }
    },
    
    listDevices: async (req, res, next) => {
        try {
            const devices = await DeviceService.listDevices();
            return res.json(successResponse({ data: devices, message: "Devices found" }));
        } catch (error) {
            next(error);
        }
    },
    
    getDeviceById: async (req, res, next) => {
        try {
            const id = req.params.id;
            const device = await DeviceService.getDeviceById(id);
            return res.json(successResponse({ data: device, message: "Device found" }));
        } catch (error) {
            next(error);
        }
    },

    getMaintenanceContext: async (req, res, next) => {
        try {
            const context = await DeviceService.getMaintenanceContext(req.params.id);
            return res.json(successResponse({ data: context, message: "Device maintenance context found" }));
        } catch (error) {
            next(error);
        }
    },
    
    listDevicesByEmployeeId: async (req, res, next) => {
        try {
            const employeeId = req.params.employeeId;
            const devices = await DeviceService.listDevicesByEmployeeId(employeeId);
            return res.json(successResponse({ data: devices, message: "Devices found" }));
        } catch (error) {
            next(error);
        }
    },
    
    listDevicesByCategoryId: async (req, res, next) => {
        try {
            const categoryId = req.params.categoryId;
            const devices = await DeviceService.listDevicesByCategoryId(categoryId);
            return res.json(successResponse({ data: devices, message: "Devices found" }));
        } catch (error) {
            next(error);
        }
    },
    
    listCategories: async (req, res, next) => {
        try {
            const categories = await DeviceService.listCategories();
            return res.json(successResponse({ data: categories, message: "Categories found" }));
        } catch (error) {
            next(error);
        }
    },
    
    getCategoryById: async (req, res, next) => {
        try {
            const id = req.params.id;
            const category = await DeviceService.getCategoryById(id);
            return res.json(successResponse({ data: category, message: "Category found" }));
        } catch (error) {
            next(error);
        }
    },
    
    getDeviceStateHistories: async (req, res, next) => {
        try {
            const deviceId = req.params.id;
            const stateHistories = await DeviceService.getDeviceStateHistories(deviceId);
            return res.json(successResponse({ data: stateHistories, message: "Device state histories found" }));
        } catch (error) {
            next(error);
        }
    },
    
    updateDevice: async (req, res, next) => {
        try {
            const id = req.params.id;
            const updateData = req.body;
            const device = await DeviceService.updateDevice(id, updateData);
            return res.json(successResponse({ data: device, message: "Device updated" }));
        } catch (error) {
            next(error);
        }
    },
    
};