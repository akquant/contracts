export const BOT_SESSION_STATUSES = [
  'STOPPED',
  'STARTING',
  'RUNNING',
  'DEGRADED',
  'STALE',
  'STOPPING',
  'ERROR',
  'UNKNOWN',
  'PAUSED',
] as const;

export type BotSessionStatus = (typeof BOT_SESSION_STATUSES)[number];
