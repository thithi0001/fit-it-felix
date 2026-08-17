import { InventoryService } from '../services/inventory.service.js';
import { successResponse } from "../../../../shared/utils/response.js";

export const InventoryController = {
    health: async (req, res) => res.json({status: 'ok'}),

    getInventoryById: async (req, res, next) => {
        try {
            const id = req.params.id;
            const inventory = await InventoryService.getInventoryById(id);
            return res.json(successResponse({ data: inventory, message: "Inventory found" }));
        } catch (error) {
            next(error);
        }
    },

    listInventory: async (req, res, next) => {
        try {
            const inventoryList = await InventoryService.listInventory();
            return res.json(successResponse({ data: inventoryList, message: "Inventory List" }));
        } catch (error) {
            next(error);
        }
    },

    getRequestById: async (req, res, next) => {
        try {
            const id = req.params.id;
            const request = await InventoryService.getRequestById(id);
            return res.json(successResponse({ data: request, message: "Item request found" }));
        } catch (error) {
            next(error);
        }
    },

    getRequestByPlanId: async (req, res, next) => {
        try {
            const planId = req.params.planId;
            const request = await InventoryService.getRequestByPlanId(planId);
            return res.json(successResponse({ data: request, message: "Item request found" }));
        } catch (error) {
            next(error);
        }
    },

    listRequest: async (req, res, next) => {
        try {
            const requests = await InventoryService.listRequest();
            return res.json(successResponse({ data: requests, message: "Item request list" }));
        } catch (error) {
            next(error);
        }
    },

    approveRequest: async (req, res, next) => {
        try {
            const { id } = req.params;
            const approvedRequest = await InventoryService.approveRequest(id);
            return res.json(successResponse({ data: approvedRequest, message: "Item request approved" }));
        } catch (error) {
            next(error);
        }
    },

    createRequest: async (req, res, next) => {
        try {
            const data = req.body;
            const request = await InventoryService.createRequest(data);
            return res.json(successResponse({ data: request, message: "Item request created" }));
        } catch (error) {
            next(error);
        }
    },

};