/**
 * Quanttrade Canonical Redis Key Builder Helper.
 * Both Backend and Worker MUST use this helper to guarantee key formula consistency.
 */
export declare const QuanttradeRedisKeys: {
    /** Distributed mutex lock key scoped per trading account and symbol */
    lockSymbol(accountId: string, symbol: string): string;
    /** Active symbol binding key scoped per trading account and symbol */
    activeSymbol(accountId: string, symbol: string): string;
    /** Canonical persistent hash key storing active bot sessions */
    persistentSessions(): string;
    /** Legacy persistent sessions hash key (for migration/dual-read) */
    legacyPersistentSessions(): string;
    /** Signal idempotency deduplication key */
    idempotencySignal(signalId: string): string;
    /** Worker heartbeat TTL key */
    heartbeatWorker(workerId: string): string;
    /** Pub/sub command channel */
    commandsChannel(): string;
    /** Pub/sub event channel */
    eventsChannel(): string;
    /** Canonical signal stream key */
    signalStream(): string;
    /** Canonical price stream key */
    priceStream(): string;
    /** Dead letter queue stream key */
    dlqStream(): string;
    /** USD/VND exchange rate Redis key */
    fxUsdVnd(): string;
};
//# sourceMappingURL=redis-key-builder.d.ts.map