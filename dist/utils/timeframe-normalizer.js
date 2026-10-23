"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeResolution = normalizeResolution;
exports.normalizeTimeframe = normalizeTimeframe;
exports.formatTimeframeDisplay = formatTimeframeDisplay;
const resolutions_1 = require("../constants/resolutions");
/** Normalize any incoming timeframe or resolution to canonical engine resolution string ('15', '60', etc.) */
function normalizeResolution(tfOrRes) {
    return (0, resolutions_1.toCanonicalResolution)(tfOrRes);
}
/** Normalize any incoming timeframe or resolution to canonical UI timeframe string ('15m', '1h', etc.) */
function normalizeTimeframe(tfOrRes) {
    return (0, resolutions_1.toCanonicalTimeframe)(tfOrRes);
}
/**
 * Format a resolution or timeframe for display in the UI.
 * Handles '15' -> '15m', '60' -> '1h', '240' -> '4h', 'D' -> '1d'.
 */
function formatTimeframeDisplay(tfOrRes) {
    if (!tfOrRes)
        return '15m';
    const clean = tfOrRes.trim();
    if (clean in resolutions_1.RESOLUTION_TO_TIMEFRAME) {
        return resolutions_1.RESOLUTION_TO_TIMEFRAME[clean];
    }
    return (0, resolutions_1.toCanonicalTimeframe)(clean);
}
//# sourceMappingURL=timeframe-normalizer.js.map