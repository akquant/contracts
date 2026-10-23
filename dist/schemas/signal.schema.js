"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignalCreatedEnvelopeSchema = exports.SignalCreatedPayloadSchema = exports.SignalProducerSchema = exports.SignalStrategyRefSchema = exports.SignalEntrySchema = exports.SignalRiskSchema = exports.SignalTakeProfitSchema = exports.SIGNAL_CREATED_TYPE = exports.SIGNAL_CONTRACT_VERSION = void 0;
const zod_1 = require("zod");
const signal_action_enum_1 = require("../enums/signal-action.enum");
exports.SIGNAL_CONTRACT_VERSION = 1;
exports.SIGNAL_CREATED_TYPE = 'SIGNAL_CREATED';
exports.SignalTakeProfitSchema = zod_1.z.object({
    level: zod_1.z.number().int().positive(),
    price: zod_1.z.number().positive(),
    sizePercent: zod_1.z.number().positive().max(100),
});
exports.SignalRiskSchema = zod_1.z.object({
    stopLoss: zod_1.z.number().positive().optional(),
    takeProfits: zod_1.z.array(exports.SignalTakeProfitSchema).optional(),
    qtyHint: zod_1.z.number().positive().optional(),
    riskPerTradePct: zod_1.z.number().positive().max(100).optional(),
});
exports.SignalEntrySchema = zod_1.z.object({
    type: zod_1.z.enum(signal_action_enum_1.SIGNAL_ENTRY_TYPES),
    price: zod_1.z.number().positive(),
    maxSlippageBps: zod_1.z.number().nonnegative().optional(),
});
exports.SignalStrategyRefSchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    version: zod_1.z.string().min(1),
    paramsHash: zod_1.z.string().optional(),
});
exports.SignalProducerSchema = zod_1.z.object({
    service: zod_1.z.string().min(1),
    instanceId: zod_1.z.string().min(1),
    sourceKey: zod_1.z.string().min(1),
});
exports.SignalCreatedPayloadSchema = zod_1.z.object({
    signalId: zod_1.z.string().min(1),
    signalKey: zod_1.z.string().min(1),
    sourceKey: zod_1.z.string().min(1),
    botId: zod_1.z.string().optional(),
    symbol: zod_1.z.string().min(1),
    timeframe: zod_1.z.string().min(1),
    action: zod_1.z.enum(signal_action_enum_1.SIGNAL_ACTIONS),
    legKey: zod_1.z.string().min(1).default('ENTRY'),
    barCloseTs: zod_1.z.number().int().positive(),
    mode: zod_1.z.enum(signal_action_enum_1.SIGNAL_MODES),
    strategy: exports.SignalStrategyRefSchema,
    entry: exports.SignalEntrySchema,
    risk: exports.SignalRiskSchema.optional(),
    reason: zod_1.z.string().optional(),
    confidence: zod_1.z.number().min(0).max(1).optional(),
    meta: zod_1.z.record(zod_1.z.string(), zod_1.z.unknown()).optional(),
    emittedAt: zod_1.z.number().int().positive(),
    expiresAt: zod_1.z.number().int().positive().optional(),
});
exports.SignalCreatedEnvelopeSchema = zod_1.z.object({
    v: zod_1.z.literal(exports.SIGNAL_CONTRACT_VERSION),
    eventId: zod_1.z.string().min(1),
    type: zod_1.z.literal(exports.SIGNAL_CREATED_TYPE),
    ts: zod_1.z.number().int().positive(),
    seq: zod_1.z.number().int().nonnegative().optional(),
    producer: exports.SignalProducerSchema,
    data: exports.SignalCreatedPayloadSchema,
});
//# sourceMappingURL=signal.schema.js.map