import { consume } from "../../../../shared/rabbitmq/index.js";
import { EVENTS } from "../../../../shared/constants/events.js";
import { EXCHANGES } from "../../../../shared/constants/exchanges.js";
import { QUEUES } from "../../../../shared/constants/queues.js";
import { NotificationService } from "../services/notification.service.js";

const buildPlanNotification = (event) => {
    if (
        event?.event_name !== EVENTS.MAINTENANCE_PLAN_CREATED ||
        !event?.data?.plan_id ||
        !Array.isArray(event.data.recipient_employee_ids) ||
        event.data.recipient_employee_ids.length === 0
    ) {
        throw new Error("Invalid maintenance plan created event");
    }

    const { data } = event;
    const start = data.planned_start_at
        ? new Date(data.planned_start_at).toLocaleString("vi-VN")
        : "chưa xác định";

    return {
        created_by_employee_id: data.created_by_employee_id,
        notification_type: "plan_schedule",
        title: `Kế hoạch bảo trì ${data.device_code ?? data.device_id}`,
        content: `Thiết bị ${data.device_name ?? data.device_id} có kế hoạch bảo trì bắt đầu lúc ${start}.`,
        reference_type: "maintenance_plan",
        reference_id: data.plan_id,
        employee_ids: [...new Set(data.recipient_employee_ids.map(String))],
    };
};

export const startMaintenanceConsumer = async () => {
    await consume(
        QUEUES.NOTIFICATION_MAINTENANCE,
        async (event) => {
            const notification = buildPlanNotification(event);
            await NotificationService.create(notification);
            console.log(
                `[notification-consumer] processed ${event.event_name} ${event.event_id}`,
            );
        },
        {
            exchange: EXCHANGES.MAINTENANCE,
            routingKey: EVENTS.MAINTENANCE_PLAN_CREATED,
        },
    );
};