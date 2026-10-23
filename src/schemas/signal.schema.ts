import { z } from 'zod';
import { SIGNAL_ACTIONS, SIGNAL_MODES, SIGNAL_ENTRY_TYPES } from '../enums/signal-action.enum';

export const SIGNAL_CONTRACT_VERSION = 1 as const;
export const SIGNAL_CREATED_TYPE = 'SIGNAL_CREATED' as const;

export const SignalTakeProfitSchema = z.object({
  level: z.number().int().positive(),
  price: z.number().positive(),
  sizePercent: z.number().positive().max(100),
});

export const SignalRiskSchema = z.object({
  stopLoss: z.number().positive().optional(),
  takeProfits: z.array(SignalTakeProfitSchema).optional(),
  qtyHint: z.number().positive().optional(),
  riskPerTradePct: z.number().positive().max(100).optional(),
});

export const SignalEntrySchema = z.object({
  type: z.enum(SIGNAL_ENTRY_TYPES),
  price: z.number().positive(),
  maxSlippageBps: z.number().nonnegative().optional(),
});

export const SignalStrategyRefSchema = z.object({
  name: z.string().min(1),
  version: z.string().min(1),
  paramsHash: z.string().optional(),
});

export const SignalProducerSchema = z.object({
  service: z.string().min(1),
  instanceId: z.string().min(1),
  sourceKey: z.string().min(1),
});

export const SignalCreatedPayloadSchema = z.object({
  signalId: z.string().min(1),
  signalKey: z.string().min(1),
  sourceKey: z.string().min(1),
  botId: z.string().optional(),
  symbol: z.string().min(1),
  timeframe: z.string().min(1),
  action: z.enum(SIGNAL_ACTIONS),
  legKey: z.string().min(1).default('ENTRY'),
  barCloseTs: z.number().int().positive(),
  mode: z.enum(SIGNAL_MODES),
  strategy: SignalStrategyRefSchema,
  entry: SignalEntrySchema,
  risk: SignalRiskSchema.optional(),
  reason: z.string().optional(),
  confidence: z.number().min(0).max(1).optional(),
  meta: z.record(z.string(), z.unknown()).optional(),
  emittedAt: z.number().int().positive(),
  expiresAt: z.number().int().positive().optional(),
});

export const SignalCreatedEnvelopeSchema = z.object({
  v: z.literal(SIGNAL_CONTRACT_VERSION),
  eventId: z.string().min(1),
  type: z.literal(SIGNAL_CREATED_TYPE),
  ts: z.number().int().positive(),
  seq: z.number().int().nonnegative().optional(),
  producer: SignalProducerSchema,
  data: SignalCreatedPayloadSchema,
});

export type SignalCreatedPayloadContract = z.infer<typeof SignalCreatedPayloadSchema>;
export type SignalCreatedEnvelopeContract = z.infer<typeof SignalCreatedEnvelopeSchema>;
