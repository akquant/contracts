import { z } from 'zod';
export declare const TRAILING_STOP_MODES: readonly ["USD", "PERCENT", "PRICE_DISTANCE"];
export type TrailingStopMode = (typeof TRAILING_STOP_MODES)[number];
export declare const QuanttradeRiskConfigRawSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    userId: z.ZodOptional<z.ZodString>;
    tradingAccountId: z.ZodString;
    symbol: z.ZodDefault<z.ZodString>;
    takeProfitEnabled: z.ZodDefault<z.ZodBoolean>;
    takeProfitMode: z.ZodDefault<z.ZodLiteral<"USD">>;
    takeProfitAmountUsd: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
    stopLossEnabled: z.ZodDefault<z.ZodBoolean>;
    stopLossMode: z.ZodDefault<z.ZodLiteral<"USD">>;
    stopLossAmountUsd: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
    trailingStopEnabled: z.ZodDefault<z.ZodBoolean>;
    trailingStopMode: z.ZodDefault<z.ZodEnum<{
        USD: "USD";
        PERCENT: "PERCENT";
        PRICE_DISTANCE: "PRICE_DISTANCE";
    }>>;
    trailingStopDistance: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
    trailingActivationProfitUsd: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
    applyToOpenPositions: z.ZodDefault<z.ZodBoolean>;
    version: z.ZodDefault<z.ZodNumber>;
    createdAt: z.ZodOptional<z.ZodString>;
    updatedAt: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const QuanttradeRiskConfigSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    userId: z.ZodOptional<z.ZodString>;
    tradingAccountId: z.ZodString;
    symbol: z.ZodDefault<z.ZodString>;
    takeProfitEnabled: z.ZodDefault<z.ZodBoolean>;
    takeProfitMode: z.ZodDefault<z.ZodLiteral<"USD">>;
    takeProfitAmountUsd: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
    stopLossEnabled: z.ZodDefault<z.ZodBoolean>;
    stopLossMode: z.ZodDefault<z.ZodLiteral<"USD">>;
    stopLossAmountUsd: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
    trailingStopEnabled: z.ZodDefault<z.ZodBoolean>;
    trailingStopMode: z.ZodDefault<z.ZodEnum<{
        USD: "USD";
        PERCENT: "PERCENT";
        PRICE_DISTANCE: "PRICE_DISTANCE";
    }>>;
    trailingStopDistance: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
    trailingActivationProfitUsd: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
    applyToOpenPositions: z.ZodDefault<z.ZodBoolean>;
    version: z.ZodDefault<z.ZodNumber>;
    createdAt: z.ZodOptional<z.ZodString>;
    updatedAt: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type QuanttradeRiskConfig = z.infer<typeof QuanttradeRiskConfigSchema>;
export declare const UpdateRiskConfigSchema: z.ZodObject<{
    symbol: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    tradingAccountId: z.ZodOptional<z.ZodString>;
    userId: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    version: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    takeProfitEnabled: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    takeProfitMode: z.ZodOptional<z.ZodDefault<z.ZodLiteral<"USD">>>;
    takeProfitAmountUsd: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodNumber>>>;
    stopLossEnabled: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    stopLossMode: z.ZodOptional<z.ZodDefault<z.ZodLiteral<"USD">>>;
    stopLossAmountUsd: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodNumber>>>;
    trailingStopEnabled: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    trailingStopMode: z.ZodOptional<z.ZodDefault<z.ZodEnum<{
        USD: "USD";
        PERCENT: "PERCENT";
        PRICE_DISTANCE: "PRICE_DISTANCE";
    }>>>;
    trailingStopDistance: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodNumber>>>;
    trailingActivationProfitUsd: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodNumber>>>;
    applyToOpenPositions: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
}, z.core.$strip>;
export type UpdateRiskConfigInput = z.infer<typeof UpdateRiskConfigSchema>;
export declare const DEFAULT_QUANTTRADE_RISK_CONFIG: Omit<QuanttradeRiskConfig, 'tradingAccountId'> & {
    tradingAccountId: string;
};
//# sourceMappingURL=risk-config.schema.d.ts.map