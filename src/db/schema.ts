import { integer, pgTable, serial, text, timestamp, varchar, date, boolean } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
    id: text("id").primaryKey(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    password: varchar("password", { length: 255 }).notNull(),
    position: varchar("position", { length: 255 }).default("manager"),
    age: varchar("age", { length: 255 }).default("18"),
    dob: date("dob", { mode: "string" }),
    createdAt: timestamp("created_at", {
        withTimezone: true,
        mode: "date"
    }).defaultNow(),
    photo: varchar("photo", { length: 1000 }).notNull().default(""),
    otp: varchar("otp").notNull().default(""),
});

export const session = pgTable("session", {
    id: text("id").primaryKey(),
    userId: text("user_id")
        .notNull()
        .references(() => user.id, { onDelete: "cascade" }),
    expiresAt: timestamp("expires_at", {
        withTimezone: true,
        mode: "date"
    }).notNull()
});