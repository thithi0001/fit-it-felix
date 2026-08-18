import { AuditRepository } from '../repositories/audit.repository.js';

const buildAuditPayload = (audit) => {
    return {
        id: String(audit?.id ?? ""),
        actor_employee_id: audit?.actor_employee_id ? String(audit.actor_employee_id) : null,
        actor_name: audit?.actor_name ?? null,
        action: audit?.action ?? null,
        service_name: audit?.service_name ?? null,
        table_name: audit?.table_name ?? null,
        record_id: audit?.record_id ? String(audit.record_id) : null,
        old_value: audit?.old_value ?? null,
        new_value: audit?.new_value ?? null,
        ip_address: audit?.ip_address ?? null,
        user_agent: audit?.user_agent ?? null,
        created_at: audit?.created_at ?? null,
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