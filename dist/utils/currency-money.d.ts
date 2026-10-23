import { CurrencyCode } from '../enums/currency.enum';
export declare const ISO_4217_COMMONLY_SUPPORTED: Set<string>;
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
export declare function isValidCurrencyCode(code?: string): boolean;
/** Check if FX rate is stale */
export declare function isFxRateStale(record: FxRateRecord, nowMs?: number): boolean;
/** Format monetary value with currency string, or return '---' if currency is missing */
export declare function formatMoneyWithCurrency(amount?: number | null, currency?: string): string;
//# sourceMappingURL=currency-money.d.ts.map