import { Router } from "express";
import { DeviceController } from "../controllers/device.controller.js";
import {
  authenticate,
  authorize,
} from "../../../../shared/middlewares/auth.middleware.js";
import {
  requireAssignRequestOwnership,
  validateApproveAssignRequest,
  validateCreateAssignRequest,
  validateUpdateDevice,
} from "../middlewares/device.middleware.js";
import { ROLES } from "../../../../shared/constants/roles.js";
import { authenticateService } from "../../../../shared/middlewares/service.middleware.js";

const router = Router();

router.get(
  "/internal/:id/maintenance-context",
  authenticateService,
  DeviceController.getMaintenanceContext,
);

router.get("/health", DeviceController.health);

// tạo yêu cầu cấp phát thiết bị
// router.post(
//   "/assign-requests",
//   authenticate(),
//   validateCreateAssignRequest,
//   DeviceController.createAssignRequest,
// );

// duyệt yêu cầu cấp phát thiết bị
// router.put(
//   "/assign-requests/:id",
//   authenticate(),
//   authorize(ROLES.MANAGER),
//   validateApproveAssignRequest,
//   DeviceController.approveAssignRequest,
// );

// lấy chi tiết yêu cầu cấp phát thiết bị
// router.get(
//   "/assign-requests/:id",
//   authenticate(),
//   authorize(ROLES.ADMIN, ROLES.MANAGER, ROLES.USER),
//   requireAssignRequestOwnership,
//   DeviceController.getAssignRequestById,
// );

// lấy danh sách yêu cầu cấp phát thiết bị
// router.get(
//   "/assign-requests",
//   authenticate(),
//   authorize(ROLES.ADMIN, ROLES.MANAGER),
//   DeviceController.listAssignRequests,
// );

// lấy danh sách yêu cầu cấp phát thiết bị theo nhân viên
// router.get(
//   "/assign-requests/employees/:employeeId",
//   authenticate(),
//   authorize(ROLES.ADMIN, ROLES.MANAGER, ROLES.USER),
//   requireAssignRequestOwnership,
//   DeviceController.listAssignRequestsByEmployeeId,
// );
// lấy danh sách loại thiết bị
router.get("/categories", authenticate(), DeviceController.listCategories);
// lấy danh sách thiết bị
router.get("/", authenticate(), DeviceController.listDevices);

// lấy chi tiết thiết bị
router.get("/:id", authenticate(), DeviceController.getDeviceById);

// lấy danh sách thiết bị theo nhân viên
router.get(
  "/list/employees/:employeeId",
  authenticate(),
  DeviceController.listDevicesByEmployeeId,
);

// lấy danh sách thiết bị theo loại
router.get(
  "/list/categories/:categoryId",
  authenticate(),
  DeviceController.listDevicesByCategoryId,
);

// lấy chi tiết loại thiết bị
router.get("/categories/:id", authenticate(), DeviceController.getCategoryById);

// lấy lịch sử trạng thái thiết bị
router.get(
  "/:id/state-histories",
  authenticate(),
  DeviceController.getDeviceStateHistories,
);

// cập nhật thiết bị
router.put(
  "/:id",
  authenticate(),
  authorize(ROLES.MANAGER),
  validateUpdateDevice,
  DeviceController.updateDevice,
);

export default router;
