/**
 * Canonical Commodity Contract Metadata and Order Hard-Guard Specifications.
 */
export declare const QUANTTRADE_PERMITTED_ORDER_TYPES: readonly ["LIMIT"];
export type QuanttradePermittedOrderType = (typeof QUANTTRADE_PERMITTED_ORDER_TYPES)[number];
export declare const QUANTTRADE_DEFAULT_ORDER_TYPE: QuanttradePermittedOrderType;
export interface CommodityContractSpec {
    symbol: string;
    baseSymbol: string;
    nameVi: string;
    group: 'Kim Loại' | 'Năng Lượng' | 'Nông Sản' | 'Nguyên Liệu';
    tickSize: number;
    tickValueUsd: number;
    currency: 'USD';
}
export declare const COMMODITY_CONTRACTS_SPEC: CommodityContractSpec[];
export declare const DEFAULT_VND_USD_RATE = 25450;
//# sourceMappingURL=contracts.d.ts.map