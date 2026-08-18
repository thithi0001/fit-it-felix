import { badRequest, notFound } from "../../../../shared/utils/errors.js";
import { env } from "../config/env.js";

const requestDeviceContext = async (deviceId) => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000);

    try {
        const response = await fetch(
            `${env.DEVICE_SERVICE_URL}/devices/internal/${encodeURIComponent(deviceId)}/maintenance-context`,
            {
                headers: { "x-service-key": env.INTERNAL_SERVICE_KEY },
                signal: controller.signal,
            },
        );

        if (response.status === 404) {
            throw notFound("Device not found");
        }

        if (!response.ok) {
            throw badRequest("Device service rejected the request");
        }

        const body = await response.json();
        if (!body.success || !body.data) {
            throw badRequest("Invalid device service response");
        }

        return body.data;
    } catch (error) {
        if (error?.status) {
            throw error;
        }

        throw badRequest(
            error.name === "AbortError"
                ? "Device service request timed out"
                : "Device service is unavailable",
        );
    } finally {
        clearTimeout(timeout);
    }
};

export const DeviceClient = {
    getMaintenanceContext: requestDeviceContext,
};