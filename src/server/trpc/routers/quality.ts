import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';

export const qualityRouter = createTRPCRouter({
  list: publicProcedure.query(() => ({ items: [] })),
  get: publicProcedure.input(z.object({ id: z.number() })).query(({ input }) => input),
  evaluate: publicProcedure
    .input(z.object({ productId: z.number(), companyId: z.number() }))
    .mutation(({ input }) => ({
      productId: input.productId,
      ai_score: 88,
      explanation: 'تقييم مبدئي باستخدام نموذج ذكاء اصطناعي',
    })),
});
