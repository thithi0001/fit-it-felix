import { InventoryService } from '../services/inventory.service.js';
import { successResponse } from "../../../../shared/utils/response.js";

export const InventoryController = {
    health: async (req, res) => res.json({status: 'ok'}),

    
}