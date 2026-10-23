export const SIGNAL_ACTIONS = ['BUY', 'SELL', 'CLOSE'] as const;
export type SignalAction = (typeof SIGNAL_ACTIONS)[number];

export const ORDER_SIDES = ['BUY', 'SELL'] as const;
export type OrderSide = (typeof ORDER_SIDES)[number];

export const SIGNAL_MODES = ['LIVE', 'PAPER'] as const;
export type SignalMode = (typeof SIGNAL_MODES)[number];

export const SIGNAL_ENTRY_TYPES = ['MARKET', 'LIMIT', 'STOP'] as const;
export type SignalEntryType = (typeof SIGNAL_ENTRY_TYPES)[number];
