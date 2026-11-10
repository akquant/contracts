"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestartBotSchema = exports.StopBotSchema = exports.StartBotSchema = exports.DEFAULT_DYNAMIC_GRID_CONFIG = exports.DynamicGridUserConfigSchema = exports.DynamicGridSpacingModeSchema = exports.DynamicGridModeSchema = exports.BotScheduleConfigSchema = exports.TimeWindowItemSchema = exports.BotScheduleModeSchema = void 0;
exports.buildDynamicGridConfigSignature = buildDynamicGridConfigSignature;
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
exports.DynamicGridModeSchema = zod_1.z.enum(['AUTO_REGIME', 'NEUTRAL', 'LONG_ONLY', 'SHORT_ONLY']);
exports.DynamicGridSpacingModeSchema = zod_1.z.enum(['FIB_ATR', 'GEOMETRIC', 'ARITHMETIC']);
exports.DynamicGridUserConfigSchema = zod_1.z.object({
    gridMode: exports.DynamicGridModeSchema.default('AUTO_REGIME'),
    spacingMode: exports.DynamicGridSpacingModeSchema.default('FIB_ATR'),
    maxGridLayers: zod_1.z.number().int().min(1).max(5).default(3),
    atrStepMult: zod_1.z.number().min(0.3).max(5.0).default(1.2),
    gridStepPct: zod_1.z.number().min(0.05).max(10.0).default(0.4),
    gridStepPrice: zod_1.z.number().positive().optional(),
    tpStepRatio: zod_1.z.number().min(0.3).max(5.0).default(1.0),
    slBasketMult: zod_1.z.number().min(1.0).max(10.0).default(3.5),
    cooldownBars: zod_1.z.number().int().min(0).max(20).default(3),
});
exports.DEFAULT_DYNAMIC_GRID_CONFIG = {
    gridMode: 'AUTO_REGIME',
    spacingMode: 'FIB_ATR',
    maxGridLayers: 3,
    atrStepMult: 1.2,
    gridStepPct: 0.4,
    tpStepRatio: 1.0,
    slBasketMult: 3.5,
    cooldownBars: 3,
};
function buildDynamicGridConfigSignature(config) {
    const merged = {
        ...exports.DEFAULT_DYNAMIC_GRID_CONFIG,
        ...(config || {}),
    };
    return [
        merged.gridMode,
        merged.spacingMode,
        merged.maxGridLayers,
        Number(merged.atrStepMult).toFixed(2),
        Number(merged.gridStepPct).toFixed(2),
        merged.gridStepPrice ? Number(merged.gridStepPrice).toFixed(4) : 'none',
        Number(merged.tpStepRatio).toFixed(2),
        Number(merged.slBasketMult).toFixed(2),
        merged.cooldownBars,
    ].join(':');
}
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
    gridConfig: exports.DynamicGridUserConfigSchema.optional(),
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
    gridConfig: exports.DynamicGridUserConfigSchema.optional(),
});
//# sourceMappingURL=bot-config.schema.js.map