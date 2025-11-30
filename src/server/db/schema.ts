import {
  mysqlTable,
  serial,
  varchar,
  text,
  int,
  datetime,
  boolean,
  decimal,
  json,
  index,
} from 'drizzle-orm/mysql-core';
import { relations } from 'drizzle-orm';

export const companies = mysqlTable('companies', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 200 }).notNull(),
  code: varchar('code', { length: 50 }).notNull().unique(),
  defaultCurrencyId: int('default_currency_id'),
  createdAt: datetime('created_at').defaultNow(),
  updatedAt: datetime('updated_at').onUpdateNow(),
});

export const periods = mysqlTable('periods', {
  id: serial('id').primaryKey(),
  companyId: int('company_id').notNull(),
  name: varchar('name', { length: 120 }).notNull(),
  startDate: datetime('start_date').notNull(),
  endDate: datetime('end_date').notNull(),
  status: varchar('status', { length: 50 }).default('open'),
});

export const currencies = mysqlTable('currencies', {
  id: serial('id').primaryKey(),
  code: varchar('code', { length: 10 }).notNull().unique(),
  name: varchar('name', { length: 120 }).notNull(),
  symbol: varchar('symbol', { length: 10 }),
  isActive: boolean('is_active').default(true),
});

export const exchangeRates = mysqlTable('exchange_rates', {
  id: serial('id').primaryKey(),
  baseCurrencyId: int('base_currency_id').notNull(),
  targetCurrencyId: int('target_currency_id').notNull(),
  rate: decimal('rate', { precision: 16, scale: 6 }).notNull(),
  fetchedAt: datetime('fetched_at').defaultNow(),
});

export const users = mysqlTable(
  'users',
  {
    id: serial('id').primaryKey(),
    companyId: int('company_id').notNull(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    name: varchar('name', { length: 200 }).notNull(),
    passwordHash: varchar('password_hash', { length: 255 }).notNull(),
    preferredLanguage: varchar('preferred_language', { length: 10 }).default('ar'),
    createdAt: datetime('created_at').defaultNow(),
  },
  (table) => ({ companyIdx: index('users_company_idx').on(table.companyId) }),
);

export const roles = mysqlTable('roles', {
  id: serial('id').primaryKey(),
  companyId: int('company_id').notNull(),
  name: varchar('name', { length: 120 }).notNull(),
  description: text('description'),
});

export const permissions = mysqlTable('permissions', {
  id: serial('id').primaryKey(),
  companyId: int('company_id').notNull(),
  key: varchar('key', { length: 150 }).notNull(),
  description: text('description'),
});

export const rolePermissions = mysqlTable('role_permissions', {
  id: serial('id').primaryKey(),
  roleId: int('role_id').notNull(),
  permissionId: int('permission_id').notNull(),
});

export const userRoles = mysqlTable('user_roles', {
  id: serial('id').primaryKey(),
  userId: int('user_id').notNull(),
  roleId: int('role_id').notNull(),
});

export const products = mysqlTable('products', {
  id: serial('id').primaryKey(),
  companyId: int('company_id').notNull(),
  periodId: int('period_id').notNull(),
  ownerUserId: int('owner_user_id').notNull(),
  name: varchar('name', { length: 200 }).notNull(),
  description: text('description'),
  baseCurrencyId: int('base_currency_id').notNull(),
  price: decimal('price', { precision: 16, scale: 4 }).notNull(),
  status: varchar('status', { length: 50 }).default('draft'),
  createdAt: datetime('created_at').defaultNow(),
});

export const offers = mysqlTable('offers', {
  id: serial('id').primaryKey(),
  companyId: int('company_id').notNull(),
  productId: int('product_id').notNull(),
  buyerUserId: int('buyer_user_id').notNull(),
  currencyId: int('currency_id').notNull(),
  amount: decimal('amount', { precision: 16, scale: 4 }).notNull(),
  status: varchar('status', { length: 50 }).default('pending'),
  periodId: int('period_id').notNull(),
  createdAt: datetime('created_at').defaultNow(),
});

export const auctions = mysqlTable('auctions', {
  id: serial('id').primaryKey(),
  companyId: int('company_id').notNull(),
  productId: int('product_id').notNull(),
  periodId: int('period_id').notNull(),
  startingPrice: decimal('starting_price', { precision: 16, scale: 4 }).notNull(),
  status: varchar('status', { length: 50 }).default('draft'),
  endsAt: datetime('ends_at').notNull(),
  createdAt: datetime('created_at').defaultNow(),
});

export const qualityScores = mysqlTable('quality_scores', {
  id: serial('id').primaryKey(),
  companyId: int('company_id').notNull(),
  productId: int('product_id').notNull(),
  aiScore: int('ai_score').notNull(),
  humanScore: int('human_score'),
  explanation: text('explanation'),
  createdAt: datetime('created_at').defaultNow(),
});

export const features = mysqlTable('features', {
  id: serial('id').primaryKey(),
  key: varchar('key', { length: 120 }).notNull(),
  stage: int('stage').default(1),
  enabled: boolean('enabled').default(true),
  description: text('description'),
});

export const siteContent = mysqlTable('site_content', {
  id: serial('id').primaryKey(),
  companyId: int('company_id').notNull(),
  contentKey: varchar('content_key', { length: 200 }).notNull(),
  defaultValue: text('default_value'),
  metadata: json('metadata'),
});

export const translations = mysqlTable('translations', {
  id: serial('id').primaryKey(),
  contentKey: varchar('content_key', { length: 200 }).notNull(),
  languageCode: varchar('language_code', { length: 10 }).notNull(),
  value: text('value').notNull(),
  updatedAt: datetime('updated_at').defaultNow(),
});

export const companiesRelations = relations(companies, ({ many }) => ({
  users: many(users),
  periods: many(periods),
  products: many(products),
  offers: many(offers),
  auctions: many(auctions),
  qualityScores: many(qualityScores),
  siteContent: many(siteContent),
}));

export const periodsRelations = relations(periods, ({ one, many }) => ({
  company: one(companies, {
    fields: [periods.companyId],
    references: [companies.id],
  }),
  products: many(products),
  offers: many(offers),
  auctions: many(auctions),
}));

export const usersRelations = relations(users, ({ one, many }) => ({
  company: one(companies, {
    fields: [users.companyId],
    references: [companies.id],
  }),
  roles: many(userRoles),
  products: many(products),
  offers: many(offers),
}));

export const rolesRelations = relations(roles, ({ one, many }) => ({
  company: one(companies, {
    fields: [roles.companyId],
    references: [companies.id],
  }),
  permissions: many(rolePermissions),
  users: many(userRoles),
}));

export const permissionsRelations = relations(permissions, ({ one, many }) => ({
  company: one(companies, {
    fields: [permissions.companyId],
    references: [companies.id],
  }),
  roles: many(rolePermissions),
}));

export const rolePermissionsRelations = relations(rolePermissions, ({ one }) => ({
  role: one(roles, {
    fields: [rolePermissions.roleId],
    references: [roles.id],
  }),
  permission: one(permissions, {
    fields: [rolePermissions.permissionId],
    references: [permissions.id],
  }),
}));

export const userRolesRelations = relations(userRoles, ({ one }) => ({
  user: one(users, {
    fields: [userRoles.userId],
    references: [users.id],
  }),
  role: one(roles, {
    fields: [userRoles.roleId],
    references: [roles.id],
  }),
}));

export const productsRelations = relations(products, ({ one, many }) => ({
  company: one(companies, {
    fields: [products.companyId],
    references: [companies.id],
  }),
  period: one(periods, {
    fields: [products.periodId],
    references: [periods.id],
  }),
  owner: one(users, {
    fields: [products.ownerUserId],
    references: [users.id],
  }),
  offers: many(offers),
  auctions: many(auctions),
  qualityScores: many(qualityScores),
}));

export const offersRelations = relations(offers, ({ one }) => ({
  company: one(companies, {
    fields: [offers.companyId],
    references: [companies.id],
  }),
  product: one(products, {
    fields: [offers.productId],
    references: [products.id],
  }),
  buyer: one(users, {
    fields: [offers.buyerUserId],
    references: [users.id],
  }),
  currency: one(currencies, {
    fields: [offers.currencyId],
    references: [currencies.id],
  }),
  period: one(periods, {
    fields: [offers.periodId],
    references: [periods.id],
  }),
}));

export const auctionsRelations = relations(auctions, ({ one }) => ({
  company: one(companies, {
    fields: [auctions.companyId],
    references: [companies.id],
  }),
  product: one(products, {
    fields: [auctions.productId],
    references: [products.id],
  }),
  period: one(periods, {
    fields: [auctions.periodId],
    references: [periods.id],
  }),
}));

export const qualityScoresRelations = relations(qualityScores, ({ one }) => ({
  company: one(companies, {
    fields: [qualityScores.companyId],
    references: [companies.id],
  }),
  product: one(products, {
    fields: [qualityScores.productId],
    references: [products.id],
  }),
}));

export const siteContentRelations = relations(siteContent, ({ one, many }) => ({
  company: one(companies, {
    fields: [siteContent.companyId],
    references: [companies.id],
  }),
  translations: many(translations),
}));

export const translationsRelations = relations(translations, ({ one }) => ({
  content: one(siteContent, {
    fields: [translations.contentKey],
    references: [siteContent.contentKey],
    relationName: 'contentTranslations',
  }),
}));
