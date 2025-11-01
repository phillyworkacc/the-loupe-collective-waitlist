'use client'
import AwaitButton from '@/components/AwaitButton/AwaitButton'
import { TheLoupeCollectiveLogo } from '@/components/Icons/Icon'
import { useState } from 'react';
import { toast } from 'sonner';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
   const [password, setPassword] = useState("");
   const router = useRouter();

   async function loginAdminBtn (callback: Function) {
      if (password == "") {
         toast.error("Please enter a password");
         callback();
         return;
      }
      const response = await signIn("credentials", { password, redirect: false });
      if (response?.error) {
         toast.error("Incorrect Password");
      } else {
         router.push('/');
      }
      callback();
   }

   return (
      <div className='box full h-full pd-4 pdx-4 dfb justify-center'>
         <div className="box full h-fit dfb column gap-10 align-center" style={{ maxWidth: "800px" }}>
            <div className="box full pd-1 dfb justify-center">
               <TheLoupeCollectiveLogo size={50} />
            </div>
            <div className="text-xl pd-1 bold-700 full text-center">WaitList Admin Login</div>
            <div className="box full">
               <div className="box full pd-05 dfb justify-center">
                  <input
                     type="text"
                     className="xxs pd-12 pdx-2 full"
                     placeholder="Password"
                     style={{ maxWidth: "380px" }}
                     onChange={e => setPassword(e.target.value)}
                     value={password}
                  />
               </div>
               <div className="box full pd-05 dfb justify-center">
                  <AwaitButton className='xxs full pdx-3 pd-11' onClick={loginAdminBtn} styles={{ maxWidth: "380px" }}>
                     Continue
                  </AwaitButton>
               </div>
            </div>
         </div>
      </div>
   )
}
