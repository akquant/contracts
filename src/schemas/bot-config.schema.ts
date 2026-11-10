import { z } from 'zod';

export const BotScheduleModeSchema = z.enum(['NONE', 'DURATION', 'TIME_WINDOW']);
export type BotScheduleMode = z.infer<typeof BotScheduleModeSchema>;

export const TimeWindowItemSchema = z.object({
  start: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Invalid time format (HH:mm)'),
  end: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Invalid time format (HH:mm)'),
});
export type TimeWindowItem = z.infer<typeof TimeWindowItemSchema>;

export const BotScheduleConfigSchema = z.object({
  mode: BotScheduleModeSchema.default('NONE'),
  timezone: z.string().default('Asia/Ho_Chi_Minh'),
  startAt: z.string().optional(),
  endAt: z.string().optional(),
  windows: z.array(TimeWindowItemSchema).max(5).optional(),
});
export type BotScheduleConfig = z.infer<typeof BotScheduleConfigSchema>;

export const DynamicGridModeSchema = z.enum(['AUTO_REGIME', 'NEUTRAL', 'LONG_ONLY', 'SHORT_ONLY']);
export type DynamicGridMode = z.infer<typeof DynamicGridModeSchema>;

export const DynamicGridSpacingModeSchema = z.enum(['FIB_ATR', 'GEOMETRIC', 'ARITHMETIC']);
export type DynamicGridSpacingMode = z.infer<typeof DynamicGridSpacingModeSchema>;

export const DynamicGridUserConfigSchema = z.object({
  gridMode: DynamicGridModeSchema.default('AUTO_REGIME'),
  spacingMode: DynamicGridSpacingModeSchema.default('FIB_ATR'),
  maxGridLayers: z.number().int().min(1).max(5).default(3),
  atrStepMult: z.number().min(0.3).max(5.0).default(1.2),
  gridStepPct: z.number().min(0.05).max(10.0).default(0.4),
  gridStepPrice: z.number().positive().optional(),
  tpStepRatio: z.number().min(0.3).max(5.0).default(1.0),
  slBasketMult: z.number().min(1.0).max(10.0).default(3.5),
  cooldownBars: z.number().int().min(0).max(20).default(3),
});
export type DynamicGridUserConfig = z.infer<typeof DynamicGridUserConfigSchema>;

export const DEFAULT_DYNAMIC_GRID_CONFIG: DynamicGridUserConfig = {
  gridMode: 'AUTO_REGIME',
  spacingMode: 'FIB_ATR',
  maxGridLayers: 3,
  atrStepMult: 1.2,
  gridStepPct: 0.4,
  tpStepRatio: 1.0,
  slBasketMult: 3.5,
  cooldownBars: 3,
};

export function buildDynamicGridConfigSignature(config?: Partial<DynamicGridUserConfig>): string {
  const merged: DynamicGridUserConfig = {
    ...DEFAULT_DYNAMIC_GRID_CONFIG,
    ...(config || {}),
  };
  return [
    merged.gridMode,
    merged.spacingMode,
    merged.maxGridLayers,
    Number(merged.atrStepMult).toFixed(2),
    Number(merged.gridStepPct).toFixed(2),
    merged.gridStepPrice ? Number(merged.gridStepPrice).toFixed(4) : 'none',
    Number(merged.tpStepRatio).toFixed(2),
    Number(merged.slBasketMult).toFixed(2),
    merged.cooldownBars,
  ].join(':');
}

export const StartBotSchema = z.object({
  tradingAccountId: z.string().min(1, 'tradingAccountId is required'),
  symbol: z
    .string()
    .min(1, 'symbol is required')
    .max(64)
    .regex(/^[A-Za-z0-9._:-]+$/, 'Invalid symbol format'),
  strategy: z.string().optional().default('TrendFollowingStrategy'),
  lotSize: z.number().positive().max(100).optional().default(1),
  timeframe: z.string().optional(),
  resolution: z.string().optional(),
  autoTrade: z.boolean().optional().default(true),
  maxLossPerDayUsd: z.number().nonnegative().optional(),
  slippageTolerancePips: z.number().nonnegative().optional(),
  password: z.string().optional(),
  pineScriptCode: z.string().optional(),
  scriptName: z.string().optional(),
  existingLockId: z.string().optional(),
  schedule: BotScheduleConfigSchema.optional(),
  gridConfig: DynamicGridUserConfigSchema.optional(),
});

export type StartBotInput = z.infer<typeof StartBotSchema>;

export const StopBotSchema = z.object({
  tradingAccountId: z.string().optional(),
  symbol: z.string().optional(),
  strategy: z.string().optional(),
  botId: z.string().optional(),
  reason: z.string().optional(),
  existingLockId: z.string().optional(),
});

export type StopBotInput = z.infer<typeof StopBotSchema>;

export const RestartBotSchema = z.object({
  tradingAccountId: z.string().min(1, 'tradingAccountId is required'),
  symbol: z
    .string()
    .min(1, 'symbol is required')
    .max(64)
    .regex(/^[A-Za-z0-9._:-]+$/, 'Invalid symbol format'),
  strategy: z.string().optional(),
  botId: z.string().optional(),
  lotSize: z.number().positive().max(100).optional().default(1),
  timeframe: z.string().optional(),
  resolution: z.string().optional(),
  autoTrade: z.boolean().optional().default(true),
  maxLossPerDayUsd: z.number().nonnegative().optional(),
  slippageTolerancePips: z.number().nonnegative().optional(),
  password: z.string().optional(),
  pineScriptCode: z.string().optional(),
  scriptName: z.string().optional(),
  reason: z.string().optional(),
  schedule: BotScheduleConfigSchema.optional(),
  gridConfig: DynamicGridUserConfigSchema.optional(),
});

export type RestartBotInput = z.infer<typeof RestartBotSchema>;
