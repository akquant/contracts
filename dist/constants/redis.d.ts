/**
 * Canonical Redis Keys, Streams, Consumer Groups, and Channels.
 * All Quanttrade Redis assets MUST use canonical prefix 'quanttrade:'.
 */
export declare const QUANTTRADE_REDIS_PREFIX: "quanttrade:";
export declare const QUANTTRADE_STREAMS: {
    readonly SIGNAL: "quanttrade.bot.events";
    readonly PRICE: "quanttrade.bot.prices";
    readonly DLQ: "quanttrade.dlq.signal.created";
};
export declare const QUANTTRADE_CONSUMER_GROUPS: {
    readonly EVENTS: "quanttrade:group:events";
};
export declare const QUANTTRADE_KEY_PREFIXES: {
    readonly LOCK_SYMBOL: "quanttrade:lock:symbol:";
    readonly ACTIVE_SYMBOL: "quanttrade:active_symbol:";
    readonly PERSISTENT_SESSIONS: "quanttrade:sessions:persistent";
    readonly LEGACY_PERSISTENT_SESSIONS: "phoenix:bot:goods:persistent_sessions";
    readonly IDEMPOTENCY_SIGNAL: "quanttrade:idempotency:signal:";
    readonly HEARTBEAT_WORKER: "quanttrade:heartbeat:worker:";
    readonly CLAIM_CLOSE: "quanttrade:claim:close:";
    readonly TRAILING_STATE: "quanttrade:trailing_state:";
};
export declare const QUANTTRADE_CHANNELS: {
    readonly COMMANDS: "quanttrade:bot:commands";
    readonly EVENTS: "quanttrade:bot:events";
};
//# sourceMappingURL=redis.d.ts.map