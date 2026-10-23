/**
 * Canonical Resolution and Timeframe Mappings.
 *
 * Workers use engine resolution ('1', '5', '15', '30', '60', '240', 'D').
 * Client UI uses human timeframes ('1m', '5m', '15m', '30m', '1h', '4h', '1d').
 */
export declare const CANONICAL_RESOLUTIONS: readonly ["1", "5", "15", "30", "60", "240", "D"];
export type CanonicalResolution = (typeof CANONICAL_RESOLUTIONS)[number];
export declare const CANONICAL_TIMEFRAMES: readonly ["1m", "5m", "15m", "30m", "1h", "4h", "1d"];
export type CanonicalTimeframe = (typeof CANONICAL_TIMEFRAMES)[number];
export declare const RESOLUTION_TO_TIMEFRAME: Record<CanonicalResolution, CanonicalTimeframe>;
export declare const TIMEFRAME_TO_RESOLUTION: Record<string, CanonicalResolution>;
/** Normalize any incoming timeframe/resolution string to canonical resolution ('15', '60', etc.) */
export declare function toCanonicalResolution(tfOrRes?: string): CanonicalResolution;
/** Normalize any incoming timeframe/resolution string to canonical UI timeframe ('15m', '1h', etc.) */
export declare function toCanonicalTimeframe(tfOrRes?: string): CanonicalTimeframe;
//# sourceMappingURL=resolutions.d.ts.map