import { z } from 'zod';
export declare const WorkerHeartbeatSchema: z.ZodObject<{
    workerId: z.ZodString;
    service: z.ZodString;
    status: z.ZodEnum<{
        DEGRADED: "DEGRADED";
        HEALTHY: "HEALTHY";
        UNREACHABLE: "UNREACHABLE";
    }>;
    timestamp: z.ZodNumber;
    activeBotsCount: z.ZodNumber;
    uptimeSeconds: z.ZodNumber;
    memoryUsageMb: z.ZodOptional<z.ZodNumber>;
    redisConnected: z.ZodBoolean;
}, z.core.$strip>;
export type WorkerHeartbeatContract = z.infer<typeof WorkerHeartbeatSchema>;
//# sourceMappingURL=heartbeat.schema.d.ts.map