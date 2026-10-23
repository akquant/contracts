"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ISO_4217_COMMONLY_SUPPORTED = void 0;
exports.isValidCurrencyCode = isValidCurrencyCode;
exports.isFxRateStale = isFxRateStale;
exports.formatMoneyWithCurrency = formatMoneyWithCurrency;
exports.ISO_4217_COMMONLY_SUPPORTED = new Set(['USD', 'VND', 'EUR', 'GBP', 'JPY', 'USDT']);
/** Check if currency conforms to ISO 4217 uppercase 3-letter code */
function isValidCurrencyCode(code) {
    if (!code || typeof code !== 'string')
        return false;
    const upper = code.trim().toUpperCase();
    return upper.length === 3 || upper === 'USDT';
}
/** Check if FX rate is stale */
function isFxRateStale(record, nowMs = Date.now()) {
    if (!record || !record.fetchedAt || record.rate <= 0)
        return true;
    return nowMs - record.fetchedAt > record.maxStalenessMs;
}
/** Format monetary value with currency string, or return '---' if currency is missing */
function formatMoneyWithCurrency(amount, currency) {
    if (amount === undefined || amount === null || Number.isNaN(amount))
        return '---';
    if (!currency || !isValidCurrencyCode(currency))
        return '---';
    const upper = currency.toUpperCase();
    if (upper === 'VND') {
        return `${Math.round(amount).toLocaleString('vi-VN')} ₫`;
    }
    if (upper === 'USD') {
        return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    return `${amount.toLocaleString()} ${upper}`;
}
//# sourceMappingURL=currency-money.js.map