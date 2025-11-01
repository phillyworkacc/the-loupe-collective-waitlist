import { checkPassword } from "@/app/actions/user";
import { uuid } from "@/utils/uuid";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
   session: {
      strategy: "jwt"
   },
   providers: [
      CredentialsProvider({
			name: "Credentials",
			credentials: {
				password: {}
			},
         async authorize (credentials, req) {
            if (credentials?.password == "") return null;
            if (!credentials?.password) return null;
            const canLogin = await checkPassword(credentials?.password);
            if (!canLogin) return null;
            return {
               id: uuid(),
               name: 'Admin',
            }
         }
      })
   ],
   callbacks: {
      jwt: async ({ user, token, trigger, session }) => {
         if (trigger == "update") {
            return { ...token, ...session.user }
         }
         return { ...token, ...user }
      }
   }
}