"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotSessionSchema = void 0;
const zod_1 = require("zod");
const session_status_enum_1 = require("../enums/session-status.enum");
exports.BotSessionSchema = zod_1.z.object({
    botKey: zod_1.z.string().min(1),
    botId: zod_1.z.string().optional(),
    tradingAccountId: zod_1.z.string().min(1),
    userId: zod_1.z.string().min(1),
    username: zod_1.z.string().optional().default(''),
    symbol: zod_1.z.string().min(1),
    strategy: zod_1.z.string().min(1),
    scriptName: zod_1.z.string().optional(),
    resolution: zod_1.z.string().optional(),
    timeframe: zod_1.z.string().optional(),
    lotSize: zod_1.z.number().positive(),
    status: zod_1.z.enum(session_status_enum_1.BOT_SESSION_STATUSES),
    startedAt: zod_1.z.string(),
    lastActivityAt: zod_1.z.string(),
    currency: zod_1.z.string().default('USD'),
    accountCurrency: zod_1.z.string().default('VND'),
    realizedPnlUsd: zod_1.z.number().default(0),
    unrealizedPnlUsd: zod_1.z.number().optional().default(0),
    totalPnlUsd: zod_1.z.number().optional().default(0),
    realizedPnlVnd: zod_1.z.number().optional().default(0),
    unrealizedPnlVnd: zod_1.z.number().optional().default(0),
    totalPnlVnd: zod_1.z.number().optional().default(0),
    openPositionsCount: zod_1.z.number().nonnegative().default(0),
    totalOrdersCount: zod_1.z.number().nonnegative().default(0),
    lastSignal: zod_1.z
        .object({
        side: zod_1.z.enum(['BUY', 'SELL']),
        price: zod_1.z.number(),
        timestamp: zod_1.z.string(),
        reason: zod_1.z.string().optional().default(''),
    })
        .optional(),
    heartbeatAt: zod_1.z.string().optional(),
    heartbeatAgeSec: zod_1.z.number().optional(),
    workerId: zod_1.z.string().optional(),
    workerHealth: zod_1.z.enum(['HEALTHY', 'DEGRADED', 'UNREACHABLE']).optional(),
    errorReason: zod_1.z.string().optional(),
});
//# sourceMappingURL=bot-session.schema.js.map