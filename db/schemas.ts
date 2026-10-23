import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const contactsTable = pgTable("contacts", {
   id: serial("id").primaryKey(),
   contactid: text("contactid"),
   name: text("name"),
   email: text("email"),
   practiceName: text("practice_name"),
   practiceLocation: text("practice_location"),
   areasOfInterest: text("areas_of_interest"),
   drawsToTlc: text("draws_to_lc"),
   createdat: timestamp("created_at").defaultNow(),
});

export const blogsTable = pgTable("blogs", {
   id: serial("id").primaryKey(),
   blogId: text("blog_id"),
   title: text("title").notNull(),
   subtitle: text("subtitle").default(""),
   tags: text("tags").default("").notNull(),
   content: text("content").notNull(),
   imageUrl: text("image_url"),
   featured: text("featured").default("no"),
   createdAt: text("created_at").notNull(),
});

export const newsletterTable = pgTable("newsletter", {
   id: serial("id").primaryKey(),
   email: text("email"),
   joinedOn: timestamp("joined_on").defaultNow(),
});