import { dalDbOperation, dalRequireAuth, dalRequireAuthRedirect } from "@/dal/helpers";
import { db } from "@/db";
import { contactsTable } from "@/db/schemas";
import LoadingPage from "./loading";
import HomePage from "./HomePage";

export default async function Home () {
   await dalRequireAuthRedirect();

   const waitingList = await dalRequireAuth(user => 
      dalDbOperation(async () => {
         const res = await db.select().from(contactsTable);
         return res;
      })
   );

   if (waitingList.success) {
      return <HomePage contacts={JSON.parse(JSON.stringify(waitingList.data))} />;
   } else {
      return <LoadingPage />;
   }
}