import { AuditService } from '../services/audit.service.js';
import { successResponse } from '../../../../shared/utils/response.js';

export const AuditController = {
    health: async (req, res) => res.json({status: 'ok'}),

    getById: async (req, res, next) => {
        try {
            const audit = await AuditService.findAuditById(req.params.id);
            return res.json(successResponse({ data: audit, message: 'Audit found' }));
        } catch (error) {
            next(error);
        }
    },

    list: async (req, res, next) => {
        try {
            const audits = await AuditService.listAudits();
            return res.json(successResponse({ data: audits, message: 'List audits' }));
        } catch (error) {
            next(error);
        }
    },

    create: async (req, res, next) => {
        try {
            const audit = await AuditService.createAudit(req.body);
            return res.json(successResponse({ data: audit, message: 'Audit created' }));
        } catch (error) {
            next(error);
        }
    },

    findByDateRange: async (req, res, next) => {
        try {
            const { startDate, endDate } = req.query;
            const audits = await AuditService.findAuditsByDateRange(startDate, endDate);
            return res.json(successResponse({ data: audits, message: 'Audits found by date range' }));
        } catch (error) {
            next(error);
        }
    },

    findByEmployeeId: async (req, res, next) => {
        try {
            const { employeeId } = req.query;
            const audits = await AuditService.findAuditsByEmployeeId(employeeId);
            return res.json(successResponse({ data: audits, message: 'Audits found by employee ID' }));
        } catch (error) {
            next(error);
        }
    },

    findByAction: async (req, res, next) => {
        try {
            const { action } = req.query;
            const audits = await AuditService.findAuditsByAction(action);
            return res.json(successResponse({ data: audits, message: 'Audits found by action' }));
        } catch (error) {
            next(error);
        }
    },

    findByService: async (req, res, next) => {
        try {
            const { service } = req.query;
            const audits = await AuditService.findAuditsByService(service);
            return res.json(successResponse({ data: audits, message: 'Audits found by service' }));
        } catch (error) {
            next(error);
        }
    }
};