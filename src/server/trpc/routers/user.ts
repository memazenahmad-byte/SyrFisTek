import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';

const userInput = z.object({
  email: z.string().email(),
  name: z.string(),
  companyId: z.number(),
});

export const userRouter = createTRPCRouter({
  list: publicProcedure.query(async ({ ctx }) => ({ companyId: ctx.companyId, items: [] })),
  get: publicProcedure.input(z.object({ id: z.number() })).query(({ input }) => ({ id: input.id })),
  create: publicProcedure.input(userInput).mutation(({ input }) => ({ id: Date.now(), ...input })),
  update: publicProcedure
    .input(userInput.extend({ id: z.number() }))
    .mutation(({ input }) => ({ updated: true, ...input })),
  delete: publicProcedure.input(z.object({ id: z.number() })).mutation(({ input }) => ({ deleted: input.id })),
});
