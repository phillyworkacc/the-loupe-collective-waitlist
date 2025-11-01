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