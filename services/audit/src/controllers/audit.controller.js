import { AuditService } from './services/audit.service.js';
import { successResponse } from '../../../../shared/utils/response.js';

export const AuditController = {
    health: async (req, res) => res.json({status: 'ok'}),


};