"use strict";
/**
 * Canonical Strategy Definitions, Release Status, and Legacy Aliases.
 * Single Source of Truth for Quanttrade strategies across Backend, Worker, and Client.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.STRATEGY_LEGACY_MAPPING = exports.STRATEGY_METADATA_REGISTRY = exports.CANONICAL_STRATEGY_IDS = void 0;
exports.findCanonicalStrategyId = findCanonicalStrategyId;
exports.getCanonicalStrategyId = getCanonicalStrategyId;
exports.isStrategyActive = isStrategyActive;
exports.getActiveStrategyIds = getActiveStrategyIds;
exports.CANONICAL_STRATEGY_IDS = [
    'HftMicroScalpStrategy',
    'TrendFollowingStrategy',
    'MomentumStrategy',
    'MeanReversionStrategy',
    'CalendarSpreadStrategy',
    'HedgingStrategy',
    'SonicStrategy',
    'HgWeekly5TpStrategy',
    'PineScriptStrategy',
];
exports.STRATEGY_METADATA_REGISTRY = {
    HftMicroScalpStrategy: {
        id: 'HftMicroScalpStrategy',
        name: 'HFT (High Frequency Trading)',
        nameVi: 'Giao dịch Tần suất Cao Siêu ngắn (HFT Scalping)',
        category: 'CAO TẦN',
        recommendedSymbols: ['SI5C', 'CLE', 'PL'],
        timeframes: ['1m', '5m', '15m'],
        winRateEstimate: '81.0%',
        releaseStatus: 'ACTIVE',
        description: 'Chiến lược tần suất cao khai thác mất cân đối cung cầu trên sổ lệnh (Orderbook Imbalance) để ăn chênh lệch micro-tick.',
    },
    TrendFollowingStrategy: {
        id: 'TrendFollowingStrategy',
        name: 'Trend Following',
        nameVi: 'Giao dịch Bám theo Xu hướng (Trend Following)',
        category: 'XU HƯỚNG',
        recommendedSymbols: ['SI5C', 'CLE', 'ZSE', 'PL'],
        timeframes: ['5m', '15m', '1h', '4h', '1d'],
        winRateEstimate: '74.5%',
        releaseStatus: 'ACTIVE',
        description: 'Bám xu hướng động với EMA Basis kết hợp ATR Ratchet Band, Pullback Re-entry và cơ chế Stop-and-Reverse bảo toàn vị thế.',
    },
    MomentumStrategy: {
        id: 'MomentumStrategy',
        name: 'Momentum',
        nameVi: 'Giao dịch Động lượng Kênh Alpha S/R (Momentum)',
        category: 'ĐỘNG LƯỢNG',
        recommendedSymbols: ['SI5C', 'CLE', 'PL'],
        timeframes: ['5m', '15m', '1h', '4h', '1d'],
        winRateEstimate: '74.5%',
        releaseStatus: 'ACTIVE',
        description: 'Hồi quy vùng giá trị động kênh HTF EMA, xác nhận cạn kiệt đảo chiều Pin Bar + Engulfing, vượt cản xu hướng bắt bẫy thanh khoản tổ chức.',
    },
    MeanReversionStrategy: {
        id: 'MeanReversionStrategy',
        name: 'Mean Reversion',
        nameVi: 'Giao dịch Hồi quy Trung bình (Mean Reversion)',
        category: 'HỒI QUY',
        recommendedSymbols: ['SPY', 'QQQ', 'ZSE', 'KCE'],
        timeframes: ['5m', '15m', '1h', '4h', '1d'],
        winRateEstimate: '75.2%',
        releaseStatus: 'COMING_SOON',
        description: 'Kiểm định giả thuyết 2 phía phân kỳ biến động ATR Fast vs Slow, xác nhận động lượng Brownian Drift, trailing stop loss ATR động.',
    },
    CalendarSpreadStrategy: {
        id: 'CalendarSpreadStrategy',
        name: 'Spread / Arbitrage',
        nameVi: 'Khai thác Chênh lệch Kỳ hạn Hàng hóa (Spread / Arbitrage)',
        category: 'CHÊNH LỆCH',
        recommendedSymbols: ['CLE', 'ZSE', 'SI5C'],
        timeframes: ['15m', '1h', '4h', '1d'],
        winRateEstimate: '76.0%',
        releaseStatus: 'COMING_SOON',
        description: 'Giao dịch chênh lệch giá (Spread) giữa hai kỳ hạn giao hàng khác nhau để thu lợi nhuận ít rủi ro biến động giá tuyệt đối.',
    },
    HedgingStrategy: {
        id: 'HedgingStrategy',
        name: 'Hedging',
        nameVi: 'Phòng hộ Rủi ro & Bảo hiểm Danh mục (Hedging)',
        category: 'PHÒNG HỘ',
        recommendedSymbols: ['SI5C', 'CLE', 'PL'],
        timeframes: ['15m', '1h', '4h', '1d'],
        winRateEstimate: '75.0%',
        releaseStatus: 'COMING_SOON',
        description: 'Tự động mở vị thế phòng hộ ngược chiều để bảo vệ tài khoản khi thị trường xuất hiện rủi ro tin tức hoặc biến động bất lợi.',
    },
    SonicStrategy: {
        id: 'SonicStrategy',
        name: 'Sonic 3-in-1',
        nameVi: 'SACT Sonic 3-in-1 (UT Bot + Sonic R + LuxAlgo)',
        category: 'ĐỘNG LƯỢNG',
        recommendedSymbols: ['SI5C', 'CLE', 'PL', 'ZSE'],
        timeframes: ['5m', '15m', '1h', '4h', '1d'],
        winRateEstimate: '78.5%',
        releaseStatus: 'COMING_SOON',
        description: 'Tích hợp 3-trong-1: Tín hiệu đảo chiều UT Bot, dải kênh giá Sonic R PAC EMA 50 và vùng cản động LuxAlgo.',
    },
    HgWeekly5TpStrategy: {
        id: 'HgWeekly5TpStrategy',
        name: 'HG Weekly 5TP',
        nameVi: 'SACT HG Weekly 5TP V2 (Đồng Hàng Tuần 5-TP)',
        category: 'ĐỘNG LƯỢNG',
        recommendedSymbols: ['SI5C', 'CLE', 'CP2'],
        timeframes: ['5m', '15m', '1h', '4h', '1d'],
        winRateEstimate: '79.0%',
        releaseStatus: 'COMING_SOON',
        description: 'Chiến lược giao dịch hợp đồng Đồng với 18 mô hình tín hiệu, chốt lời nấc thang 5 mục tiêu (TP1-TP5) và dời dừng lỗ hòa vốn tự động.',
    },
    PineScriptStrategy: {
        id: 'PineScriptStrategy',
        name: 'Pine Script Engine',
        nameVi: 'Kịch bản Tự Chọn Pine Script (v4 / v5)',
        category: 'TÙY BIẾN',
        recommendedSymbols: ['SI5C', 'CLE', 'ZSE', 'CP2', 'PL'],
        timeframes: ['1m', '5m', '15m', '1h', '4h', '1d'],
        winRateEstimate: '82.5%',
        releaseStatus: 'COMING_SOON',
        description: 'Tự động hóa 24/7 theo bất kỳ kịch bản Pine Script v4/v5 nào từ Pine Editor hoặc TradingView (UT Bot, LuxAlgo, Sonic R,...).',
    },
};
/**
 * Backward-compatible strategy aliases mapping legacy identifiers to canonical strategy names.
 */
exports.STRATEGY_LEGACY_MAPPING = {
    HftMicroScalpStrategy: 'HftMicroScalpStrategy',
    TrendFollowingStrategy: 'TrendFollowingStrategy',
    MomentumStrategy: 'MomentumStrategy',
    MeanReversionStrategy: 'MeanReversionStrategy',
    CalendarSpreadStrategy: 'CalendarSpreadStrategy',
    HedgingStrategy: 'HedgingStrategy',
    SonicStrategy: 'SonicStrategy',
    HgWeekly5TpStrategy: 'HgWeekly5TpStrategy',
    PineScriptStrategy: 'PineScriptStrategy',
    // Backward-compatible aliases:
    PINESCRIPT: 'PineScriptStrategy',
    pinescript: 'PineScriptStrategy',
    PINE: 'PineScriptStrategy',
    pine: 'PineScriptStrategy',
    SACT_HG_5TP: 'HgWeekly5TpStrategy',
    hg_weekly_5tp: 'HgWeekly5TpStrategy',
    SACT_3IN1: 'SonicStrategy',
    sonic_3in1: 'SonicStrategy',
    SONIC: 'SonicStrategy',
    MARKET_MAKER: 'HftMicroScalpStrategy',
    GRID: 'MeanReversionStrategy',
    HEDGING: 'HedgingStrategy',
    SMC_COMMODITY: 'TrendFollowingStrategy',
    BREAKOUT: 'TrendFollowingStrategy',
    BreakoutStrategy: 'TrendFollowingStrategy',
    SmcStrategy: 'TrendFollowingStrategy',
    ai_sniper: 'TrendFollowingStrategy',
};
/** Find canonical strategy ID or return null if unknown */
function findCanonicalStrategyId(raw) {
    if (!raw)
        return null;
    const trimmed = raw.trim();
    return exports.STRATEGY_LEGACY_MAPPING[trimmed] || null;
}
/** Resolve any raw or legacy strategy string into canonical strategy ID with fallback */
function getCanonicalStrategyId(raw, fallback = 'TrendFollowingStrategy') {
    return findCanonicalStrategyId(raw) || fallback;
}
/** Check if strategy is officially released and active (returns false for unknown strategies) */
function isStrategyActive(strategyId) {
    if (!strategyId)
        return false;
    const canonical = findCanonicalStrategyId(strategyId);
    if (!canonical)
        return false;
    return exports.STRATEGY_METADATA_REGISTRY[canonical]?.releaseStatus === 'ACTIVE';
}
/** Get list of currently active strategy IDs */
function getActiveStrategyIds() {
    return exports.CANONICAL_STRATEGY_IDS.filter((id) => exports.STRATEGY_METADATA_REGISTRY[id].releaseStatus === 'ACTIVE');
}
//# sourceMappingURL=strategies.js.map