import { consume } from "../../../../shared/rabbitmq/index.js";
import { EVENTS } from "../../../../shared/constants/events.js";
import { EXCHANGES } from "../../../../shared/constants/exchanges.js";
import { QUEUES } from "../../../../shared/constants/queues.js";
import { AuditService } from "../services/audit.service.js";

const buildPlanAudit = (event) => {
    if (
        event?.event_name !== EVENTS.MAINTENANCE_PLAN_CREATED ||
        !event?.data?.plan_id ||
        !event?.data?.created_by_employee_id
    ) {
        throw new Error("Invalid maintenance plan created event");
    }

    const { data } = event;

    return {
        actor_id: data.created_by_employee_id,
        action: "CREATE",
        service_name: "maintenance-service",
        table_name: "plans",
        record_id: data.plan_id,
        old_value: null,
        new_value: {
            plan_id: data.plan_id,
            device_id: data.device_id,
            plan_type: data.plan_type,
            description: data.description,
            planned_start_at: data.planned_start_at,
            planned_end_at: data.planned_end_at,
            assigned_employee_ids: data.assigned_employee_ids,
        },
    };
};

export const startMaintenanceAuditConsumer = async () => {
    await consume(
        QUEUES.AUDIT_MAINTENANCE,
        async (event) => {
            await AuditService.createAudit(buildPlanAudit(event));
            console.log(
                `[audit-consumer] processed ${event.event_name} ${event.event_id}`,
            );
        },
        {
            exchange: EXCHANGES.MAINTENANCE,
            routingKey: EVENTS.MAINTENANCE_PLAN_CREATED,
        },
    );
};