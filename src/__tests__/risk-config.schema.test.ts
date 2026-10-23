import { describe, it, expect } from 'vitest';
import {
  QuanttradeRiskConfigSchema,
  UpdateRiskConfigSchema,
  DEFAULT_QUANTTRADE_RISK_CONFIG,
} from '../schemas/risk-config.schema';

describe('QuanttradeRiskConfigSchema', () => {
  it('validates a valid full risk configuration', () => {
    const validConfig = {
      tradingAccountId: 'acc-123',
      symbol: 'SI5COF27',
      takeProfitEnabled: true,
      takeProfitMode: 'USD',
      takeProfitAmountUsd: 150.5,
      stopLossEnabled: true,
      stopLossMode: 'USD',
      stopLossAmountUsd: 100.0,
      trailingStopEnabled: true,
      trailingStopMode: 'USD',
      trailingStopDistance: 30.0,
      trailingActivationProfitUsd: 50.0,
      applyToOpenPositions: true,
      version: 1,
    };

    const parsed = QuanttradeRiskConfigSchema.safeParse(validConfig);
    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(parsed.data.takeProfitAmountUsd).toBe(150.5);
      expect(parsed.data.stopLossAmountUsd).toBe(100.0);
      expect(parsed.data.trailingStopMode).toBe('USD');
      expect(parsed.data.version).toBe(1);
    }
  });

  it('rejects invalid or non-finite values (NaN, Infinity, negative)', () => {
    const nanConfig = {
      tradingAccountId: 'acc-123',
      takeProfitEnabled: true,
      takeProfitAmountUsd: NaN,
    };
    expect(QuanttradeRiskConfigSchema.safeParse(nanConfig).success).toBe(false);

    const infConfig = {
      tradingAccountId: 'acc-123',
      stopLossEnabled: true,
      stopLossAmountUsd: Infinity,
    };
    expect(QuanttradeRiskConfigSchema.safeParse(infConfig).success).toBe(false);

    const negativeConfig = {
      tradingAccountId: 'acc-123',
      takeProfitEnabled: true,
      takeProfitAmountUsd: -50,
    };
    expect(QuanttradeRiskConfigSchema.safeParse(negativeConfig).success).toBe(false);
  });

  it('rejects enabled feature if amount/distance is missing or <= 0', () => {
    const zeroTp = {
      tradingAccountId: 'acc-123',
      takeProfitEnabled: true,
      takeProfitAmountUsd: 0,
    };
    expect(QuanttradeRiskConfigSchema.safeParse(zeroTp).success).toBe(false);

    const missingTp = {
      tradingAccountId: 'acc-123',
      takeProfitEnabled: true,
    };
    expect(QuanttradeRiskConfigSchema.safeParse(missingTp).success).toBe(false);

    const zeroTrailing = {
      tradingAccountId: 'acc-123',
      trailingStopEnabled: true,
      trailingStopDistance: 0,
      trailingActivationProfitUsd: 50,
    };
    expect(QuanttradeRiskConfigSchema.safeParse(zeroTrailing).success).toBe(false);
  });

  it('allows disabled features without requiring amounts', () => {
    const disabledConfig = {
      tradingAccountId: 'acc-123',
      takeProfitEnabled: false,
      stopLossEnabled: false,
      trailingStopEnabled: false,
    };

    const parsed = QuanttradeRiskConfigSchema.safeParse(disabledConfig);
    expect(parsed.success).toBe(true);
  });

  it('validates supported trailing modes: USD, PERCENT, PRICE_DISTANCE', () => {
    for (const mode of ['USD', 'PERCENT', 'PRICE_DISTANCE'] as const) {
      const config = {
        tradingAccountId: 'acc-123',
        trailingStopEnabled: true,
        trailingStopMode: mode,
        trailingStopDistance: 10,
        trailingActivationProfitUsd: 20,
      };
      const parsed = QuanttradeRiskConfigSchema.safeParse(config);
      expect(parsed.success).toBe(true);
    }

    const invalidMode = {
      tradingAccountId: 'acc-123',
      trailingStopEnabled: true,
      trailingStopMode: 'INVALID_MODE',
      trailingStopDistance: 10,
      trailingActivationProfitUsd: 20,
    };
    expect(QuanttradeRiskConfigSchema.safeParse(invalidMode).success).toBe(false);
  });

  it('provides safe default values with all risk triggers disabled', () => {
    expect(DEFAULT_QUANTTRADE_RISK_CONFIG.takeProfitEnabled).toBe(false);
    expect(DEFAULT_QUANTTRADE_RISK_CONFIG.stopLossEnabled).toBe(false);
    expect(DEFAULT_QUANTTRADE_RISK_CONFIG.trailingStopEnabled).toBe(false);
    expect(DEFAULT_QUANTTRADE_RISK_CONFIG.takeProfitMode).toBe('USD');
    expect(DEFAULT_QUANTTRADE_RISK_CONFIG.stopLossMode).toBe('USD');
    expect(DEFAULT_QUANTTRADE_RISK_CONFIG.trailingStopMode).toBe('USD');
    expect(DEFAULT_QUANTTRADE_RISK_CONFIG.version).toBe(1);
  });
});
