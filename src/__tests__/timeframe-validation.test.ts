import { describe, expect, it } from 'vitest';
import {
  parseStrictCanonicalTimeframe,
  validateStrategyTimeframe,
  getStrategySupportedTimeframes,
  getStrategySupportedResolutions,
  getStrategyDefaultTimeframe,
  STRATEGY_METADATA_REGISTRY,
} from '../index';

describe('Strict Timeframe Parsing & Strategy Validation', () => {
  it('parses exact canonical timeframes correctly', () => {
    expect(parseStrictCanonicalTimeframe('1m')).toEqual({ timeframe: '1m', resolution: '1' });
    expect(parseStrictCanonicalTimeframe('1')).toEqual({ timeframe: '1m', resolution: '1' });
    expect(parseStrictCanonicalTimeframe('5m')).toEqual({ timeframe: '5m', resolution: '5' });
    expect(parseStrictCanonicalTimeframe('5')).toEqual({ timeframe: '5m', resolution: '5' });
    expect(parseStrictCanonicalTimeframe('15m')).toEqual({ timeframe: '15m', resolution: '15' });
    expect(parseStrictCanonicalTimeframe('15')).toEqual({ timeframe: '15m', resolution: '15' });
    expect(parseStrictCanonicalTimeframe('1h')).toEqual({ timeframe: '1h', resolution: '60' });
    expect(parseStrictCanonicalTimeframe('60')).toEqual({ timeframe: '1h', resolution: '60' });
    expect(parseStrictCanonicalTimeframe('4h')).toEqual({ timeframe: '4h', resolution: '240' });
    expect(parseStrictCanonicalTimeframe('240')).toEqual({ timeframe: '4h', resolution: '240' });
    expect(parseStrictCanonicalTimeframe('1d')).toEqual({ timeframe: '1d', resolution: 'D' });
    expect(parseStrictCanonicalTimeframe('D')).toEqual({ timeframe: '1d', resolution: 'D' });
  });

  it('rejects invalid or non-canonical timeframes without fallback', () => {
    expect(parseStrictCanonicalTimeframe('')).toBeNull();
    expect(parseStrictCanonicalTimeframe('   ')).toBeNull();
    expect(parseStrictCanonicalTimeframe('invalid')).toBeNull();
    expect(parseStrictCanonicalTimeframe('99m')).toBeNull();
    // Non-canonical inputs that must NOT silently coerce
    expect(parseStrictCanonicalTimeframe('3m')).toBeNull();
    expect(parseStrictCanonicalTimeframe('45m')).toBeNull();
    expect(parseStrictCanonicalTimeframe('2h')).toBeNull();
    expect(parseStrictCanonicalTimeframe('3h')).toBeNull();
    expect(parseStrictCanonicalTimeframe('1w')).toBeNull();
    expect(parseStrictCanonicalTimeframe('1M')).toBeNull();
  });

  it('validates HftMicroScalpStrategy supported timeframes (1m, 5m, 15m only)', () => {
    const supported = getStrategySupportedTimeframes('HftMicroScalpStrategy');
    expect(supported).toEqual(['1m', '5m', '15m']);

    const validRes = validateStrategyTimeframe('HftMicroScalpStrategy', '1m');
    expect(validRes.valid).toBe(true);
    expect(validRes.canonicalTimeframe).toBe('1m');
    expect(validRes.canonicalResolution).toBe('1');

    const validRes5 = validateStrategyTimeframe('HftMicroScalpStrategy', '5');
    expect(validRes5.valid).toBe(true);
    expect(validRes5.canonicalTimeframe).toBe('5m');

    const invalidRes1h = validateStrategyTimeframe('HftMicroScalpStrategy', '1h');
    expect(invalidRes1h.valid).toBe(false);
    expect(invalidRes1h.code).toBe('UNSUPPORTED_STRATEGY_TIMEFRAME');
    expect(invalidRes1h.supportedTimeframes).toEqual(['1m', '5m', '15m']);

    const invalidRes4h = validateStrategyTimeframe('HftMicroScalpStrategy', '240');
    expect(invalidRes4h.valid).toBe(false);
    expect(invalidRes4h.code).toBe('UNSUPPORTED_STRATEGY_TIMEFRAME');

    const invalidRes30m = validateStrategyTimeframe('HftMicroScalpStrategy', '30m');
    expect(invalidRes30m.valid).toBe(false);
    expect(invalidRes30m.code).toBe('UNSUPPORTED_STRATEGY_TIMEFRAME');
  });

  it('validates TrendFollowingStrategy and MomentumStrategy supported timeframes', () => {
    const tfTrend = getStrategySupportedTimeframes('TrendFollowingStrategy');
    expect(tfTrend).toEqual(['5m', '15m', '1h', '4h', '1d']);

    expect(validateStrategyTimeframe('TrendFollowingStrategy', '5m').valid).toBe(true);
    expect(validateStrategyTimeframe('TrendFollowingStrategy', '15m').valid).toBe(true);
    expect(validateStrategyTimeframe('TrendFollowingStrategy', '1h').valid).toBe(true);
    expect(validateStrategyTimeframe('TrendFollowingStrategy', '4h').valid).toBe(true);
    expect(validateStrategyTimeframe('TrendFollowingStrategy', '1d').valid).toBe(true);

    const invalid1m = validateStrategyTimeframe('TrendFollowingStrategy', '1m');
    expect(invalid1m.valid).toBe(false);
    expect(invalid1m.code).toBe('UNSUPPORTED_STRATEGY_TIMEFRAME');
  });

  it('validates HgWeekly5TpStrategy supported timeframes', () => {
    const tfHg = getStrategySupportedTimeframes('HgWeekly5TpStrategy');
    expect(tfHg).toEqual(['15m', '1h', '4h', '1d']);
    expect(validateStrategyTimeframe('HgWeekly5TpStrategy', '15m').valid).toBe(true);
    expect(validateStrategyTimeframe('HgWeekly5TpStrategy', '5m').valid).toBe(false);
  });

  it('rejects unknown strategy', () => {
    const res = validateStrategyTimeframe('NonExistentStrategy', '15m');
    expect(res.valid).toBe(false);
    expect(res.code).toBe('UNKNOWN_STRATEGY');
  });
});
