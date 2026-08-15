import { badRequest, forbidden, unauthorized } from "../../../../shared/utils/errors.js";
import { authenticate as sharedAuthenticate, authorize as sharedAuthorize } from "../../../../shared/middlewares/auth.middleware.js";
import { InventoryRepository } from '../repositories/inventory.repository.js';
