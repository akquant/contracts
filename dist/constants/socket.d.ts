/**
 * Canonical Realtime WebSocket Events.
 */
export declare const QUANTTRADE_SOCKET_EVENTS: {
    readonly BOT_SESSION_CHANGED: "bot:session_changed";
    readonly BOT_SIGNAL: "bot:signal";
    readonly SIGNAL_CREATED: "signal:created";
    readonly PRICE_TICK: "price:tick";
    readonly SNAPSHOT: "snapshot";
    readonly BOT_ORDER: "bot:order";
    readonly BOT_ORDER_FILLED: "bot:order_filled";
    readonly BOT_ORDER_CANCELLED: "bot:order_cancelled";
    readonly BOT_POSITION_CLOSED: "bot:position_closed";
    readonly ORDER_CREATED: "order:created";
    readonly ALERT_CRITICAL: "alert:critical";
    readonly ALERT_HIGH: "alert:high";
};
export type QuanttradeSocketEvent = (typeof QUANTTRADE_SOCKET_EVENTS)[keyof typeof QUANTTRADE_SOCKET_EVENTS];
//# sourceMappingURL=socket.d.ts.map