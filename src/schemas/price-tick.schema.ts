import { z } from 'zod';

export const PRICE_TICK_CONTRACT_VERSION = 1 as const;
export const PRICE_TICK_TYPE = 'PRICE_TICK' as const;

export const PriceTickPayloadSchema = z.object({
  v: z.literal(PRICE_TICK_CONTRACT_VERSION).optional().default(PRICE_TICK_CONTRACT_VERSION),
  type: z.literal(PRICE_TICK_TYPE).optional().default(PRICE_TICK_TYPE),
  symbol: z.string().min(1),
  price: z.number().positive(),
  bid: z.number().positive().optional(),
  ask: z.number().positive().optional(),
  ts: z.number().int().positive(),
  source: z.string().optional(),
});

export type PriceTickPayloadContract = z.infer<typeof PriceTickPayloadSchema>;
