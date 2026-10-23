import { z } from 'zod';
/**
 * Hard Guard: Quanttrade bot orders MUST be strictly LIMIT.
 * Market order types are strictly forbidden for bot execution.
 */
export declare const QuanttradeBotOrderRequestSchema: z.ZodObject<{
    tradingAccountId: z.ZodString;
    symbol: z.ZodString;
    side: z.ZodEnum<{
        BUY: "BUY";
        SELL: "SELL";
    }>;
    type: z.ZodLiteral<"LIMIT">;
    price: z.ZodNumber;
    qty: z.ZodNumber;
    timeInForce: z.ZodDefault<z.ZodOptional<z.ZodEnum<{
        DAY: "DAY";
        GTC: "GTC";
        IOC: "IOC";
        FOK: "FOK";
    }>>>;
    signalId: z.ZodOptional<z.ZodString>;
    signalKey: z.ZodOptional<z.ZodString>;
    botId: z.ZodOptional<z.ZodString>;
    clientOrderId: z.ZodOptional<z.ZodString>;
    currency: z.ZodDefault<z.ZodOptional<z.ZodString>>;
}, z.core.$strip>;
export type QuanttradeBotOrderRequest = z.infer<typeof QuanttradeBotOrderRequestSchema>;
export declare const BotOrderSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    orderId: z.ZodOptional<z.ZodString>;
    clientOrderId: z.ZodOptional<z.ZodString>;
    symbol: z.ZodString;
    side: z.ZodEnum<{
        BUY: "BUY";
        SELL: "SELL";
    }>;
    type: z.ZodString;
    qty: z.ZodNumber;
    price: z.ZodNumber;
    filledQty: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    avgPrice: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    status: z.ZodEnum<{
        NEW: "NEW";
        PENDING: "PENDING";
        SUBMITTED: "SUBMITTED";
        PARTIALLY_FILLED: "PARTIALLY_FILLED";
        FILLED: "FILLED";
        CANCELLED: "CANCELLED";
        REJECTED: "REJECTED";
        EXPIRED: "EXPIRED";
    }>;
    createdAt: z.ZodString;
    updatedAt: z.ZodOptional<z.ZodString>;
    currency: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    botId: z.ZodOptional<z.ZodString>;
    signalId: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type BotOrderContract = z.infer<typeof BotOrderSchema>;
//# sourceMappingURL=order.schema.d.ts.map