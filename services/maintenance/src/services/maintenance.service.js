import { badRequest, notFound } from '../../../../shared/utils/errors.js';
import { MaintenanceRepository } from '../repositories/maintenance.repository.js';

const buildPlanPayload = (plan) => {
  const plan_assignments = plan?.plan_assignments ?? [];

  return {
    id: String(plan.id),
    repair_id: plan.repair_id ? String(plan.repair_id) : null,
    created_by_employee_id: String(plan.created_by_employee_id),
    device_id: String(plan.device_id),
    plan_type: plan.plan_type ?? null,
    description: plan.description ?? null,
    estimated_cost: plan.estimated_cost ?? null,
    planned_start_at: plan.planned_start_at ?? null,
    planned_end_at: plan.planned_end_at ?? null,
    actual_start_at: plan.actual_start_at ?? null,
    actual_end_at: plan.actual_end_at ?? null,

    plan_assignments: plan_assignments.map((assignment) => ({
      id: String(assignment.id),
      employee_id: String(assignment.employee_id),
      availability_status: assignment.availability_status,
      assigned_at: assignment.assigned_at,
    })),
  };
};

const buildMaintenanceRequestPayload = (maintenanceRequest) => {
  return {
    id: String(maintenanceRequest.id),
    created_by_employee_id: String(maintenanceRequest.created_by_employee_id),
    plan_id: String(maintenanceRequest.plan_id),
    request_type: maintenanceRequest.request_type,
    reason: maintenanceRequest.reason ?? "",
    status: maintenanceRequest.status,
    approved_by_employee_id: maintenanceRequest.approved_by_employee_id ? String(maintenanceRequest.approved_by_employee_id) : null,
    created_at: maintenanceRequest.created_at,
    updated_at: maintenanceRequest.updated_at,
  };
};

const buildRepairRequestPayload = (repairRequest) => {
  return {
    id: String(repairRequest.id),
    created_by_employee_id: String(repairRequest.created_by_employee_id),
    device_id: String(repairRequest.device_id),
    priority: repairRequest.priority,
    description: repairRequest.description ?? "",
    status: repairRequest.status,
    approved_by_employee_id: repairRequest.approved_by_employee_id ? String(repairRequest.approved_by_employee_id) : null,
    created_at: repairRequest.created_at,
    updated_at: repairRequest.updated_at,
  };
};

const buildAdjustPlanRequestPayload = (adjustPlanRequest) => {
  return {
    id: String(adjustPlanRequest.id),
    plan_id: String(adjustPlanRequest.plan_id),
    reason: adjustPlanRequest.reason ?? "",
    status: adjustPlanRequest.status,
    suggestion: adjustPlanRequest.suggestion ?? "",
    approved_by_employee_id: adjustPlanRequest.approved_by_employee_id ? String(adjustPlanRequest.approved_by_employee_id) : null,
    created_at: adjustPlanRequest.created_at,
    updated_at: adjustPlanRequest.updated_at,
  };
};

const buildAcceptanceReportPayload = (acceptanceReport) => {
  return {
    id: String(acceptanceReport.id),
    plan_id: String(acceptanceReport.plan_id),
    created_by_employee_id: String(acceptanceReport.created_by_employee_id),
    description: acceptanceReport.description ?? "",
    review: acceptanceReport.review ?? "",
    status: acceptanceReport.status,
    approved_by_employee_id: acceptanceReport.approved_by_employee_id ? String(acceptanceReport.approved_by_employee_id) : null,
    created_at: acceptanceReport.created_at,
    updated_at: acceptanceReport.updated_at,
  };
};

const buildDamageReportPayload = (damageReport) => {
  return {
    id: String(damageReport.id),
    plan_id: String(damageReport.plan_id),
    created_by_employee_id: String(damageReport.created_by_employee_id),
    device_id: String(damageReport.device_id),
    description: damageReport.description ?? "",
    solution: damageReport.solution ?? "",
    repair_action: damageReport.repair_action,
    created_at: damageReport.created_at,
  };
};export const MaintenanceService = {
  // Plan methods
  createPlan: async (data) => {
    const plan = await MaintenanceRepository.createPlan(data);
    if (!plan) {
      throw badRequest("Cannot create maintenance plan");
    }
    return buildPlanPayload(plan);
  },

  getPlanById: async (id) => {
    const plan = await MaintenanceRepository.getPlanById(id);
    if (!plan) {
      throw notFound("Maintenance plan not found");
    }
    return buildPlanPayload(plan);
  },

  updatePlan: async (id, data) => {
    const plan = await MaintenanceRepository.updatePlan(id, data);
    if (!plan) {
      throw badRequest("Cannot update maintenance plan");
    }
    return buildPlanPayload(plan);
  },

  listPlans: async () => {
    const plans = await MaintenanceRepository.listPlans();
    return plans.map(buildPlanPayload);
  },

  listPlansByStatus: async (status) => {
    const plans = await MaintenanceRepository.listPlansByStatus(status);
    return plans.map(buildPlanPayload);
  },

  getPlansByAssignment: async (employeeId) => {
    const plans = await MaintenanceRepository.getPlansByAssignment(employeeId);
    return plans.map(buildPlanPayload);
  },

  startPlan: async (id) => {
    const plan = await MaintenanceRepository.startPlan(id);
    if (!plan) {
      throw badRequest("Cannot start maintenance plan");
    }
    return buildPlanPayload(plan);
  },

  cancelPlan: async (id) => {
    const plan = await MaintenanceRepository.cancelPlan(id);
    if (!plan) {
      throw badRequest("Cannot cancel maintenance plan");
    }
    return buildPlanPayload(plan);
  },

  completePlan: async (id) => {
    const plan = await MaintenanceRepository.completePlan(id);
    if (!plan) {
      throw badRequest("Cannot complete maintenance plan");
    }
    return buildPlanPayload(plan);
  },

  listAllPlanDocuments: async (planId) => {
    const documents = await MaintenanceRepository.listAllPlanDocuments(planId);
    return {
      repairs: documents.repairs.map(buildRepairRequestPayload),
      adjusts: documents.adjusts.map(buildAdjustPlanRequestPayload),
      damages: documents.damages.map(buildDamageReportPayload),
      maintenances: documents.maintenances.map(buildMaintenanceRequestPayload),
      acceptances: documents.acceptances.map(buildAcceptanceReportPayload),
    };
  },

  // Repair Request methods
  createRepairRequest: async (data) => {
    const repair = await MaintenanceRepository.createRepairRequest(data);
    if (!repair) {
      throw badRequest("Cannot create repair request");
    }
    return buildRepairRequestPayload(repair);
  },

  getRepairRequestById: async (id) => {
    const repair = await MaintenanceRepository.getRepairRequestById(id);
    if (!repair) {
      throw notFound("Repair request not found");
    }
    return buildRepairRequestPayload(repair);
  },

  approveRepairRequest: async (id, data) => {
    const repair = await MaintenanceRepository.approveRepairRequest(id, data);
    if (!repair) {
      throw badRequest("Cannot approve repair request");
    }
    return buildRepairRequestPayload(repair);
  },

  // Adjust Plan Request methods
  createAdjustPlanRequest: async (data) => {
    const adjust = await MaintenanceRepository.createAdjustPlanRequest(data);
    if (!adjust) {
      throw badRequest("Cannot create adjust plan request");
    }
    return buildAdjustPlanRequestPayload(adjust);
  },

  getAdjustPlanRequestById: async (id) => {
    const adjust = await MaintenanceRepository.getAdjustPlanRequestById(id);
    if (!adjust) {
      throw notFound("Adjust plan request not found");
    }
    return buildAdjustPlanRequestPayload(adjust);
  },

  approveAdjustPlanRequest: async (id, data) => {
    const adjust = await MaintenanceRepository.approveAdjustPlanRequest(id, data);
    if (!adjust) {
      throw badRequest("Cannot approve adjust plan request");
    }
    return buildAdjustPlanRequestPayload(adjust);
  },

  // Damage Report methods
  createDamageReport: async (data) => {
    const damage = await MaintenanceRepository.createDamageReport(data);
    if (!damage) {
      throw badRequest("Cannot create damage report");
    }
    return buildDamageReportPayload(damage);
  },

  getDamageReportById: async (id) => {
    const damage = await MaintenanceRepository.getDamageReportById(id);
    if (!damage) {
      throw notFound("Damage report not found");
    }
    return buildDamageReportPayload(damage);
  },

  // Maintenance Request methods
  createMaintenanceRequest: async (data) => {
    const maintenance = await MaintenanceRepository.createMaintenanceRequest(data);
    if (!maintenance) {
      throw badRequest("Cannot create maintenance request");
    }
    return buildMaintenanceRequestPayload(maintenance);
  },

  getMaintenanceRequestById: async (id) => {
    const maintenance = await MaintenanceRepository.getMaintenanceRequestById(id);
    if (!maintenance) {
      throw notFound("Maintenance request not found");
    }
    return buildMaintenanceRequestPayload(maintenance);
  },

  approveMaintenanceRequest: async (id, data) => {
    const maintenance = await MaintenanceRepository.approveMaintenanceRequest(id, data);
    if (!maintenance) {
      throw badRequest("Cannot approve maintenance request");
    }
    return buildMaintenanceRequestPayload(maintenance);
  },

  // Acceptance Report methods
  createAcceptanceReport: async (data) => {
    const acceptance = await MaintenanceRepository.createAcceptanceReport(data);
    if (!acceptance) {
      throw badRequest("Cannot create acceptance report");
    }
    return buildAcceptanceReportPayload(acceptance);
  },

  getAcceptanceReportById: async (id) => {
    const acceptance = await MaintenanceRepository.getAcceptanceReportById(id);
    if (!acceptance) {
      throw notFound("Acceptance report not found");
    }
    return buildAcceptanceReportPayload(acceptance);
  },

  approveAcceptanceReport: async (id, data) => {
    const acceptance = await MaintenanceRepository.approveAcceptanceReport(id, data);
    if (!acceptance) {
      throw badRequest("Cannot approve acceptance report");
    }
    return buildAcceptanceReportPayload(acceptance);
  },
};