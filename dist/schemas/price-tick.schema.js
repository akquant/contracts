"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceTickPayloadSchema = exports.PRICE_TICK_TYPE = exports.PRICE_TICK_CONTRACT_VERSION = void 0;
const zod_1 = require("zod");
exports.PRICE_TICK_CONTRACT_VERSION = 1;
exports.PRICE_TICK_TYPE = 'PRICE_TICK';
exports.PriceTickPayloadSchema = zod_1.z.object({
    v: zod_1.z.literal(exports.PRICE_TICK_CONTRACT_VERSION).optional().default(exports.PRICE_TICK_CONTRACT_VERSION),
    type: zod_1.z.literal(exports.PRICE_TICK_TYPE).optional().default(exports.PRICE_TICK_TYPE),
    symbol: zod_1.z.string().min(1),
    price: zod_1.z.number().positive(),
    bid: zod_1.z.number().positive().optional(),
    ask: zod_1.z.number().positive().optional(),
    ts: zod_1.z.number().int().positive(),
    source: zod_1.z.string().optional(),
});
//# sourceMappingURL=price-tick.schema.js.map