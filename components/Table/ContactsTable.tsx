'use client'
import './Table.css'
import { formatMilliseconds } from '../../utils/date';

type ContactsTableProps = {
   contacts: Contact[];
   onClickClient?: (contact: Contact) => void;
}

export default function ContactsTable ({ contacts, onClickClient }: ContactsTableProps) {
   return (
      <div className="table-container">
         <table className="waiters-table">
            <thead>
               <tr id='head-row'>
                  <th>Name</th>
                  <th style={{textAlign:"center"}}>Email</th>
                  <th style={{textAlign:"center"}}>Practice Name</th>
                  <th style={{textAlign:"center"}}>Practice Location</th>
                  <th style={{textAlign:"center"}}>Date Signed Up</th>
               </tr>
            </thead>
            <tbody>
               {contacts.map((contact, index) => (
                  <tr key={index} onClick={() => { if (onClickClient) onClickClient(contact); }}>
                     <td className='name accent-color'><b>{contact.name}</b></td>
                     <td style={{textAlign:"center"}}>{contact.email}</td>
                     <td style={{textAlign:"center"}}>{contact.practiceName}</td>
                     <td style={{textAlign:"center"}}>{contact.practiceLocation}</td>
                     <td style={{textAlign:"center"}}>{formatMilliseconds(new Date(contact.createdat).getTime(), true)}</td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   )
}
