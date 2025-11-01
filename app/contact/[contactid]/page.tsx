import { dalDbOperation, dalRequireAuth, dalRequireAuthRedirect } from "@/dal/helpers";
import { db } from "@/db";
import { contactsTable } from "@/db/schemas";
import { eq } from "drizzle-orm";
import LoadingPage from "./loading";
import ContactPage from "./ContactPage";

type ContactProps = {
   params: Promise<{
      contactid: string;
   }>
}

export default async function Contact ({ params }: ContactProps) {
   await dalRequireAuthRedirect();

   const { contactid } = await params;

   const contactInfo = await dalRequireAuth(user => 
      dalDbOperation(async () => {
         const res = await db.select()
            .from(contactsTable)
            .where(
               eq(contactsTable.contactid, contactid)
            ).limit(1);
         return res;
      })
   );

   if (contactInfo.success) {
      if (contactInfo.data.length > 0) {
         return <ContactPage contactInfo={JSON.parse(JSON.stringify(contactInfo.data[0]))} />;
      } else {
         return <ContactPage contactInfo={undefined} />;
      }
   } else {
      return <LoadingPage />;
   }
}