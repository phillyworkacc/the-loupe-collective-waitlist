'use client'
import AppWrapper from "@/components/AppWrapper/AppWrapper";
import AwaitButton from "@/components/AwaitButton/AwaitButton";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Spacing from "@/components/Spacing/Spacing";
import Link from "next/link";
import { deleteContact } from "@/app/actions/contact";
import { copyToClipboard } from "@/lib/str";
import { formatMilliseconds } from "@/utils/date";
import { ArrowLeft, Copy, Hospital, MapPin, Send, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ContactPageProps = {
   contactInfo: Contact | undefined;
}

export default function ContactPage ({ contactInfo }: ContactPageProps) {
   const router = useRouter();

   if (!contactInfo) {
      return (
         <AppWrapper>
            <div className="box full h-fit">
               <div className="text-ml full bold-600 pd-1">
                  Couldn't find contact
               </div>
               <div className="text-xxs pd-1 grey-5 full">Click below to go back to the dashboard</div>
               <div className="box pd-1">
                  <button className="xxs pd-1 pdx-3" onClick={() => router.push("/")}>
                     <ArrowLeft size={17} /> Back to Dashboard
                  </button>
               </div>
            </div>
         </AppWrapper>
      )
   }

   const copyEmailBtn = () => {
      copyToClipboard(contactInfo.email);
      toast.success("Copied !");
   }

   const deleteContactBtn = async (callback: Function) => {
      if (confirm(`Are you sure you want to delete ${contactInfo.name} ?`)) {
         const deleted = await deleteContact(contactInfo.contactid, contactInfo.id);
         if (deleted) {
            toast.success("Deleted Contact");
            router.push("/");
            callback();
         } else {
            toast.error("Failed to delete contact");
            callback();
         }
      }
      callback();
   }

   return (
      <AppWrapper>
         <div className="box full h-fit">
            <div className="box full pd-1">
               <Breadcrumb 
                  pages={[
                     { label: contactInfo.name, href: "/" },
                  ]}
               />
            </div>
            <div className="text-ml full bold-600 pd-1">{contactInfo.name}</div>
            <div className="text-xxs grey-5 mb-1">Signed up on {formatMilliseconds(new Date(contactInfo.createdat).getTime())}</div>
            <div className="box full pd-1">
               <div className="text-xxs fit">{contactInfo.email}</div>
               <div className="box full dfb align-center gap-10 pd-1">
                  <Link href={`mailto:${contactInfo.email}`} style={{ width: "fit-content" }}>
                     <button className="xxxs pd-1 pdx-15 whitespace-nowrap">
                        <Send size={15} /> Send Email
                     </button>
                  </Link>
                  <button className="xxxs pd-1 pdx-15 whitespace-nowrap outline-black tiny-shadow" onClick={copyEmailBtn}>
                     <Copy size={15} /> Copy Email
                  </button>
               </div>
            </div>
            <div className="box full pd-1 mb-05">
               <div className="text-s full bold-600 mb-05">Practice</div>
               <div className="text-xs full grey-5 dfb align-center gap-5 pd-05">
                  <Hospital size={17} /> {contactInfo.practiceName}
               </div>
               <div className="text-xs full grey-5 dfb align-center gap-5 pd-05">
                  <MapPin size={17} /> {contactInfo.practiceLocation}
               </div>
            </div>
            <div className="box full pd-1 mb-05">
               <div className="text-s full bold-600 mb-05">Areas Of Interest</div>
               <div className="text-xs full grey-5">
                  {contactInfo.areasOfInterest || <i>Not Stated</i>}
               </div>
            </div>
            <div className="box full pd-1 mb-05">
               <div className="text-s full bold-600 mb-05">What drew <u>{contactInfo.name}</u> to the Loupe Collective?</div>
               <div className="text-xs full grey-5">
                  {contactInfo.drawsToTlc || <i>Not Stated</i>}
               </div>
            </div>
            <div className="box full pd-1">
               <AwaitButton className="xxxs pd-1 pdx-15 whitespace-nowrap delete tiny-shadow" onClick={deleteContactBtn}>
                  <Trash2 size={15} /> Delete Contact
               </AwaitButton>
            </div>
            <Spacing size={1} />
         </div>
      </AppWrapper>
   )
}
