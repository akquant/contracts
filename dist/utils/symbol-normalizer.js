"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeCommoditySymbol = normalizeCommoditySymbol;
/**
 * Canonical Commodity Symbol Normalizer.
 * Fixes common typos like C0 -> CO, strips whitespaces, and converts to uppercase.
 */
function normalizeCommoditySymbol(raw) {
    if (!raw)
        return '';
    return raw.trim().toUpperCase().replace(/C0/g, 'CO');
}
//# sourceMappingURL=symbol-normalizer.js.map