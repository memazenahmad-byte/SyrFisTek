import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';

const offerInput = z.object({
  productId: z.number(),
  companyId: z.number(),
  buyerUserId: z.number(),
  currencyId: z.number(),
  amount: z.number(),
  periodId: z.number(),
});

export const offerRouter = createTRPCRouter({
  list: publicProcedure.query(() => ({ items: [] })),
  get: publicProcedure.input(z.object({ id: z.number() })).query(({ input }) => input),
  create: publicProcedure.input(offerInput).mutation(({ input }) => ({ id: Date.now(), ...input })),
  update: publicProcedure
    .input(offerInput.extend({ id: z.number() }))
    .mutation(({ input }) => ({ updated: true, ...input })),
  delete: publicProcedure.input(z.object({ id: z.number() })).mutation(({ input }) => ({ deleted: input.id })),
});
