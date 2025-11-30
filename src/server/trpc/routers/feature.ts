import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';

const featureInput = z.object({ key: z.string(), stage: z.number().min(1).max(3), enabled: z.boolean() });

export const featureRouter = createTRPCRouter({
  list: publicProcedure.query(() => ({ items: [] })),
  get: publicProcedure.input(z.object({ key: z.string() })).query(({ input }) => input),
  create: publicProcedure.input(featureInput).mutation(({ input }) => ({ id: Date.now(), ...input })),
  update: publicProcedure
    .input(featureInput.extend({ id: z.number() }))
    .mutation(({ input }) => ({ updated: true, ...input })),
  delete: publicProcedure.input(z.object({ id: z.number() })).mutation(({ input }) => ({ deleted: input.id })),
  toggle: publicProcedure
    .input(z.object({ id: z.number(), enabled: z.boolean() }))
    .mutation(({ input }) => ({ toggled: input })),
});
