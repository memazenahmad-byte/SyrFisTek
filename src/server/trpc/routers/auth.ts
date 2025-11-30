import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';

export const authRouter = createTRPCRouter({
  login: publicProcedure
    .input(z.object({ email: z.string().email(), password: z.string().min(6) }))
    .mutation(async ({ input, ctx }) => {
      return {
        token: 'mock-token',
        user: { id: 1, email: input.email, companyId: ctx.companyId ?? 1 },
      };
    }),
  logout: publicProcedure.mutation(() => ({ success: true })),
  me: publicProcedure.query(({ ctx }) => ({ userId: ctx.userId, companyId: ctx.companyId })),
});
