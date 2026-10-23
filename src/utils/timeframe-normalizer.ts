import {
  toCanonicalResolution,
  toCanonicalTimeframe,
  RESOLUTION_TO_TIMEFRAME,
  CanonicalResolution,
  CanonicalTimeframe,
} from '../constants/resolutions';

/** Normalize any incoming timeframe or resolution to canonical engine resolution string ('15', '60', etc.) */
export function normalizeResolution(tfOrRes?: string): CanonicalResolution {
  return toCanonicalResolution(tfOrRes);
}

/** Normalize any incoming timeframe or resolution to canonical UI timeframe string ('15m', '1h', etc.) */
export function normalizeTimeframe(tfOrRes?: string): CanonicalTimeframe {
  return toCanonicalTimeframe(tfOrRes);
}

/**
 * Format a resolution or timeframe for display in the UI.
 * Handles '15' -> '15m', '60' -> '1h', '240' -> '4h', 'D' -> '1d'.
 */
export function formatTimeframeDisplay(tfOrRes?: string): string {
  if (!tfOrRes) return '15m';
  const clean = tfOrRes.trim();
  if (clean in RESOLUTION_TO_TIMEFRAME) {
    return RESOLUTION_TO_TIMEFRAME[clean as CanonicalResolution];
  }
  return toCanonicalTimeframe(clean);
}
