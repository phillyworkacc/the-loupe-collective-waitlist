import { db } from '@/db';
import { contactsTable } from '@/db/schemas';
import { uuid } from '@/utils/uuid';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

const allowedOrigins = [
   'https://theloupecollective.com/'
];

function makeCorsResponse(body: any, status: number, origin: string) {
   return new NextResponse(JSON.stringify(body), {
      status,
      headers: {
         'Content-Type': 'application/json',
         'Access-Control-Allow-Origin': origin,
         'Access-Control-Allow-Methods': 'POST, OPTIONS',
         'Access-Control-Allow-Headers': 'Content-Type',
         'Access-Control-Max-Age': '86400',
      },
   });
}

export async function OPTIONS(req: Request) {
   const origin = req.headers.get('origin') || '';
   if (!allowedOrigins.includes(origin)) {
      return new NextResponse('Forbidden', { status: 403 });
   }

   return new NextResponse(null, {
      status: 204,
      headers: {
         'Access-Control-Allow-Origin': origin,
         'Access-Control-Allow-Methods': 'POST, OPTIONS',
         'Access-Control-Allow-Headers': 'Content-Type',
         'Access-Control-Max-Age': '86400',
      },
   });
}

export async function POST(req: Request) {
   const origin = req.headers.get('origin') || '';
   if (!allowedOrigins.includes(origin)) {
      return makeCorsResponse({ error: 'Not allowed', success: undefined }, 403, origin);
   }

   try {
      const {
         name, email,
         practiceName, practiceLocation,
         areasOfInterest, drawsToTlc
      } = await req.json();

      if (!name || !email || !practiceName || !practiceLocation) {
         return makeCorsResponse({ error: 'Please fill in all fields', success: undefined }, 400, origin);
      }

      const contactExists = await db
         .select()
         .from(contactsTable)
         .where(eq(contactsTable.email, email))
         .limit(1);

      if (contactExists.length > 0) {
         return makeCorsResponse({ error: 'Email already signed up', success: undefined }, 409, origin);
      }

      const contactid = uuid();
      const added = await db
         .insert(contactsTable)
         .values({
            contactid, name, email,
            practiceName, practiceLocation,
            areasOfInterest, drawsToTlc
         });

      if (added.rowCount === 1) {
         return makeCorsResponse({ success: true, error: undefined }, 201, origin);
      } else {
         return makeCorsResponse({ error: 'Failed to sign up', success: undefined }, 409, origin);
      }
   } catch (err) {
      console.error('Waitlist signup error:', err);
      return makeCorsResponse({ error: 'Invalid request', success: undefined }, 400, origin);
   }
}
