import { z } from 'zod';

export const TRAILING_STOP_MODES = ['USD', 'PERCENT', 'PRICE_DISTANCE'] as const;
export type TrailingStopMode = (typeof TRAILING_STOP_MODES)[number];

export const QuanttradeRiskConfigRawSchema = z.object({
  id: z.string().optional(),
  userId: z.string().optional(),
  tradingAccountId: z.string().min(1, 'tradingAccountId is required'),
  symbol: z.string().default('ALL'),
  takeProfitEnabled: z.boolean().default(false),
  takeProfitMode: z.literal('USD').default('USD'),
  takeProfitAmountUsd: z
    .number()
    .refine((n) => Number.isFinite(n), 'Must be a finite number')
    .optional()
    .nullable(),
  stopLossEnabled: z.boolean().default(false),
  stopLossMode: z.literal('USD').default('USD'),
  stopLossAmountUsd: z
    .number()
    .refine((n) => Number.isFinite(n), 'Must be a finite number')
    .optional()
    .nullable(),
  trailingStopEnabled: z.boolean().default(false),
  trailingStopMode: z.enum(TRAILING_STOP_MODES).default('USD'),
  trailingStopDistance: z
    .number()
    .refine((n) => Number.isFinite(n), 'Must be a finite number')
    .optional()
    .nullable(),
  trailingActivationProfitUsd: z
    .number()
    .refine((n) => Number.isFinite(n), 'Must be a finite number')
    .optional()
    .nullable(),
  applyToOpenPositions: z.boolean().default(false),
  version: z.number().int().positive().default(1),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export const QuanttradeRiskConfigSchema = QuanttradeRiskConfigRawSchema.superRefine((data, ctx) => {
  if (data.takeProfitEnabled) {
    if (
      data.takeProfitAmountUsd === undefined ||
      data.takeProfitAmountUsd === null ||
      !Number.isFinite(data.takeProfitAmountUsd) ||
      data.takeProfitAmountUsd <= 0
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['takeProfitAmountUsd'],
        message: 'Take Profit Amount (USD) must be a positive finite number when enabled',
      });
    }
  }

  if (data.stopLossEnabled) {
    if (
      data.stopLossAmountUsd === undefined ||
      data.stopLossAmountUsd === null ||
      !Number.isFinite(data.stopLossAmountUsd) ||
      data.stopLossAmountUsd <= 0
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['stopLossAmountUsd'],
        message: 'Stop Loss Amount (USD) must be a positive finite number when enabled',
      });
    }
  }

  if (data.trailingStopEnabled) {
    if (
      data.trailingStopDistance === undefined ||
      data.trailingStopDistance === null ||
      !Number.isFinite(data.trailingStopDistance) ||
      data.trailingStopDistance <= 0
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['trailingStopDistance'],
        message: 'Trailing Stop Distance must be a positive finite number when enabled',
      });
    }

    if (
      data.trailingActivationProfitUsd === undefined ||
      data.trailingActivationProfitUsd === null ||
      !Number.isFinite(data.trailingActivationProfitUsd) ||
      data.trailingActivationProfitUsd <= 0
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['trailingActivationProfitUsd'],
        message: 'Trailing Activation Profit (USD) must be a positive finite number when enabled',
      });
    }
  }
});

export type QuanttradeRiskConfig = z.infer<typeof QuanttradeRiskConfigSchema>;

export const UpdateRiskConfigSchema = QuanttradeRiskConfigRawSchema.partial().omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type UpdateRiskConfigInput = z.infer<typeof UpdateRiskConfigSchema>;

export const DEFAULT_QUANTTRADE_RISK_CONFIG: Omit<QuanttradeRiskConfig, 'tradingAccountId'> & {
  tradingAccountId: string;
} = {
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
