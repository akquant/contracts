"use strict";
/**
 * Canonical Commodity Contract Metadata and Order Hard-Guard Specifications.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_VND_USD_RATE = exports.COMMODITY_CONTRACTS_SPEC = exports.QUANTTRADE_DEFAULT_ORDER_TYPE = exports.QUANTTRADE_PERMITTED_ORDER_TYPES = void 0;
exports.QUANTTRADE_PERMITTED_ORDER_TYPES = ['LIMIT'];
exports.QUANTTRADE_DEFAULT_ORDER_TYPE = 'LIMIT';
exports.COMMODITY_CONTRACTS_SPEC = [
    { symbol: 'SI5COU26', baseSymbol: 'SI5C', nameVi: 'Bạc Nano Micro (SI5C)', group: 'Kim Loại', tickSize: 0.005, tickValueUsd: 5.0, currency: 'USD' },
    { symbol: 'SI5COZ26', baseSymbol: 'SI5C', nameVi: 'Bạc Micro Dec 2026', group: 'Kim Loại', tickSize: 0.005, tickValueUsd: 5.0, currency: 'USD' },
    { symbol: 'SI5COF27', baseSymbol: 'SI5C', nameVi: 'Bạc Micro Jan 2027', group: 'Kim Loại', tickSize: 0.005, tickValueUsd: 5.0, currency: 'USD' },
    { symbol: 'CLE0632', baseSymbol: 'CLE', nameVi: 'Dầu WTI Tiêu Chuẩn (CLE)', group: 'Năng Lượng', tickSize: 0.01, tickValueUsd: 10.0, currency: 'USD' },
    { symbol: 'PL1NYF27', baseSymbol: 'PL', nameVi: 'Bạch Kim NYMEX (PL)', group: 'Kim Loại', tickSize: 0.1, tickValueUsd: 5.0, currency: 'USD' },
    { symbol: 'ZSEU26', baseSymbol: 'ZSE', nameVi: 'Đậu Tương CBOT (ZSE)', group: 'Nông Sản', tickSize: 0.25, tickValueUsd: 12.5, currency: 'USD' },
    { symbol: 'CP2COZ26', baseSymbol: 'CP2', nameVi: 'Đồng Micro Dec 2026', group: 'Kim Loại', tickSize: 0.0005, tickValueUsd: 12.5, currency: 'USD' },
];
exports.DEFAULT_VND_USD_RATE = 25450;
//# sourceMappingURL=contracts.js.map