import prisma from "../config/prisma.js";
import { ROLES } from "../../../../shared/constants/roles.js";
import { forbidden } from "../../../../shared/utils/errors.js";
import { toBigInt } from "../../../../shared/utils/response.js";
import { NotificationRepository } from "../repositories/notification.repository.js";

export const requireNotificationOwnerShip = async (req, res, next) => {
    try {
        const currentEmployeeId = req.user?.employee_id ? String(req.user.employee_id) : "";
        const currentRole = req.user?.role;

        if (!currentEmployeeId) {
            throw forbidden("User employee id is missing");
        }

        // if ([ROLES.ADMIN, ROLES.MANAGER].includes(currentRole)) {
        //     return next();
        // }

        const targetEmployeeId = req.params.employeeId
            ? String(req.params.employeeId)
            : req.body?.employee_id
                ? String(req.body.employee_id)
                : "";

        if (targetEmployeeId && targetEmployeeId !== currentEmployeeId) {
            throw forbidden("You can only access your own notifications");
        }

        if (req.params.employeeId) {
            return next();
        }

        const targetId = req.params.id;
        if (!targetId) {
            throw forbidden("Notification id is required");
        }

        const notificationUser = await prisma.noti_users.findUnique({
            where: { id: toBigInt(targetId) },
        });

        const notification = await NotificationRepository.getById(targetId);

        const isOwnedByCurrentUser =
            (notificationUser && String(notificationUser.employee_id) === currentEmployeeId) ||
            notification?.noti_users?.some((item) => String(item.employee_id) === currentEmployeeId);

        if (!isOwnedByCurrentUser) {
            throw forbidden("You can only read or update your own notifications");
        }

        req.notification = notification;
        next();
    } catch (error) {
        next(error);
    }
};

export const createNotificationValidation = (req, res, next) => {
    try {
        req.body = createNofificationSchema.parse(req.body);
        next();
    } catch (error) {
        next(error);
    }
};