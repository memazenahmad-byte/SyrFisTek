import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';

const contentInput = z.object({
  contentKey: z.string(),
  companyId: z.number(),
  defaultValue: z.string().optional(),
});

export const contentRouter = createTRPCRouter({
  list: publicProcedure.query(() => ({ items: [] })),
  get: publicProcedure.input(z.object({ contentKey: z.string() })).query(({ input }) => input),
  create: publicProcedure.input(contentInput).mutation(({ input }) => ({ id: Date.now(), ...input })),
  update: publicProcedure
    .input(contentInput.extend({ id: z.number() }))
    .mutation(({ input }) => ({ updated: true, ...input })),
  delete: publicProcedure.input(z.object({ id: z.number() })).mutation(({ input }) => ({ deleted: input.id })),
});
