"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestartBotSchema = exports.StopBotSchema = exports.StartBotSchema = exports.BotScheduleConfigSchema = exports.TimeWindowItemSchema = exports.BotScheduleModeSchema = void 0;
const zod_1 = require("zod");
exports.BotScheduleModeSchema = zod_1.z.enum(['NONE', 'DURATION', 'TIME_WINDOW']);
exports.TimeWindowItemSchema = zod_1.z.object({
    start: zod_1.z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Invalid time format (HH:mm)'),
    end: zod_1.z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Invalid time format (HH:mm)'),
});
exports.BotScheduleConfigSchema = zod_1.z.object({
    mode: exports.BotScheduleModeSchema.default('NONE'),
    timezone: zod_1.z.string().default('Asia/Ho_Chi_Minh'),
    startAt: zod_1.z.string().optional(),
    endAt: zod_1.z.string().optional(),
    windows: zod_1.z.array(exports.TimeWindowItemSchema).max(5).optional(),
});
exports.StartBotSchema = zod_1.z.object({
    tradingAccountId: zod_1.z.string().min(1, 'tradingAccountId is required'),
    symbol: zod_1.z
        .string()
        .min(1, 'symbol is required')
        .max(64)
        .regex(/^[A-Za-z0-9._:-]+$/, 'Invalid symbol format'),
    strategy: zod_1.z.string().optional().default('TrendFollowingStrategy'),
    lotSize: zod_1.z.number().positive().max(100).optional().default(1),
    timeframe: zod_1.z.string().optional(),
    resolution: zod_1.z.string().optional(),
    autoTrade: zod_1.z.boolean().optional().default(true),
    maxLossPerDayUsd: zod_1.z.number().nonnegative().optional(),
    slippageTolerancePips: zod_1.z.number().nonnegative().optional(),
    password: zod_1.z.string().optional(),
    pineScriptCode: zod_1.z.string().optional(),
    scriptName: zod_1.z.string().optional(),
    existingLockId: zod_1.z.string().optional(),
    schedule: exports.BotScheduleConfigSchema.optional(),
});
exports.StopBotSchema = zod_1.z.object({
    tradingAccountId: zod_1.z.string().optional(),
    symbol: zod_1.z.string().optional(),
    strategy: zod_1.z.string().optional(),
    botId: zod_1.z.string().optional(),
    reason: zod_1.z.string().optional(),
    existingLockId: zod_1.z.string().optional(),
});
exports.RestartBotSchema = zod_1.z.object({
    tradingAccountId: zod_1.z.string().min(1, 'tradingAccountId is required'),
    symbol: zod_1.z
        .string()
        .min(1, 'symbol is required')
        .max(64)
        .regex(/^[A-Za-z0-9._:-]+$/, 'Invalid symbol format'),
    strategy: zod_1.z.string().optional(),
    botId: zod_1.z.string().optional(),
    lotSize: zod_1.z.number().positive().max(100).optional().default(1),
    timeframe: zod_1.z.string().optional(),
    resolution: zod_1.z.string().optional(),
    autoTrade: zod_1.z.boolean().optional().default(true),
    maxLossPerDayUsd: zod_1.z.number().nonnegative().optional(),
    slippageTolerancePips: zod_1.z.number().nonnegative().optional(),
    password: zod_1.z.string().optional(),
    pineScriptCode: zod_1.z.string().optional(),
    scriptName: zod_1.z.string().optional(),
    reason: zod_1.z.string().optional(),
    schedule: exports.BotScheduleConfigSchema.optional(),
});
//# sourceMappingURL=bot-config.schema.js.map