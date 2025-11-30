import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';

const roleInput = z.object({
  name: z.string(),
  description: z.string().optional(),
  companyId: z.number(),
});

export const roleRouter = createTRPCRouter({
  list: publicProcedure.query(() => ({ items: [] })),
  get: publicProcedure.input(z.object({ id: z.number() })).query(({ input }) => input),
  create: publicProcedure.input(roleInput).mutation(({ input }) => ({ id: Date.now(), ...input })),
  update: publicProcedure
    .input(roleInput.extend({ id: z.number() }))
    .mutation(({ input }) => ({ updated: true, ...input })),
  delete: publicProcedure.input(z.object({ id: z.number() })).mutation(({ input }) => ({ deleted: input.id })),
  assign: publicProcedure
    .input(z.object({ roleId: z.number(), permissionIds: z.array(z.number()) }))
    .mutation(({ input }) => ({ assigned: input })),
});
