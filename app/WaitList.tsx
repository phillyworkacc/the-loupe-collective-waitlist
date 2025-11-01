'use client'
import WaitersTable from "@/components/Table/ContactsTable"
import Select from "@/components/Select/Select";
import Link from "next/link";
import AwaitButton from "@/components/AwaitButton/AwaitButton";
import { useEffect, useState } from "react";
import { pluralSuffixer } from "@/lib/str";
import { useRouter } from "next/navigation";
import { Download, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { formatMilliseconds } from "@/utils/date";

function getUniqueYearsClient (data: Contact[]): string[] {
   const years = data.map(item => {
      const date = new Date(item.createdat);
      return date.getFullYear().toString();
   });
   // Filter out duplicates and return the unique years
   return [...new Set(years)];
}
   
export default function WaitList ({ allContacts }: { allContacts: Contact[] }) {
   const router = useRouter();
   const [contacts, setContacts] = useState<Contact[]>(allContacts);

   // filter states
   const chartLabels = [ 'All Time', 'Last 24 hours', 'Last 7 days', 'Last 30 days', ...getUniqueYearsClient(allContacts) ];
   const [searchContacts, setSearchContacts] = useState("");
   const [chartLabelIndex, setChartLabelIndex] = useState<number>(0);


   const filterUsingChartLabels = (index: number) => {
      if (getUniqueYearsClient(allContacts).includes(chartLabels[index])) {
         return (allContacts.filter(contact => (new Date(contact.createdat)).getFullYear() == parseInt(chartLabels[index])));
      } else if (chartLabels[index] == "Last 30 days") {
         return (allContacts.filter(contact => (new Date(contact.createdat).getTime() >= (Date.now() - (30*24*60*60*1000)) )));
      } else if (chartLabels[index] == "Last 24 hours") {
         return (allContacts.filter(contact => (new Date(contact.createdat).getTime() >= (Date.now() - (24*60*60*1000)) )));
      } else if (chartLabels[index] == "All Time") {
         return (allContacts);
      } else {
         return (allContacts.filter(contact => (new Date(contact.createdat).getTime() >= (Date.now() - (7*24*60*60*1000)) )));
      }
   }

   function sendMailToViewingContacts () {
      return contacts.filter(contact => contact.name.toLowerCase().includes(searchContacts.toLowerCase())).map(c => c.email).join(",");
   }

   function downloadCSV (callback: Function) {
      if (allContacts.length < 1) return;
      try {
         // filter contents of all contacts
         const contacts = allContacts.map(c => ({
            name: c.name,
            email: c.email,
            practiceName: c.practiceName,
            practiceLocation: c.practiceLocation,
            areasOfInterest: c.areasOfInterest,
            drawsToTlc: c.drawsToTlc,
            signUpDate: formatMilliseconds(new Date(c.createdat).getTime())
         }))
         const headers = Object.keys(contacts[0]);
   
         // Convert array to CSV string
         const csvRows = [
            headers.join(','), // header row
            ...contacts.map((contact: any) =>
               headers.map((header: any) => JSON.stringify(contact[header] ?? '')).join(',')
            ),
         ];
   
         const csvString = csvRows.join('\n');
   
         // Create a blob and trigger download
         const blob = new Blob([csvString], { type: 'text/csv' });
         const url = URL.createObjectURL(blob);
   
         const a = document.createElement('a');
         a.href = url;
         a.download = 'contacts.csv';
         document.body.appendChild(a);
         a.click();
         document.body.removeChild(a);
   
         URL.revokeObjectURL(url);
         callback();
      } catch (err) {
         toast.error("Failed to download csv file")
         callback();
      }
   }

   function refreshData (callback: Function) {
      router.refresh();
      callback();
   }

   useEffect(() => {
      setContacts(filterUsingChartLabels(chartLabelIndex!))
   }, [chartLabelIndex])


   return (<>
      <div className="htv gap-10">
         <div className="box full pd-1">
            <input 
               type="text" 
               className="xxs pd-11 pdx-15"
               placeholder="Search Clients"
               style={{ width: "100%", maxWidth: "400px" }}
               value={searchContacts}
               onChange={(e) => setSearchContacts(e.target.value)}
            />
         </div>
         <div className="box full dfb align-center justify-end gap-10">
            <Select
               options={chartLabels}
               onSelect={(_, index) => setChartLabelIndex(index!)}
               style={{ width: "fit-content", padding: "2px 0", borderRadius: "12px", boxShadow:"0 2px 5px rgba(0, 0, 0, 0.096)" }}
               optionStyle={{ padding:"10px 12px" }}
            />
         </div>
      </div>
      <div className="box full dfb align-center justify-start pd-1 gap-10 wrap mb-1">
         <AwaitButton className="xxs pd-1 pdx-2" onClick={downloadCSV}>
            <Download size={17} /> Download All Contacts
         </AwaitButton>
         <Link href={`mailto:${sendMailToViewingContacts()}`}>
            <button className="xxs pd-1 pdx-2 whitespace-nowrap">
               Send Email to {contacts.filter(contact => contact.name.toLowerCase().includes(searchContacts.toLowerCase())).length} Contacts
            </button>
         </Link>
         <AwaitButton className="xxs pd-1 pdx-2 outline-black tiny-shadow" blackSpinner onClick={refreshData}>
            <RotateCcw size={17} /> Refresh Data
         </AwaitButton>
      </div>
      
      <div className="text-xxs grey-5 full mb-2 pd-1 pdx-1">
         {contacts.filter(contact => contact.name.toLowerCase().includes(searchContacts.toLowerCase())).length}
         {pluralSuffixer(
            ' client',
            contacts.filter(contact => contact.name.toLowerCase().includes(searchContacts.toLowerCase())).length,
            's'
         )} found
      </div>

      {(contacts.length > 0) ? (<>
         {(contacts.filter(contact => contact.name.toLowerCase().includes(searchContacts.toLowerCase())).length > 0) ? (<>
            <WaitersTable 
               contacts={
                  contacts
                  .filter(contact => contact.name.toLowerCase().includes(searchContacts.toLowerCase()))
               }
               onClickClient={contact => router.push(`/contact/${contact.contactid}`)}
            />
         </>) : (<>
            <div className="text-xxs full grey-5 text-center">No results</div>
         </>)}
      </>) : (<>
         <div className="text-xxs full grey-5 text-center">No results</div>
      </>)}
   </>)
}
