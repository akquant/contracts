import {
  QUANTTRADE_KEY_PREFIXES,
  QUANTTRADE_CHANNELS,
  QUANTTRADE_STREAMS,
} from '../constants/redis';
import { normalizeCommoditySymbol } from './symbol-normalizer';

/**
 * Quanttrade Canonical Redis Key Builder Helper.
 * Both Backend and Worker MUST use this helper to guarantee key formula consistency.
 */
export const QuanttradeRedisKeys = {
  /** Distributed mutex lock key scoped per trading account and symbol */
  lockSymbol(accountId: string, symbol: string): string {
    const normSym = normalizeCommoditySymbol(symbol);
    return `${QUANTTRADE_KEY_PREFIXES.LOCK_SYMBOL}${accountId}:${normSym}`;
  },

  /** Active symbol binding key scoped per trading account and symbol */
  activeSymbol(accountId: string, symbol: string): string {
    const normSym = normalizeCommoditySymbol(symbol);
    return `${QUANTTRADE_KEY_PREFIXES.ACTIVE_SYMBOL}${accountId}:${normSym}`;
  },

  /** Canonical persistent hash key storing active bot sessions */
  persistentSessions(): string {
    return QUANTTRADE_KEY_PREFIXES.PERSISTENT_SESSIONS;
  },

  /** Legacy persistent sessions hash key (for migration/dual-read) */
  legacyPersistentSessions(): string {
    return QUANTTRADE_KEY_PREFIXES.LEGACY_PERSISTENT_SESSIONS;
  },

  /** Signal idempotency deduplication key */
  idempotencySignal(signalId: string): string {
    return `${QUANTTRADE_KEY_PREFIXES.IDEMPOTENCY_SIGNAL}${signalId}`;
  },

  /** Worker heartbeat TTL key */
  heartbeatWorker(workerId: string): string {
    return `${QUANTTRADE_KEY_PREFIXES.HEARTBEAT_WORKER}${workerId}`;
  },

  /** Pub/sub command channel */
  commandsChannel(): string {
    return QUANTTRADE_CHANNELS.COMMANDS;
  },

  /** Pub/sub event channel */
  eventsChannel(): string {
    return QUANTTRADE_CHANNELS.EVENTS;
  },

  /** Canonical signal stream key */
  signalStream(): string {
    return QUANTTRADE_STREAMS.SIGNAL;
  },

  /** Canonical price stream key */
  priceStream(): string {
    return QUANTTRADE_STREAMS.PRICE;
  },

  /** Dead letter queue stream key */
  dlqStream(): string {
    return QUANTTRADE_STREAMS.DLQ;
  },

  /** USD/VND exchange rate Redis key */
  fxUsdVnd(): string {
    return QUANTTRADE_KEY_PREFIXES.FX_USD_VND;
  },
};
