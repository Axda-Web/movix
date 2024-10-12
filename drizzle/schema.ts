import {
  timestamp,
  pgTable,
  text,
  primaryKey,
  smallint,
  boolean,
  pgEnum,
  varchar,
  integer,
} from "drizzle-orm/pg-core";
import { relations, InferSelectModel } from "drizzle-orm";
import type { AdapterAccount } from "next-auth/adapters";

export const mediaCategoryEnum = pgEnum("category", ["Movie", "TV Series"]);
export const mediaRatingEnum = pgEnum("rating", ["E", "PG", "18+"]);
export const thumbnailTypeEnum = pgEnum("type", ["trending", "regular"]);
export const thumbnailSizeEnum = pgEnum("size", ["small", "medium", "large"]);

export const medias = pgTable("media", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  title: varchar("title", { length: 255 }).notNull(),
  year: smallint("year").notNull(),
  category: mediaCategoryEnum("category").notNull(),
  rating: mediaRatingEnum("rating").notNull(),
  isBookmarked: boolean("isBookmarked").notNull(),
  isTrending: boolean("isTrending").notNull(),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).notNull().defaultNow(),
});

export const mediasRelations = relations(medias, ({ many }) => ({
  thumbnails: many(thumbnails),
}));

export type Media = InferSelectModel<typeof medias>;

export const thumbnails = pgTable("thumbnails", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  mediaId: text("mediaId")
    .notNull()
    .references(() => medias.id),
  type: thumbnailTypeEnum("type").notNull(),
  size: thumbnailSizeEnum("size").notNull(),
  url: text("url").notNull(),
});

export const thumbnailRelations = relations(thumbnails, ({ one }) => ({
  media: one(medias, { fields: [thumbnails.mediaId], references: [medias.id] }),
}));

export type Thumbnail = InferSelectModel<typeof thumbnails>;

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  password: varchar("password", { length: 72 }),
  image: text("image"),
});

export type User = InferSelectModel<typeof users>;

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  })
);
