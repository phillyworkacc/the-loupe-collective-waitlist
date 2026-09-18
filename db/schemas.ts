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
   title: text("title"),
   content: text("content"),
   imageUrl: text("image_url"),
   createdAt: text("created_at"),
});

export const newsletterTable = pgTable("newsletter", {
   id: serial("id").primaryKey(),
   email: text("email"),
   joinedOn: timestamp("joined_on").defaultNow(),
});