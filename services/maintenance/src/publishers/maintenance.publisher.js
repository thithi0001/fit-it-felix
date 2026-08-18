import { randomUUID } from "node:crypto";
import { publish } from "../../../../shared/rabbitmq/index.js";
import { EVENTS } from "../../../../shared/constants/events.js";
import { EXCHANGES } from "../../../../shared/constants/exchanges.js";

export const publishPlanCreated = async ({ plan, device, recipientEmployeeIds }) => {
    const event = {
        event_id: randomUUID(),
        event_name: EVENTS.MAINTENANCE_PLAN_CREATED,
        version: 1,
        occurred_at: new Date().toISOString(),
        producer: "maintenance-service",
        data: {
            plan_id: String(plan.id),
            device_id: String(plan.device_id),
            device_code: device.code,
            device_name: device.name,
            plan_type: plan.plan_type,
            description: plan.description ?? null,
            planned_start_at: plan.planned_start_at,
            planned_end_at: plan.planned_end_at,
            created_by_employee_id: String(plan.created_by_employee_id),
            assigned_employee_ids: plan.plan_assignments.map(
                (assignment) => String(assignment.employee_id),
            ),
            device_manager_employee_ids: device.manager_employee_ids,
            recipient_employee_ids: recipientEmployeeIds,
        },
    };

    await publish(
        EXCHANGES.MAINTENANCE,
        EVENTS.MAINTENANCE_PLAN_CREATED,
        event,
    );
};