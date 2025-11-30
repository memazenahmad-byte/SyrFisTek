import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';

const languageInput = z.object({ code: z.string(), label: z.string() });

export const languageRouter = createTRPCRouter({
  list: publicProcedure.query(() => ({ items: [] })),
  get: publicProcedure.input(z.object({ code: z.string() })).query(({ input }) => input),
  create: publicProcedure.input(languageInput).mutation(({ input }) => ({ id: Date.now(), ...input })),
  update: publicProcedure
    .input(languageInput.extend({ id: z.number() }))
    .mutation(({ input }) => ({ updated: true, ...input })),
  delete: publicProcedure.input(z.object({ id: z.number() })).mutation(({ input }) => ({ deleted: input.id })),
});
