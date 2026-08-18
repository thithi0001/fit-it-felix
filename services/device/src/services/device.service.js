import { depreciation_method } from "@prisma/client";
import { DeviceRepository } from "../repositories/device.repository.js";
import { badRequest, notFound } from "../../../../shared/utils/errors.js";

const buildDevicePayload = (device) => {
  const category = device?.categories ?? null;

  return {
    id: String(device.id),
    device_code: device.code,
    device_name: device.name,
    serial_number: device.serial_number,
    model: device.model ?? null,
    manufacturer_name: device.manufacturer_name ?? null,
    supplier_name: device.supplier_name ?? null,
    manufacture_date: device.manufacture_date ?? null,
    purchase_date: device.purchase_date ?? null,
    purchase_price: device.purchase_price ?? null,
    original_cost: device.original_cost ?? null,
    warranty_start_date: device.warranty_start_date ?? null,
    warranty_end_date: device.warranty_end_date ?? null,
    specifications: device.specifications ?? null,
    state: device.state ?? null,
    depreciation_method: device.depreciation_method ?? null,
    depreciation_start_date: device.depreciation_start_date ?? null,
    depreciation_period_months: device.depreciation_period_months ?? null,
    accumulated_depreciation: device.accumulated_depreciation ?? null,
    book_value: device.book_value ?? null,

    category: category ? buildCategoryPayload(category) : null
  };
};

const buildAssignRequestPayload = (assignRequest) => {
  const details = assignRequest?.assign_request_details ?? [];

  return {
    id: String(assignRequest.id),
    created_by: String(assignRequest.created_by_employee_id) ?? null,
    reason: assignRequest.reason ?? "",
    status: assignRequest.status ?? null,
    requested_at: assignRequest.requested_at,

    details: details.map(buildAssignRequestDetailPayload)
  };
};

const buildAssignRequestDetailPayload = (detail) => {
  return {
    id: String(detail.id),
    category_id: String(detail.category_id),
    requested_quantity: detail.requested_quantity,
    approved_at: detail.approved_at ?? null,
    approved_by: detail.approved_by_employee_id ?? null,
    received_at: detail.received_at ?? null,
    status: detail.status ?? null
  };
};

const buildDeviceHistoryPayload = (history) => {
  return {
    id: String(history.id),
    device_id: String(history.device_id),
    old_state: history.old_state,
    new_state: history.new_state,
    created_at: history.created_at
  };
};

const buildCategoryPayload = (category) => {
  return {
    id: String(category.id),
    code: category.code,
    name: category.name ?? null,
    description: category.description ?? null,
    depreciation_period_min_months: category.depreciation_period_min_months ?? null,
    depreciation_period_max_months: category.depreciation_period_max_months ?? null,
    is_active: category.is_active ?? null
  }
}

export const DeviceService = {
  listDevices: async () => {
    const devices = await DeviceRepository.listDevices();
    return devices.map(buildDevicePayload);
  },

  updateDevice: async (id, data) => {
    const device = await DeviceRepository.updateDevice(id, data);
    if (!device) {
      throw badRequest("Cannot update device");
    }

    return buildDevicePayload(device);
  },

  getDeviceById: async (id) => {
    const device = await DeviceRepository.getDeviceById(id);
    if (!device) {
      throw notFound("Device not found");
    }
    
    return buildDevicePayload(device);
  },

  listDevicesByEmployeeId: async (employeeId) => {
    const devices = await DeviceRepository.getDevicesByEmployeeId(employeeId);
    return devices.map(buildDevicePayload);
  },

  listDevicesByCategoryId: async (categoryId) => {
    const devices = await DeviceRepository.getDevicesByCategoryId(categoryId);
    return devices.map(buildDevicePayload);
  },

  getDeviceStateHistories: async (deviceId) => {
    const deviceHistories = await DeviceRepository.getDeviceStateHistories(deviceId);
    return deviceHistories.map(buildDeviceHistoryPayload);
  },

  createAssignRequest: async (data) => {
    const assignRequest = await DeviceRepository.createAssignRequest(data);
    if (!assignRequest) {
      throw badRequest("Fail to create assign device request");
    }

    return buildAssignRequestPayload(assignRequest);
  },

  approveAssignRequest: async (id, data) => {
    const assignRequestDetail = await DeviceRepository.approveAssignRequestDetail(id, data);
    if (!assignRequestDetail) {
      throw badRequest("Fail to approve assign device request");
    }

    return buildAssignRequestDetailPayload(assignRequestDetail);
  },

  listAssignRequest: async () => {
    const assignRequests = await DeviceRepository.listAssignRequest();
    return assignRequests.map(buildAssignRequestPayload);
  },

  getAssignRequestById: async (id) => {
    const assignRequest = await DeviceRepository.getAssignRequestById(id);
    if (!assignRequest) {
      throw notFound("Assign device request not found");
    }

    return buildAssignRequestPayload(assignRequest);
  },

  listAssignRequestByEmployeeId: async (employeeId) => {
    const assignRequests = await DeviceRepository.getAssignRequestByEmployeeId(employeeId);
    return assignRequests.map(buildAssignRequestPayload);
  },

  listCategories: async () => {
    const categories = await DeviceRepository.listCategories();
    return categories.map(buildCategoryPayload);
  },

  getCategoryById: async (id) => {
    const category = await DeviceRepository.getCategoryById(id);
    return buildCategoryPayload(category);
  },

}