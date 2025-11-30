import type { CreateHTTPContextOptions } from '@trpc/server/adapters/standalone';
import { db } from '../db';

export type Context = {
  db: typeof db;
  companyId?: number;
  userId?: number;
};

export async function createContext({ req }: CreateHTTPContextOptions): Promise<Context> {
  const companyId = req.headers['x-company-id'] ? Number(req.headers['x-company-id']) : undefined;
  const userId = req.headers['x-user-id'] ? Number(req.headers['x-user-id']) : undefined;
  return { db, companyId, userId };
}
