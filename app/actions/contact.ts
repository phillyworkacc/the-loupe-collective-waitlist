"use server"
import { dalDbOperation, dalRequireAuth } from "@/dal/helpers";
import { db } from "@/db";
import { contactsTable } from "@/db/schemas";
import { and, eq } from "drizzle-orm";

export async function deleteContact (contactid: string, id: number) {
   try {
      const res = await dalRequireAuth(user =>
         dalDbOperation(async () => {
            const result = await db
               .delete(contactsTable)
               .where(and(
                  eq(contactsTable.contactid, contactid),
                  eq(contactsTable.id, id)
               ));
            
            return (result.rowCount === 1);
         })
      );
      return res;
   } catch (e) {
      return false;
   }
}