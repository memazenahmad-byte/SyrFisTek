import { createTRPCRouter } from './trpc';
import { authRouter } from './routers/auth';
import { userRouter } from './routers/user';
import { roleRouter } from './routers/role';
import { permissionRouter } from './routers/permission';
import { productRouter } from './routers/product';
import { offerRouter } from './routers/offer';
import { auctionRouter } from './routers/auction';
import { qualityRouter } from './routers/quality';
import { featureRouter } from './routers/feature';
import { contentRouter } from './routers/content';
import { languageRouter } from './routers/language';
import { currencyRouter } from './routers/currency';
import { companyRouter } from './routers/company';
import { periodRouter } from './routers/period';

export const appRouter = createTRPCRouter({
  auth: authRouter,
  users: userRouter,
  roles: roleRouter,
  permissions: permissionRouter,
  products: productRouter,
  offers: offerRouter,
  auctions: auctionRouter,
  quality: qualityRouter,
  features: featureRouter,
  content: contentRouter,
  languages: languageRouter,
  currencies: currencyRouter,
  companies: companyRouter,
  periods: periodRouter,
});

export type AppRouter = typeof appRouter;
