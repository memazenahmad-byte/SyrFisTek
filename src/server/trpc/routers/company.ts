import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';

const companyInput = z.object({
  name: z.string(),
  code: z.string(),
  defaultCurrencyId: z.number().optional(),
});

export const companyRouter = createTRPCRouter({
  list: publicProcedure.query(() => ({ items: [] })),
  get: publicProcedure.input(z.object({ id: z.number() })).query(({ input }) => input),
  create: publicProcedure.input(companyInput).mutation(({ input }) => ({ id: Date.now(), ...input })),
  update: publicProcedure
    .input(companyInput.extend({ id: z.number() }))
    .mutation(({ input }) => ({ updated: true, ...input })),
  delete: publicProcedure.input(z.object({ id: z.number() })).mutation(({ input }) => ({ deleted: input.id })),
});
