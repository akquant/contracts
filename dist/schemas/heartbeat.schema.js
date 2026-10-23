"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkerHeartbeatSchema = void 0;
const zod_1 = require("zod");
exports.WorkerHeartbeatSchema = zod_1.z.object({
    workerId: zod_1.z.string().min(1),
    service: zod_1.z.string().min(1),
    status: zod_1.z.enum(['HEALTHY', 'DEGRADED', 'UNREACHABLE']),
    timestamp: zod_1.z.number().int().positive(),
    activeBotsCount: zod_1.z.number().nonnegative(),
    uptimeSeconds: zod_1.z.number().nonnegative(),
    memoryUsageMb: zod_1.z.number().nonnegative().optional(),
    redisConnected: zod_1.z.boolean(),
});
//# sourceMappingURL=heartbeat.schema.js.map