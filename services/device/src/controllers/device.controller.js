import { DeviceService } from "../services/device.service.js";
import { successResponse } from "../../../../shared/utils/response.js";

export const DeviceController = {
    health: (req, res) => res.json({ status: "OK" }),

};