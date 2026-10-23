import { z } from 'zod';

const booleanFromString = z.union([
  z.boolean(),
  z.enum(['true', 'false', '1', '0']).transform((val: string) => val === 'true' || val === '1'),
]);

const numberFromString = (min?: number, max?: number) =>
  z.union([z.number(), z.string().regex(/^-?\d+(\.\d+)?$/).transform(Number)]).refine(
    (n: number) => (min !== undefined ? n >= min : true) && (max !== undefined ? n <= max : true),
    { message: `Number must be between ${min ?? '-inf'} and ${max ?? '+inf'}` },
  );

/**
 * Backend Environment Validation Schema
 */
export const QuanttradeBackendEnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'develop', 'production', 'test']).default('development'),
  PORT: numberFromString(1, 65535).default(4000),
  REDIS_URL: z.string().url().optional(),
  REDIS_HOST: z.string().default('localhost'),
  REDIS_PORT: numberFromString(1, 65535).default(6379),
  REDIS_PASSWORD: z.string().optional().default(''),
  QUANTTRADE_BOT_BASE_URL: z.string().url().default('http://127.0.0.1:3002'),
  QUANTTRADE_CONTROL_API_TOKEN: z.string().optional().default(''),
  QUANTTRADE_SIGNAL_STREAM: z.string().min(1).default('quanttrade.bot.events'),
  QUANTTRADE_PRICE_STREAM: z.string().min(1).default('quanttrade.bot.prices'),
  QUANTTRADE_CONSUMER_GROUP: z.string().min(1).default('quanttrade:group:events'),
  QUANTTRADE_CONSUMER_NAME: z.string().optional(),
  QUANTTRADE_DLQ_STREAM: z.string().min(1).default('quanttrade.dlq.signal.created'),
  QUANTTRADE_MAX_RETRIES: numberFromString(1, 20).default(5),
  QUANTTRADE_AUTO_EXECUTION_ENABLED: booleanFromString.default(false),
  QUANTTRADE_LIMIT_ORDER_TIMEOUT_MS: numberFromString(1000, 300000).default(60000),
  QUANTTRADE_HEARTBEAT_TIMEOUT_SEC: numberFromString(10, 3600).default(180),
  QUANTTRADE_ORDER_TYPE: z.literal('LIMIT').default('LIMIT'),
  QUANTTRADE_SYMBOL_EXCLUSIVITY_ENABLED: booleanFromString.default(true),
  QUANTTRADE_LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
});

export type QuanttradeBackendEnv = z.infer<typeof QuanttradeBackendEnvSchema>;

/**
 * Signal Worker Environment Validation Schema
 */
export const QuanttradeWorkerEnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'develop', 'production', 'test']).default('development'),
  PORT: numberFromString(1, 65535).default(3002),
  HOST: z.string().default('127.0.0.1'),
  LOG_LEVEL: z.enum(['trace', 'debug', 'info', 'warn', 'error', 'fatal']).default('info'),
  CONTROL_API_TOKEN: z.string().optional().default(''),
  QUANTTRADE_CONTROL_API_TOKEN: z.string().optional(),
  FCOM_BASE_URL: z.string().url(),
  FCOM_WS_URL: z.string().url(),
  REDIS_URL: z.string().min(1),
  AUTO_START_BOTS: booleanFromString.default(false),
  QUANTTRADE_BOT_AUTO_START_ENABLED: booleanFromString.optional(),
  WORKER_ONLY: z.literal(true).or(z.enum(['true']).transform(() => true)).default(true),
  AUTO_EXECUTE: z.literal(false).or(z.enum(['false']).transform(() => false)).default(false),
  QUANTTRADE_SIGNAL_STREAM: z.string().min(1).default('quanttrade.bot.events'),
  QUANTTRADE_PRICE_STREAM: z.string().min(1).default('quanttrade.bot.prices'),
  PRICE_TICK_PUBLISH_ENABLED: booleanFromString.default(true),
  PRICE_TICK_MIN_INTERVAL_MS: numberFromString(50, 10000).default(250),
  PRICE_TICK_MIN_PRICE_CHANGE: numberFromString(0).default(0),
  SIGNAL_CONTRACT_SERVICE: z.string().default('fcom-signal-worker'),
  SIGNAL_CONTRACT_INSTANCE_ID: z.string().optional().default(''),
  SIGNAL_CONTRACT_STRATEGY_VERSION: z.string().default('0.1.0'),
  QUANTTRADE_ORDER_TYPE: z.literal('LIMIT').default('LIMIT'),
  QUANTTRADE_SYMBOL_EXCLUSIVITY_ENABLED: booleanFromString.default(true),
});

export type QuanttradeWorkerEnv = z.infer<typeof QuanttradeWorkerEnvSchema>;

/**
 * Client Public Environment Validation Schema (NO SECRETS PERMITTED)
 */
export const QuanttradeClientEnvSchema = z.object({
  VITE_API_ENDPOINT: z.string().url(),
  VITE_WS_ENDPOINT: z.string().min(1),
  VITE_SIGNAL_PLATFORM_URL: z.string().url().optional(),
});

export type QuanttradeClientEnv = z.infer<typeof QuanttradeClientEnvSchema>;
