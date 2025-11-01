declare module '*.css'

type AdminUser = {
   name: string;
}

type Contact = {
   id: number;
   contactid: string;
   name: string;
   email: string;
   practiceName: string;
   practiceLocation: string;
   areasOfInterest: string;
   drawsToTlc: string;
   createdat: Date;
}
