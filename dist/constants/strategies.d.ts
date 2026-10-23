/**
 * Canonical Strategy Definitions, Release Status, and Legacy Aliases.
 * Single Source of Truth for Quanttrade strategies across Backend, Worker, and Client.
 */
export declare const CANONICAL_STRATEGY_IDS: readonly ["HftMicroScalpStrategy", "TrendFollowingStrategy", "MomentumStrategy", "MeanReversionStrategy", "CalendarSpreadStrategy", "HedgingStrategy", "SonicStrategy", "HgWeekly5TpStrategy", "PineScriptStrategy"];
export type CanonicalStrategyId = (typeof CANONICAL_STRATEGY_IDS)[number];
export type StrategyReleaseStatus = 'ACTIVE' | 'COMING_SOON' | 'DISABLED' | 'RETIRED';
export interface StrategyMetadata {
    id: CanonicalStrategyId;
    name: string;
    nameVi: string;
    category: 'CAO TẦN' | 'XU HƯỚNG' | 'ĐỘNG LƯỢNG' | 'HỒI QUY' | 'CHÊNH LỆCH' | 'PHÒNG HỘ' | 'TÙY BIẾN';
    recommendedSymbols: string[];
    timeframes: string[];
    winRateEstimate: string;
    releaseStatus: StrategyReleaseStatus;
    description: string;
}
export declare const STRATEGY_METADATA_REGISTRY: Record<CanonicalStrategyId, StrategyMetadata>;
/**
 * Backward-compatible strategy aliases mapping legacy identifiers to canonical strategy names.
 */
export declare const STRATEGY_LEGACY_MAPPING: Record<string, CanonicalStrategyId>;
/** Find canonical strategy ID or return null if unknown */
export declare function findCanonicalStrategyId(raw?: string): CanonicalStrategyId | null;
/** Resolve any raw or legacy strategy string into canonical strategy ID with fallback */
export declare function getCanonicalStrategyId(raw?: string, fallback?: CanonicalStrategyId): CanonicalStrategyId;
/** Check if strategy is officially released and active (returns false for unknown strategies) */
export declare function isStrategyActive(strategyId?: string): boolean;
/** Get list of currently active strategy IDs */
export declare function getActiveStrategyIds(): CanonicalStrategyId[];
//# sourceMappingURL=strategies.d.ts.map