'use client'
import { signOut, useSession } from "next-auth/react"
import { LogOut } from "lucide-react";
import AppWrapper from "@/components/AppWrapper/AppWrapper";
import Spacing from "@/components/Spacing/Spacing";

export default function SettingsPage () {
   const { data: session } = useSession();

   return (
      <AppWrapper>
         <div className="box full h-fit">
            <div className="text-l full bold-700 pd-1">
               {session?.user?.name}
            </div>

            <div className="box full pd-1">
               <button className="xxs pd-12 full" onClick={() => signOut()}>
                  <LogOut size={17} /> Log Out
               </button>
            </div>
            
            <Spacing size={3} />
         </div>
      </AppWrapper>
   )
}
