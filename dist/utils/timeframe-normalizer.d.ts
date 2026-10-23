import { CanonicalResolution, CanonicalTimeframe } from '../constants/resolutions';
/** Normalize any incoming timeframe or resolution to canonical engine resolution string ('15', '60', etc.) */
export declare function normalizeResolution(tfOrRes?: string): CanonicalResolution;
/** Normalize any incoming timeframe or resolution to canonical UI timeframe string ('15m', '1h', etc.) */
export declare function normalizeTimeframe(tfOrRes?: string): CanonicalTimeframe;
/**
 * Format a resolution or timeframe for display in the UI.
 * Handles '15' -> '15m', '60' -> '1h', '240' -> '4h', 'D' -> '1d'.
 */
export declare function formatTimeframeDisplay(tfOrRes?: string): string;
//# sourceMappingURL=timeframe-normalizer.d.ts.map