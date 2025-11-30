import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';

const permissionInput = z.object({
  key: z.string(),
  description: z.string().optional(),
  companyId: z.number(),
});

export const permissionRouter = createTRPCRouter({
  list: publicProcedure.query(() => ({ items: [] })),
  get: publicProcedure.input(z.object({ id: z.number() })).query(({ input }) => input),
  create: publicProcedure.input(permissionInput).mutation(({ input }) => ({ id: Date.now(), ...input })),
  update: publicProcedure
    .input(permissionInput.extend({ id: z.number() }))
    .mutation(({ input }) => ({ updated: true, ...input })),
  delete: publicProcedure.input(z.object({ id: z.number() })).mutation(({ input }) => ({ deleted: input.id })),
});
