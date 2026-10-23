/**
 * Canonical Commodity Contract Metadata and Order Hard-Guard Specifications.
 */

export const QUANTTRADE_PERMITTED_ORDER_TYPES = ['LIMIT'] as const;
export type QuanttradePermittedOrderType = (typeof QUANTTRADE_PERMITTED_ORDER_TYPES)[number];

export const QUANTTRADE_DEFAULT_ORDER_TYPE: QuanttradePermittedOrderType = 'LIMIT';

export interface CommodityContractSpec {
  symbol: string;
  baseSymbol: string;
  nameVi: string;
  group: 'Kim Loại' | 'Năng Lượng' | 'Nông Sản' | 'Nguyên Liệu';
  tickSize: number;
  tickValueUsd: number;
  currency: 'USD';
}

export const COMMODITY_CONTRACTS_SPEC: CommodityContractSpec[] = [
  { symbol: 'SI5COU26', baseSymbol: 'SI5C', nameVi: 'Bạc Nano Micro (SI5C)', group: 'Kim Loại', tickSize: 0.005, tickValueUsd: 5.0, currency: 'USD' },
  { symbol: 'SI5COZ26', baseSymbol: 'SI5C', nameVi: 'Bạc Micro Dec 2026', group: 'Kim Loại', tickSize: 0.005, tickValueUsd: 5.0, currency: 'USD' },
  { symbol: 'SI5COF27', baseSymbol: 'SI5C', nameVi: 'Bạc Micro Jan 2027', group: 'Kim Loại', tickSize: 0.005, tickValueUsd: 5.0, currency: 'USD' },
  { symbol: 'CLE0632', baseSymbol: 'CLE', nameVi: 'Dầu WTI Tiêu Chuẩn (CLE)', group: 'Năng Lượng', tickSize: 0.01, tickValueUsd: 10.0, currency: 'USD' },
  { symbol: 'PL1NYF27', baseSymbol: 'PL', nameVi: 'Bạch Kim NYMEX (PL)', group: 'Kim Loại', tickSize: 0.1, tickValueUsd: 5.0, currency: 'USD' },
  { symbol: 'ZSEU26', baseSymbol: 'ZSE', nameVi: 'Đậu Tương CBOT (ZSE)', group: 'Nông Sản', tickSize: 0.25, tickValueUsd: 12.5, currency: 'USD' },
  { symbol: 'CP2COZ26', baseSymbol: 'CP2', nameVi: 'Đồng Micro Dec 2026', group: 'Kim Loại', tickSize: 0.0005, tickValueUsd: 12.5, currency: 'USD' },
];

export const DEFAULT_VND_USD_RATE = 25450;
