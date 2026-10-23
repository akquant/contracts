import { z } from 'zod';
import { ORDER_STATUSES } from '../enums/order-status.enum';
import { ORDER_SIDES } from '../enums/signal-action.enum';

/**
 * Hard Guard: Quanttrade bot orders MUST be strictly LIMIT.
 * Market order types are strictly forbidden for bot execution.
 */
export const QuanttradeBotOrderRequestSchema = z.object({
  tradingAccountId: z.string().min(1),
  symbol: z.string().min(1),
  side: z.enum(ORDER_SIDES),
  type: z.literal('LIMIT'),
  price: z.number().positive(),
  qty: z.number().positive(),
  timeInForce: z.enum(['DAY', 'GTC', 'IOC', 'FOK']).optional().default('DAY'),
  signalId: z.string().optional(),
  signalKey: z.string().optional(),
  botId: z.string().optional(),
  clientOrderId: z.string().optional(),
  currency: z.string().optional().default('USD'),
});

export type QuanttradeBotOrderRequest = z.infer<typeof QuanttradeBotOrderRequestSchema>;

export const BotOrderSchema = z.object({
  id: z.string().optional(),
  orderId: z.string().optional(),
  clientOrderId: z.string().optional(),
  symbol: z.string().min(1),
  side: z.enum(ORDER_SIDES),
  type: z.string(),
  qty: z.number().positive(),
  price: z.number().positive(),
  filledQty: z.number().nonnegative().optional().default(0),
  avgPrice: z.number().nonnegative().optional().default(0),
  status: z.enum(ORDER_STATUSES),
  createdAt: z.string(),
  updatedAt: z.string().optional(),
  currency: z.string().optional().default('USD'),
  botId: z.string().optional(),
  signalId: z.string().optional(),
});

export type BotOrderContract = z.infer<typeof BotOrderSchema>;
