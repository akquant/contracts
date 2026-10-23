import { CURRENCY_CODES, CurrencyCode } from '../enums/currency.enum';

export const ISO_4217_COMMONLY_SUPPORTED = new Set(['USD', 'VND', 'EUR', 'GBP', 'JPY', 'USDT']);

export interface MoneyValue {
  amount: number;
  currency: string;
}

export interface FxRateRecord {
  source: string;
  baseCurrency: CurrencyCode | string;
  quoteCurrency: CurrencyCode | string;
  rate: number;
  effectiveDate: string;
  fetchedAt: number;
  maxStalenessMs: number;
}

/** Check if currency conforms to ISO 4217 uppercase 3-letter code */
export function isValidCurrencyCode(code?: string): boolean {
  if (!code || typeof code !== 'string') return false;
  const upper = code.trim().toUpperCase();
  return upper.length === 3 || upper === 'USDT';
}

/** Check if FX rate is stale */
export function isFxRateStale(record: FxRateRecord, nowMs: number = Date.now()): boolean {
  if (!record || !record.fetchedAt || record.rate <= 0) return true;
  return nowMs - record.fetchedAt > record.maxStalenessMs;
}

/** Format monetary value with currency string, or return '---' if currency is missing */
export function formatMoneyWithCurrency(amount?: number | null, currency?: string): string {
  if (amount === undefined || amount === null || Number.isNaN(amount)) return '---';
  if (!currency || !isValidCurrencyCode(currency)) return '---';

  const upper = currency.toUpperCase();
  if (upper === 'VND') {
    return `${Math.round(amount).toLocaleString('vi-VN')} ₫`;
  }
  if (upper === 'USD') {
    return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
  return `${amount.toLocaleString()} ${upper}`;
}
