import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";
import {
  authenticate,
  authorize,
  requireEmployeeOwnership,
  validateUpdateEmployee,
  validateCreateEmployee,
} from "../middleware/user.middleware.js";
import { ROLES } from "../../../../shared/constants/roles.js";

const router = Router();

router.get("/health", UserController.health);

// read employee list
router.get(
  "/",
  authenticate,
  authorize(ROLES.ADMIN, ROLES.MANAGER),
  UserController.list,
);

// read employee by employee code
router.get(
  "/employee-code/:employee_code",
  authenticate,
  UserController.getByEmployeeCode,
);

// read employees by role
router.get(
  "/role/:role",
  authenticate,
  authorize(ROLES.ADMIN, ROLES.MANAGER),
  UserController.listByRole,
);

// read employee
router.get("/:id", authenticate, UserController.getById);

// create employee + account
router.post(
  "/",
  authenticate,
  authorize(ROLES.ADMIN),
  validateCreateEmployee,
  UserController.create,
);

// update employee
router.put(
  "/employees/:id",
  authenticate,
  validateUpdateEmployee,
  requireEmployeeOwnership("id"),
  UserController.updateEmployee,
);

// create department
// router.post("/departments", authenticate, authorize(ROLES.ADMIN), )

// read department list
// router.get("/departments", authenticate, )

// read department
// router.get("/departments/:id", authenticate, )

// update department
// router.put("/departments/:id", authenticate, authorize(ROLES.ADMIN), )

// read role list
// router.get("/roles", authenticate, )

// read role
// router.get("/roles/:id", authenticate, )

export default router;
