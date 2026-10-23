"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuanttradeClientEnvSchema = exports.QuanttradeWorkerEnvSchema = exports.QuanttradeBackendEnvSchema = void 0;
const zod_1 = require("zod");
const booleanFromString = zod_1.z.union([
    zod_1.z.boolean(),
    zod_1.z.enum(['true', 'false', '1', '0']).transform((val) => val === 'true' || val === '1'),
]);
const numberFromString = (min, max) => zod_1.z.union([zod_1.z.number(), zod_1.z.string().regex(/^-?\d+(\.\d+)?$/).transform(Number)]).refine((n) => (min !== undefined ? n >= min : true) && (max !== undefined ? n <= max : true), { message: `Number must be between ${min ?? '-inf'} and ${max ?? '+inf'}` });
/**
 * Backend Environment Validation Schema
 */
exports.QuanttradeBackendEnvSchema = zod_1.z.object({
    NODE_ENV: zod_1.z.enum(['development', 'develop', 'production', 'test']).default('development'),
    PORT: numberFromString(1, 65535).default(4000),
    REDIS_URL: zod_1.z.string().url().optional(),
    REDIS_HOST: zod_1.z.string().default('localhost'),
    REDIS_PORT: numberFromString(1, 65535).default(6379),
    REDIS_PASSWORD: zod_1.z.string().optional().default(''),
    QUANTTRADE_BOT_BASE_URL: zod_1.z.string().url().default('http://127.0.0.1:3002'),
    QUANTTRADE_CONTROL_API_TOKEN: zod_1.z.string().optional().default(''),
    QUANTTRADE_SIGNAL_STREAM: zod_1.z.string().min(1).default('quanttrade.bot.events'),
    QUANTTRADE_PRICE_STREAM: zod_1.z.string().min(1).default('quanttrade.bot.prices'),
    QUANTTRADE_CONSUMER_GROUP: zod_1.z.string().min(1).default('quanttrade:group:events'),
    QUANTTRADE_CONSUMER_NAME: zod_1.z.string().optional(),
    QUANTTRADE_DLQ_STREAM: zod_1.z.string().min(1).default('quanttrade.dlq.signal.created'),
    QUANTTRADE_MAX_RETRIES: numberFromString(1, 20).default(5),
    QUANTTRADE_AUTO_EXECUTION_ENABLED: booleanFromString.default(false),
    QUANTTRADE_LIMIT_ORDER_TIMEOUT_MS: numberFromString(1000, 300000).default(60000),
    QUANTTRADE_HEARTBEAT_TIMEOUT_SEC: numberFromString(10, 3600).default(180),
    QUANTTRADE_ORDER_TYPE: zod_1.z.literal('LIMIT').default('LIMIT'),
    QUANTTRADE_SYMBOL_EXCLUSIVITY_ENABLED: booleanFromString.default(true),
    QUANTTRADE_LOG_LEVEL: zod_1.z.enum(['debug', 'info', 'warn', 'error']).default('info'),
});
/**
 * Signal Worker Environment Validation Schema
 */
exports.QuanttradeWorkerEnvSchema = zod_1.z.object({
    NODE_ENV: zod_1.z.enum(['development', 'develop', 'production', 'test']).default('development'),
    PORT: numberFromString(1, 65535).default(3002),
    HOST: zod_1.z.string().default('127.0.0.1'),
    LOG_LEVEL: zod_1.z.enum(['trace', 'debug', 'info', 'warn', 'error', 'fatal']).default('info'),
    CONTROL_API_TOKEN: zod_1.z.string().optional().default(''),
    QUANTTRADE_CONTROL_API_TOKEN: zod_1.z.string().optional(),
    FCOM_BASE_URL: zod_1.z.string().url(),
    FCOM_WS_URL: zod_1.z.string().url(),
    REDIS_URL: zod_1.z.string().min(1),
    AUTO_START_BOTS: booleanFromString.default(false),
    QUANTTRADE_BOT_AUTO_START_ENABLED: booleanFromString.optional(),
    WORKER_ONLY: zod_1.z.literal(true).or(zod_1.z.enum(['true']).transform(() => true)).default(true),
    AUTO_EXECUTE: zod_1.z.literal(false).or(zod_1.z.enum(['false']).transform(() => false)).default(false),
    QUANTTRADE_SIGNAL_STREAM: zod_1.z.string().min(1).default('quanttrade.bot.events'),
    QUANTTRADE_PRICE_STREAM: zod_1.z.string().min(1).default('quanttrade.bot.prices'),
    PRICE_TICK_PUBLISH_ENABLED: booleanFromString.default(true),
    PRICE_TICK_MIN_INTERVAL_MS: numberFromString(50, 10000).default(250),
    PRICE_TICK_MIN_PRICE_CHANGE: numberFromString(0).default(0),
    SIGNAL_CONTRACT_SERVICE: zod_1.z.string().default('fcom-signal-worker'),
    SIGNAL_CONTRACT_INSTANCE_ID: zod_1.z.string().optional().default(''),
    SIGNAL_CONTRACT_STRATEGY_VERSION: zod_1.z.string().default('0.1.0'),
    QUANTTRADE_ORDER_TYPE: zod_1.z.literal('LIMIT').default('LIMIT'),
    QUANTTRADE_SYMBOL_EXCLUSIVITY_ENABLED: booleanFromString.default(true),
});
/**
 * Client Public Environment Validation Schema (NO SECRETS PERMITTED)
 */
exports.QuanttradeClientEnvSchema = zod_1.z.object({
    VITE_API_ENDPOINT: zod_1.z.string().url(),
    VITE_WS_ENDPOINT: zod_1.z.string().min(1),
    VITE_SIGNAL_PLATFORM_URL: zod_1.z.string().url().optional(),
});
//# sourceMappingURL=env.schema.js.map