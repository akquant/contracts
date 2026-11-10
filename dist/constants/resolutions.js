"use strict";
/**
 * Canonical Resolution and Timeframe Mappings.
 *
 * Workers use engine resolution ('1', '5', '15', '30', '60', '240', 'D').
 * Client UI uses human timeframes ('1m', '5m', '15m', '30m', '1h', '4h', '1d').
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TIMEFRAME_TO_RESOLUTION = exports.STRICT_TIMEFRAME_MAP = exports.RESOLUTION_TO_TIMEFRAME = exports.CANONICAL_TIMEFRAMES = exports.CANONICAL_RESOLUTIONS = void 0;
exports.parseStrictCanonicalTimeframe = parseStrictCanonicalTimeframe;
exports.toCanonicalResolution = toCanonicalResolution;
exports.toCanonicalTimeframe = toCanonicalTimeframe;
exports.CANONICAL_RESOLUTIONS = ['1', '5', '15', '30', '60', '240', 'D'];
exports.CANONICAL_TIMEFRAMES = ['1m', '5m', '15m', '30m', '1h', '4h', '1d'];
exports.RESOLUTION_TO_TIMEFRAME = {
    '1': '1m',
    '5': '5m',
    '15': '15m',
    '30': '30m',
    '60': '1h',
    '240': '4h',
    D: '1d',
};
/** Strict mapping accepting only exact canonical tokens */
exports.STRICT_TIMEFRAME_MAP = {
    '1m': { timeframe: '1m', resolution: '1' },
    '1': { timeframe: '1m', resolution: '1' },
    '5m': { timeframe: '5m', resolution: '5' },
    '5': { timeframe: '5m', resolution: '5' },
    '15m': { timeframe: '15m', resolution: '15' },
    '15': { timeframe: '15m', resolution: '15' },
    '30m': { timeframe: '30m', resolution: '30' },
    '30': { timeframe: '30m', resolution: '30' },
    '1h': { timeframe: '1h', resolution: '60' },
    '1H': { timeframe: '1h', resolution: '60' },
    '60m': { timeframe: '1h', resolution: '60' },
    '60': { timeframe: '1h', resolution: '60' },
    '4h': { timeframe: '4h', resolution: '240' },
    '4H': { timeframe: '4h', resolution: '240' },
    '240m': { timeframe: '4h', resolution: '240' },
    '240': { timeframe: '4h', resolution: '240' },
    '1d': { timeframe: '1d', resolution: 'D' },
    '1D': { timeframe: '1d', resolution: 'D' },
    d: { timeframe: '1d', resolution: 'D' },
    D: { timeframe: '1d', resolution: 'D' },
    day: { timeframe: '1d', resolution: 'D' },
};
/**
 * Strictly parse a timeframe or resolution string.
 * Returns null if the input is empty, malformed, or not in canonical form.
 * Never silently coerces or defaults to '15'.
 */
function parseStrictCanonicalTimeframe(input) {
    if (!input || typeof input !== 'string')
        return null;
    const clean = input.trim();
    if (!clean)
        return null;
    return exports.STRICT_TIMEFRAME_MAP[clean] || null;
}
exports.TIMEFRAME_TO_RESOLUTION = {
    '1m': '1',
    '1': '1',
    '3m': '1',
    '5m': '5',
    '5': '5',
    '15m': '15',
    '15': '15',
    '30m': '30',
    '30': '30',
    '1h': '60',
    '60m': '60',
    '60': '60',
    '2h': '60',
    '4h': '240',
    '240m': '240',
    '240': '240',
    '1d': 'D',
    'd': 'D',
    'D': 'D',
    'day': 'D',
    '1w': 'D',
};
/** Normalize any incoming timeframe/resolution string to canonical resolution ('15', '60', etc.) */
function toCanonicalResolution(tfOrRes) {
    if (!tfOrRes)
        return '15';
    const clean = tfOrRes.trim().toLowerCase();
    return exports.TIMEFRAME_TO_RESOLUTION[clean] || '15';
}
/** Normalize any incoming timeframe/resolution string to canonical UI timeframe ('15m', '1h', etc.) */
function toCanonicalTimeframe(tfOrRes) {
    const res = toCanonicalResolution(tfOrRes);
    return exports.RESOLUTION_TO_TIMEFRAME[res] || '15m';
}
//# sourceMappingURL=resolutions.js.map