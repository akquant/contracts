import { z } from 'zod';
export declare const BotSessionSchema: z.ZodObject<{
    botKey: z.ZodString;
    botId: z.ZodOptional<z.ZodString>;
    tradingAccountId: z.ZodString;
    userId: z.ZodString;
    username: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    symbol: z.ZodString;
    strategy: z.ZodString;
    scriptName: z.ZodOptional<z.ZodString>;
    resolution: z.ZodOptional<z.ZodString>;
    timeframe: z.ZodOptional<z.ZodString>;
    lotSize: z.ZodNumber;
    status: z.ZodEnum<{
        STOPPED: "STOPPED";
        STARTING: "STARTING";
        RUNNING: "RUNNING";
        DEGRADED: "DEGRADED";
        STALE: "STALE";
        STOPPING: "STOPPING";
        ERROR: "ERROR";
        UNKNOWN: "UNKNOWN";
        PAUSED: "PAUSED";
    }>;
    startedAt: z.ZodString;
    lastActivityAt: z.ZodString;
    currency: z.ZodDefault<z.ZodString>;
    accountCurrency: z.ZodDefault<z.ZodString>;
    realizedPnlUsd: z.ZodDefault<z.ZodNumber>;
    unrealizedPnlUsd: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    totalPnlUsd: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    realizedPnlVnd: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    unrealizedPnlVnd: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    totalPnlVnd: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    openPositionsCount: z.ZodDefault<z.ZodNumber>;
    totalOrdersCount: z.ZodDefault<z.ZodNumber>;
    lastSignal: z.ZodOptional<z.ZodObject<{
        side: z.ZodEnum<{
            BUY: "BUY";
            SELL: "SELL";
        }>;
        price: z.ZodNumber;
        timestamp: z.ZodString;
        reason: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    }, z.core.$strip>>;
    heartbeatAt: z.ZodOptional<z.ZodString>;
    heartbeatAgeSec: z.ZodOptional<z.ZodNumber>;
    workerId: z.ZodOptional<z.ZodString>;
    workerHealth: z.ZodOptional<z.ZodEnum<{
        DEGRADED: "DEGRADED";
        HEALTHY: "HEALTHY";
        UNREACHABLE: "UNREACHABLE";
    }>>;
    errorReason: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type BotSessionContract = z.infer<typeof BotSessionSchema>;
//# sourceMappingURL=bot-session.schema.d.ts.map