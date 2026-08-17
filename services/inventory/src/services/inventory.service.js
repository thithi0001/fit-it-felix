import { badRequest, notFound } from '../../../../shared/utils/errors.js';
import { InventoryRepository } from '../repositories/inventory.repository.js';

const buildInventoryPayload = (inventory) => {
	const supplier = inventory?.suppliers ?? null;
	const item = inventory?.items ?? null;
	const manufacturer = item?.manufacturers ?? null;

	return {
		id: String(inventory.id),
		quantity: inventory.quantity,
		item: item ? {
			id: item.id,
			code: item.code,
			name: item.name,
			unit: item.unit,
			minimum_stock: item.minimum_stock
		} : null,
		supplier: supplier ? {
			id: supplier.id,
			name: supplier.name
		} : null,
		manufacturer: manufacturer ? {
			id: manufacturer.id,
			name: manufacturer.name
		} : null
	};
};

const buildRequestPayload = (request) => {
	const details = request?.item_request_details ?? [];

	return {
		id: String(request.id),
		created_by: request.created_by_employee_id ?? null,
		request_type: request.request_type ?? null,
		status: request.status ?? null,
		reason: request.reason ?? "",
		approved_by: request.approved_by_employee_id ?? null,
		created_at: request.created_at ?? null,
		updated_at: request.updated_at ?? null,

		details: details.map(detail => ({
			id: String(detail.id),
			quantity: detail.quantity,
			inventory: buildInventoryPayload(detail.inventory)
		}))
	};
};

export const InventoryService = {
	listInventory: async () => {
		const inventoryList = await InventoryRepository.listInventory();
		return inventoryList.map(buildInventoryPayload);
	},

	getInventoryById: async (id) => {
		const inventory = await InventoryRepository.getInventoryById(Number(id))
		if (!inventory) {
			throw notFound("Inventory not found");
		}

		return buildInventoryPayload(inventory);
	},

	createRequest: async (data) => {
		const request = await InventoryRepository.createRequest(data);
		if (!request) {
			throw badRequest("Cannot create item request");
		}

		return buildRequestPayload(request);
	},

	getRequestById: async (id) => {
		const request = await InventoryRepository.getRequestById(Number(id));
		if (!request) {
			throw notFound("Item request not found");
		}

		return buildRequestPayload(request);
	},

	getRequestByPlanId: async (planId) => {
		const requests = await InventoryRepository.getRequestByPlanId(Number(planId));
		return requests.map(buildRequestPayload);
	},

	approveRequest: async (id, data) => {
		const approvedRequest = await InventoryRepository.approveRequest(Number(id), data);
		if (!approvedRequest) {
			throw badRequest("Cannot approve item request");
		}

		return buildRequestPayload(approvedRequest);
	},
	
};