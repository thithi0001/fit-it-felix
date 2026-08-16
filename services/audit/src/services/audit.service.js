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

    findAuditById: async (id) => {
        const audit = await AuditRepository.findById(Number(id));
        return audit ? buildAuditPayload(audit) : null;
    },

    findAuditsByDateRange: async (startDate, endDate) => {
        const audits = await AuditRepository.findByDateRange(startDate, endDate);
        return audits.map(buildAuditPayload);
    },

    findAuditsByEmployeeId: async (employeeId) => {
        const audits = await AuditRepository.findByEmployeeId(employeeId);
        return audits.map(buildAuditPayload);
    },

    findAuditsByAction: async (action) => {
        const audits = await AuditRepository.findByAction(action);
        return audits.map(buildAuditPayload);
    },
    
    findAuditsByService: async (service) => {
        const audits = await AuditRepository.findByService(service);
        return audits.map(buildAuditPayload);
    }
};