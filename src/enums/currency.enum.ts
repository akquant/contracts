export const CURRENCY_CODES = ['USD', 'VND', 'USDT'] as const;
export type CurrencyCode = (typeof CURRENCY_CODES)[number];
