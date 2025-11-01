"use server"
import { authOptions } from "@/lib/authOptions"
import { getServerSession } from "next-auth"

export async function getCurrentUser() : Promise<AdminUser | false> {
   try {
      const session = await getServerSession(authOptions);

      if (!session) return false;
      if (!session.user) return false;

      return {
         name: 'Admin'
      }
   } catch (e) {
      return false;
   }
}

export async function checkPassword (pwd: string): Promise<boolean> {
   const adminPassword = process.env.APP_PWD!;
   return (pwd === adminPassword);
}