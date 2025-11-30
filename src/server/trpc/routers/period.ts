import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';

const periodInput = z.object({
  name: z.string(),
  companyId: z.number(),
  startDate: z.date(),
  endDate: z.date(),
});

export const periodRouter = createTRPCRouter({
  list: publicProcedure.query(() => ({ items: [] })),
  get: publicProcedure.input(z.object({ id: z.number() })).query(({ input }) => input),
  create: publicProcedure.input(periodInput).mutation(({ input }) => ({ id: Date.now(), ...input })),
  update: publicProcedure
    .input(periodInput.extend({ id: z.number() }))
    .mutation(({ input }) => ({ updated: true, ...input })),
  delete: publicProcedure.input(z.object({ id: z.number() })).mutation(({ input }) => ({ deleted: input.id })),
});
