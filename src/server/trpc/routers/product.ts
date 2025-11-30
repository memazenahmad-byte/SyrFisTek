import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';

const productInput = z.object({
  name: z.string(),
  description: z.string().optional(),
  companyId: z.number(),
  periodId: z.number(),
  baseCurrencyId: z.number(),
  price: z.number(),
  ownerUserId: z.number(),
});

export const productRouter = createTRPCRouter({
  list: publicProcedure.query(() => ({ items: [] })),
  get: publicProcedure.input(z.object({ id: z.number() })).query(({ input }) => ({ id: input.id })),
  create: publicProcedure.input(productInput).mutation(({ input }) => ({ id: Date.now(), ...input })),
  update: publicProcedure
    .input(productInput.extend({ id: z.number() }))
    .mutation(({ input }) => ({ updated: true, ...input })),
  delete: publicProcedure.input(z.object({ id: z.number() })).mutation(({ input }) => ({ deleted: input.id })),
});
