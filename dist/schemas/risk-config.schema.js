"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_QUANTTRADE_RISK_CONFIG = exports.UpdateRiskConfigSchema = exports.QuanttradeRiskConfigSchema = exports.QuanttradeRiskConfigRawSchema = exports.TRAILING_STOP_MODES = void 0;
const zod_1 = require("zod");
exports.TRAILING_STOP_MODES = ['USD', 'PERCENT', 'PRICE_DISTANCE'];
exports.QuanttradeRiskConfigRawSchema = zod_1.z.object({
    id: zod_1.z.string().optional(),
    userId: zod_1.z.string().optional(),
    tradingAccountId: zod_1.z.string().min(1, 'tradingAccountId is required'),
    symbol: zod_1.z.string().default('ALL'),
    takeProfitEnabled: zod_1.z.boolean().default(false),
    takeProfitMode: zod_1.z.literal('USD').default('USD'),
    takeProfitAmountUsd: zod_1.z
        .number()
        .refine((n) => Number.isFinite(n), 'Must be a finite number')
        .optional()
        .nullable(),
    stopLossEnabled: zod_1.z.boolean().default(false),
    stopLossMode: zod_1.z.literal('USD').default('USD'),
    stopLossAmountUsd: zod_1.z
        .number()
        .refine((n) => Number.isFinite(n), 'Must be a finite number')
        .optional()
        .nullable(),
    trailingStopEnabled: zod_1.z.boolean().default(false),
    trailingStopMode: zod_1.z.enum(exports.TRAILING_STOP_MODES).default('USD'),
    trailingStopDistance: zod_1.z
        .number()
        .refine((n) => Number.isFinite(n), 'Must be a finite number')
        .optional()
        .nullable(),
    trailingActivationProfitUsd: zod_1.z
        .number()
        .refine((n) => Number.isFinite(n), 'Must be a finite number')
        .optional()
        .nullable(),
    applyToOpenPositions: zod_1.z.boolean().default(false),
    version: zod_1.z.number().int().positive().default(1),
    createdAt: zod_1.z.string().optional(),
    updatedAt: zod_1.z.string().optional(),
});
exports.QuanttradeRiskConfigSchema = exports.QuanttradeRiskConfigRawSchema.superRefine((data, ctx) => {
    if (data.takeProfitEnabled) {
        if (data.takeProfitAmountUsd === undefined ||
            data.takeProfitAmountUsd === null ||
            !Number.isFinite(data.takeProfitAmountUsd) ||
            data.takeProfitAmountUsd <= 0) {
            ctx.addIssue({
                code: zod_1.z.ZodIssueCode.custom,
                path: ['takeProfitAmountUsd'],
                message: 'Take Profit Amount (USD) must be a positive finite number when enabled',
            });
        }
    }
    if (data.stopLossEnabled) {
        if (data.stopLossAmountUsd === undefined ||
            data.stopLossAmountUsd === null ||
            !Number.isFinite(data.stopLossAmountUsd) ||
            data.stopLossAmountUsd <= 0) {
            ctx.addIssue({
                code: zod_1.z.ZodIssueCode.custom,
                path: ['stopLossAmountUsd'],
                message: 'Stop Loss Amount (USD) must be a positive finite number when enabled',
            });
        }
    }
    if (data.trailingStopEnabled) {
        if (data.trailingStopDistance === undefined ||
            data.trailingStopDistance === null ||
            !Number.isFinite(data.trailingStopDistance) ||
            data.trailingStopDistance <= 0) {
            ctx.addIssue({
                code: zod_1.z.ZodIssueCode.custom,
                path: ['trailingStopDistance'],
                message: 'Trailing Stop Distance must be a positive finite number when enabled',
            });
        }
        if (data.trailingActivationProfitUsd === undefined ||
            data.trailingActivationProfitUsd === null ||
            !Number.isFinite(data.trailingActivationProfitUsd) ||
            data.trailingActivationProfitUsd <= 0) {
            ctx.addIssue({
                code: zod_1.z.ZodIssueCode.custom,
                path: ['trailingActivationProfitUsd'],
                message: 'Trailing Activation Profit (USD) must be a positive finite number when enabled',
            });
        }
    }
});
exports.UpdateRiskConfigSchema = exports.QuanttradeRiskConfigRawSchema.partial().omit({
    id: true,
    createdAt: true,
    updatedAt: true,
});
exports.DEFAULT_QUANTTRADE_RISK_CONFIG = {
    tradingAccountId: '',
    symbol: 'ALL',
    takeProfitEnabled: false,
    takeProfitMode: 'USD',
    takeProfitAmountUsd: null,
    stopLossEnabled: false,
    stopLossMode: 'USD',
    stopLossAmountUsd: null,
    trailingStopEnabled: false,
    trailingStopMode: 'USD',
    trailingStopDistance: null,
    trailingActivationProfitUsd: null,
    applyToOpenPositions: false,
    version: 1,
};
//# sourceMappingURL=risk-config.schema.js.map