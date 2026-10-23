import { z } from 'zod';
export declare const SIGNAL_CONTRACT_VERSION: 1;
export declare const SIGNAL_CREATED_TYPE: "SIGNAL_CREATED";
export declare const SignalTakeProfitSchema: z.ZodObject<{
    level: z.ZodNumber;
    price: z.ZodNumber;
    sizePercent: z.ZodNumber;
}, z.core.$strip>;
export declare const SignalRiskSchema: z.ZodObject<{
    stopLoss: z.ZodOptional<z.ZodNumber>;
    takeProfits: z.ZodOptional<z.ZodArray<z.ZodObject<{
        level: z.ZodNumber;
        price: z.ZodNumber;
        sizePercent: z.ZodNumber;
    }, z.core.$strip>>>;
    qtyHint: z.ZodOptional<z.ZodNumber>;
    riskPerTradePct: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
export declare const SignalEntrySchema: z.ZodObject<{
    type: z.ZodEnum<{
        LIMIT: "LIMIT";
        MARKET: "MARKET";
        STOP: "STOP";
    }>;
    price: z.ZodNumber;
    maxSlippageBps: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
export declare const SignalStrategyRefSchema: z.ZodObject<{
    name: z.ZodString;
    version: z.ZodString;
    paramsHash: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const SignalProducerSchema: z.ZodObject<{
    service: z.ZodString;
    instanceId: z.ZodString;
    sourceKey: z.ZodString;
}, z.core.$strip>;
export declare const SignalCreatedPayloadSchema: z.ZodObject<{
    signalId: z.ZodString;
    signalKey: z.ZodString;
    sourceKey: z.ZodString;
    botId: z.ZodOptional<z.ZodString>;
    symbol: z.ZodString;
    timeframe: z.ZodString;
    action: z.ZodEnum<{
        BUY: "BUY";
        SELL: "SELL";
        CLOSE: "CLOSE";
    }>;
    legKey: z.ZodDefault<z.ZodString>;
    barCloseTs: z.ZodNumber;
    mode: z.ZodEnum<{
        LIVE: "LIVE";
        PAPER: "PAPER";
    }>;
    strategy: z.ZodObject<{
        name: z.ZodString;
        version: z.ZodString;
        paramsHash: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
    entry: z.ZodObject<{
        type: z.ZodEnum<{
            LIMIT: "LIMIT";
            MARKET: "MARKET";
            STOP: "STOP";
        }>;
        price: z.ZodNumber;
        maxSlippageBps: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>;
    risk: z.ZodOptional<z.ZodObject<{
        stopLoss: z.ZodOptional<z.ZodNumber>;
        takeProfits: z.ZodOptional<z.ZodArray<z.ZodObject<{
            level: z.ZodNumber;
            price: z.ZodNumber;
            sizePercent: z.ZodNumber;
        }, z.core.$strip>>>;
        qtyHint: z.ZodOptional<z.ZodNumber>;
        riskPerTradePct: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>>;
    reason: z.ZodOptional<z.ZodString>;
    confidence: z.ZodOptional<z.ZodNumber>;
    meta: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    emittedAt: z.ZodNumber;
    expiresAt: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
export declare const SignalCreatedEnvelopeSchema: z.ZodObject<{
    v: z.ZodLiteral<1>;
    eventId: z.ZodString;
    type: z.ZodLiteral<"SIGNAL_CREATED">;
    ts: z.ZodNumber;
    seq: z.ZodOptional<z.ZodNumber>;
    producer: z.ZodObject<{
        service: z.ZodString;
        instanceId: z.ZodString;
        sourceKey: z.ZodString;
    }, z.core.$strip>;
    data: z.ZodObject<{
        signalId: z.ZodString;
        signalKey: z.ZodString;
        sourceKey: z.ZodString;
        botId: z.ZodOptional<z.ZodString>;
        symbol: z.ZodString;
        timeframe: z.ZodString;
        action: z.ZodEnum<{
            BUY: "BUY";
            SELL: "SELL";
            CLOSE: "CLOSE";
        }>;
        legKey: z.ZodDefault<z.ZodString>;
        barCloseTs: z.ZodNumber;
        mode: z.ZodEnum<{
            LIVE: "LIVE";
            PAPER: "PAPER";
        }>;
        strategy: z.ZodObject<{
            name: z.ZodString;
            version: z.ZodString;
            paramsHash: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>;
        entry: z.ZodObject<{
            type: z.ZodEnum<{
                LIMIT: "LIMIT";
                MARKET: "MARKET";
                STOP: "STOP";
            }>;
            price: z.ZodNumber;
            maxSlippageBps: z.ZodOptional<z.ZodNumber>;
        }, z.core.$strip>;
        risk: z.ZodOptional<z.ZodObject<{
            stopLoss: z.ZodOptional<z.ZodNumber>;
            takeProfits: z.ZodOptional<z.ZodArray<z.ZodObject<{
                level: z.ZodNumber;
                price: z.ZodNumber;
                sizePercent: z.ZodNumber;
            }, z.core.$strip>>>;
            qtyHint: z.ZodOptional<z.ZodNumber>;
            riskPerTradePct: z.ZodOptional<z.ZodNumber>;
        }, z.core.$strip>>;
        reason: z.ZodOptional<z.ZodString>;
        confidence: z.ZodOptional<z.ZodNumber>;
        meta: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        emittedAt: z.ZodNumber;
        expiresAt: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>;
}, z.core.$strip>;
export type SignalCreatedPayloadContract = z.infer<typeof SignalCreatedPayloadSchema>;
export type SignalCreatedEnvelopeContract = z.infer<typeof SignalCreatedEnvelopeSchema>;
//# sourceMappingURL=signal.schema.d.ts.map