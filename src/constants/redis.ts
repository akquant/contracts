/**
 * Canonical Redis Keys, Streams, Consumer Groups, and Channels.
 * All Quanttrade Redis assets MUST use canonical prefix 'quanttrade:'.
 */

export const QUANTTRADE_REDIS_PREFIX = 'quanttrade:' as const;

export const QUANTTRADE_STREAMS = {
  SIGNAL: 'quanttrade.bot.events',
  PRICE: 'quanttrade.bot.prices',
  DLQ: 'quanttrade.dlq.signal.created',
} as const;

export const QUANTTRADE_CONSUMER_GROUPS = {
  EVENTS: 'quanttrade:group:events',
} as const;

export const QUANTTRADE_KEY_PREFIXES = {
  LOCK_SYMBOL: 'quanttrade:lock:symbol:',
  ACTIVE_SYMBOL: 'quanttrade:active_symbol:',
  PERSISTENT_SESSIONS: 'quanttrade:sessions:persistent',
  LEGACY_PERSISTENT_SESSIONS: 'phoenix:bot:goods:persistent_sessions',
  IDEMPOTENCY_SIGNAL: 'quanttrade:idempotency:signal:',
  HEARTBEAT_WORKER: 'quanttrade:heartbeat:worker:',
  CLAIM_CLOSE: 'quanttrade:claim:close:',
  TRAILING_STATE: 'quanttrade:trailing_state:',
} as const;

export const QUANTTRADE_CHANNELS = {
  COMMANDS: 'quanttrade:bot:commands',
  EVENTS: 'quanttrade:bot:events',
} as const;
