import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';

const currencyInput = z.object({
  code: z.string(),
  name: z.string(),
  symbol: z.string().optional(),
});

export const currencyRouter = createTRPCRouter({
  list: publicProcedure.query(() => ({ items: [] })),
  get: publicProcedure.input(z.object({ id: z.number() })).query(({ input }) => input),
  create: publicProcedure.input(currencyInput).mutation(({ input }) => ({ id: Date.now(), ...input })),
  update: publicProcedure
    .input(currencyInput.extend({ id: z.number() }))
    .mutation(({ input }) => ({ updated: true, ...input })),
  delete: publicProcedure.input(z.object({ id: z.number() })).mutation(({ input }) => ({ deleted: input.id })),
  refreshRates: publicProcedure.mutation(() => ({ synced: true })),
});
