import { integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";
export const budgets = pgTable("budgets", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  amount: varchar("amount").notNull(),
  icon: varchar("icon"),
  createdBy: varchar("createdBy").notNull(),
});

export const income = pgTable("income", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  amount: varchar("amount").notNull(),
  icon: varchar("icon"),
  createdBy: varchar("createdBy").notNull(),
});

export const expenses = pgTable("expenses", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  amount: varchar("amount").notNull(),
  budgetId: integer("budgetId").references(() => budgets.id),
  createdBy: varchar("createdBy").notNull(),
  createdAt: varchar("CreatedAt").notNull(),
});
