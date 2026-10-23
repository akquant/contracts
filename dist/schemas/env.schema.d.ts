import { z } from 'zod';
/**
 * Backend Environment Validation Schema
 */
export declare const QuanttradeBackendEnvSchema: z.ZodObject<{
    NODE_ENV: z.ZodDefault<z.ZodEnum<{
        development: "development";
        develop: "develop";
        production: "production";
        test: "test";
    }>>;
    PORT: z.ZodDefault<z.ZodUnion<readonly [z.ZodNumber, z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>]>>;
    REDIS_URL: z.ZodOptional<z.ZodString>;
    REDIS_HOST: z.ZodDefault<z.ZodString>;
    REDIS_PORT: z.ZodDefault<z.ZodUnion<readonly [z.ZodNumber, z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>]>>;
    REDIS_PASSWORD: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    QUANTTRADE_BOT_BASE_URL: z.ZodDefault<z.ZodString>;
    QUANTTRADE_CONTROL_API_TOKEN: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    QUANTTRADE_SIGNAL_STREAM: z.ZodDefault<z.ZodString>;
    QUANTTRADE_PRICE_STREAM: z.ZodDefault<z.ZodString>;
    QUANTTRADE_CONSUMER_GROUP: z.ZodDefault<z.ZodString>;
    QUANTTRADE_CONSUMER_NAME: z.ZodOptional<z.ZodString>;
    QUANTTRADE_DLQ_STREAM: z.ZodDefault<z.ZodString>;
    QUANTTRADE_MAX_RETRIES: z.ZodDefault<z.ZodUnion<readonly [z.ZodNumber, z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>]>>;
    QUANTTRADE_AUTO_EXECUTION_ENABLED: z.ZodDefault<z.ZodUnion<readonly [z.ZodBoolean, z.ZodPipe<z.ZodEnum<{
        0: "0";
        1: "1";
        true: "true";
        false: "false";
    }>, z.ZodTransform<boolean, "0" | "1" | "true" | "false">>]>>;
    QUANTTRADE_LIMIT_ORDER_TIMEOUT_MS: z.ZodDefault<z.ZodUnion<readonly [z.ZodNumber, z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>]>>;
    QUANTTRADE_HEARTBEAT_TIMEOUT_SEC: z.ZodDefault<z.ZodUnion<readonly [z.ZodNumber, z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>]>>;
    QUANTTRADE_ORDER_TYPE: z.ZodDefault<z.ZodLiteral<"LIMIT">>;
    QUANTTRADE_SYMBOL_EXCLUSIVITY_ENABLED: z.ZodDefault<z.ZodUnion<readonly [z.ZodBoolean, z.ZodPipe<z.ZodEnum<{
        0: "0";
        1: "1";
        true: "true";
        false: "false";
    }>, z.ZodTransform<boolean, "0" | "1" | "true" | "false">>]>>;
    QUANTTRADE_LOG_LEVEL: z.ZodDefault<z.ZodEnum<{
        error: "error";
        debug: "debug";
        info: "info";
        warn: "warn";
    }>>;
}, z.core.$strip>;
export type QuanttradeBackendEnv = z.infer<typeof QuanttradeBackendEnvSchema>;
/**
 * Signal Worker Environment Validation Schema
 */
export declare const QuanttradeWorkerEnvSchema: z.ZodObject<{
    NODE_ENV: z.ZodDefault<z.ZodEnum<{
        development: "development";
        develop: "develop";
        production: "production";
        test: "test";
    }>>;
    PORT: z.ZodDefault<z.ZodUnion<readonly [z.ZodNumber, z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>]>>;
    HOST: z.ZodDefault<z.ZodString>;
    LOG_LEVEL: z.ZodDefault<z.ZodEnum<{
        error: "error";
        debug: "debug";
        info: "info";
        warn: "warn";
        trace: "trace";
        fatal: "fatal";
    }>>;
    CONTROL_API_TOKEN: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    QUANTTRADE_CONTROL_API_TOKEN: z.ZodOptional<z.ZodString>;
    FCOM_BASE_URL: z.ZodString;
    FCOM_WS_URL: z.ZodString;
    REDIS_URL: z.ZodString;
    AUTO_START_BOTS: z.ZodDefault<z.ZodUnion<readonly [z.ZodBoolean, z.ZodPipe<z.ZodEnum<{
        0: "0";
        1: "1";
        true: "true";
        false: "false";
    }>, z.ZodTransform<boolean, "0" | "1" | "true" | "false">>]>>;
    QUANTTRADE_BOT_AUTO_START_ENABLED: z.ZodOptional<z.ZodUnion<readonly [z.ZodBoolean, z.ZodPipe<z.ZodEnum<{
        0: "0";
        1: "1";
        true: "true";
        false: "false";
    }>, z.ZodTransform<boolean, "0" | "1" | "true" | "false">>]>>;
    WORKER_ONLY: z.ZodDefault<z.ZodUnion<[z.ZodLiteral<true>, z.ZodPipe<z.ZodEnum<{
        true: "true";
    }>, z.ZodTransform<boolean, "true">>]>>;
    AUTO_EXECUTE: z.ZodDefault<z.ZodUnion<[z.ZodLiteral<false>, z.ZodPipe<z.ZodEnum<{
        false: "false";
    }>, z.ZodTransform<boolean, "false">>]>>;
    QUANTTRADE_SIGNAL_STREAM: z.ZodDefault<z.ZodString>;
    QUANTTRADE_PRICE_STREAM: z.ZodDefault<z.ZodString>;
    PRICE_TICK_PUBLISH_ENABLED: z.ZodDefault<z.ZodUnion<readonly [z.ZodBoolean, z.ZodPipe<z.ZodEnum<{
        0: "0";
        1: "1";
        true: "true";
        false: "false";
    }>, z.ZodTransform<boolean, "0" | "1" | "true" | "false">>]>>;
    PRICE_TICK_MIN_INTERVAL_MS: z.ZodDefault<z.ZodUnion<readonly [z.ZodNumber, z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>]>>;
    PRICE_TICK_MIN_PRICE_CHANGE: z.ZodDefault<z.ZodUnion<readonly [z.ZodNumber, z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>]>>;
    SIGNAL_CONTRACT_SERVICE: z.ZodDefault<z.ZodString>;
    SIGNAL_CONTRACT_INSTANCE_ID: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    SIGNAL_CONTRACT_STRATEGY_VERSION: z.ZodDefault<z.ZodString>;
    QUANTTRADE_ORDER_TYPE: z.ZodDefault<z.ZodLiteral<"LIMIT">>;
    QUANTTRADE_SYMBOL_EXCLUSIVITY_ENABLED: z.ZodDefault<z.ZodUnion<readonly [z.ZodBoolean, z.ZodPipe<z.ZodEnum<{
        0: "0";
        1: "1";
        true: "true";
        false: "false";
    }>, z.ZodTransform<boolean, "0" | "1" | "true" | "false">>]>>;
}, z.core.$strip>;
export type QuanttradeWorkerEnv = z.infer<typeof QuanttradeWorkerEnvSchema>;
/**
 * Client Public Environment Validation Schema (NO SECRETS PERMITTED)
 */
export declare const QuanttradeClientEnvSchema: z.ZodObject<{
    VITE_API_ENDPOINT: z.ZodString;
    VITE_WS_ENDPOINT: z.ZodString;
    VITE_SIGNAL_PLATFORM_URL: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type QuanttradeClientEnv = z.infer<typeof QuanttradeClientEnvSchema>;
//# sourceMappingURL=env.schema.d.ts.map