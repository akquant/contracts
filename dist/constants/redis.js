"use strict";
/**
 * Canonical Redis Keys, Streams, Consumer Groups, and Channels.
 * All Quanttrade Redis assets MUST use canonical prefix 'quanttrade:'.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.QUANTTRADE_CHANNELS = exports.QUANTTRADE_KEY_PREFIXES = exports.QUANTTRADE_CONSUMER_GROUPS = exports.QUANTTRADE_STREAMS = exports.QUANTTRADE_REDIS_PREFIX = void 0;
exports.QUANTTRADE_REDIS_PREFIX = 'quanttrade:';
exports.QUANTTRADE_STREAMS = {
    SIGNAL: 'quanttrade.bot.events',
    PRICE: 'quanttrade.bot.prices',
    DLQ: 'quanttrade.dlq.signal.created',
};
exports.QUANTTRADE_CONSUMER_GROUPS = {
    EVENTS: 'quanttrade:group:events',
};
exports.QUANTTRADE_KEY_PREFIXES = {
    LOCK_SYMBOL: 'quanttrade:lock:symbol:',
    ACTIVE_SYMBOL: 'quanttrade:active_symbol:',
    PERSISTENT_SESSIONS: 'quanttrade:sessions:persistent',
    LEGACY_PERSISTENT_SESSIONS: 'phoenix:bot:goods:persistent_sessions',
    IDEMPOTENCY_SIGNAL: 'quanttrade:idempotency:signal:',
    HEARTBEAT_WORKER: 'quanttrade:heartbeat:worker:',
};
exports.QUANTTRADE_CHANNELS = {
    COMMANDS: 'quanttrade:bot:commands',
    EVENTS: 'quanttrade:bot:events',
};
//# sourceMappingURL=redis.js.map