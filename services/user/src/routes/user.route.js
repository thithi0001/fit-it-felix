import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";
import { authenticate, authorize, requireEmployeeOwnership } from "../middleware/user.middleware.js";

const router = Router();

router.get("/health", UserController.health);

// read account list
router.get("/", authenticate, authorize("ADMIN"), UserController.list);

// read account
router.get("/:id", authenticate, UserController.getById);

// create employee + account
router.post("/", authenticate, authorize("ADMIN"), UserController.create);

// update employee
router.put(
    "/employees/:id",
    authenticate,
    authorize("ADMIN", "USER"),
    requireEmployeeOwnership("id"),
    UserController.updateEmployee,
);

// create department
// router.post("/departments", authenticate, authorize("ADMIN"), )

// read department list
// router.get("/departments", authenticate, )

// read department
// router.get("/departments/:id", authenticate, )

// update department
// router.put("/departments/:id", authenticate, authorize("ADMIN"), )

// read role list
// router.get("/roles", authenticate, )

// read role
// router.get("/roles/:id", authenticate, )

export default router;
