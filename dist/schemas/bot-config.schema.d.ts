import { z } from 'zod';
export declare const StartBotSchema: z.ZodObject<{
    tradingAccountId: z.ZodString;
    symbol: z.ZodString;
    strategy: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    lotSize: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    timeframe: z.ZodOptional<z.ZodString>;
    resolution: z.ZodOptional<z.ZodString>;
    autoTrade: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    maxLossPerDayUsd: z.ZodOptional<z.ZodNumber>;
    slippageTolerancePips: z.ZodOptional<z.ZodNumber>;
    password: z.ZodOptional<z.ZodString>;
    pineScriptCode: z.ZodOptional<z.ZodString>;
    scriptName: z.ZodOptional<z.ZodString>;
    existingLockId: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type StartBotInput = z.infer<typeof StartBotSchema>;
export declare const StopBotSchema: z.ZodObject<{
    tradingAccountId: z.ZodOptional<z.ZodString>;
    symbol: z.ZodOptional<z.ZodString>;
    strategy: z.ZodOptional<z.ZodString>;
    botId: z.ZodOptional<z.ZodString>;
    reason: z.ZodOptional<z.ZodString>;
    existingLockId: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type StopBotInput = z.infer<typeof StopBotSchema>;
export declare const RestartBotSchema: z.ZodObject<{
    tradingAccountId: z.ZodString;
    symbol: z.ZodString;
    strategy: z.ZodOptional<z.ZodString>;
    botId: z.ZodOptional<z.ZodString>;
    lotSize: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    timeframe: z.ZodOptional<z.ZodString>;
    resolution: z.ZodOptional<z.ZodString>;
    autoTrade: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    maxLossPerDayUsd: z.ZodOptional<z.ZodNumber>;
    slippageTolerancePips: z.ZodOptional<z.ZodNumber>;
    password: z.ZodOptional<z.ZodString>;
    pineScriptCode: z.ZodOptional<z.ZodString>;
    scriptName: z.ZodOptional<z.ZodString>;
    reason: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type RestartBotInput = z.infer<typeof RestartBotSchema>;
//# sourceMappingURL=bot-config.schema.d.ts.map