import { AuditService } from '../services/audit.service.js';
import { successResponse } from '../../../../shared/utils/response.js';

export const AuditController = {
    health: async (req, res) => res.json({status: 'ok'}),

    getById: async (req, res, next) => {
        try {
            const audit = await AuditService.getById(req.params.id);
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

    getByDateRange: async (req, res, next) => {
        try {
            const { startDate, endDate } = req.query;
            const audits = await AuditService.getByDateRange(startDate, endDate);
            return res.json(successResponse({ data: audits, message: 'Audits found by date range' }));
        } catch (error) {
            next(error);
        }
    },

    getByEmployeeId: async (req, res, next) => {
        try {
            const { employeeId } = req.query;
            const audits = await AuditService.getByEmployeeId(employeeId);
            return res.json(successResponse({ data: audits, message: 'Audits found by employee ID' }));
        } catch (error) {
            next(error);
        }
    },

    getByAction: async (req, res, next) => {
        try {
            const { action } = req.query;
            const audits = await AuditService.getByAction(action);
            return res.json(successResponse({ data: audits, message: 'Audits found by action' }));
        } catch (error) {
            next(error);
        }
    },

    getByService: async (req, res, next) => {
        try {
            const { service } = req.query;
            const audits = await AuditService.getByService(service);
            return res.json(successResponse({ data: audits, message: 'Audits found by service' }));
        } catch (error) {
            next(error);
        }
    }
};