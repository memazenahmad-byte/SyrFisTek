import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';

const auctionInput = z.object({
  productId: z.number(),
  companyId: z.number(),
  periodId: z.number(),
  startingPrice: z.number(),
  endsAt: z.date(),
});

export const auctionRouter = createTRPCRouter({
  list: publicProcedure.query(() => ({ items: [] })),
  get: publicProcedure.input(z.object({ id: z.number() })).query(({ input }) => input),
  create: publicProcedure.input(auctionInput).mutation(({ input }) => ({ id: Date.now(), ...input })),
  update: publicProcedure
    .input(auctionInput.extend({ id: z.number() }))
    .mutation(({ input }) => ({ updated: true, ...input })),
  delete: publicProcedure.input(z.object({ id: z.number() })).mutation(({ input }) => ({ deleted: input.id })),
});
