# @quanttrade/contracts

Shared Quanttrade canonical contracts, schemas, enums, strategy registries, and Redis key builders across Phoenix Terminal Backend, FCOM Signal Worker, and Client.

## Installation

### Via Git tag (Recommended)
```bash
npm install git+https://github.com/akquant/contracts.git#v1.0.0
```

Or add to your `package.json`:
```json
{
  "dependencies": {
    "@quanttrade/contracts": "git+https://github.com/akquant/contracts.git#v1.0.0"
  }
}
```

Then run:
```bash
npm install
# or
pnpm install
```

## Features

- **Canonical Strategy Registry**: Single source of truth for strategy IDs (`HftMicroScalpStrategy`, `TrendFollowingStrategy`, `MomentumStrategy`, etc.) and backward-compatible alias mapping.
- **Bidirectional Timeframe & Resolution Normalizers**: Converts seamlessly between UI timeframes (`15m`, `1h`, `4h`, `1d`) and engine resolutions (`15`, `60`, `240`, `D`).
- **Standardized Redis Key Builders (`QuanttradeRedisKeys`)**: Deterministic key formulas for distributed locks, active symbol bindings, persistence sessions, and canonical stream names (`quanttrade:*`).
- **Runtime Zod Validation Schemas**: Fail-fast validation schemas for bot lifecycle, session status, signal envelopes, price ticks, and environment variables.
- **Strict LIMIT Order Guard**: Prevents accidental or rogue `MARKET` order submission for algorithmic bot sessions.
- **ISO 4217 Currency Utilities**: Multi-currency support (USD quote contracts, VND account ledger) and FX staleness checks.

## Usage

```typescript
import {
  QuanttradeRedisKeys,
  formatTimeframeDisplay,
  toCanonicalResolution,
  isStrategyActive,
  getCanonicalStrategyId,
  QUANTTRADE_SOCKET_EVENTS,
  QuanttradeBotOrderRequestSchema,
} from '@quanttrade/contracts';

// Redis key builder
const lockKey = QuanttradeRedisKeys.lockSymbol('ACC_123', 'SI5COZ26');
// => "quanttrade:lock:symbol:ACC_123:SI5COZ26"

// Timeframe formatting
console.log(formatTimeframeDisplay('60')); // => "1h"

// Strategy verification
console.log(isStrategyActive('TrendFollowingStrategy')); // => true
console.log(getCanonicalStrategyId('ai_sniper')); // => "TrendFollowingStrategy"
```

## License

MIT
