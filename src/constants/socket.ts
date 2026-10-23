/**
 * Canonical Realtime WebSocket Events.
 */

export const QUANTTRADE_SOCKET_EVENTS = {
  // Session & Lifecycle
  BOT_SESSION_CHANGED: 'bot:session_changed',
  // Signals
  BOT_SIGNAL: 'bot:signal',
  SIGNAL_CREATED: 'signal:created',
  // Market Prices
  PRICE_TICK: 'price:tick',
  SNAPSHOT: 'snapshot',
  // Orders & Positions
  BOT_ORDER: 'bot:order',
  BOT_ORDER_FILLED: 'bot:order_filled',
  BOT_ORDER_CANCELLED: 'bot:order_cancelled',
  BOT_POSITION_CLOSED: 'bot:position_closed',
  ORDER_CREATED: 'order:created',
  // Reconciliation Alerts
  ALERT_CRITICAL: 'alert:critical',
  ALERT_HIGH: 'alert:high',
} as const;

export type QuanttradeSocketEvent =
  (typeof QUANTTRADE_SOCKET_EVENTS)[keyof typeof QUANTTRADE_SOCKET_EVENTS];
