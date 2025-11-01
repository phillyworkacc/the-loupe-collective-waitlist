'use client'
import { useSession } from "next-auth/react"
import { CSSProperties } from "react";
import AppWrapper from "@/components/AppWrapper/AppWrapper";
import Card from "@/components/Card/Card";
import WaitList from "./WaitList";
import Spacing from "@/components/Spacing/Spacing";

export default function HomePage ({ contacts }: { contacts: Contact[] }) {
   const { data: session } = useSession();

   const cardStyles: CSSProperties = {
      width: "100%",
      padding: "25px", boxShadow: "0 1px 3px rgba(0,0,0,0.098)"
   }

   function contactsToday () {
      const today = new Date();
      const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

      return contacts.filter(c => {
         const created = new Date(c.createdat);
         return created >= startOfDay && created < endOfDay;
      });
   }

   return (
      <AppWrapper>
         <div className="box full h-fit">
            <div className="text-l full bold-700 pd-1">
               Welcome {session?.user?.name}
            </div>

            <div className="box full pd-1">
               <div className="htv gap-10 mb-1">
                  <Card styles={cardStyles}>
                     <div className="text-xxs grey-5 full mb-05">Contacts Today</div>
                     <div className="text-xxl full bold-700 mb-05 accent-color">{contactsToday().length}</div>
                  </Card>
                  <Card styles={cardStyles}>
                     <div className="text-xxs grey-5 full mb-05">Total Contacts</div>
                     <div className="text-xxl full bold-700 mb-05 accent-color">{contacts.length}</div>
                  </Card>
               </div>
            </div>

            <WaitList allContacts={contacts} />
            <Spacing size={3} />
         </div>
      </AppWrapper>
   )
}
