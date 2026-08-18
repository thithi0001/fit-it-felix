import prisma from '../config/prisma.js';
import { parseDateInput } from "../../../../shared/utils/date.js";
import { toBigInt } from "../../../../shared/utils/response.js";

export const InventoryRepository = {
    listItem: async () => {
        return prisma.items.findMany({
            include: {
                manufacturers: true,
            }
        });
    },

    getItemById: async (id) => {
        return prisma.items.findUnique({
            where: { id: toBigInt(id) },
            include: {
                manufacturers: true
            }
        });
    },

    listInventory: async () => {
        return prisma.inventory.findMany({
            include: {
                suppliers: true,
                items: {
                    include: {
                        manufacturers: true
                    }
                }
            }
        });
    },

    getInventoryById: async (id) => {
        return prisma.inventory.findUnique({
            where: { id: toBigInt(id) },
            include: {
                suppliers: true,
                items: {
                    include: {
                        manufacturers: true
                    }
                }
            }
        });
    },

    createRequest: async (data) => {
        const {
            created_by_employee_id,
            plan_id,
            request_type,
            reason = "",
            item_list
        } = data;

        return prisma.item_requests.create({
            data: {
                created_by_employee_id: toBigInt(created_by_employee_id),
                plan_id: toBigInt(plan_id),
                request_type,
                reason,
                item_request_details: {
                    createMany: {
                        data: item_list.map(item => ({
                            inventory_id: toBigInt(item.inventory_id),
                            quantity: item.quantity
                        }))
                    }
                }
            },
            include: {
                item_request_details: {
                    include: {
                        inventory: {
                            include: {
                                suppliers: true,
                                items: {
                                    include: {
                                        manufacturers: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });
    },

    listItemRequests: async () => {
        return prisma.item_requests.findMany({
            include: {
                item_request_details: {
                    include: {
                        inventory: {
                            include: {
                                suppliers: true,
                                items: {
                                    include: {
                                        manufacturers: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });
    },

    getRequestById: async (id) => {
        return prisma.item_requests.findUnique({
            where: { id: toBigInt(id) },
            include: {
                item_request_details: {
                    include: {
                        inventory: {
                            include: {
                                suppliers: true,
                                items: {
                                    include: {
                                        manufacturers: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });
    },

    getRequestByPlanId: async (planId) => {
        return prisma.item_requests.findMany({
            where: { plan_id: toBigInt(planId) },
            include: {
                item_request_details: {
                    include: {
                        inventory: {
                            include: {
                                suppliers: true,
                                items: {
                                    include: {
                                        manufacturers: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });
    },

    getRequestByEmployeeId: async (employeeId) => {
        return prisma.item_requests.findMany({
            where: {
                created_by_employee_id: toBigInt(employeeId)
            },
            include: {
                item_request_details: {
                    include: {
                        inventory: {
                            include: {
                                suppliers: true,
                                items: {
                                    include: {
                                        manufacturers: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });
    },

    approveRequest: async (id, data) => {
        return prisma.$transaction(async (tx) => {
            const request = await tx.item_requests.findUnique({
                where: { id: toBigInt(id) },
                include: { item_request_details: true }
            });

            if (!request) {
                throw new Error('Item request không tồn tại');
            }

            await tx.item_requests.update({
                where: { id: toBigInt(id) },
                data: {
                    status: data.status,
                    approved_by_employee_id: toBigInt(data.approved_by_employee_id)
                }
            });

            await InventoryRepository.updateInventoryByRequest(tx, {
                ...request,
                status: data.status
            });

            return tx.item_requests.findUnique({
                where: { id: toBigInt(id) },
                include: {
                    item_request_details: {
                        include: {
                            inventory: {
                                include: {
                                    suppliers: true,
                                    items: {
                                        include: {
                                            manufacturers: true
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            });
        });
    },

    updateInventoryByRequest: async (tx, request) => {
        if (request.status !== 'success') return;

        for (const detail of request.item_request_details) {
            await tx.inventory.update({
                where: { id: detail.inventory_id },
                data: {
                    quantity:
                        request.request_type === 'issue'
                            ? { decrement: detail.quantity }
                            : { increment: detail.quantity }
                }
            });
        }
    },
};