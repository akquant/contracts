"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotOrderSchema = exports.QuanttradeBotOrderRequestSchema = void 0;
const zod_1 = require("zod");
const order_status_enum_1 = require("../enums/order-status.enum");
const signal_action_enum_1 = require("../enums/signal-action.enum");
/**
 * Hard Guard: Quanttrade bot orders MUST be strictly LIMIT.
 * Market order types are strictly forbidden for bot execution.
 */
exports.QuanttradeBotOrderRequestSchema = zod_1.z.object({
    tradingAccountId: zod_1.z.string().min(1),
    symbol: zod_1.z.string().min(1),
    side: zod_1.z.enum(signal_action_enum_1.ORDER_SIDES),
    type: zod_1.z.literal('LIMIT'),
    price: zod_1.z.number().positive(),
    qty: zod_1.z.number().positive(),
    timeInForce: zod_1.z.enum(['DAY', 'GTC', 'IOC', 'FOK']).optional().default('DAY'),
    signalId: zod_1.z.string().optional(),
    signalKey: zod_1.z.string().optional(),
    botId: zod_1.z.string().optional(),
    clientOrderId: zod_1.z.string().optional(),
    currency: zod_1.z.string().optional().default('USD'),
});
exports.BotOrderSchema = zod_1.z.object({
    id: zod_1.z.string().optional(),
    orderId: zod_1.z.string().optional(),
    clientOrderId: zod_1.z.string().optional(),
    symbol: zod_1.z.string().min(1),
    side: zod_1.z.enum(signal_action_enum_1.ORDER_SIDES),
    type: zod_1.z.string(),
    qty: zod_1.z.number().positive(),
    price: zod_1.z.number().positive(),
    filledQty: zod_1.z.number().nonnegative().optional().default(0),
    avgPrice: zod_1.z.number().nonnegative().optional().default(0),
    status: zod_1.z.enum(order_status_enum_1.ORDER_STATUSES),
    createdAt: zod_1.z.string(),
    updatedAt: zod_1.z.string().optional(),
    currency: zod_1.z.string().optional().default('USD'),
    botId: zod_1.z.string().optional(),
    signalId: zod_1.z.string().optional(),
});
//# sourceMappingURL=order.schema.js.map