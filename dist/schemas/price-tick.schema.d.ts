import { z } from 'zod';
export declare const PRICE_TICK_CONTRACT_VERSION: 1;
export declare const PRICE_TICK_TYPE: "PRICE_TICK";
export declare const PriceTickPayloadSchema: z.ZodObject<{
    v: z.ZodDefault<z.ZodOptional<z.ZodLiteral<1>>>;
    type: z.ZodDefault<z.ZodOptional<z.ZodLiteral<"PRICE_TICK">>>;
    symbol: z.ZodString;
    price: z.ZodNumber;
    bid: z.ZodOptional<z.ZodNumber>;
    ask: z.ZodOptional<z.ZodNumber>;
    ts: z.ZodNumber;
    source: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type PriceTickPayloadContract = z.infer<typeof PriceTickPayloadSchema>;
//# sourceMappingURL=price-tick.schema.d.ts.map