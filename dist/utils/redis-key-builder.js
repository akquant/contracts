"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuanttradeRedisKeys = void 0;
const redis_1 = require("../constants/redis");
const symbol_normalizer_1 = require("./symbol-normalizer");
/**
 * Quanttrade Canonical Redis Key Builder Helper.
 * Both Backend and Worker MUST use this helper to guarantee key formula consistency.
 */
exports.QuanttradeRedisKeys = {
    /** Distributed mutex lock key scoped per trading account and symbol */
    lockSymbol(accountId, symbol) {
        const normSym = (0, symbol_normalizer_1.normalizeCommoditySymbol)(symbol);
        return `${redis_1.QUANTTRADE_KEY_PREFIXES.LOCK_SYMBOL}${accountId}:${normSym}`;
    },
    /** Active symbol binding key scoped per trading account and symbol */
    activeSymbol(accountId, symbol) {
        const normSym = (0, symbol_normalizer_1.normalizeCommoditySymbol)(symbol);
        return `${redis_1.QUANTTRADE_KEY_PREFIXES.ACTIVE_SYMBOL}${accountId}:${normSym}`;
    },
    /** Canonical persistent hash key storing active bot sessions */
    persistentSessions() {
        return redis_1.QUANTTRADE_KEY_PREFIXES.PERSISTENT_SESSIONS;
    },
    /** Legacy persistent sessions hash key (for migration/dual-read) */
    legacyPersistentSessions() {
        return redis_1.QUANTTRADE_KEY_PREFIXES.LEGACY_PERSISTENT_SESSIONS;
    },
    /** Signal idempotency deduplication key */
    idempotencySignal(signalId) {
        return `${redis_1.QUANTTRADE_KEY_PREFIXES.IDEMPOTENCY_SIGNAL}${signalId}`;
    },
    /** Worker heartbeat TTL key */
    heartbeatWorker(workerId) {
        return `${redis_1.QUANTTRADE_KEY_PREFIXES.HEARTBEAT_WORKER}${workerId}`;
    },
    /** Pub/sub command channel */
    commandsChannel() {
        return redis_1.QUANTTRADE_CHANNELS.COMMANDS;
    },
    /** Pub/sub event channel */
    eventsChannel() {
        return redis_1.QUANTTRADE_CHANNELS.EVENTS;
    },
    /** Canonical signal stream key */
    signalStream() {
        return redis_1.QUANTTRADE_STREAMS.SIGNAL;
    },
    /** Canonical price stream key */
    priceStream() {
        return redis_1.QUANTTRADE_STREAMS.PRICE;
    },
    /** Dead letter queue stream key */
    dlqStream() {
        return redis_1.QUANTTRADE_STREAMS.DLQ;
    },
    /** USD/VND exchange rate Redis key */
    fxUsdVnd() {
        return redis_1.QUANTTRADE_KEY_PREFIXES.FX_USD_VND;
    },
};
//# sourceMappingURL=redis-key-builder.js.map