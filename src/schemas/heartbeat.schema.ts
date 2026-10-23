import { z } from 'zod';

export const WorkerHeartbeatSchema = z.object({
  workerId: z.string().min(1),
  service: z.string().min(1),
  status: z.enum(['HEALTHY', 'DEGRADED', 'UNREACHABLE']),
  timestamp: z.number().int().positive(),
  activeBotsCount: z.number().nonnegative(),
  uptimeSeconds: z.number().nonnegative(),
  memoryUsageMb: z.number().nonnegative().optional(),
  redisConnected: z.boolean(),
});

export type WorkerHeartbeatContract = z.infer<typeof WorkerHeartbeatSchema>;
