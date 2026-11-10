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
});

export type RestartBotInput = z.infer<typeof RestartBotSchema>;
