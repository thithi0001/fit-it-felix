import { AuditRepository } from '../repositories/audit.repository.js';

const buildAuditPayload = (audit) => {
    return {
        id: String(audit?.id ?? ""),
        // i will implement this function later
    }
};

export const AuditService = {
    createAudit: async (auditData) => {
        const audit = await AuditRepository.createAudit(auditData);
        return audit ? buildAuditPayload(audit) : null;
    },

    listAudits: async () => {
        const audits = await AuditRepository.list();
        return audits.map(buildAuditPayload);
    },

    getById: async (id) => {
        const audit = await AuditRepository.getById(Number(id));
        return audit ? buildAuditPayload(audit) : null;
    },

    getByDateRange: async (startDate, endDate) => {
        const audits = await AuditRepository.getByDateRange(startDate, endDate);
        return audits.map(buildAuditPayload);
    },

    getByEmployeeId: async (employeeId) => {
        const audits = await AuditRepository.getByEmployeeId(employeeId);
        return audits.map(buildAuditPayload);
    },

    getByAction: async (action) => {
        const audits = await AuditRepository.getByAction(action);
        return audits.map(buildAuditPayload);
    },
    
    getByService: async (service) => {
        const audits = await AuditRepository.getByService(service);
        return audits.map(buildAuditPayload);
    }
};