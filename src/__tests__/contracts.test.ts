import { describe, it, expect } from 'vitest';
import {
  getCanonicalStrategyId,
  isStrategyActive,
  getActiveStrategyIds,
  CANONICAL_STRATEGY_IDS,
  toCanonicalResolution,
  toCanonicalTimeframe,
  formatTimeframeDisplay,
  QuanttradeRedisKeys,
  normalizeCommoditySymbol,
  StartBotSchema,
  QuanttradeBotOrderRequestSchema,
  SignalCreatedEnvelopeSchema,
  PriceTickPayloadSchema,
  QuanttradeBackendEnvSchema,
  QuanttradeWorkerEnvSchema,
  isValidCurrencyCode,
  isFxRateStale,
  formatMoneyWithCurrency,
  DynamicGridUserConfigSchema,
  DEFAULT_DYNAMIC_GRID_CONFIG,
  buildDynamicGridConfigSignature,
  RestartBotSchema,
} from '../index';

describe('@quanttrade/contracts Unit Test Suite', () => {
  describe('Strategy Registries and Legacy Mapping', () => {
    it('resolves active canonical strategies correctly', () => {
      expect(getCanonicalStrategyId('TrendFollowingStrategy')).toBe('TrendFollowingStrategy');
      expect(isStrategyActive('TrendFollowingStrategy')).toBe(true);
      expect(isStrategyActive('HftMicroScalpStrategy')).toBe(true);
      expect(isStrategyActive('MomentumStrategy')).toBe(true);
      expect(isStrategyActive('DynamicGridStrategy')).toBe(true);
    });

    it('identifies unreleased coming soon strategies', () => {
      expect(isStrategyActive('MeanReversionStrategy')).toBe(false);
      expect(isStrategyActive('CalendarSpreadStrategy')).toBe(false);
      expect(isStrategyActive('SonicStrategy')).toBe(false);
      expect(isStrategyActive('HgWeekly5TpStrategy')).toBe(false);
      expect(isStrategyActive('PineScriptStrategy')).toBe(false);
    });

    it('resolves legacy aliases to canonical strategies', () => {
      expect(getCanonicalStrategyId('ai_sniper')).toBe('TrendFollowingStrategy');
      expect(getCanonicalStrategyId('MARKET_MAKER')).toBe('HftMicroScalpStrategy');
      expect(getCanonicalStrategyId('GRID')).toBe('DynamicGridStrategy');
      expect(getCanonicalStrategyId('DYNAMIC_GRID')).toBe('DynamicGridStrategy');
      expect(getCanonicalStrategyId('ADAPTIVE_GRID')).toBe('DynamicGridStrategy');
      expect(getCanonicalStrategyId('SONIC')).toBe('SonicStrategy');
      expect(getCanonicalStrategyId('hg_weekly_5tp')).toBe('HgWeekly5TpStrategy');
      expect(getCanonicalStrategyId('PINESCRIPT')).toBe('PineScriptStrategy');
    });

    it('returns exact 4 active strategy IDs for current phase', () => {
      const active = getActiveStrategyIds();
      expect(active).toEqual([
        'HftMicroScalpStrategy',
        'TrendFollowingStrategy',
        'MomentumStrategy',
        'DynamicGridStrategy',
      ]);
    });
  });

  describe('Timeframe and Resolution Normalization', () => {
    it('normalizes timeframes to engine resolutions', () => {
      expect(toCanonicalResolution('15m')).toBe('15');
      expect(toCanonicalResolution('1h')).toBe('60');
      expect(toCanonicalResolution('60m')).toBe('60');
      expect(toCanonicalResolution('4h')).toBe('240');
      expect(toCanonicalResolution('1d')).toBe('D');
      expect(toCanonicalResolution('day')).toBe('D');
    });

    it('normalizes resolutions to UI timeframes', () => {
      expect(toCanonicalTimeframe('15')).toBe('15m');
      expect(toCanonicalTimeframe('60')).toBe('1h');
      expect(toCanonicalTimeframe('240')).toBe('4h');
      expect(toCanonicalTimeframe('D')).toBe('1d');
    });

    it('formats display labels accurately without raw minute errors like "60m"', () => {
      expect(formatTimeframeDisplay('60')).toBe('1h');
      expect(formatTimeframeDisplay('240')).toBe('4h');
      expect(formatTimeframeDisplay('D')).toBe('1d');
      expect(formatTimeframeDisplay('15')).toBe('15m');
    });
  });

  describe('Redis Key Builders & Symbol Normalizer', () => {
    it('normalizes commodity symbols', () => {
      expect(normalizeCommoditySymbol('si5c0z26')).toBe('SI5COZ26');
      expect(normalizeCommoditySymbol('  pl1nyf27  ')).toBe('PL1NYF27');
    });

    it('builds scoped distributed lock and active symbol keys consistently', () => {
      const acc = 'acc-123';
      const sym = 'si5c0z26';
      expect(QuanttradeRedisKeys.lockSymbol(acc, sym)).toBe('quanttrade:lock:symbol:acc-123:SI5COZ26');
      expect(QuanttradeRedisKeys.activeSymbol(acc, sym)).toBe('quanttrade:active_symbol:acc-123:SI5COZ26');
    });

    it('builds canonical streams and persistence keys', () => {
      expect(QuanttradeRedisKeys.signalStream()).toBe('quanttrade.bot.events');
      expect(QuanttradeRedisKeys.priceStream()).toBe('quanttrade.bot.prices');
      expect(QuanttradeRedisKeys.persistentSessions()).toBe('quanttrade:sessions:persistent');
      expect(QuanttradeRedisKeys.idempotencySignal('sig-999')).toBe('quanttrade:idempotency:signal:sig-999');
    });
  });

  describe('Order Type LIMIT Hard-Guard', () => {
    it('accepts LIMIT order requests', () => {
      const valid = QuanttradeBotOrderRequestSchema.safeParse({
        tradingAccountId: 'acc-1',
        symbol: 'SI5COZ26',
        side: 'BUY',
        type: 'LIMIT',
        price: 31.5,
        qty: 1,
      });
      expect(valid.success).toBe(true);
    });

    it('STRICTLY rejects MARKET order requests', () => {
      const invalid = QuanttradeBotOrderRequestSchema.safeParse({
        tradingAccountId: 'acc-1',
        symbol: 'SI5COZ26',
        side: 'BUY',
        type: 'MARKET',
        price: 31.5,
        qty: 1,
      });
      expect(invalid.success).toBe(false);
    });
  });

  describe('Canonical Signal Envelope Schema', () => {
    it('validates a complete signal created envelope', () => {
      const sample = {
        v: 1,
        eventId: 'evt-100',
        type: 'SIGNAL_CREATED',
        ts: Date.now(),
        producer: {
          service: 'fcom-signal-worker',
          instanceId: 'worker-1',
          sourceKey: 'TrendFollowingStrategy:SI5COZ26:15',
        },
        data: {
          signalId: 'sig-100',
          signalKey: 'TrendFollowingStrategy:SI5COZ26:15:1700000000000:BUY:ENTRY',
          sourceKey: 'TrendFollowingStrategy:SI5COZ26:15',
          symbol: 'SI5COZ26',
          timeframe: '15m',
          action: 'BUY',
          legKey: 'ENTRY',
          barCloseTs: 1700000000000,
          mode: 'LIVE',
          strategy: {
            name: 'TrendFollowingStrategy',
            version: '1.0.0',
          },
          entry: {
            type: 'LIMIT',
            price: 31.5,
          },
          emittedAt: Date.now(),
        },
      };

      const result = SignalCreatedEnvelopeSchema.safeParse(sample);
      expect(result.success).toBe(true);
    });

    it('rejects envelope with invalid contract version', () => {
      const invalid = {
        v: 2,
        eventId: 'evt-100',
        type: 'SIGNAL_CREATED',
        ts: Date.now(),
        producer: { service: 's', instanceId: 'i', sourceKey: 'sk' },
        data: {} as any,
      };
      const result = SignalCreatedEnvelopeSchema.safeParse(invalid);
      expect(result.success).toBe(false);
    });
  });

  describe('Environment Validation Schema', () => {
    it('validates valid backend env with default LIMIT order type', () => {
      const valid = QuanttradeBackendEnvSchema.safeParse({
        NODE_ENV: 'production',
        PORT: '4000',
        QUANTTRADE_BOT_BASE_URL: 'http://127.0.0.1:3002',
        QUANTTRADE_AUTO_EXECUTION_ENABLED: 'false',
        QUANTTRADE_LIMIT_ORDER_TIMEOUT_MS: '60000',
      });
      expect(valid.success).toBe(true);
      if (valid.success) {
        expect(valid.data.QUANTTRADE_ORDER_TYPE).toBe('LIMIT');
      }
    });

    it('fails fast if backend ORDER_TYPE is attempted to be changed to MARKET', () => {
      const invalid = QuanttradeBackendEnvSchema.safeParse({
        QUANTTRADE_ORDER_TYPE: 'MARKET',
      });
      expect(invalid.success).toBe(false);
    });

    it('validates worker env with WORKER_ONLY=true and AUTO_EXECUTE=false', () => {
      const valid = QuanttradeWorkerEnvSchema.safeParse({
        NODE_ENV: 'production',
        PORT: '3002',
        FCOM_BASE_URL: 'https://demo-trading.itp-tech.com.vn',
        FCOM_WS_URL: 'wss://demo-trading.itp-tech.com.vn',
        REDIS_URL: 'redis://localhost:6379',
        WORKER_ONLY: 'true',
        AUTO_EXECUTE: 'false',
      });
      expect(valid.success).toBe(true);
    });
  });

  describe('Currency & FX Configuration', () => {
    it('validates ISO 4217 currency codes', () => {
      expect(isValidCurrencyCode('USD')).toBe(true);
      expect(isValidCurrencyCode('VND')).toBe(true);
      expect(isValidCurrencyCode('USDT')).toBe(true);
      expect(isValidCurrencyCode('')).toBe(false);
      expect(isValidCurrencyCode('US')).toBe(false);
      expect(isValidCurrencyCode('DOLLARS')).toBe(false);
    });

    it('detects stale FX rates correctly', () => {
      const freshRecord = {
        source: 'vietcombank',
        baseCurrency: 'USD',
        quoteCurrency: 'VND',
        rate: 25450,
        effectiveDate: '2026-10-23',
        fetchedAt: Date.now() - 5000,
        maxStalenessMs: 60000,
      };
      expect(isFxRateStale(freshRecord)).toBe(false);

      const staleRecord = {
        ...freshRecord,
        fetchedAt: Date.now() - 120000,
      };
      expect(isFxRateStale(staleRecord)).toBe(true);
    });

    it('formats monetary values with clear currency indicator', () => {
      expect(formatMoneyWithCurrency(150.5, 'USD')).toBe('$150.50');
      expect(formatMoneyWithCurrency(2500000, 'VND')).toContain('2.500.000');
      expect(formatMoneyWithCurrency(100, undefined)).toBe('---');
    });
  });

  describe('DynamicGridUserConfig and Signature Schema', () => {
    it('applies default values for empty gridConfig', () => {
      const parsed = DynamicGridUserConfigSchema.parse({});
      expect(parsed).toEqual(DEFAULT_DYNAMIC_GRID_CONFIG);
      expect(parsed.gridMode).toBe('AUTO_REGIME');
      expect(parsed.spacingMode).toBe('FIB_ATR');
      expect(parsed.maxGridLayers).toBe(3);
    });

    it('validates custom gridConfig properly', () => {
      const custom = {
        gridMode: 'LONG_ONLY' as const,
        spacingMode: 'GEOMETRIC' as const,
        maxGridLayers: 5,
        gridStepPct: 0.5,
        tpStepRatio: 1.5,
        slBasketMult: 4.0,
      };
      const parsed = DynamicGridUserConfigSchema.parse(custom);
      expect(parsed.gridMode).toBe('LONG_ONLY');
      expect(parsed.spacingMode).toBe('GEOMETRIC');
      expect(parsed.maxGridLayers).toBe(5);
      expect(parsed.gridStepPct).toBe(0.5);
    });

    it('rejects invalid grid config values outside safety boundaries', () => {
      expect(() => DynamicGridUserConfigSchema.parse({ maxGridLayers: 0 })).toThrow();
      expect(() => DynamicGridUserConfigSchema.parse({ maxGridLayers: 6 })).toThrow();
      expect(() => DynamicGridUserConfigSchema.parse({ gridMode: 'INVALID' })).toThrow();
      expect(() => DynamicGridUserConfigSchema.parse({ atrStepMult: 0.1 })).toThrow();
    });

    it('builds unique deterministic signature for grid configs', () => {
      const defaultSig = buildDynamicGridConfigSignature();
      const customSig = buildDynamicGridConfigSignature({
        gridMode: 'LONG_ONLY',
        maxGridLayers: 2,
      });
      expect(defaultSig).toBe('AUTO_REGIME:FIB_ATR:3:1.20:0.40:none:1.00:3.50:3');
      expect(customSig).toBe('LONG_ONLY:FIB_ATR:2:1.20:0.40:none:1.00:3.50:3');
      expect(defaultSig).not.toBe(customSig);
    });

    it('parses StartBot and RestartBot schemas with optional gridConfig', () => {
      const startPayload = {
        tradingAccountId: 'acc-1',
        symbol: 'SI5COZ26',
        strategy: 'DynamicGridStrategy',
        gridConfig: {
          gridMode: 'SHORT_ONLY' as const,
          maxGridLayers: 4,
        },
      };
      const parsedStart = StartBotSchema.parse(startPayload);
      expect(parsedStart.gridConfig?.gridMode).toBe('SHORT_ONLY');
      expect(parsedStart.gridConfig?.maxGridLayers).toBe(4);

      const parsedRestart = RestartBotSchema.parse(startPayload);
      expect(parsedRestart.gridConfig?.gridMode).toBe('SHORT_ONLY');
    });
  });
});
