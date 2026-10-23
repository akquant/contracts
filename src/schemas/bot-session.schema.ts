import { z } from 'zod';
import { BOT_SESSION_STATUSES } from '../enums/session-status.enum';

export const BotSessionSchema = z.object({
  botKey: z.string().min(1),
  botId: z.string().optional(),
  tradingAccountId: z.string().min(1),
  userId: z.string().min(1),
  username: z.string().optional().default(''),
  symbol: z.string().min(1),
  strategy: z.string().min(1),
  scriptName: z.string().optional(),
  resolution: z.string().optional(),
  timeframe: z.string().optional(),
  lotSize: z.number().positive(),
  status: z.enum(BOT_SESSION_STATUSES),
  startedAt: z.string(),
  lastActivityAt: z.string(),
  currency: z.string().default('USD'),
  accountCurrency: z.string().default('VND'),
  realizedPnlUsd: z.number().default(0),
  unrealizedPnlUsd: z.number().optional().default(0),
  totalPnlUsd: z.number().optional().default(0),
  realizedPnlVnd: z.number().optional().default(0),
  unrealizedPnlVnd: z.number().optional().default(0),
  totalPnlVnd: z.number().optional().default(0),
  openPositionsCount: z.number().nonnegative().default(0),
  totalOrdersCount: z.number().nonnegative().default(0),
  lastSignal: z
    .object({
      side: z.enum(['BUY', 'SELL']),
      price: z.number(),
      timestamp: z.string(),
      reason: z.string().optional().default(''),
    })
    .optional(),
  heartbeatAt: z.string().optional(),
  heartbeatAgeSec: z.number().optional(),
  workerId: z.string().optional(),
  workerHealth: z.enum(['HEALTHY', 'DEGRADED', 'UNREACHABLE']).optional(),
  errorReason: z.string().optional(),
});

export type BotSessionContract = z.infer<typeof BotSessionSchema>;
