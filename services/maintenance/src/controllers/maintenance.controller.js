import { MaintenanceService } from '../services/maintenance.service.js';
import { successResponse } from "../../../../shared/utils/response.js";

export const MaintenanceController = {
    health: async (req, res) => res.json({status: 'ok'}),


}